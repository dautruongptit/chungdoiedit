import type { BlockComponent } from "../index";
import { Paper } from "./Paper";
import { Hero } from "./Hero";
import { Family } from "./Family";
import { Album } from "./Album";
import { LineDecoration } from "./LineDecoration";
import { Banquet } from "./Banquet";
import { RsvpBridge } from "./RsvpBridge";
import { Venue } from "./Venue";
import { Dress } from "./Dress";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { Thanks } from "./Thanks";
import { Stone } from "./Stone";
import { Credit } from "./Credit";
import { Lightbox } from "./Lightbox";

/** Khối bố cục họ "riviera" (tranh màu nước làng bên hồ). */
export const RIVIERA_BLOCKS: Record<string, BlockComponent> = {
  Paper, Hero, Family, Album, LineDecoration, Banquet, RsvpBridge, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, Stone, Credit, Lightbox,
};
