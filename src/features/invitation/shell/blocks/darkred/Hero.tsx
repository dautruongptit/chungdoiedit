import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, n1, n2, heroSrc, intro } = ctx;
  return (
    <header className="relative z-10 flex flex-col items-center overflow-x-clip px-9 pt-15 pb-14 text-center">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none object-contain opacity-[0.1] left-1/2 top-[26%] w-[170%] -translate-x-1/2"
        src={`${t.assets}/castle-background.webp`}
      />
      <p
        className="relative z-10 whitespace-pre-line text-[15px] uppercase md:text-[18px]"
        style={{
          fontFamily: '"Cormorant Garamond", "Times New Roman", ChungDoiIndic, serif',
          color: "rgb(89, 3, 16)",
          letterSpacing: "0.16em",
          fontWeight: 600,
        }}
      >
        {intro}
      </p>
      {d.heroOn && (
        <div className="relative z-10 mt-24 w-[82%] max-w-[330px] md:mt-28 md:max-w-[420px]">
          <div className="relative aspect-[333/384]">
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-10 w-full max-w-none"
              src={`${t.assets}/envelope-background.webp`}
            />
            <div
              className="absolute left-[33%] top-[-2%] z-20 w-[64%]"
              style={{
                animation: "drFloat 6.5s ease-in-out 0.4s infinite normal none running",
                willChange: "transform",
              }}
            >
              <div className="aspect-[221/309] rotate-[12deg] border-[7px] border-white bg-white shadow-[2px_2px_4px_rgba(0,0,0,0.25)] overflow-hidden">
                <img
                  alt=""
                  className="h-full w-full object-cover"
                  src={heroSrc}
                  style={{
                    objectPosition: `${d.heroX}% ${d.heroY}%`,
                    transform: `scale(${d.heroZoom})`,
                    transformOrigin: `${d.heroX}% ${d.heroY}%`,
                  }}
                />
              </div>
            </div>
            <span
              aria-hidden="true"
              className="pointer-events-none absolute block -left-[2%] -top-[12%] z-[25] w-[42%]"
            >
              <span
                className="block"
                style={{
                  animation: "drFloat 5s ease-in-out 0s infinite normal none running",
                  willChange: "transform",
                }}
              >
                <img
                  alt=""
                  className="block w-full max-w-none object-contain drop-shadow-[3px_4px_3px_rgba(0,0,0,0.3)] rotate-[-17deg]"
                  src={`${t.assets}/flower2-decoration.webp`}
                />
              </span>
            </span>
            <img
              alt=""
              aria-hidden="true"
              className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none"
              src={`${t.assets}/envelope-cover.webp`}
            />
          </div>
        </div>
      )}
      <div className="relative z-10 mt-16 flex flex-col items-center gap-[22px] md:mt-20">
        <p
          className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]"
          style={{
            fontFamily: '"Viaoda Libre", "The Nautigal", ChungDoiIndic, cursive',
            color: t.ink,
          }}
        >
          {n1}
        </p>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-[37%] -translate-y-1/2 translate-x-[0px] text-[92px] leading-none md:text-[120px]"
          style={{
            fontFamily: '"The Nautigal", ChungDoiIndic, cursive',
            color: "rgba(81, 20, 25, 0.15)",
          }}
        >
          &amp;
        </span>
        <p
          className="text-[clamp(38px,11vw,46px)] leading-none md:text-[58px]"
          style={{
            fontFamily: '"Viaoda Libre", "The Nautigal", ChungDoiIndic, cursive',
            color: t.ink,
          }}
        >
          {n2}
        </p>
      </div>
    </header>
  );
}
