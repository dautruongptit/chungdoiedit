import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getDoubleDragonTheme } from "./themeVars";

export function HeaderDecor({ ctx }: { ctx: InvitationCtx }) {
  const theme = getDoubleDragonTheme(ctx);

  return (
    <>
      <style>{`
        :root, .classic-template {
          --color-z-red: 136 41 37;
          --color-z-linen: 236 223 214;
          --color-z-green: 31 58 37;
          --color-z-linen2: 236 232 214;
          --color-z-blue: 37 63 120;
          --color-z-white3: 232 236 214;
          --color-z-gray: 70 70 70;
        }
        .classic-template .font-body-sans {
          font-family: Roboto, "Helvetica Neue", sans-serif !important;
        }
        .classic-template .font-eb-garamond {
          font-family: "EB Garamond", serif !important;
        }
        .classic-template h3.font-eb-garamond {
          font-weight: 400 !important;
        }
      `}</style>
      <div
        className="relative w-full h-12 sm:h-16 md:h-[128px]"
        style={{ backgroundColor: `rgb(var(${theme.primaryVar}))` }}
      >
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage: `url("${theme.patternUrl}")`,
            backgroundSize: "clamp(300px, 50vw, 500px) auto",
          }}
        />
      </div>
    </>
  );
}
