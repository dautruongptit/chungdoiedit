import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Credit({ ctx }: { ctx: InvitationCtx }) {
  return (
    <div className="relative flex justify-center -mb-5 md:-mb-7 md:top-[40px]"><img alt="" aria-hidden="true" className="h-auto w-[140%] max-w-none object-contain" src="/images/themes/brocade-flower-red/dai-hoa.webp" style={{ aspectRatio: "1536 / 296" }} /><a href="https://chungdoi.com" target="_blank" rel="noopener noreferrer" className="text-xs opacity-50 hover:opacity-70 transition-opacity absolute left-1/2 -translate-x-1/2 top-[24%] z-10" style={{ color: "rgb(60, 77, 32)" }}>♡ chungdoi.com</a></div>
  );
}
