import type { BlockComponent } from "../index";
import { Paper } from "./Paper";
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
import { Lightbox } from "./Lightbox";

/** Khối bố cục họ "darkred" (Minimalism - Đỏ Đậm). */
export const DARKRED_BLOCKS: Record<string, BlockComponent> = {
  Paper,
  Hero,
  Family,
  Album,
  Banquet,
  Venue,
  Dress,
  Schedule,
  Guestbook,
  Gifts,
  Thanks,
  Credit,
  Lightbox,
};
