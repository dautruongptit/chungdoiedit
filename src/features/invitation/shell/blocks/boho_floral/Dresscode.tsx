import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Dresscode({ ctx }: { ctx: InvitationCtx }) {
  const theme = getBohoFloralTheme(ctx);

  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 ">
      <div className="flex flex-col items-center gap-1">
        <h2
          className="uppercase font-normal text-[20px] md:text-[24px] text-center"
          style={{
            color: theme.primaryColor,
            fontFamily: '"Times New Roman", ChungDoiIndic, serif',
            fontWeight: 700,
            letterSpacing: "1px",
          }}
        >
          <span dir="auto">DRESS CODE</span>
        </h2>
        <p
          className="whitespace-pre-line text-sm md:text-base text-center opacity-70"
          style={{
            color: theme.primaryColor,
            fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif',
          }}
        >
          <span dir="auto">Trang phục dự tiệc</span>
        </p>
      </div>
      <div className="flex flex-wrap justify-center gap-4 md:gap-6">
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: theme.dresscodeColors[0],
            borderWidth: "medium",
            borderStyle: "none",
            borderColor: "currentcolor",
            borderImage: "none",
          }}
        />
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: theme.dresscodeColors[1],
            borderWidth: "medium",
            borderStyle: "none",
            borderColor: "currentcolor",
            borderImage: "none",
          }}
        />
        <div
          className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md"
          style={{
            backgroundColor: theme.dresscodeColors[2],
            border: theme.dresscodeBorder,
          }}
        />
      </div>
    </div>
  );
}
