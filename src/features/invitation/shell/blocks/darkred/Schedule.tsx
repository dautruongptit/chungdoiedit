import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { formatTime } from "@/utils/date";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  if (!d.schedOn || !d.sched || d.sched.length === 0) return null;

  const icons = [
    `${t.assets}/camera.webp`,
    `${t.assets}/cake.webp`,
    `${t.assets}/cook.webp`,
  ];

  return (
    <section className="relative z-10 mx-auto my-4 w-[88%] max-w-[420px] md:max-w-[560px]">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute block -right-[16%] -top-[12%] z-20 w-[30%]"
        style={{ willChange: "transform", transform: "translateY(40px)" }}
      >
        <span
          className="block"
          style={{ animation: "5.2s ease-in-out 0.9s infinite normal none running drFloat", willChange: "transform" }}
        >
          <img
            alt=""
            className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)]"
            src={`${t.assets}/flower2-decoration.webp`}
          />
        </span>
      </span>

      <div className="relative overflow-hidden rounded-[10px] px-6 py-9 shadow-[4px_4px_10px_rgba(0,0,0,0.25)]">
        <div aria-hidden="true" className="absolute inset-0 rounded-[10px]" style={{ backgroundColor: "rgb(81, 20, 25)" }} />
        <img
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 size-full max-w-none object-cover mix-blend-multiply opacity-40 rounded-[10px]"
          src={`${t.assets}/paper.webp`}
        />

        <div className="relative z-10 flex flex-col gap-4 px-2">
          <h2
            className="uppercase text-center text-[20px]"
            style={{
              color: "rgb(236, 228, 216)",
              fontFamily: '"Times New Roman", ChungDoiIndic, serif',
              fontWeight: 700,
              letterSpacing: "0.03em",
            }}
          >
            <span>{d.schedTitle || "LỊCH TRÌNH NGÀY\u00a0CƯỚI"}</span>
          </h2>

          <ol
            className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
            style={{ fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
          >
            {d.sched.map((ev, i) => {
              const iconIdx = i >= 1 && i <= 3 ? i - 1 : -1;
              const isFirst = i === 0;
              const isLast = i === d.sched.length - 1;
              return (
                <li key={i} className="contents">
                  <span
                    className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                    style={{ color: "rgb(236, 228, 216)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
                  >
                    {iconIdx >= 0 ? (
                      <span className="relative inline-block">
                        <span
                          aria-hidden="true"
                          className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full"
                          style={{ marginRight: "30px" }}
                        >
                          <img
                            alt=""
                            aria-hidden="true"
                            className="block h-10 w-10 shrink-0 object-contain"
                            src={icons[iconIdx]}
                          />
                        </span>
                        {formatTime(ev.time)}
                      </span>
                    ) : (
                      formatTime(ev.time)
                    )}
                  </span>

                  <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                    <span
                      className={`absolute left-1/2 -translate-x-1/2 w-px ${isFirst ? "top-1/2 -bottom-8 md:-bottom-10" : isLast ? "-top-8 md:-top-10 bottom-1/2" : "-top-8 md:-top-10 -bottom-8 md:-bottom-10"}`}
                      style={{ backgroundColor: "color-mix(in srgb, rgb(236, 228, 216) 40%, transparent 60%)" }}
                    />
                    <span
                      className="relative block h-2.5 w-2.5 rounded-full"
                      style={{
                        backgroundColor: "rgb(236, 228, 216)",
                        boxShadow: "color-mix(in srgb, rgb(236, 228, 216) 13%, transparent 87%) 0px 0px 0px 2px",
                      }}
                    />
                  </span>

                  <span
                    className="text-[13px] md:text-[15px]"
                    style={{ color: "rgba(236, 228, 216, 0.7)", fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
                  >
                    <span>{ev.text}</span>
                  </span>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
