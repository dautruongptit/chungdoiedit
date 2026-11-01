import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="absolute bottom-2 left-0 right-0 z-20 flex items-center justify-center" style={{ fontFamily: "\"Palatino Linotype\", \"Book Antiqua\", Palatino, Georgia, ChungDoiIndic, serif", color: "rgb(84, 46, 8)" }}><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity !mt-0 text-[14px] opacity-70 md:text-[15px]" style={{ color: "rgb(84, 46, 8)" }}>♡ chungdoi.com</a></div>
  );
}
