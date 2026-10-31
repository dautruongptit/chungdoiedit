import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Footer({ ctx }: { ctx: InvitationCtx }) {
  const { d, t } = ctx;
  const anyD = d as any;
  const ink = t.ink || "rgb(210, 95, 101)";
  const edge = t.edge || "rgb(245, 196, 200)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";
  const text = anyD.thankText || anyD.thanksTitle || "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!";

  return (
    <footer className="relative mt-6 md:mt-8 flex flex-col items-center gap-3 px-6 md:px-10 pt-6 md:pt-8 pb-3 text-center z-10">
      <div
        className="rounded-2xl px-6 md:px-8 py-4 md:py-5 shadow-sm max-w-full md:max-w-[600px]"
        style={{
          backgroundColor: "rgba(245, 196, 200, 0.2)",
          border: `1px solid ${edge}`,
        }}
      >
        <span
          className="whitespace-pre-line flex flex-col items-center gap-1 text-sm md:text-lg leading-relaxed mx-auto md:max-w-[560px]"
          style={{
            color: ink,
            fontFamily: fontFam,
          }}
        >
          <span>{text}</span>
        </span>
      </div>
    </footer>
  );
}
