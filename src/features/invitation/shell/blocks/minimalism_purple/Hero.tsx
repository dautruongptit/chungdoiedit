import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const d = ctx.d;
  const groomName = d.groomNick || "Quốc Bảo";
  const brideName = d.brideNick || "Diệu Linh";
  const heroPhoto = ctx.heroSrc || "https://assets.chungdoi.com/photo-library/design/f9fa4856eabe1fdbef93ea3149f595d5b0b0a61400cdf1ebde7248c8a2eac441.webp";

  return (
    <header className="relative isolate z-10 flex flex-col items-center overflow-x-clip px-8 pt-[63px] pb-[75px] text-center">
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute -z-10 left-[3.9%] top-[1.6%] w-[86.6%] max-w-none object-contain opacity-[0.05]"
        src="/images/themes/minimalism-purple/flower-decoration.webp"
      />
      <img
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute max-w-none object-contain opacity-20 -z-10 left-[-6.6%] top-[56.9%] w-[128.1%]"
        src="/images/themes/minimalism-purple/house-background.webp"
      />
      <p
        className="relative z-20 w-full whitespace-pre-line text-[15px] uppercase md:text-[17px]"
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", ChungDoiIndic, serif',
          color: "rgb(120, 122, 108)",
          letterSpacing: "0.14em",
          fontWeight: 600,
          paddingLeft: "36%",
        }}
      >
        Save The Date
      </p>
      <div className="relative z-10 mt-[138px] w-[75%] max-w-[283px] md:mt-[150px] md:max-w-[360px]">
        <div className="relative aspect-[283/327]">
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 z-10 w-full max-w-none"
            src="/images/themes/minimalism-purple/envelope-background.webp"
          />
          <div
            className="absolute left-[39.1%] top-[33.9%] z-20 w-[69.3%] -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "6.5s ease-in-out 0.4s infinite normal none running mpFloat",
              willChange: "transform",
            }}
          >
            <div className="aspect-[196/253] rotate-[-12.31deg] border-[5px] border-white bg-white shadow-[4px_4px_4px_rgba(0,0,0,0.25)]">
              <img
                alt=""
                className="h-full w-full object-cover"
                src={heroPhoto}
              />
            </div>
          </div>
          <span
            aria-hidden="true"
            className="pointer-events-none absolute left-[68%] top-[43.3%] z-[25] block w-[79.7%] max-w-none -translate-x-1/2 -translate-y-1/2"
            style={{
              animation: "5s ease-in-out 0.9s infinite normal none running mpFloat",
              willChange: "transform",
            }}
          >
            <img
              alt=""
              className="block w-full max-w-none rotate-[-80deg] object-contain"
              src="/images/themes/minimalism-purple/flower3-decoration.webp"
            />
          </span>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute bottom-0 left-0 z-30 w-full max-w-none"
            src="/images/themes/minimalism-purple/envelope-cover.webp"
          />
        </div>
      </div>
      <div className="relative z-10 mt-[85px] flex w-full flex-col items-center gap-[19px] md:mt-[95px]">
        <p
          className="text-[clamp(34px,10.2vw,45px)] uppercase leading-none md:text-[56px]"
          style={{
            fontFamily: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, serif',
            color: "rgb(120, 105, 160)",
          }}
        >
          {groomName}
        </p>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-[-4px] -translate-x-1/2 text-[100px] leading-none md:text-[124px]"
          style={{
            fontFamily: '"The Nautigal", ChungDoiIndic, cursive',
            color: "rgba(120, 105, 160, 0.15)",
          }}
        >
          &amp;
        </span>
        <p
          className="text-[clamp(34px,10.2vw,45px)] uppercase leading-none md:text-[56px]"
          style={{
            fontFamily: '"Viaoda Libre", "EB Garamond", ChungDoiIndic, serif',
            color: "rgb(120, 105, 160)",
          }}
        >
          {brideName}
        </p>
      </div>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute block left-[-10%] top-[-3%] md:top-[-10%] z-[1] w-[65%]"
      >
        <img
          alt=""
          className="block w-full max-w-none object-contain"
          src="/images/themes/minimalism-purple/flower1-decoration.webp"
        />
      </span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute block left-[62%] top-[49.5%] md:top-[18%] z-[1] w-[55%]"
      >
        <img
          alt=""
          className="block w-full max-w-none object-contain"
          src="/images/themes/minimalism-purple/flower-decoration.webp"
          style={{ transform: "rotate(30deg) scale(1, -1)" }}
        />
      </span>
    </header>
  );
}
