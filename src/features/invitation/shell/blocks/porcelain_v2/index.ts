import type { BlockComponent } from "../index";
import { Paper } from "./Paper";
import { Hero } from "./Hero";
import { Family } from "./Family";
import { Album } from "./Album";
import { Banquet } from "./Banquet";
import { Dress } from "./Dress";
import { Venue } from "./Venue";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Lightbox } from "./Lightbox";

/** Khối bố cục họ "porcelain_v2" (Bạch Sứ V2: Xanh, Đỏ, Hồng). */
export const PORCELAIN_V2_BLOCKS: Record<string, BlockComponent> = {
  Paper,
  Hero,
  Family,
  Album,
  Banquet,
  Dress,
  Venue,
  Schedule,
  Guestbook,
  Lightbox,
};
