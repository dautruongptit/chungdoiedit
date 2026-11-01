import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBaroqueV2Theme } from "./themeVars";

export function DressCode({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBaroqueV2Theme(ctx);

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase text-center relative z-10 text-[20px] md:text-[24px]"
          style={{
            color: theme.goldColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
          }}
        >
          <span dir="auto">DRESS CODE</span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center"
          style={{
            color: theme.textColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">Trang phục dự tiệc</span>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: "rgb(0, 0, 0)",
            borderWidth: "medium",
            borderStyle: "none",
            borderColor: "currentcolor",
            borderImage: "none",
          }}
        />
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: "rgb(255, 223, 175)",
            border: "1.5px solid rgba(255, 223, 175, 0.19)",
          }}
        />
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: "rgb(255, 255, 255)",
            border: "1.5px solid rgba(255, 223, 175, 0.19)",
          }}
        />
      </div>
    </div>
  );
}
