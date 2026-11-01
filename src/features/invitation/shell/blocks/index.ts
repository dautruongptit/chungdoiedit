import type { ComponentType } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { Backdrop } from "./Backdrop";
import { Hero } from "./Hero";
import { Family } from "./Family";
import { Album } from "./Album";
import { Banquet } from "./Banquet";
import { Venue } from "./Venue";
import { Dress } from "./Dress";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { Thanks } from "./Thanks";
import { Credit } from "./Credit";
import { RsvpDialogHost } from "./RsvpDialogHost";
import { Lightbox } from "./Lightbox";
import { RIVIERA_BLOCKS } from "./riviera";
import { TRADITIONAL_BLOCKS } from "./traditional";
import { DARKRED_BLOCKS } from "./darkred";
import { LONGPHUNG_V1_BLOCKS } from "./longphung_v1";
import { SPRINGGARDEN_V1_BLOCKS } from "./springgarden_v1";
import { PORCELAIN_V2_BLOCKS } from "./porcelain_v2";
import { DOUBLE_DRAGON_BLOCKS } from "./double_dragon";

export type BlockComponent = ComponentType<{ ctx: InvitationCtx }>;

/** Khối bố cục họ "minimalism". `capabilities.json#blocks` quyết định khối nào được vẽ và theo thứ tự nào. */
export const MINIMALISM_BLOCKS: Record<string, BlockComponent> = {
  Backdrop, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, Credit, RsvpDialogHost, Lightbox,
};

/** Khối dùng chung mọi họ bố cục */
export const COMMON_BLOCKS: Record<string, BlockComponent> = { Credit, RsvpDialogHost };

/** Họ bố cục -> bản đồ khối; `capabilities.family` chọn bản đồ, `capabilities.blocks` chọn khối & thứ tự. */
export const blocksForFamily = (family: string): Record<string, BlockComponent> =>
  ({
    ...COMMON_BLOCKS,
    ...(family === "riviera"
      ? RIVIERA_BLOCKS
      : family === "traditional"
      ? TRADITIONAL_BLOCKS
      : family === "darkred"
      ? DARKRED_BLOCKS
      : family === "longphung_v1"
      ? LONGPHUNG_V1_BLOCKS
      : family === "springgarden_v1"
      ? SPRINGGARDEN_V1_BLOCKS
      : family === "porcelain_v2"
      ? PORCELAIN_V2_BLOCKS
      : family === "double_dragon"
      ? DOUBLE_DRAGON_BLOCKS
      : MINIMALISM_BLOCKS),
  });
