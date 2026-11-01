import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative z-10 flex flex-col items-center gap-5 px-6 md:px-10 py-10 md:py-12 "><div className="flex flex-col items-center gap-1"><h2 className="font-bold text-[20px] md:text-[26px] text-center uppercase tracking-[0.04em]" style={{ color: "rgb(158, 117, 60)", fontFamily: "&quot;Times New Roman&quot;, Times, ChungDoiIndic, serif", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.04em" }}><span>DRESS CODE</span></h2></div><div className="flex flex-wrap justify-center gap-4 md:gap-6"><div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: "rgb(0, 0, 0)", borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none" }}></div><div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: "rgb(255, 255, 255)", border: "1.5px solid rgba(158, 117, 60, 0.19)" }}></div><div className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md" style={{ backgroundColor: "rgb(216, 195, 165)", borderWidth: "medium", borderStyle: "none", borderColor: "currentcolor", borderImage: "none" }}></div></div></div>
  );
}
