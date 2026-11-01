import type { BlockComponent } from "../index";
import { Paper } from "./Paper";
import { Hero } from "./Hero";
import { Ceremony } from "./Ceremony";
import { Album } from "./Album";
import { Banquet } from "./Banquet";
import { RsvpAction } from "./RsvpAction";
import { Venue } from "./Venue";
import { DressCode } from "./DressCode";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { ThankYou } from "./ThankYou";
import { Footer } from "./Footer";
import { BottomDecor } from "./BottomDecor";
import { Lightbox } from "./Lightbox";

export const BAROQUE_V2_BLOCKS: Record<string, BlockComponent> = {
  Paper,
  Hero,
  Ceremony,
  Album,
  Banquet,
  RsvpAction,
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
