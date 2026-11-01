import type { Inv } from "@/types/invitation";
import { useInvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { MusicPlayer } from "@/features/invitation/shell/blocks/MusicPlayer";
import { blocksForFamily } from "@/features/invitation/shell/blocks";
import type { TemplateSpec } from "@/features/invitation/shell/specs";

export interface InvitationShellProps {
  d: Inv;
  set: (p: Partial<Inv>) => void;
  spec: TemplateSpec;
  standalone?: boolean;
  /** Mở hộp thoại xác nhận tham dự của trang (chỉ truyền khi RSVP bật). */
  onRsvp?: () => void;
  /** false khi thiệp được dựng sẵn phía sau bìa (chưa mở): chưa phát nhạc */
  active?: boolean;
}

/** Khuôn chung của thiệp đã mở: dữ liệu (`Inv`) + chủ đề (`theme.json`) + danh sách khối (`capabilities.json`). */
export function InvitationShell({ d, set, spec, active = true }: InvitationShellProps) {
  const ctx = useInvitationCtx(d, set, spec.theme, active);
  const t = spec.theme;
  const BLOCKS = blocksForFamily(spec.capabilities.family);
  return (
    <div className="min-h-screen w-full select-none">
      <MusicPlayer ctx={ctx} />
      <div className="inv-root flex w-full justify-center overflow-x-clip bg-white" data-testid={spec.capabilities.testId}>
        <div
          data-showcase-root=""
          className={"relative w-full max-w-[480px] md:max-w-[900px] md:mx-auto overflow-hidden md:border md:border-[color:var(--inv-edge)] isolate" + (spec.capabilities.rootClass ? " " + spec.capabilities.rootClass : "")}
          style={{ backgroundColor: t.paper, color: t.text ?? t.ink, ["--inv-edge" as string]: t.edge }}
        >
          <style>{`@keyframes mbFloat{0%,100%{transform:translateY(0)}50%{transform:translateY(-10px)}}`}</style>
          {spec.capabilities.innerClass ? (
            <>
              {spec.capabilities.blocks.filter((b) => b === "Paper").map((name) => {
                const Block = BLOCKS[name];
                return Block ? <Block key={name} ctx={ctx} /> : null;
              })}
              <div className={spec.capabilities.innerClass}>
                {spec.capabilities.blocks.filter((b) => b !== "Paper" && b !== "BottomDecor" && b !== "Lightbox").map((name) => {
                  const Block = BLOCKS[name];
                  return Block ? <Block key={name} ctx={ctx} /> : null;
                })}
              </div>
              {spec.capabilities.blocks.filter((b) => b === "BottomDecor").map((name) => {
                const Block = BLOCKS[name];
                return Block ? <Block key={name} ctx={ctx} /> : null;
              })}
              {spec.capabilities.blocks.filter((b) => b === "Lightbox").map((name) => {
                const Block = BLOCKS[name];
                return Block ? <Block key={name} ctx={ctx} /> : null;
              })}
            </>
          ) : (
            spec.capabilities.blocks.map((name) => {
              const Block = BLOCKS[name];
              return Block ? <Block key={name} ctx={ctx} /> : null;
            })
          )}
        </div>
      </div>
    </div>
  );
}
