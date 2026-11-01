/**
 * Registry màn hình Mở thiệp (Cover Screen) cho toàn bộ 75 mẫu thiệp.
 * Không dùng điều kiện rải rác trong Preview.tsx.
 */
import React from "react";
import type { CoverProps } from "./types";
import {
  BaroquePorcelainCover,
  FloralBouquetCover,
  MinimalismCover,
  PorcelainTileCover,
  ArchitecturalCover,
  TraditionalRoyalCover,
  GlassGardenCover,
  TraditionalV2Cover,
  SongHyClassicCover,
  SongLongCover,
  SongHacCover,
  ChibiCover,
  CoBaCover,
  LongPhungV2BesCover,
  LongPhungClassicCover,
  LongPhungImperialCover,
  RoyalGoldCover,
  WildflowerCover,
  MinimalismRedCover,
  ThanhDiepCover,
  AnhDaoCover,
  HoaMocNauCover,
  VuonXuanLamCover,
  HoaKhoV2LamCover,
  HoaKhoV2XanhCover,
  BaroqueLamCover,
} from "./SignatureCovers";
import { HoaTinhDoCover } from "./HoaTinhDoCover";
import { SongLongDoCover } from "./SongLongDoCover";
import { HoangKimLamCover } from "./HoangKimLamCover";
import { ChibiRedCover } from "./ChibiRedCover";
import { BachSuDoCover } from "./BachSuDoCover";
import { HoaMocXanhCover } from "./HoaMocXanhCover";

export const COVER_REGISTRY: Record<string, React.ComponentType<CoverProps>> = {
  "minimalism_darkred": MinimalismCover,
  "minimalism_brown": MinimalismCover,
  "song_hy_green": SongHyClassicCover,
  "boho_floral_green": FloralBouquetCover,
  "song_hy_red": SongHyClassicCover,
  "minimalism_green": MinimalismCover,
  "song_hy_v2_red": TraditionalV2Cover,
  "silk_ribbon_green": BaroquePorcelainCover,
  "glass_garden_pink": GlassGardenCover,
  "jasmine_white": FloralBouquetCover,
  "dragon_phoenix_v3_red": TraditionalV2Cover,
  "minimalism_darkbrown": BaroquePorcelainCover,
  "double_phoenix_red": TraditionalRoyalCover,
  "double_dragon_red": SongLongCover,
  "glass_garden_green": GlassGardenCover,
  "baroque_v2_darkred": BaroquePorcelainCover,
  "silk_ribbon_darkred": BaroquePorcelainCover,
  "dragon_phoenix_v2_red": LongPhungV2BesCover,
  "dragon_phoenix_v4_red": TraditionalV2Cover,
  "dragon_phoenix_red": LongPhungClassicCover,
  "minimalism_darkblue": BaroquePorcelainCover,
  "lien_hoa_v2_green": BaroquePorcelainCover,
  "minimalism_red": MinimalismRedCover,
  "song_hac_red": SongHacCover,
  "chibi_red": ChibiRedCover,
  "elegant_leaf_green": ThanhDiepCover,
  "silk_ribbon_pink": BaroquePorcelainCover,
  "dragon_phoenix_green": LongPhungImperialCover,
  "royal_red": RoyalGoldCover,
  "spring_garden_green": MinimalismCover,
  "baroque_gold": BaroquePorcelainCover,
  "double_phoenix_green": TraditionalRoyalCover,
  "cherry_blossom_pink": AnhDaoCover,
  "hoa_tinh_red": HoaTinhDoCover,
  "silk_flora_brown": FloralBouquetCover,
  "boho_floral_pink": FloralBouquetCover,
  "nhat_binh_red": TraditionalRoyalCover,
  "boho_floral_brown": HoaMocNauCover,
  "applique_lace_white": BaroquePorcelainCover,
  "chateau_green": BaroquePorcelainCover,
  "double_dragon_green": SongLongCover,
  "lien_hoa_pink": FloralBouquetCover,
  "spring_garden_red": MinimalismCover,
  "dragon_phoenix_blue": LongPhungImperialCover,
  "spring_garden_blue": VuonXuanLamCover,
  "baroque_v2_darkgreen": BaroquePorcelainCover,
  "crystal_floral_blue": BaroquePorcelainCover,
  "porcelain_v2_pink": BaroquePorcelainCover,
  "chateau_blue": BaroquePorcelainCover,
  "porcelain_v2_green": BaroquePorcelainCover,
  "florence_brown": ArchitecturalCover,
  "hoa_kho_v2_blue": HoaKhoV2LamCover,
  "co_ba_red": CoBaCover,
  "double_dragon_blue": SongLongCover,
  "royal_green": FloralBouquetCover,
  "minimalism_purple": BaroquePorcelainCover,
  "dried_flower_v2_green": HoaKhoV2XanhCover,
  "hoa_dai_pink": WildflowerCover,
  "baroque_blue": BaroqueLamCover,
  "royal_v2_green": FloralBouquetCover,
  "dragon_phoenix_black": LongPhungClassicCover,
  "royal_blue": HoangKimLamCover,
  "riviera_blue": ArchitecturalCover,
  "baroque_v2_darkblue": BaroquePorcelainCover,
  "porcelain_brown": PorcelainTileCover,
  "crystal_floral_green": BaroquePorcelainCover,
  "sunflower_yellow": WildflowerCover,
  "porcelain_v2_red": BaroquePorcelainCover,
  "crystal_floral_red": BaroquePorcelainCover,
  "porcelain_blue": PorcelainTileCover,
  "porcelain_red": BachSuDoCover,
  "san_miguel_yellow": ArchitecturalCover,
  "glass_garden_blue": GlassGardenCover,
  "royal_v2_purple": FloralBouquetCover,
  "hoa_kho_orange": BaroquePorcelainCover,
};

export function getCoverComponent(templateId: string): React.ComponentType<CoverProps> {
  return COVER_REGISTRY[templateId] || BaroquePorcelainCover;
}

export * from "./types";
export * from "./coverConfigs";
export * from "./BaseCoverCard";
export * from "./SignatureCovers";
