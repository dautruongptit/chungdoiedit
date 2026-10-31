/**
 * Điểm lấy nét (previewFocalPoint) của ảnh listing từng mẫu, đo từ kho mẫu của trang gốc (88 mẫu).
 * Trang gốc dùng: object-position: center ${previewFocalPoint ?? 0}% cho ảnh listing (dải dọc) ở nút đổi mẫu và thẻ mẫu.
 */
export const PREVIEW_FOCAL: Record<string, number> = {
  song_hy_red: 3, song_hy_green: 3, song_hy_v2_red: 24.5, double_dragon_red: 0, double_phoenix_red: 5,
  elegant_leaf_green: 13, dragon_phoenix_red: 2, song_hac_red: 7, riviera_blue: 8, san_miguel_yellow: 7.5,
  santorini_blue: 6, hoa_dai_pink: 7.5, applique_lace_white: 7.3, florence_brown: 7, dragon_phoenix_v4_red: 1.67,
  dragon_phoenix_v3_red: 0, dragon_phoenix_v2_red: 12, double_dragon_green: 0, boho_floral_green: 0, boho_floral_pink: 0,
  jasmine_white: 8, silk_flora_brown: 3, chateau_blue: 8.5, brocade_flower_red: 11, crystal_floral_blue: 0,
  crystal_floral_red: 0, crystal_floral_green: 0, chateau_green: 8, baroque_gold: 0, baroque_blue: 2.3,
  baroque_v2_darkred: 9.5, baroque_v2_darkgreen: 9.7, baroque_v2_darkblue: 9, lien_hoa_v2_green: 0, lien_hoa_pink: 0,
  qasr_green: 5.25, qasr_gold: 5.25, saraya_gold: 0.6, mahal_gold: 10, silk_ribbon_green: 1.5,
  silk_ribbon_darkred: 1.2, silk_ribbon_pink: 1.2, glass_garden_green: 0, glass_garden_pink: 0, glass_garden_blue: 0,
  glass_garden_light_green: 0, folk_floral_blue: 8, mandap_darkred: 2.2, floral_fiesta_yellow: 0, nomad_brown: 0.3,
  royal_red: 0, nhat_binh_red: 6, hoa_tinh_red: 1, co_ba_red: 7, royal_blue: 0, royal_green: 0, royal_v2_green: 0,
  royal_v2_purple: 0.9, spring_garden_green: 0, chibi_red: 3.5, boho_floral_brown: 0, spring_garden_red: 1,
  dragon_phoenix_green: 2, spring_garden_blue: 0, minimalism_red: 5.8, minimalism_green: 5.3, minimalism_brown: 9,
  minimalism_darkred: 6.7, minimalism_darkblue: 6.7, minimalism_darkbrown: 5.2, minimalism_purple: 6.7,
  dried_flower_v2_green: 9, marble_yellow: 10, qasr_blue: 8, hoa_kho_v2_blue: 1, hoa_kho_orange: 0, sunflower: 10,
  porcelain_blue: 0, porcelain_brown: 0, porcelain_red: 0, porcelain_v2_pink: 0, porcelain_v2_red: 0,
  porcelain_v2_green: 0, cherry_blossom_pink: 1, double_phoenix_green: 6.2, double_dragon_blue: 0,
  dragon_phoenix_blue: 2, dragon_phoenix_black: 2, sunflower_yellow: 10,
};

export const previewFocal = (templateId: string): number => PREVIEW_FOCAL[templateId] ?? 0;
