import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Dress({ ctx }: { ctx: InvitationCtx }) {
  const { t, setRsvpOpen } = ctx;
  const isRed = (t.assets || "").includes("red");
  const isPink = (t.assets || "").includes("pink");

  const buttonBg = isRed ? "rgb(143, 38, 45)" : (t.buttonBg || (isPink ? "rgb(119, 110, 56)" : "rgb(70, 79, 30)"));
  const buttonText = t.buttonText || "rgb(222, 217, 215)";

  return (
    <div className="relative z-10 flex w-full flex-col items-center justify-center">
      <button
        type="button"
        onClick={() => setRsvpOpen?.(true)}
        className="inline-flex items-center justify-center rounded-full px-8 py-1.5 text-[13px] transition-transform hover:scale-[1.03]"
        style={{
          backgroundColor: buttonBg,
          color: buttonText,
          fontFamily: 'Roboto, "Helvetica Neue", Helvetica, Arial, ChungDoiIndic, sans-serif',
        }}
      >
        <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
          <span>XÁC NHẬN THAM DỰ</span>
        </span>
      </button>
    </div>
  );
}
