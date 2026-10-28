/**
 * Mẫu "Minimalism - Đỏ Đậm": màn mở thiệp và phần đầu thiệp, dựng lại từ HTML trang demo thật
 * (chungdoi.com/vi/mau-thiep/minimalism-do-dam/demo). Chỉ phần đầu; phần thân dùng bố cục Minimalism chung.
 */
import { useEffect, useRef, useState } from "react";
import type React from "react";

const BASE = "/images/themes/minimalism-dark-red";
const HEART = "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z";
const serif = '"Lora", "Times New Roman", serif';

const HEARTS = [
  { left: "30%", size: 13, color: "#a8323b", dur: 24.9, delay: -21 },
  { left: "17%", size: 22, color: "#ece4d8", dur: 25.9, delay: -10 },
  { left: "70%", size: 17, color: "#c9a24a", dur: 25.7, delay: -8 },
  { left: "34%", size: 23, color: "#a8323b", dur: 20.1, delay: -19 },
  { left: "26%", size: 23, color: "#c9a24a", dur: 25.6, delay: -13 },
  { left: "83%", size: 22, color: "#c9a24a", dur: 25, delay: -1 },
  { left: "9%", size: 18, color: "#a8323b", dur: 23, delay: -3 },
];

export function DarkRedCover({
  groom, bride, dateText, guest, message, onOpen,
}: { groom: string; bride: string; dateText: string; guest?: string; message?: string; onOpen: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden envelope-screen darkred-env-screen" style={{ background: "linear-gradient(to bottom right, #6e1a20, #511419, #380a0e)" }}>
      <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true" style={{ zIndex: 1 }}>
        {HEARTS.map((p, i) => (
          <div key={i} className="absolute" style={{ left: p.left, top: -30, color: p.color, fontSize: p.size, animation: `ambient-fall ${p.dur}s ease-in-out ${p.delay}s infinite` }}>
            <svg viewBox="0 0 24 24" fill="currentColor" width="1em" height="1em"><path d={HEART} /></svg>
          </div>
        ))}
      </div>
      <div className="relative" style={{ zIndex: 10 }}>
        <div className="relative w-[310px] sm:w-[340px] md:w-[520px] lg:w-[600px]">
          <div onClick={onOpen} title="Bấm để mở thiệp" className="wax-seal absolute left-1/2 rounded-full flex items-center justify-center cursor-pointer" style={{ top: 50, width: 56, height: 56, transform: "translate(-50%, -50%)", background: "radial-gradient(circle at 30% 30%, #511419, rgb(51, 0, 0))", boxShadow: "0 4px 20px rgba(81, 20, 25, 0.5), inset 0 2px 4px rgba(255,255,255,0.3)", zIndex: 30, animation: "seal-pulse 2s ease-in-out infinite" }}>
            <svg style={{ fill: "#f3e8de" }} viewBox="0 0 24 24" className="w-7 h-7"><path d={HEART} /></svg>
          </div>
          <div className="relative rounded-lg" style={{ boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.45), 0 8px 24px rgba(0, 0, 0, 0.2), 0 0 40px rgba(81, 20, 25, 0.15)" }}>
            <div className="absolute inset-0 rounded-lg overflow-hidden" style={{ background: "rgba(255, 250, 243, 0.96)", border: "1px solid rgba(81, 20, 25, 0.15)", clipPath: "inset(0 round 8px)" }}>
              <img src={`${BASE}/flower2-decoration.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none h-36 md:h-70 w-auto max-w-none top-[-5%] md:top-[-2%] left-[-10px] -translate-x-[6%] md:-translate-x-[11%] opacity-80 rotate-[25deg]" />
              <img src={`${BASE}/flower2-decoration.webp`} alt="" aria-hidden="true" className="absolute pointer-events-none h-36 md:h-70 w-auto max-w-none bottom-[-5%] md:bottom-[35%] right-[-10px] translate-x-[6%] md:translate-x-[11%] -scale-x-100 opacity-80 -rotate-[25deg]" />
            </div>
            <div className="relative z-10 text-center px-6 pt-28 pb-14 md:pt-24 md:pb-8">
              <h1 className="mb-2 flex flex-col items-center leading-tight text-3xl sm:text-4xl font-normal" style={{ color: "#511419", fontFamily: '"Viaoda Libre", "EB Garamond", serif' }}>
                <span className="block w-full text-center">{groom}</span>
                <span className="block w-full text-center text-lg leading-none sm:text-xl" style={{ fontFamily: '"Baskerville", "Times New Roman", serif' }}>&amp;</span>
                <span className="block w-full text-center">{bride}</span>
              </h1>
              <div className="flex items-center justify-center gap-3 mb-2">
                <div className="w-10 h-px" style={{ background: "linear-gradient(to right, transparent, #511419)" }} />
                <span className="text-sm" style={{ color: "#511419", opacity: 0.7 }}>❦</span>
                <div className="w-10 h-px" style={{ background: "linear-gradient(to left, transparent, #511419)" }} />
              </div>
              <div className="text-[18px] mb-5 flex flex-col items-center" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}><span>{dateText}</span></div>
              <div className="mb-6 max-w-[300px] md:max-w-[380px] mx-auto">
                <p className="text-[18px] font-light mb-2" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}>Thân Mời</p>
                {guest && guest !== "Thân Mời" && <p className="text-[18px] font-medium" style={{ color: "#511419", fontFamily: serif }}>{guest}</p>}
                {guest && guest !== "Thân Mời" && message && <p className="text-[16px] font-light" style={{ color: "rgba(81, 20, 25, 0.72)", fontFamily: serif }}>{message}</p>}
              </div>
              <button type="button" onClick={onOpen} className="wax-seal-btn env-open-btn relative px-8 py-2.5 text-lg font-semibold sm:font-medium rounded-full shadow-lg cursor-pointer flex w-fit items-center justify-center mx-auto overflow-hidden border-none" style={{ backgroundColor: "#511419", color: "#f3e8de", boxShadow: "0 4px 14px rgba(81, 20, 25, 0.35)", fontFamily: serif }}>
                <span>Mở thiệp</span>
                <div className="absolute top-0 h-full w-8 pointer-events-none" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)", animation: "shine 3s ease-in-out infinite" }} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function DarkRedHeader({ groom, bride, intro, photo, crop }: { groom: string; bride: string; intro: string; photo?: string; crop?: { x: number; y: number; z: number } }) {
  return (
    <div className="relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden isolate" style={{ backgroundColor: "#fff7eb", color: "#511419" }}>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0" style={{ backgroundImage: `url("${BASE}/paper.webp")`, backgroundSize: "100% auto", backgroundPosition: "top center", mixBlendMode: "multiply", opacity: 0.5 }} />
      <header className="relative z-10 flex flex-col items-center overflow-x-clip px-9 pt-[60px] text-center" style={{ paddingBottom: 56 }}>
        <img src={`${BASE}/castle-background.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[26%] w-[170%]" style={{ transform: "translateX(-50%)" }} />
        <p className="relative z-10 whitespace-pre-line text-[15px] uppercase md:text-[18px]" style={{ fontFamily: '"Cormorant Garamond", "Times New Roman", serif', color: "#590310", letterSpacing: "0.16em", fontWeight: 600 }}>{intro}</p>
        {photo ? (
          <div className="relative z-10 mt-24 w-[82%] max-w-[330px] md:mt-28 md:max-w-[420px]">
            <div className="relative aspect-[333/384]">
              <img src={`${BASE}/envelope-background.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 z-10 w-full max-w-none" />
              <div className="absolute left-[33%] top-[-2%] z-20 w-[64%]" style={{ animation: "drFloat 6.5s linear 0.4s infinite", willChange: "transform" }}>
                <div className="box-border aspect-[221/309] border-[7px] border-solid border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)]" style={{ transform: "rotate(12deg)" }}>
                  <img src={photo} alt="" className="block h-full w-full object-cover" style={crop ? { objectPosition: `${crop.x}% ${crop.y}%`, transform: `scale(${crop.z})`, transformOrigin: `${crop.x}% ${crop.y}%` } : undefined} />
                </div>
              </div>
              <span aria-hidden="true" className="pointer-events-none absolute block -left-[2%] -top-[12%] z-[25] w-[42%]">
                <img src={`${BASE}/flower2-decoration.webp`} alt="" className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" style={{ transform: "rotate(-17deg)" }} />
              </span>
              <img src={`${BASE}/envelope-cover.webp`} alt="" aria-hidden="true" className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none" />
            </div>
          </div>
        ) : null}
        <div className="relative z-10 mt-16 flex flex-col items-center gap-[22px] md:mt-20">
          <p className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]" style={{ fontFamily: '"Viaoda Libre", "The Nautigal", cursive', color: "#511419" }}>{groom}</p>
          <span aria-hidden="true" className="pointer-events-none absolute top-[37%] text-[92px] leading-none md:text-[120px]" style={{ fontFamily: '"The Nautigal", cursive', color: "rgba(81,20,25,0.15)", transform: "translateY(-50%)" }}>&amp;</span>
          <p className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]" style={{ fontFamily: '"Viaoda Libre", "The Nautigal", cursive', color: "#511419" }}>{bride}</p>
        </div>
      </header>
    </div>
  );
}

const cream = "rgb(236, 228, 216)";
const creamSoft = "rgba(236, 228, 216, 0.7)";
const base = '"Baskerville", "Times New Roman", serif';

interface DarkRedFam { title: string; f: string; m: string; addr?: string }
interface DarkRedCeremony { title: string; place?: string; time: string; weekday: string; day: string; month: string; year: string; lunar?: string }

/** Khung đỏ "Thông tin lễ cưới" ở giữa thiệp, dựng lại từ HTML trang demo thật. */
export function DarkRedInfoFrame({
  heading, fams, announce, couple, ceremonies,
}: {
  heading: string; fams?: DarkRedFam[];
  announce?: { line1: string; line2: string };
  couple?: { n1: string; r1: string; n2: string; r2: string };
  ceremonies: DarkRedCeremony[];
}) {
  const nameStyle = { fontFamily: '"Viaoda Libre", "The Nautigal", cursive', color: cream, margin: 0, fontWeight: 400 } as const;
  const roleStyle = { color: creamSoft, fontFamily: 'Uchen, Baskerville, serif', letterSpacing: "0.14em" } as const;
  return (
    <section className="relative z-10 mx-auto mb-10 md:mb-16 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span aria-hidden="true" className="pointer-events-none absolute block -right-[22%] bottom-[30%] z-20 w-[40%]">
        <span className="block" style={{ animation: "drFloat 5.5s ease-in-out 0.6s infinite", willChange: "transform" }}>
          <img alt="" className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" src={`${BASE}/flower2-decoration.webp`} />
        </span>
      </span>
      <div className="relative overflow-hidden rounded-[13px] px-5 pb-10 pt-9 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[13px]" style={{ backgroundColor: "rgb(81, 20, 25)" }} />
        <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 rounded-[13px]" src={`${BASE}/paper.webp`} />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="uppercase text-center relative z-10" style={{ margin: 0, color: cream, fontFamily: '"Times New Roman", serif', fontWeight: 700, letterSpacing: "0.03em" }}><span className="text-[20px]">{heading}</span></h2>
          {fams && fams.length > 0 && <div className="relative grid grid-cols-[1fr_auto_1fr] grid-rows-[repeat(4,auto)] justify-center gap-x-8 gap-y-[3px] text-center" style={{ color: cream, fontFamily: base }}>
            {fams.map((fam, i) => (
              <div key={i} style={{ display: "contents" }}>
                {i === 1 && <div className="row-span-4 h-[50px] w-[1px] shrink-0 self-center" style={{ backgroundColor: "rgba(236, 228, 216, 0.4)" }} />}
                <div className="row-span-4 grid min-w-0 grid-rows-subgrid justify-items-center">
                  <span className="text-[12px]" style={{ color: creamSoft }}>{fam.title}</span>
                  <span className="text-[12px] md:text-[10px] font-semibold [overflow-wrap:anywhere]" style={{ color: cream }}>{fam.f}</span>
                  <span className="text-[12px] md:text-[10px] font-semibold [overflow-wrap:anywhere]" style={{ color: cream }}>{fam.m}</span>
                  <div className={`whitespace-pre-line [overflow-wrap:anywhere] ${fam.addr ? "mt-1" : ""} flex w-full flex-col text-[10px] leading-tight`} style={{ color: creamSoft }}>{fam.addr}</div>
                </div>
              </div>
            ))}
          </div>}
          {announce && (
            <div className="relative flex flex-col gap-1 text-center text-[12px] md:text-[13px] mx-auto md:max-w-[560px]" style={{ whiteSpace: "pre-line", fontFamily: base, color: cream }}>
              <span>{announce.line1}{"\n"}{announce.line2}</span>
            </div>
          )}
          {couple && <div className="w-full min-w-0 relative flex flex-col items-center text-center gap-[12px] md:gap-[16px]">
            <h3 className="w-[80%] min-h-[80px] flex items-center justify-center text-[36px] md:text-[46px] leading-[52px] md:leading-[60px] whitespace-nowrap" style={nameStyle}>{couple.n1}</h3>
            <div className="text-[10px] uppercase" style={roleStyle}>{couple.r1}</div>
            <div className="text-[35px]" style={{ color: cream, fontFamily: '"Ms Madi", cursive' }}>&amp;</div>
            <h3 className="w-[80%] min-h-[80px] flex items-center justify-center text-[36px] md:text-[46px] leading-[52px] md:leading-[60px] whitespace-nowrap" style={nameStyle}>{couple.n2}</h3>
            <div className="text-[10px] uppercase" style={roleStyle}>{couple.r2}</div>
          </div>}
          {ceremonies.map((c, i) => (
            <div key={i} className="relative flex flex-col items-center gap-[16px] md:gap-[20px] text-center" style={{ fontFamily: base }}>
              <div style={{ color: creamSoft }}>
                <span className="whitespace-pre-line font-normal text-[16px] md:text-[18px] text-center">{c.title}{c.place && !c.title.includes(c.place) ? `\n${c.place}` : ""}</span>
              </div>
              <div className="flex w-full max-w-[180px] md:max-w-[210px] items-center justify-between px-0 text-[13px] md:text-[15px] uppercase whitespace-nowrap min-w-max gap-x-3" style={{ color: creamSoft }}>
                <span>VÀO LÚC {c.time}</span>
                <span>{c.weekday}</span>
              </div>
              <div className="flex items-center justify-center gap-[16px]" style={{ color: cream }}>
                <span className="text-[40px] md:text-[46px] leading-none" style={{ fontFamily: '"Times New Roman", serif', color: cream }}>{c.day}</span>
                <div className="h-[46px] w-px" style={{ backgroundColor: "rgba(236, 228, 216, 0.45)" }} />
                <div className="flex flex-col items-start justify-center gap-1 text-left">
                  <span className="text-[14px] md:text-[18px] uppercase" style={{ fontFamily: '"Times New Roman", serif', color: cream }}>THÁNG {c.month}</span>
                  <span className="text-[14px] md:text-[18px] uppercase" style={{ fontFamily: '"Times New Roman", serif', color: cream }}>{c.year}</span>
                </div>
              </div>
              {c.lunar && <div className="text-xs md:text-sm uppercase tracking-[0.12em] px-0" style={{ color: creamSoft, fontFamily: base }}>({c.lunar})</div>}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const ALBUM_SCALE = [1, 0.85, 0.7, 0.7];
const ALBUM_OPACITY = [1, 0.75, 0.5, 0.3];

/** Album ảnh dạng vòng 3D (coverflow) của Minimalism - Đỏ Đậm, dựng lại từ HTML trang demo thật. */
export function DarkRedAlbum({ photos, title, crops, onPhotoClick, children }: { photos: string[]; title: string; crops?: Record<string, { x: number; y: number; z: number }>; onPhotoClick?: (url: string) => void; children?: React.ReactNode }) {
  const n = photos.length;
  const [active, setActive] = useState(0);
  const touchX = useRef<number | null>(null);
  const [ratios, setRatios] = useState<Record<string, number>>({});
  if (n === 0) return null;
  const stage = !children;
  const go = (d: number) => setActive((a) => (((a + d) % n) + n) % n);
  const offsetOf = (i: number) => {
    let d = (((i - active) % n) + n) % n;
    if (d >= n / 2) d -= n;
    return d;
  };
  const arrow = "hidden md:flex absolute top-1/2 z-[200] w-8 h-8 items-center justify-center rounded-full transition-colors";
  return (
    <div className="relative z-10 overflow-x-clip">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[-6%] w-[150%]" style={{ transform: "translateX(-50%)" }} src={`${BASE}/castle-background.webp`} />
      <div className="relative z-10 flex flex-col items-center px-6 pb-10 pt-10">
        <h2 className="uppercase text-center relative z-10" style={{ margin: 0, color: "rgb(81, 20, 25)", fontFamily: '"Times New Roman", serif', fontWeight: 700, fontSize: 20, letterSpacing: "0.03em" }}>{title}</h2>
        {!stage && <div className="relative z-10 mt-5 w-full max-w-[380px] md:max-w-[600px]">{children}</div>}
        {stage && <div className="relative z-10 mt-5 w-full max-w-[380px] md:max-w-[600px]">
          <div
            className="relative h-[340px] md:h-[520px]"
            style={{ touchAction: "pan-y" }}
            onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
            onTouchEnd={(e) => {
              if (touchX.current == null) return;
              const dx = e.changedTouches[0].clientX - touchX.current;
              touchX.current = null;
              if (Math.abs(dx) > 35) go(dx < 0 ? 1 : -1);
            }}
          >
            {n > 1 && (
              <>
                <button type="button" aria-label="Previous photo" onClick={() => go(-1)} className={`${arrow} left-0`} style={{ transform: "translateY(-50%)", border: 0, cursor: "pointer", background: "rgba(81,20,25,0.12)", color: "#511419" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" /></svg>
                </button>
                <button type="button" aria-label="Next photo" onClick={() => go(1)} className={`${arrow} right-0`} style={{ transform: "translateY(-50%)", border: 0, cursor: "pointer", background: "rgba(81,20,25,0.12)", color: "#511419" }}>
                  <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" /></svg>
                </button>
              </>
            )}
            <div className="relative w-full h-full flex items-center justify-center" style={{ perspective: "1000px" }}>
              {photos.map((url, i) => {
                const o = offsetOf(i);
                const a = Math.abs(o);
                const k = Math.min(a, 3);
                return (
                  <div
                    key={url + i}
                    className="absolute h-[92%] rounded-2xl overflow-hidden shadow-xl cursor-pointer"
                    style={{
                      aspectRatio: `${ratios[url] ?? 0.667} / 1`,
                      boxShadow: o === 0 ? "0 0 0 2px rgba(255,255,255,0.3), 0 20px 25px -5px rgba(0,0,0,0.1), 0 8px 10px -6px rgba(0,0,0,0.1)" : undefined,
                      transition: "all 1100ms ease-in-out",
                      transform: `translateX(${o * 60}%) translateZ(${-a * 150}px) rotateY(${o * 45}deg) scale(${ALBUM_SCALE[k]})`,
                      opacity: ALBUM_OPACITY[k],
                      zIndex: 100 - a,
                    }}
                    onClick={() => (o === 0 ? onPhotoClick?.(url) : setActive(i))}
                  >
                    <img alt={`Wedding photo ${i + 1}`} draggable={false} className="block h-full w-full object-cover" src={url} style={crops?.[url] ? { objectPosition: `${crops[url].x}% ${crops[url].y}%`, transform: `scale(${crops[url].z})`, transformOrigin: `${crops[url].x}% ${crops[url].y}%` } : { objectPosition: "50% 50%" }} onLoad={(e) => { const im = e.currentTarget; if (im.naturalHeight) setRatios((r) => (r[url] ? r : { ...r, [url]: im.naturalWidth / im.naturalHeight })); }} />
                  </div>
                );
              })}
            </div>
          </div>
          {n > 1 && (
            <div className="flex justify-center gap-1.5 mt-3">
              {photos.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Go to photo ${i + 1}`}
                  onClick={() => setActive(i)}
                  className="rounded-full"
                  style={{ border: 0, padding: 0, cursor: "pointer", height: 8, width: i === active ? 24 : 8, backgroundColor: "currentColor", opacity: i === active ? 0.7 : 0.25, transition: "all 300ms" }}
                />
              ))}
            </div>
          )}
        </div>}
      </div>
    </div>
  );
}

interface DarkRedBanquetProps {
  heading: string;
  title: string;
  time: string;
  weekday: string;
  day: string;
  month: string;
  year: string;
  lunar?: string;
  welcome?: string;
  start?: string;
  cal: { y: number; m: number; selected: number; cells: (number | null)[] };
  calLabels: string[];
  calendarHref: string;
  /** Thời điểm diễn ra tiệc (ngày + giờ); có thì hiện đồng hồ đếm ngược chạy trực tiếp như trang gốc. */
  countdownTo?: Date;
  onRsvp?: () => void;
  rsvpInline?: React.ReactNode;
}

/** Đếm ngược tới giờ tiệc: "N ngày H giờ M phút S giây"; ẩn khi đã qua giờ tiệc. */
function DarkRedCountdown({ to }: { to: Date }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);
  const left = Math.floor((to.getTime() - now) / 1000);
  if (left <= 0) return null;
  const d = Math.floor(left / 86400);
  const h = Math.floor((left % 86400) / 3600);
  const m = Math.floor((left % 3600) / 60);
  const s = left % 60;
  return (
    <div className="mt-4 flex flex-col items-center" style={{ gap: 8, color: cream, fontFamily: base }}>
      <h2 style={{ margin: 0, fontSize: 16, lineHeight: "24px", fontWeight: 400, color: creamSoft, fontFamily: base }}>Cùng đếm ngược</h2>
      <p className="text-[14px] leading-[20px] md:text-[18px] md:leading-[28px]" style={{ margin: 0, fontWeight: 300, color: cream }}>{d} ngày {h} giờ {m} phút {s} giây</p>
    </div>
  );
}

/** Khung đỏ "Thông tin tiệc cưới" (giờ, ngày, lịch tháng, thêm vào lịch, xác nhận tham dự). */
export function DarkRedBanquet({ heading, title, time, weekday, day, month, year, lunar, welcome, start, cal, calLabels, calendarHref, countdownTo, onRsvp, rsvpInline }: DarkRedBanquetProps) {
  const dim = { color: creamSoft, fontFamily: base };
  const tnr = { color: cream, fontFamily: '"Times New Roman", serif' };
  const labelCls = "text-xs uppercase tracking-wider";
  return (
    <section className="relative z-10 mx-auto mb-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span aria-hidden="true" className="pointer-events-none absolute block -left-[18%] top-[10%] z-20 w-[24%]">
        <span className="block" style={{ animation: "drFloat 6s ease-in-out 0.3s infinite", willChange: "transform" }}>
          <img alt="" className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" src={`${BASE}/flower2-decoration.webp`} />
        </span>
      </span>
      <div className="relative overflow-hidden rounded-[10px] px-5 py-9 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px]" style={{ backgroundColor: "rgb(81, 20, 25)" }} />
        <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 rounded-[10px]" src={`${BASE}/paper.webp`} />
        <div className="relative z-10 flex flex-col items-center gap-6">
          <h2 className="uppercase text-center relative z-10" style={{ margin: 0, color: cream, fontFamily: '"Times New Roman", serif', fontWeight: 700, letterSpacing: "0.03em" }}><span className="text-[20px]">{heading}</span></h2>
          <div className="flex flex-col items-center gap-[16px] md:gap-[20px] text-center" style={{ fontFamily: base, color: cream }}>
            <h3 className="font-normal uppercase text-[20px] md:text-[26px] flex flex-col items-center" style={{ margin: 0, color: cream, fontFamily: base, textTransform: "uppercase" }}>{title}</h3>
            <div className="flex w-full max-w-[130px] items-center justify-between px-0 text-[13px] md:text-[15px] uppercase whitespace-nowrap min-w-max gap-x-3" style={dim}>
              <span>{time}</span>
              <span>{weekday}</span>
            </div>
            <div className="flex items-center justify-center gap-[16px]" style={tnr}>
              <span className="text-[40px] md:text-[46px] leading-none" style={tnr}>{day}</span>
              <div className="h-[46px] w-px" style={{ backgroundColor: "rgba(236, 228, 216, 0.45)" }} />
              <div className="flex flex-col items-start justify-center gap-1 text-left">
                <span className="text-[12px] md:text-[16px] uppercase" style={tnr}>THÁNG {month}</span>
                <span className="text-[18px] md:text-[24px]" style={tnr}>{year}</span>
              </div>
            </div>
            {lunar && <div className="text-xs md:text-sm uppercase tracking-[0.12em] px-0" style={dim}>({lunar})</div>}
            {countdownTo && <DarkRedCountdown to={countdownTo} />}
            {(welcome || start) && (
              <div className="flex items-center justify-center gap-8 mt-4">
                {welcome && (
                  <div className="flex flex-col items-center">
                    <span className={labelCls} style={dim}>Đón khách</span>
                    <span className="text-lg md:text-xl font-medium mt-1" style={{ color: cream, fontFamily: base }}>{welcome}</span>
                  </div>
                )}
                {start && (
                  <div className="flex flex-col items-center">
                    <span className={labelCls} style={dim}>Khai tiệc</span>
                    <span className="text-lg md:text-xl font-medium mt-1" style={{ color: cream, fontFamily: base }}>{start}</span>
                  </div>
                )}
              </div>
            )}
            <div className="mt-3 mx-auto w-fit max-w-full overflow-hidden rounded-[10px] px-4 pb-4 pt-2" style={{ backgroundColor: cream }}>
              <div className="mx-auto rounded-lg overflow-hidden w-[280px] md:w-[330px]" style={{ color: "rgb(81, 20, 25)" }}>
                <div className="text-center py-2.5 tracking-wide" style={{ borderBottom: "1px solid color-mix(in srgb, rgb(81, 20, 25) 27%, transparent 73%)", fontFamily: '"The Nautigal", cursive', color: "rgb(81, 20, 25)", fontSize: 25, fontWeight: 400 }}>Tháng {cal.m + 1} / {cal.y}</div>
                <div className="grid grid-cols-7" style={{ borderBottom: "2px solid rgb(81, 20, 25)" }}>
                  {calLabels.map((w) => (
                    <div key={w} className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">{w}</div>
                  ))}
                </div>
                <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
                  {cal.cells.map((c, i) => (
                    <div key={i} className="flex items-center justify-center h-[30px] md:h-[34px]">
                      {c == null ? null : c === cal.selected ? (
                        <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                          <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill="#511419"><path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" /></svg>
                          <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "#fff" }}>{c}</span>
                        </div>
                      ) : (
                        <span className="text-[12px] md:text-[13px]">{c}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <a href={calendarHref} target="_blank" rel="noopener noreferrer" className="mt-3 inline-flex items-center justify-center text-sm underline underline-offset-4" style={{ color: cream, fontFamily: '"Times New Roman", serif', background: "none" }}>Thêm vào lịch</a>
          </div>
          {rsvpInline && <div className="relative z-10 w-full">{rsvpInline}</div>}
          {onRsvp && (
            <div className="relative z-10 mt-1 flex w-full flex-col items-center justify-center">
              <button type="button" onClick={onRsvp} className="inline-flex items-center justify-center rounded-full px-6 py-2 text-sm tracking-wide" style={{ border: 0, cursor: "pointer", backgroundColor: cream, color: "rgb(81, 20, 25)", fontFamily: base }}>
                <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">XÁC NHẬN THAM DỰ</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

/** Khối "Tiệc cưới sẽ tổ chức tại": địa chỉ, bản đồ nhúng và nút chỉ đường. */
export function DarkRedVenue({ title, address, mapSrc, directionsHref }: { title: string; address: string; mapSrc?: string; directionsHref?: string }) {
  return (
    <div className="relative z-10 overflow-x-clip">
      <img alt="" aria-hidden="true" className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[-1%] w-[158%]" style={{ transform: "translateX(-50%)" }} src={`${BASE}/castle-background.webp`} />
      <section className="relative z-10 flex w-full flex-col items-center px-6 pb-8 pt-8">
        <div className="relative text-center">
          <h3 className="uppercase text-center" style={{ margin: 0, color: "rgb(81, 20, 25)", fontFamily: '"Times New Roman", serif', fontWeight: 700, letterSpacing: "0.03em", fontSize: "1em" }}>{title}</h3>
          <div className="whitespace-pre-line mx-auto mt-2 max-w-[260px] text-center text-[12px] leading-relaxed md:max-w-[440px] md:text-[14px]" style={{ color: "rgba(81, 20, 25, 0.8)", fontFamily: base }}>{address}</div>
        </div>
        <div className="relative flex flex-col items-center gap-[16px] md:gap-[20px] w-full">
          {mapSrc && (
            <iframe title="Bản đồ" className="mt-3 h-[268px] w-full max-w-[338px] overflow-hidden rounded-[15px] md:h-[380px] md:max-w-[560px]" src={mapSrc} loading="lazy" allowFullScreen referrerPolicy="no-referrer-when-downgrade" style={{ display: "block", border: 0, borderColor: "rgb(81, 20, 25)" }} />
          )}
          {directionsHref && (
            <a href={directionsHref} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm md:text-base font-semibold" style={{ color: "rgba(81, 20, 25, 0.8)", fontFamily: base, textDecoration: "none" }}>
              <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polygon points="3 11 22 2 13 21 11 13 3 11" /></svg>
              <span>Chỉ đường</span>
            </a>
          )}
        </div>
      </section>
    </div>
  );
}

interface DarkRedGuestbookProps {
  wishes: { name: string; msg: string; at: string }[];
  name: string;
  msg: string;
  onName: (v: string) => void;
  onMsg: (v: string) => void;
  onSend: () => void;
}

/** Sổ lưu bút: nền giấy ghi chú, form gửi lời chúc và danh sách lời chúc. */
export function DarkRedGuestbook({ wishes, name, msg, onName, onMsg, onSend }: DarkRedGuestbookProps) {
  const field = "w-full rounded-lg border px-4 py-3 text-sm focus:outline-none";
  const fieldStyle = { border: "1px solid rgb(81, 20, 25)", color: "rgb(81, 20, 25)", backgroundColor: "transparent", boxSizing: "border-box", fontFamily: "inherit", fontWeight: 300 } as const;
  return (
    <div className="relative z-10 overflow-x-clip" style={{ containerType: "inline-size" }}>
      <img alt="" aria-hidden="true" className="pointer-events-none absolute left-1/2 top-[-15px] md:top-[-30px] lg:top-[-30px] w-[120%] max-w-[650px] object-contain opacity-95 drop-shadow-[4px_4px_4px_rgba(0,0,0,0.25)]" style={{ transform: "translateX(-50%)" }} src={`${BASE}/papernote-background.webp`} />
      <section
        className={`relative z-10 px-6 pb-8 pt-[74px] md:pt-[120px] [&_textarea]:h-[56px] md:[&_textarea]:h-[110px] [&_form]:max-w-[280px] md:[&_form]:max-w-[380px] ${wishes.length === 0 ? "[&>div:last-child]:mt-[60px] md:[&>div:last-child]:mt-0" : "[&>div:last-child]:mt-[max(60px,calc(109.3cqw-333px))] md:[&>div:last-child]:mt-[110px]"}`}
        style={{ color: "rgb(81, 20, 25)", fontFamily: '"Times New Roman", serif' }}
      >
        <div className="text-center">
          <h2 className="uppercase font-bold text-[20px] md:text-[24px] relative" style={{ margin: 0, transform: "translateY(16px)", color: "rgb(81, 20, 25)", fontFamily: '"Times New Roman", serif', fontWeight: 700, fontSize: 20, letterSpacing: "0.03em" }}>Sổ lưu bút</h2>
        </div>
        <form className="mt-6 mx-auto w-full max-w-full md:max-w-[600px]" onSubmit={(e) => { e.preventDefault(); onSend(); }}>
          <div className="rounded-[8px] p-4" style={{ background: "transparent" }}>
            <div className="mb-4">
              <input placeholder="Nhập tên*" className={field} style={fieldStyle} maxLength={500} required type="text" value={name} onChange={(e) => onName(e.target.value)} />
            </div>
            <textarea placeholder="Nhập lời chúc*" className={field} style={{ ...fieldStyle, resize: "none" }} rows={4} maxLength={10000} required value={msg} onChange={(e) => onMsg(e.target.value)} />
            <div className="flex items-center justify-between text-xs" style={{ marginTop: 5 }}>
              <div className="flex items-center text-xs space-x-1">
                <button type="button" className="p-2 rounded-lg text-base leading-none" title="Tạo lời chúc bằng AI" style={{ border: 0, cursor: "pointer", backgroundColor: "rgba(81, 20, 25, 0.1)", color: "rgb(81, 20, 25)" }}>🪄</button>
              </div>
              <button type="submit" className="rounded-full px-6 py-2 text-sm font-semibold text-white" style={{ border: 0, cursor: "pointer", backgroundColor: "rgb(81, 20, 25)", color: "rgb(222, 217, 215)", fontFamily: "inherit" }}>GỬI LỜI CHÚC</button>
            </div>
          </div>
        </form>
        <div className="mt-8 w-full max-h-[500px] space-y-3 overflow-y-auto pr-2 mx-auto max-w-full md:max-w-[600px]">
          {wishes.length === 0 && <p className="text-center text-sm opacity-70" style={{ margin: 0 }}>Chưa có lời chúc nào. Hãy là người đầu tiên!</p>}
          {wishes.map((w, i) => (
            <div key={i} className="rounded-[8px] border p-4 text-sm" style={{ border: "1px solid rgba(81, 20, 25, 0.333)", backgroundColor: "rgba(255, 255, 255, 0.55)", marginTop: i === 0 ? 0 : 12 }}>
              <div className="flex items-start justify-between">
                <span className="font-semibold" style={{ color: "rgb(81, 20, 25)" }}>{w.name}</span>
                <span className="text-xs opacity-70">{w.at}</span>
              </div>
              <p className="mt-2 leading-relaxed" style={{ margin: "8px 0 0" }}>{w.msg}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

/** Khung "Lịch trình ngày cưới" của Minimalism - Đỏ Đậm: giờ bên trái, mốc ở giữa, nội dung bên phải. */
export function DarkRedSchedule({ title, events }: { title: string; events: { time: string; text: string }[] }) {
  // Ba biểu tượng (máy ảnh, bánh, nồi) xếp dọc, căn giữa theo cả danh sách: số hoạt động lẻ thì nằm trên 3 hàng giữa,
  // số chẵn thì nằm giữa hai hàng (đúng như trang gốc).
  const icons = [`${BASE}/camera.webp`, `${BASE}/cake.webp`, `${BASE}/cook.webp`];
  const times = '"Times New Roman", serif';
  return (
    <section className="dr-sched relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span aria-hidden="true" className="pointer-events-none absolute block -right-[16%] -top-16 z-20 w-[30%] md:-top-3">
        <span className="block" style={{ animation: "drFloat 6s ease-in-out 0.3s infinite", willChange: "transform" }}>
          <img alt="" className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]" src={`${BASE}/flower2-decoration.webp`} />
        </span>
      </span>
      <div className="relative overflow-hidden rounded-[10px] pb-4 pt-10 text-center shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px]" style={{ backgroundColor: "rgb(81, 20, 25)" }} />
        <img alt="" aria-hidden="true" className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 rounded-[10px]" src={`${BASE}/paper.webp`} />
        <div className="relative z-10">
          <h2 className="uppercase text-center" style={{ margin: 0, color: cream, fontFamily: times, fontWeight: 700, letterSpacing: "0.03em", fontSize: 20, lineHeight: "22px" }}>
            <span>{title}</span>
          </h2>
          <div className="dr-sched-list relative mt-1 md:mt-0 px-8 md:px-[50px]" style={{ fontFamily: base, color: cream }}>
            {events.map((ev, i) => (
              <div key={i} className="relative flex items-center" style={{ height: ev.time ? "var(--p)" : "calc(var(--p) - var(--pe))" }}>
                <div className="flex min-w-0 flex-1 basis-0 items-center justify-end pr-8 md:pr-10">
                  <span className="inline-block pt-0.5 text-right tabular-nums tracking-wide leading-snug text-[16px] md:text-[17px] font-light" style={{ color: cream, fontFamily: times }}>{ev.time}</span>
                </div>
                <div className="relative flex w-0 shrink-0 items-center justify-center self-stretch">
                  {i < events.length - 1 && <span aria-hidden="true" className="absolute left-0 top-1/2 block w-px -translate-x-1/2" style={{ height: `calc(var(--p) - var(--pe) * ${((ev.time ? 0 : 1) + (events[i + 1].time ? 0 : 1)) / 2})`, backgroundColor: "rgba(236, 228, 216, 0.4)" }} />}
                  <span aria-hidden="true" className="relative block h-[10px] w-[10px] shrink-0 -translate-x-1/2 rounded-full" style={{ backgroundColor: cream }} />
                </div>
                <div className="min-w-0 flex-1 basis-0 pl-8 md:pl-10 text-left">
                  <span className="text-[13px] md:text-[15px] font-light" style={{ color: creamSoft, fontFamily: times }}>{ev.text}</span>
                </div>
              </div>
            ))}
            {icons.map((src, k) => (
              <img key={src} alt="" aria-hidden="true" src={src} className="pointer-events-none block object-contain"
                style={{ position: "absolute", left: "calc(50% - var(--ix))", top: `calc(var(--p) * ${events.length / 2 + k - 1} - 20px)`, width: 40, height: 40, maxWidth: "none" }} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
