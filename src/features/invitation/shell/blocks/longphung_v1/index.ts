import type { BlockComponent } from "../index";
import { Paper } from "./Paper";
import { Hero } from "./Hero";
import { Album } from "./Album";
import { Family } from "./Family";
import { Venue } from "./Venue";
import { Dress } from "./Dress";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { Footer } from "./Footer";
import { Lightbox } from "./Lightbox";

/** Khối bố cục họ "longphung_v1" (Long Phụng Đỏ, Lam, Xanh, Huyền). */
export const LONGPHUNG_V1_BLOCKS: Record<string, BlockComponent> = {
  Paper,
  Hero,
  Album,
  Family,
  Venue,
  Dress,
  Schedule,
  Guestbook,
  Gifts,
  Footer,
  Lightbox,
};
