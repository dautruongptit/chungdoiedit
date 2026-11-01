import type { ComponentType } from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { Backdrop } from "./Backdrop";
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
import { RsvpDialogHost } from "./RsvpDialogHost";
import { Lightbox } from "./Lightbox";
import { RIVIERA_BLOCKS } from "./riviera";
import { TRADITIONAL_BLOCKS } from "./traditional";
import { DARKRED_BLOCKS } from "./darkred";
import { LONGPHUNG_V1_BLOCKS } from "./longphung_v1";
import { SPRINGGARDEN_V1_BLOCKS } from "./springgarden_v1";
import { PORCELAIN_V2_BLOCKS } from "./porcelain_v2";
import { DOUBLE_DRAGON_BLOCKS } from "./double_dragon";
import { BAROQUE_V2_BLOCKS } from "./baroque_v2";
import { CRYSTAL_FLORAL_BLOCKS } from "./crystal_floral";
import { SONG_HY_BLOCKS } from "./song_hy";
import { BOHO_FLORAL_BLOCKS } from "./boho_floral";
import { MINIMALISM_PURPLE_BLOCKS } from "./minimalism_purple";
import { LIEN_HOA_V2_BLOCKS } from "./lien_hoa_v2";
import * as MINIMALISM_GREEN_BLOCKS from "./minimalism_green";
import * as MINIMALISM_DARKBROWN_BLOCKS from "./minimalism_darkbrown";
import * as MINIMALISM_DARKBLUE_BLOCKS from "./minimalism_darkblue";
import * as MINIMALISM_RED_BLOCKS from "./minimalism_red";
import * as SONG_HY_V2_RED_BLOCKS from "./song_hy_v2_red";
import * as DRAGON_PHOENIX_V3_RED_BLOCKS from "./dragon_phoenix_v3_red";
import * as DRAGON_PHOENIX_V2_RED_BLOCKS from "./dragon_phoenix_v2_red";
import * as DOUBLE_PHOENIX_RED_BLOCKS from "./double_phoenix_red";
import * as DOUBLE_PHOENIX_GREEN_BLOCKS from "./double_phoenix_green";
import * as SONG_HAC_RED_BLOCKS from "./song_hac_red";
import * as NHAT_BINH_RED_BLOCKS from "./nhat_binh_red";
import * as CO_BA_RED_BLOCKS from "./co_ba_red";
import * as SILK_RIBBON_GREEN_BLOCKS from "./silk_ribbon_green";
import * as SILK_RIBBON_DARKRED_BLOCKS from "./silk_ribbon_darkred";
import * as SILK_RIBBON_PINK_BLOCKS from "./silk_ribbon_pink";
import * as GLASS_GARDEN_GREEN_BLOCKS from "./glass_garden_green";
import * as GLASS_GARDEN_PINK_BLOCKS from "./glass_garden_pink";
import * as GLASS_GARDEN_LIGHT_GREEN_BLOCKS from "./glass_garden_light_green";
import * as GLASS_GARDEN_BLUE_BLOCKS from "./glass_garden_blue";
import * as CHERRY_BLOSSOM_PINK_BLOCKS from "./cherry_blossom_pink";
import * as LIEN_HOA_PINK_BLOCKS from "./lien_hoa_pink";
import * as DRIED_FLOWER_V2_GREEN_BLOCKS from "./dried_flower_v2_green";
import * as HOA_KHO_V2_BLUE_BLOCKS from "./hoa_kho_v2_blue";
import * as CHATEAU_GREEN_BLOCKS from "./chateau_green";
import * as CHATEAU_BLUE_BLOCKS from "./chateau_blue";
import * as ROYAL_RED_BLOCKS from "./royal_red";
import * as ROYAL_GREEN_BLOCKS from "./royal_green";
import * as ROYAL_BLUE_BLOCKS from "./royal_blue";
import * as ROYAL_V2_GREEN_BLOCKS from "./royal_v2_green";
import * as ROYAL_V2_PURPLE_BLOCKS from "./royal_v2_purple";
import * as BAROQUE_GOLD_BLOCKS from "./baroque_gold";
import * as BAROQUE_BLUE_BLOCKS from "./baroque_blue";
import * as PORCELAIN_BROWN_BLOCKS from "./porcelain_brown";
import * as PORCELAIN_BLUE_BLOCKS from "./porcelain_blue";
import * as PORCELAIN_RED_BLOCKS from "./porcelain_red";
import * as FLORENCE_BROWN_BLOCKS from "./florence_brown";
import * as JASMINE_WHITE_BLOCKS from "./jasmine_white";
import * as MARBLE_YELLOW_BLOCKS from "./marble_yellow";
import * as ELEGANT_LEAF_GREEN_BLOCKS from "./elegant_leaf_green";
import * as CHIBI_RED_BLOCKS from "./chibi_red";
import * as APPLIQUE_LACE_WHITE_BLOCKS from "./applique_lace_white";
import * as SILK_FLORA_BROWN_BLOCKS from "./silk_flora_brown";
import * as HOA_TINH_RED_BLOCKS from "./hoa_tinh_red";
import * as SUNFLOWER_YELLOW_BLOCKS from "./sunflower_yellow";
import * as SANTORINI_BLUE_BLOCKS from "./santorini_blue";
import * as FOLK_FLORAL_BLUE_BLOCKS from "./folk_floral_blue";
import * as HOA_DAI_PINK_BLOCKS from "./hoa_dai_pink";
import * as QASR_BLUE_BLOCKS from "./qasr_blue";
import * as SAN_MIGUEL_YELLOW_BLOCKS from "./san_miguel_yellow";
import * as HOA_KHO_ORANGE_BLOCKS from "./hoa_kho_orange";
import * as MAHAL_GOLD_BLOCKS from "./mahal_gold";
import * as FLORAL_FIESTA_YELLOW_BLOCKS from "./floral_fiesta_yellow";
import * as NOMAD_BROWN_BLOCKS from "./nomad_brown";
import * as SARAYA_GOLD_BLOCKS from "./saraya_gold";
import * as QASR_GOLD_BLOCKS from "./qasr_gold";
import * as QASR_GREEN_BLOCKS from "./qasr_green";
import * as MANDAP_DARKRED_BLOCKS from "./mandap_darkred";
import * as BROCADE_FLOWER_RED_BLOCKS from "./brocade_flower_red";

export type BlockComponent = ComponentType<{ ctx: InvitationCtx }>;

/** Khối bố cục họ "minimalism". `capabilities.json#blocks` quyết định khối nào được vẽ và theo thứ tự nào. */
export const MINIMALISM_BLOCKS: Record<string, BlockComponent> = {
  Backdrop, Hero, Family, Album, Banquet, Venue, Dress, Schedule, Guestbook, Gifts, Thanks, Credit, RsvpDialogHost, Lightbox,
};

/** Khối dùng chung mọi họ bố cục */
export const COMMON_BLOCKS: Record<string, BlockComponent> = { Credit, RsvpDialogHost };

/** Họ bố cục -> bản đồ khối; `capabilities.family` chọn bản đồ, `capabilities.blocks` chọn khối & thứ tự. */
export const blocksForFamily = (family: string): Record<string, BlockComponent> =>
  ({
    ...COMMON_BLOCKS,
    ...(family === "riviera"
      ? RIVIERA_BLOCKS
      : family === "traditional"
      ? TRADITIONAL_BLOCKS
      : family === "darkred"
      ? DARKRED_BLOCKS
      : family === "longphung_v1"
      ? LONGPHUNG_V1_BLOCKS
      : family === "springgarden_v1"
      ? SPRINGGARDEN_V1_BLOCKS
      : family === "porcelain_v2"
      ? PORCELAIN_V2_BLOCKS
      : family === "double_dragon"
      ? DOUBLE_DRAGON_BLOCKS
      : family === "baroque_v2"
      ? BAROQUE_V2_BLOCKS
      : family === "crystal_floral"
      ? CRYSTAL_FLORAL_BLOCKS
      : family === "song_hy"
      ? SONG_HY_BLOCKS
      : family === "boho_floral"
      ? BOHO_FLORAL_BLOCKS
      : family === "minimalism_purple"
      ? MINIMALISM_PURPLE_BLOCKS
      : family === "lien_hoa_v2"
      ? LIEN_HOA_V2_BLOCKS
      : family === "minimalism_green"
      ? MINIMALISM_GREEN_BLOCKS
      : family === "minimalism_darkbrown"
      ? MINIMALISM_DARKBROWN_BLOCKS
      : family === "minimalism_darkblue"
      ? MINIMALISM_DARKBLUE_BLOCKS
      : family === "minimalism_red"
      ? MINIMALISM_RED_BLOCKS
      : family === "song_hy_v2_red"
      ? SONG_HY_V2_RED_BLOCKS
      : family === "dragon_phoenix_v3_red"
      ? DRAGON_PHOENIX_V3_RED_BLOCKS
      : family === "dragon_phoenix_v2_red"
      ? DRAGON_PHOENIX_V2_RED_BLOCKS
      : family === "double_phoenix_red"
      ? DOUBLE_PHOENIX_RED_BLOCKS
      : family === "double_phoenix_green"
      ? DOUBLE_PHOENIX_GREEN_BLOCKS
      : family === "song_hac_red"
      ? SONG_HAC_RED_BLOCKS
      : family === "nhat_binh_red"
      ? NHAT_BINH_RED_BLOCKS
      : family === "co_ba_red"
      ? CO_BA_RED_BLOCKS
      : family === "silk_ribbon_green"
      ? SILK_RIBBON_GREEN_BLOCKS
      : family === "silk_ribbon_darkred"
      ? SILK_RIBBON_DARKRED_BLOCKS
      : family === "silk_ribbon_pink"
      ? SILK_RIBBON_PINK_BLOCKS
      : family === "glass_garden_green"
      ? GLASS_GARDEN_GREEN_BLOCKS
      : family === "glass_garden_pink"
      ? GLASS_GARDEN_PINK_BLOCKS
      : family === "glass_garden_light_green"
      ? GLASS_GARDEN_LIGHT_GREEN_BLOCKS
      : family === "glass_garden_blue"
      ? GLASS_GARDEN_BLUE_BLOCKS
      : family === "cherry_blossom_pink"
      ? CHERRY_BLOSSOM_PINK_BLOCKS
      : family === "lien_hoa_pink"
      ? LIEN_HOA_PINK_BLOCKS
      : family === "dried_flower_v2_green"
      ? DRIED_FLOWER_V2_GREEN_BLOCKS
      : family === "hoa_kho_v2_blue"
      ? HOA_KHO_V2_BLUE_BLOCKS
      : family === "chateau_green"
      ? CHATEAU_GREEN_BLOCKS
      : family === "chateau_blue"
      ? CHATEAU_BLUE_BLOCKS
      : family === "royal_red"
      ? ROYAL_RED_BLOCKS
      : family === "royal_green"
      ? ROYAL_GREEN_BLOCKS
      : family === "royal_blue"
      ? ROYAL_BLUE_BLOCKS
      : family === "royal_v2_green"
      ? ROYAL_V2_GREEN_BLOCKS
      : family === "royal_v2_purple"
      ? ROYAL_V2_PURPLE_BLOCKS
      : family === "baroque_gold"
      ? BAROQUE_GOLD_BLOCKS
      : family === "baroque_blue"
      ? BAROQUE_BLUE_BLOCKS
      : family === "porcelain_brown"
      ? PORCELAIN_BROWN_BLOCKS
      : family === "porcelain_blue"
      ? PORCELAIN_BLUE_BLOCKS
      : family === "porcelain_red"
      ? PORCELAIN_RED_BLOCKS
      : family === "florence_brown"
      ? FLORENCE_BROWN_BLOCKS
      : family === "jasmine_white"
      ? JASMINE_WHITE_BLOCKS
      : family === "marble_yellow"
      ? MARBLE_YELLOW_BLOCKS
      : family === "elegant_leaf_green"
      ? ELEGANT_LEAF_GREEN_BLOCKS
      : family === "chibi_red"
      ? CHIBI_RED_BLOCKS
      : family === "applique_lace_white"
      ? APPLIQUE_LACE_WHITE_BLOCKS
      : family === "silk_flora_brown"
      ? SILK_FLORA_BROWN_BLOCKS
      : family === "hoa_tinh_red"
      ? HOA_TINH_RED_BLOCKS
      : family === "sunflower_yellow"
      ? SUNFLOWER_YELLOW_BLOCKS
      : family === "santorini_blue"
      ? SANTORINI_BLUE_BLOCKS
      : family === "folk_floral_blue"
      ? FOLK_FLORAL_BLUE_BLOCKS
      : family === "hoa_dai_pink"
      ? HOA_DAI_PINK_BLOCKS
      : family === "qasr_blue"
      ? QASR_BLUE_BLOCKS
      : family === "san_miguel_yellow"
      ? SAN_MIGUEL_YELLOW_BLOCKS
      : family === "hoa_kho_orange"
      ? HOA_KHO_ORANGE_BLOCKS
      : family === "mahal_gold"
      ? MAHAL_GOLD_BLOCKS
      : family === "floral_fiesta_yellow"
      ? FLORAL_FIESTA_YELLOW_BLOCKS
      : family === "nomad_brown"
      ? NOMAD_BROWN_BLOCKS
      : family === "saraya_gold"
      ? SARAYA_GOLD_BLOCKS
      : family === "qasr_gold"
      ? QASR_GOLD_BLOCKS
      : family === "qasr_green"
      ? QASR_GREEN_BLOCKS
      : family === "mandap_darkred"
      ? MANDAP_DARKRED_BLOCKS
      : family === "brocade_flower_red"
      ? BROCADE_FLOWER_RED_BLOCKS
      : MINIMALISM_BLOCKS),
  });
