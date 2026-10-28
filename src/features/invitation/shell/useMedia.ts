import { useEffect, useState } from "react";

/** true khi viewport >= query (mặc định breakpoint md của Tailwind). Dùng cho giá trị gắn inline theo breakpoint như trang gốc. */
export function useIsMd(query = "(min-width: 768px)") {
  const get = () => (typeof window !== "undefined" && window.matchMedia ? window.matchMedia(query).matches : false);
  const [m, setM] = useState(get);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const on = () => setM(mq.matches);
    on();
    mq.addEventListener("change", on);
    return () => mq.removeEventListener("change", on);
  }, [query]);
  return m;
}

/** Bề rộng viewport hiện tại (px), cập nhật khi đổi kích thước. */
export function useViewportWidth() {
  const [w, setW] = useState(() => (typeof window !== "undefined" ? window.innerWidth : 1024));
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    on();
    window.addEventListener("resize", on);
    return () => window.removeEventListener("resize", on);
  }, []);
  return w;
}
