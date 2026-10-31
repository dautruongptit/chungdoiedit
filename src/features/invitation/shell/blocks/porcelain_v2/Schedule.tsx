import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Schedule({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const assets = t.assets || "/images/themes/porcelain-v2-green";
  const isRed = assets.includes("red");
  const isPink = assets.includes("pink");

  const textColor = t.ink || (isRed ? "rgb(143, 38, 45)" : isPink ? "rgb(220, 133, 153)" : "rgb(70, 79, 30)");
  const accentColor = t.accent || (isRed ? "rgb(101, 78, 47)" : isPink ? "rgb(119, 110, 56)" : "rgb(188, 155, 99)");
  const cardBg = isRed ? "rgb(254, 250, 240)" : "rgb(253, 249, 240)";

  const dotShadow = `color-mix(in srgb, ${textColor} 13%, transparent 87%) 0px 0px 0px 2px`;

  // Flower styling for Schedule section
  let flowerStyle: React.CSSProperties = {
    left: "87.4%",
    top: "-0.5%",
    width: "41.8%",
    aspectRatio: "124.245 / 256",
    transform: "scaleX(-1)",
  };
  if (isRed) {
    flowerStyle = {
      left: "85.8%",
      top: "11.9%",
      width: "147.5px",
      height: "196.7px",
    };
  } else if (isPink) {
    flowerStyle = {
      left: "270px",
      top: "-17.8px",
      width: "145.3px",
      height: "279.7px",
      transform: "scaleX(-1)",
    };
  }

  // Icons per theme
  const icon1 = `${assets}/ring.webp`;
  const icon2 = isRed ? `${assets}/cake.webp` : isPink ? `${assets}/bird.webp` : `${assets}/alcohol.webp`;
  const icon3 = isRed ? `${assets}/lamp.webp` : isPink ? `${assets}/bell.webp` : `${assets}/heart.webp`;

  const timelineEvents = anyD.timelineEvents || [
    { time: "17:00", title: "Đón khách" },
    { time: "18:00", title: "Khai tiệc", icon: icon1, iconSize: isRed ? "h-[35px] w-[35px]" : isPink ? "w-[40px] h-[45px]" : "size-[40px]" },
    { time: "18:45", title: "Rót rượu, cắt bánh", icon: icon2, iconSize: isRed ? "h-[52px] w-[34px]" : isPink ? "w-[40px] h-[45px]" : "size-[43px]" },
    { time: "19:30", title: "Phục vụ món chính", icon: icon3, iconSize: isRed ? "h-[43px] w-[39px]" : isPink ? "w-[40px] h-[45px]" : "size-[40px]" },
    { time: "21:30", title: "Kết thúc tiệc" },
  ];

  return (
    <section
      className="relative isolate mx-auto w-[83%] max-w-[420px] border-[1.5px] md:max-w-[560px] "
      style={{
        backgroundColor: cardBg,
        borderColor: isPink ? accentColor : textColor,
        borderRadius: "10px",
        boxShadow: "rgba(0, 0, 0, 0.25) 4px 4px 2px",
      }}
    >
      <div className={`relative z-10 flex w-full flex-col gap-[13px] ${isRed ? "px-[44.3px]" : "px-6"} py-9 md:py-11`}>
        <h2
          className="uppercase text-center text-[20px] md:text-[24px]"
          style={{
            color: textColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: "700",
            whiteSpace: isRed ? "pre-line" : "normal",
          }}
        >
          <span>{isRed ? "LỊCH TRÌNH\nNGÀY CƯỚI" : "LỊCH TRÌNH NGÀY\u00A0CƯỚI"}</span>
        </h2>

        <ol
          className="relative mx-auto grid w-full max-w-[460px] grid-cols-[minmax(0,1fr)_16px_minmax(0,1fr)] items-center gap-x-6 md:gap-x-8 gap-y-8 md:gap-y-10"
          style={{ fontFamily: '"Times New Roman", ChungDoiIndic, serif' }}
        >
          {timelineEvents.map((evt: any, idx: number) => {
            const isFirst = idx === 0;
            const isLast = idx === timelineEvents.length - 1;
            const hasIcon = !!evt.icon;
            const sizeClass = evt.iconSize || "size-[40px]";

            return (
              <li key={idx} className="contents">
                <span
                  className="pt-0.5 text-right text-[16px] md:text-[17px] tabular-nums tracking-wide leading-snug"
                  style={{
                    color: accentColor,
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  {hasIcon ? (
                    <span className="relative inline-block">
                      <span
                        aria-hidden="true"
                        className="absolute top-1/2 flex w-max items-center justify-center -translate-y-1/2 right-full"
                        style={{ marginRight: "30px" }}
                      >
                        <img
                          alt=""
                          aria-hidden="true"
                          className={`block ${sizeClass} shrink-0 object-contain`}
                          src={evt.icon}
                        />
                      </span>
                      {evt.time}
                    </span>
                  ) : (
                    evt.time
                  )}
                </span>

                <span aria-hidden="true" className="relative flex items-center justify-center self-stretch">
                  {isFirst && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-px top-1/2 -bottom-8 md:-bottom-10"
                      style={{ backgroundColor: textColor }}
                    />
                  )}
                  {!isFirst && !isLast && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-px -top-8 md:-top-10 -bottom-8 md:-bottom-10"
                      style={{ backgroundColor: textColor }}
                    />
                  )}
                  {isLast && (
                    <span
                      className="absolute left-1/2 -translate-x-1/2 w-px -top-8 md:-top-10 bottom-1/2"
                      style={{ backgroundColor: textColor }}
                    />
                  )}
                  <span
                    className="relative block h-2.5 w-2.5 rounded-full"
                    style={{
                      backgroundColor: textColor,
                      boxShadow: dotShadow,
                    }}
                  />
                </span>

                <span
                  className="pt-0.5 text-[13px] md:text-[15px] leading-snug text-start"
                  style={{
                    color: accentColor,
                    fontFamily: '"Times New Roman", ChungDoiIndic, serif',
                  }}
                >
                  <span>{evt.title}</span>
                </span>
              </li>
            );
          })}
        </ol>
      </div>

      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute h-auto max-w-none z-[2]"
        src={`${assets}/flower.webp`}
        style={flowerStyle}
      />
    </section>
  );
}
