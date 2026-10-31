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
import { Footer } from "./Footer";

/** Khối bố cục họ "traditional" (Long Phụng V4 và các mẫu cổ điển cùng bố cục). */
export const TRADITIONAL_BLOCKS: Record<string, BlockComponent> = {
  Paper, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Footer,
};
