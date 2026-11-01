import type { BlockComponent } from "../index";
import { Hero } from "./Hero";
import { TopDecor } from "./TopDecor";
import { CeremonyTitle } from "./CeremonyTitle";
import { Family } from "./Family";
import { MidDecor } from "./MidDecor";
import { Album } from "./Album";
import { BanquetTitle } from "./BanquetTitle";
import { Banquet } from "./Banquet";
import { Rsvp } from "./Rsvp";
import { VenueDecor } from "./VenueDecor";
import { Venue } from "./Venue";
import { Dresscode } from "./Dresscode";
import { Schedule } from "./Schedule";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { Footer } from "./Footer";
import { Credit } from "./Credit";
import { Lightbox } from "./Lightbox";

export const BOHO_FLORAL_BLOCKS: Record<string, BlockComponent> = {
  hero: Hero,
  Hero,
  topDecor: TopDecor,
  TopDecor,
  ceremonyTitle: CeremonyTitle,
  CeremonyTitle,
  family: Family,
  Family,
  midDecor: MidDecor,
  MidDecor,
  album: Album,
  Album,
  banquetTitle: BanquetTitle,
  BanquetTitle,
  banquet: Banquet,
  Banquet,
  rsvp: Rsvp,
  Rsvp,
  venueDecor: VenueDecor,
  VenueDecor,
  venue: Venue,
  Venue,
  dresscode: Dresscode,
  Dresscode,
  schedule: Schedule,
  Schedule,
  guestbook: Guestbook,
  Guestbook,
  gifts: Gifts,
  Gifts,
  footer: Footer,
  Footer,
  credit: Credit,
  Credit,
  lightbox: Lightbox,
  Lightbox,
};
