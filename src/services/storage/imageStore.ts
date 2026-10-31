const DB_NAME = "chungdoi-images";
const STORE_NAME = "blobs";

function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onupgradeneeded = () => req.result.createObjectStore(STORE_NAME);
    req.onsuccess = () => resolve(req.result);
    req.onerror = () => reject(req.error);
  });
}

async function putBlob(blob: Blob): Promise<string> {
  const id = crypto.randomUUID();
  const db = await openDB();
  return new Promise((resolve, reject) => {
    const tx = db.transaction(STORE_NAME, "readwrite");
    tx.objectStore(STORE_NAME).put(blob, id);
    tx.oncomplete = () => resolve(`idb:${id}`);
    tx.onerror = () => reject(tx.error);
  });
}

async function getBlob(key: string): Promise<Blob | null> {
  const id = key.slice(4);
  const db = await openDB();
  return new Promise((resolve) => {
    const tx = db.transaction(STORE_NAME, "readonly");
    const req = tx.objectStore(STORE_NAME).get(id);
    req.onsuccess = () => resolve(req.result ?? null);
    req.onerror = () => resolve(null);
  });
}

function dataUrlToBlob(dataUrl: string): Blob {
  const [header, b64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)?.[1] || "image/png";
  const bytes = atob(b64);
  const arr = new Uint8Array(bytes.length);
  for (let i = 0; i < bytes.length; i++) arr[i] = bytes.charCodeAt(i);
  return new Blob([arr], { type: mime });
}

const blobToIdb = new Map<string, string>();
const idbToBlobUrl = new Map<string, string>();

/**
 * Chuyển một URL tạm (blob: hoặc data:) thành khoá bền `idb:<uuid>` trong IndexedDB.
 * Trả nguyên nếu URL đã là idb:, http(s):, đường dẫn tương đối, hoặc rỗng.
 */
export async function persistUrl(url: string): Promise<string> {
  if (!url) return url;
  if (url.startsWith("idb:") || url.startsWith("http") || url.startsWith("/")) return url;
  if (blobToIdb.has(url)) return blobToIdb.get(url)!;

  let blob: Blob;
  if (url.startsWith("blob:")) {
    const resp = await fetch(url);
    blob = await resp.blob();
  } else if (url.startsWith("data:")) {
    blob = dataUrlToBlob(url);
  } else {
    return url;
  }

  const key = await putBlob(blob);
  blobToIdb.set(url, key);
  idbToBlobUrl.set(key, url);
  return key;
}

/**
 * Chuyển khoá `idb:<uuid>` thành object URL hiển thị được; cache trong bộ nhớ.
 */
export async function resolveUrl(url: string): Promise<string> {
  if (!url || !url.startsWith("idb:")) return url;
  if (idbToBlobUrl.has(url)) return idbToBlobUrl.get(url)!;
  const blob = await getBlob(url);
  if (!blob) return "";
  const objUrl = URL.createObjectURL(blob);
  idbToBlobUrl.set(url, objUrl);
  blobToIdb.set(objUrl, url);
  return objUrl;
}

import type { Inv } from "@/types/invitation";

async function mapUrls(inv: Inv, fn: (u: string) => Promise<string>): Promise<Inv> {
  const out = { ...inv };
  out.heroPhoto = await fn(inv.heroPhoto);
  out.photos = await Promise.all((inv.photos || []).map(fn));
  if (inv.customSharePhoto) out.customSharePhoto = await fn(inv.customSharePhoto);
  if (inv.gifts?.length) {
    out.gifts = await Promise.all(
      inv.gifts.map(async (g) => {
        if (g.qrUrl && (g.qrUrl.startsWith("blob:") || g.qrUrl.startsWith("data:") || g.qrUrl.startsWith("idb:"))) {
          return { ...g, qrUrl: await fn(g.qrUrl) };
        }
        return g;
      }),
    );
  }
  return out;
}

/** Trước khi ghi localStorage: blob:/data: → idb: */
export function persistInvImages(inv: Inv): Promise<Inv> {
  return mapUrls(inv, persistUrl);
}

/** Sau khi đọc localStorage: idb: → object URL */
export function resolveInvImages(inv: Inv): Promise<Inv> {
  return mapUrls(inv, resolveUrl);
}
