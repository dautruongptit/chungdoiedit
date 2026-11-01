import type { BlockComponent } from "../index";
import { TopDecor } from "./TopDecor";
import { WatermarkStyle, Watermark } from "./Watermark";
import { Hero } from "./Hero";
import { Ceremony } from "./Ceremony";
import { Venue } from "./Venue";
import { DressCode } from "./DressCode";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { ThankYou } from "./ThankYou";
import { Footer } from "./Footer";
import { BottomDecor } from "./BottomDecor";
import { Lightbox } from "./Lightbox";

export const CRYSTAL_FLORAL_BLOCKS: Record<string, BlockComponent> = {
  TopDecor,
  WatermarkStyle,
  Watermark,
  Hero,
  Ceremony,
  Venue,
  DressCode,
  Schedule,
  Guestbook,
  Gifts,
  ThankYou,
  Footer,
  BottomDecor,
  Lightbox,
};
