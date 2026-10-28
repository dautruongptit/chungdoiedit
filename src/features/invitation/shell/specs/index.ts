import brownTheme from "./minimalism_brown/theme.json";
import brownCaps from "./minimalism_brown/capabilities.json";
import rivTheme from "./riviera_blue/theme.json";
import rivCaps from "./riviera_blue/capabilities.json";
import rivDemo from "./riviera_blue/demo.json";
import type { Inv } from "@/types/invitation";
import { buildTheme, type ThemeJson, type ThemeTokens } from "../theme";

export interface TemplateCapabilities {
  id: string;
  family: "minimalism" | "riviera";
  /** Class thêm vào khung ngoài của thiệp (vd "st-card" để đặt biến --st-w) */
  rootClass?: string;
  testId: string;
  /** Thứ tự và tập khối được vẽ (tên khớp `blocks/index.ts`) */
  blocks: string[];
  cover: { seal: string; ambient: string; particle: string; skin: string };
  gift: { widget: "box3d" | "envelope" };
  hero: { kind: "photo" | "couple" | "none"; introLine: boolean };
  album: { indicator: "counter" | "dots"; defaultLayout: string };
  countdown: boolean;
  layout: { contentMaxMd: number; behaviorMd: "padded" | "fixed" | "stretch"; parallaxDecor: boolean };
  editor: { albumCardAfter: "hero" | "ceremony"; cards: { hero: boolean; coupleHero: boolean; introLine: boolean } };
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
};

/** Mẫu đã có khuôn chung (null = vẫn dùng đường dựng cũ). */
export const getTemplateSpec = (templateId: string): TemplateSpec | null => SPECS[templateId] ?? null;
export const getCapabilities = (templateId: string): TemplateCapabilities | null => SPECS[templateId]?.capabilities ?? null;

export const getTemplateDemo = (templateId: string): Partial<Inv> | null => SPECS[templateId]?.demo ?? null;
