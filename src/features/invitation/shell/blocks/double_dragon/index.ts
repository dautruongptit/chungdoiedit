import type { BlockComponent } from "../index";
import { HeaderDecor } from "./HeaderDecor";
import { Hero } from "./Hero";
import { CeremonyTitle } from "./CeremonyTitle";
import { Family } from "./Family";
import { AlbumTitle } from "./AlbumTitle";
import { Album } from "./Album";
import { BanquetTitle } from "./BanquetTitle";
import { Banquet } from "./Banquet";
import { Venue } from "./Venue";
import { DressSchedule } from "./DressSchedule";
import { GuestbookTitle } from "./GuestbookTitle";
import { Guestbook } from "./Guestbook";
import { Gifts } from "./Gifts";
import { FooterDecor } from "./FooterDecor";
import { Footer } from "./Footer";

export const DOUBLE_DRAGON_BLOCKS: Record<string, BlockComponent> = {
  headerDecor: HeaderDecor,
  HeaderDecor,
  hero: Hero,
  Hero,
  ceremonyTitle: CeremonyTitle,
  CeremonyTitle,
  family: Family,
  Family,
  albumTitle: AlbumTitle,
  AlbumTitle,
  album: Album,
  Album,
  banquetTitle: BanquetTitle,
  BanquetTitle,
  banquet: Banquet,
  Banquet,
  venue: Venue,
  Venue,
  dressSchedule: DressSchedule,
  DressSchedule,
  guestbookTitle: GuestbookTitle,
  GuestbookTitle,
  guestbook: Guestbook,
  Guestbook,
  gifts: Gifts,
  Gifts,
  footerDecor: FooterDecor,
  FooterDecor,
  footer: Footer,
  Footer,
};
