import brownTheme from "./minimalism_brown/theme.json";
import brownCaps from "./minimalism_brown/capabilities.json";
import rivTheme from "./riviera_blue/theme.json";
import rivCaps from "./riviera_blue/capabilities.json";
import rivDemo from "./riviera_blue/demo.json";
import dpTheme from "./dragon_phoenix_v4_red/theme.json";
import dpCaps from "./dragon_phoenix_v4_red/capabilities.json";
import dpDemo from "./dragon_phoenix_v4_red/demo.json";
import darkredTheme from "./minimalism_darkred/theme.json";
import darkredCaps from "./minimalism_darkred/capabilities.json";
import darkredDemo from "./minimalism_darkred/demo.json";
import dpRedTheme from "./dragon_phoenix_red/theme.json";
import dpRedCaps from "./dragon_phoenix_red/capabilities.json";
import dpRedDemo from "./dragon_phoenix_red/demo.json";
import dpBlueTheme from "./dragon_phoenix_blue/theme.json";
import dpBlueCaps from "./dragon_phoenix_blue/capabilities.json";
import dpBlueDemo from "./dragon_phoenix_blue/demo.json";
import dpGreenTheme from "./dragon_phoenix_green/theme.json";
import dpGreenCaps from "./dragon_phoenix_green/capabilities.json";
import dpGreenDemo from "./dragon_phoenix_green/demo.json";
import dpBlackTheme from "./dragon_phoenix_black/theme.json";
import dpBlackCaps from "./dragon_phoenix_black/capabilities.json";
import dpBlackDemo from "./dragon_phoenix_black/demo.json";
import sgRedTheme from "./spring_garden_red/theme.json";
import sgRedCaps from "./spring_garden_red/capabilities.json";
import sgRedDemo from "./spring_garden_red/demo.json";
import sgBlueTheme from "./spring_garden_blue/theme.json";
import sgBlueCaps from "./spring_garden_blue/capabilities.json";
import sgBlueDemo from "./spring_garden_blue/demo.json";
import sgGreenTheme from "./spring_garden_green/theme.json";
import sgGreenCaps from "./spring_garden_green/capabilities.json";
import sgGreenDemo from "./spring_garden_green/demo.json";
import p2GreenTheme from "./porcelain_v2_green/theme.json";
import p2GreenCaps from "./porcelain_v2_green/capabilities.json";
import p2GreenDemo from "./porcelain_v2_green/demo.json";
import p2RedTheme from "./porcelain_v2_red/theme.json";
import p2RedCaps from "./porcelain_v2_red/capabilities.json";
import p2RedDemo from "./porcelain_v2_red/demo.json";
import p2PinkTheme from "./porcelain_v2_pink/theme.json";
import p2PinkCaps from "./porcelain_v2_pink/capabilities.json";
import p2PinkDemo from "./porcelain_v2_pink/demo.json";
import ddRedTheme from "./double_dragon_red/theme.json";
import ddRedCaps from "./double_dragon_red/capabilities.json";
import ddRedDemo from "./double_dragon_red/demo.json";
import ddGreenTheme from "./double_dragon_green/theme.json";
import ddGreenCaps from "./double_dragon_green/capabilities.json";
import ddGreenDemo from "./double_dragon_green/demo.json";
import ddBlueTheme from "./double_dragon_blue/theme.json";
import ddBlueCaps from "./double_dragon_blue/capabilities.json";
import ddBlueDemo from "./double_dragon_blue/demo.json";
import b2RedTheme from "./baroque_v2_darkred/theme.json";
import b2RedCaps from "./baroque_v2_darkred/capabilities.json";
import b2RedDemo from "./baroque_v2_darkred/demo.json";
import b2GreenTheme from "./baroque_v2_darkgreen/theme.json";
import b2GreenCaps from "./baroque_v2_darkgreen/capabilities.json";
import b2GreenDemo from "./baroque_v2_darkgreen/demo.json";
import b2BlueTheme from "./baroque_v2_darkblue/theme.json";
import b2BlueCaps from "./baroque_v2_darkblue/capabilities.json";
import b2BlueDemo from "./baroque_v2_darkblue/demo.json";
import cfBlueTheme from "./crystal_floral_blue/theme.json";
import cfBlueCaps from "./crystal_floral_blue/capabilities.json";
import cfBlueDemo from "./crystal_floral_blue/demo.json";
import cfGreenTheme from "./crystal_floral_green/theme.json";
import cfGreenCaps from "./crystal_floral_green/capabilities.json";
import cfGreenDemo from "./crystal_floral_green/demo.json";
import cfRedTheme from "./crystal_floral_red/theme.json";
import cfRedCaps from "./crystal_floral_red/capabilities.json";
import cfRedDemo from "./crystal_floral_red/demo.json";
import songHyGreenTheme from "./song_hy_green/theme.json";
import songHyGreenCaps from "./song_hy_green/capabilities.json";
import songHyGreenDemo from "./song_hy_green/demo.json";
import songHyRedTheme from "./song_hy_red/theme.json";
import songHyRedCaps from "./song_hy_red/capabilities.json";
import songHyRedDemo from "./song_hy_red/demo.json";
import type { Inv } from "@/types/invitation";
import { buildTheme, type ThemeJson, type ThemeTokens } from "../theme";
import { editorSections, type EditorSections } from "@/features/editor/config/editorSections";

export interface TemplateCapabilities {
  id: string;
  family: "minimalism" | "riviera" | "traditional" | "darkred" | "longphung_v1" | "springgarden_v1" | "porcelain_v2" | "double_dragon" | "baroque_v2" | "crystal_floral";
  /** Class thêm vào khung ngoài của thiệp (vd "st-card" để đặt biến --st-w) */
  rootClass?: string;
  /** Class bọc các khối nội dung bên trong (khi decor nằm ngoài root thiệp) */
  innerClass?: string;
  testId: string;
  /** Thứ tự và tập khối được vẽ (tên khớp `blocks/index.ts`) */
  blocks: string[];
  cover: { seal: string; ambient: string; particle: string; skin: string };
  gift: { widget: "box3d" | "envelope" };
  hero: { kind: "photo" | "couple" | "watermark" | "none"; introLine: boolean; /** Hình khung ảnh đầu thiệp: quyết định khung thu nhỏ và khung cắt trong editor */ shape?: "circle" | "portrait" | "none" };
  album: { indicator: "counter" | "dots"; defaultLayout: string; };
  countdown: boolean;
  layout: { contentMaxMd: number; behaviorMd: "padded" | "fixed" | "stretch"; parallaxDecor: boolean };
  editor: {
    albumCardAfter: "hero" | "family" | "ceremony";
    cards: { hero: boolean; coupleHero: boolean; introLine: boolean };
    /** Đo thật từ editor trang gốc; chưa có ở mẫu này thì dùng ma trận 88 mẫu (`getEditorSections`). */
    sections?: EditorSections;
  };
  music: string;
}

export interface TemplateSpec {
  id: string;
  theme: ThemeTokens;
  capabilities: TemplateCapabilities;
  /** Dữ liệu demo của trang gốc, ghi đè lên dữ liệu demo chung */
  demo?: Partial<Inv>;
}

/** Đăng ký mẫu mới: thêm thư mục `specs/<id>/{theme,capabilities}.json` rồi thêm một dòng ở đây. */
const SPECS: Record<string, TemplateSpec> = {
  minimalism_brown: { id: "minimalism_brown", theme: buildTheme(brownTheme as ThemeJson), capabilities: brownCaps as TemplateCapabilities },
  riviera_blue: { id: "riviera_blue", theme: buildTheme(rivTheme as ThemeJson), capabilities: rivCaps as unknown as TemplateCapabilities, demo: rivDemo as unknown as Partial<Inv> },
  dragon_phoenix_v4_red: { id: "dragon_phoenix_v4_red", theme: buildTheme(dpTheme as ThemeJson), capabilities: dpCaps as unknown as TemplateCapabilities, demo: dpDemo as unknown as Partial<Inv> },
  minimalism_darkred: { id: "minimalism_darkred", theme: buildTheme(darkredTheme as ThemeJson), capabilities: darkredCaps as unknown as TemplateCapabilities, demo: darkredDemo as unknown as Partial<Inv> },
  dragon_phoenix_red: { id: "dragon_phoenix_red", theme: buildTheme(dpRedTheme as unknown as ThemeJson), capabilities: dpRedCaps as unknown as TemplateCapabilities, demo: dpRedDemo as unknown as Partial<Inv> },
  dragon_phoenix_blue: { id: "dragon_phoenix_blue", theme: buildTheme(dpBlueTheme as unknown as ThemeJson), capabilities: dpBlueCaps as unknown as TemplateCapabilities, demo: dpBlueDemo as unknown as Partial<Inv> },
  dragon_phoenix_green: { id: "dragon_phoenix_green", theme: buildTheme(dpGreenTheme as unknown as ThemeJson), capabilities: dpGreenCaps as unknown as TemplateCapabilities, demo: dpGreenDemo as unknown as Partial<Inv> },
  dragon_phoenix_black: { id: "dragon_phoenix_black", theme: buildTheme(dpBlackTheme as unknown as ThemeJson), capabilities: dpBlackCaps as unknown as TemplateCapabilities, demo: dpBlackDemo as unknown as Partial<Inv> },
  spring_garden_red: { id: "spring_garden_red", theme: buildTheme(sgRedTheme as unknown as ThemeJson), capabilities: sgRedCaps as unknown as TemplateCapabilities, demo: sgRedDemo as unknown as Partial<Inv> },
  spring_garden_blue: { id: "spring_garden_blue", theme: buildTheme(sgBlueTheme as unknown as ThemeJson), capabilities: sgBlueCaps as unknown as TemplateCapabilities, demo: sgBlueDemo as unknown as Partial<Inv> },
  spring_garden_green: { id: "spring_garden_green", theme: buildTheme(sgGreenTheme as unknown as ThemeJson), capabilities: sgGreenCaps as unknown as TemplateCapabilities, demo: sgGreenDemo as unknown as Partial<Inv> },
  porcelain_v2_green: { id: "porcelain_v2_green", theme: buildTheme(p2GreenTheme as unknown as ThemeJson), capabilities: p2GreenCaps as unknown as TemplateCapabilities, demo: p2GreenDemo as unknown as Partial<Inv> },
  porcelain_v2_red: { id: "porcelain_v2_red", theme: buildTheme(p2RedTheme as unknown as ThemeJson), capabilities: p2RedCaps as unknown as TemplateCapabilities, demo: p2RedDemo as unknown as Partial<Inv> },
  porcelain_v2_pink: { id: "porcelain_v2_pink", theme: buildTheme(p2PinkTheme as unknown as ThemeJson), capabilities: p2PinkCaps as unknown as TemplateCapabilities, demo: p2PinkDemo as unknown as Partial<Inv> },
  double_dragon_red: { id: "double_dragon_red", theme: buildTheme(ddRedTheme as unknown as ThemeJson), capabilities: ddRedCaps as unknown as TemplateCapabilities, demo: ddRedDemo as unknown as Partial<Inv> },
  double_dragon_green: { id: "double_dragon_green", theme: buildTheme(ddGreenTheme as unknown as ThemeJson), capabilities: ddGreenCaps as unknown as TemplateCapabilities, demo: ddGreenDemo as unknown as Partial<Inv> },
  double_dragon_blue: { id: "double_dragon_blue", theme: buildTheme(ddBlueTheme as unknown as ThemeJson), capabilities: ddBlueCaps as unknown as TemplateCapabilities, demo: ddBlueDemo as unknown as Partial<Inv> },
  baroque_v2_darkred: { id: "baroque_v2_darkred", theme: buildTheme(b2RedTheme as unknown as ThemeJson), capabilities: b2RedCaps as unknown as TemplateCapabilities, demo: b2RedDemo as unknown as Partial<Inv> },
  baroque_v2_darkgreen: { id: "baroque_v2_darkgreen", theme: buildTheme(b2GreenTheme as unknown as ThemeJson), capabilities: b2GreenCaps as unknown as TemplateCapabilities, demo: b2GreenDemo as unknown as Partial<Inv> },
  baroque_v2_darkblue: { id: "baroque_v2_darkblue", theme: buildTheme(b2BlueTheme as unknown as ThemeJson), capabilities: b2BlueCaps as unknown as TemplateCapabilities, demo: b2BlueDemo as unknown as Partial<Inv> },
  crystal_floral_blue: { id: "crystal_floral_blue", theme: buildTheme(cfBlueTheme as unknown as ThemeJson), capabilities: cfBlueCaps as unknown as TemplateCapabilities, demo: cfBlueDemo as unknown as Partial<Inv> },
  crystal_floral_green: { id: "crystal_floral_green", theme: buildTheme(cfGreenTheme as unknown as ThemeJson), capabilities: cfGreenCaps as unknown as TemplateCapabilities, demo: cfGreenDemo as unknown as Partial<Inv> },
  crystal_floral_red: { id: "crystal_floral_red", theme: buildTheme(cfRedTheme as unknown as ThemeJson), capabilities: cfRedCaps as unknown as TemplateCapabilities, demo: cfRedDemo as unknown as Partial<Inv> },
  song_hy_green: { id: "song_hy_green", theme: buildTheme(songHyGreenTheme as unknown as ThemeJson), capabilities: songHyGreenCaps as unknown as TemplateCapabilities, demo: songHyGreenDemo as unknown as Partial<Inv> },
  song_hy_red: { id: "song_hy_red", theme: buildTheme(songHyRedTheme as unknown as ThemeJson), capabilities: songHyRedCaps as unknown as TemplateCapabilities, demo: songHyRedDemo as unknown as Partial<Inv> },
};

/** Mẫu đã có khuôn chung (null = vẫn dùng đường dựng cũ). */
export const getTemplateSpec = (templateId: string): TemplateSpec | null => SPECS[templateId] ?? null;
export const getCapabilities = (templateId: string): TemplateCapabilities | null => SPECS[templateId]?.capabilities ?? null;

export const getTemplateDemo = (templateId: string): Partial<Inv> | null => SPECS[templateId]?.demo ?? null;

/**
 * Hiện/ẩn thẻ editor theo mẫu. Ưu tiên `capabilities.editor.sections` (đo thật, mẫu đã clone);
 * mẫu chưa có spec riêng thì dùng ma trận đo từ 88 mẫu trang gốc (`editorSections`).
 */
export const getEditorSections = (templateId: string): EditorSections =>
  SPECS[templateId]?.capabilities?.editor.sections ?? editorSections(templateId);
