import { isLightColor } from "@/features/invitation/shell/useInvitationCtx";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  return (
    d.dressOn && (<div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 "><div className="flex flex-col items-center gap-1"><h2 className="uppercase font-normal text-[20px] md:text-[26px] text-center" style={{"color":t.ink,"fontFamily":"\"Times New Roman\", serif","fontWeight":"700","fontSize":"20px","letterSpacing":"0.03em"}}><span dir="auto">{d.dressTitle || "DRESS CODE"}</span></h2><p className="whitespace-pre-line text-sm md:text-base text-center" style={{"color":t.sub,"fontFamily":"\"Times New Roman\", serif"}}><span dir="auto">{d.dressText}</span></p></div><div className="flex flex-wrap justify-center gap-4 md:gap-6">{d.dressColors.map((c, i) => (<div key={i} className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: c, ...(isLightColor(c) ? { border: `1.5px solid rgba(${t.inkRgb}, 0.19)` } : {}) }}></div>))}</div></div>)
  );
}
