import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme, str } from "./themeVars";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);
  const d = ctx.d as any;

  const groomName = str(d.groomShortName, ctx.gName || "Gia Bảo");
  const brideName = str(d.brideShortName, ctx.bName || "Ngọc Diệp");
  const photo = d.heroPhoto || ctx.heroSrc || "https://assets.chungdoi.com/photo-library/design/bb1f9bfe41533c4f8929fa6d604c1d82d08c49c4b49d25bd004fad6e0df57830.webp";

  return (
    <header className={`relative isolate flex w-full flex-col items-center ${theme.hero.paddingClass}`}>
      <p
        className="relative z-20 whitespace-pre-line text-center text-[13px] uppercase md:text-[15px]"
        style={{
          fontFamily: '"Playfair Display", "Times New Roman", ChungDoiIndic, serif',
          fontWeight: 600,
          color: theme.goldColor,
          letterSpacing: "0.14em",
        }}
      >
        Save The Date
      </p>

      <div className={`relative ${theme.hero.frameWrapperClass}`}>
        <div className="relative mx-auto w-full" style={{ aspectRatio: theme.hero.frameAspect }}>
          <div className="absolute overflow-hidden" style={theme.hero.photoStyle}>
            <img alt="" className="h-full w-full object-cover" src={photo} />
          </div>
          <img
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 h-full w-full max-w-none object-fill"
            loading="eager"
            decoding="async"
            src={theme.frameImage}
          />
        </div>
      </div>

      <div className={`relative flex w-full max-w-[340px] flex-col items-center gap-[19px] px-4 text-center md:max-w-[440px] ${theme.hero.namesMarginClass}`}>
        <span
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 text-[100px] leading-none md:text-[118px]"
          style={{
            fontFamily: '"The Nautigal", ChungDoiIndic, cursive',
            color: "rgba(255, 239, 214, 0.2)",
            transform: "translate(-50%, calc(-50% - 0.16em))",
          }}
        >
          &amp;
        </span>
        <div className="relative z-10 flex w-full justify-center">
          <span
            className="whitespace-nowrap uppercase leading-none"
            style={{
              fontFamily: theme.hero.namesFont,
              color: theme.goldColor,
              fontSize: theme.hero.namesSize,
            }}
          >
            {groomName}
          </span>
        </div>
        <div className="relative z-10 flex w-full justify-center">
          <span
            className="whitespace-nowrap uppercase leading-none"
            style={{
              fontFamily: theme.hero.namesFont,
              color: theme.goldColor,
              fontSize: theme.hero.namesSize,
            }}
          >
            {brideName}
          </span>
        </div>
      </div>
    </header>
  );
}
