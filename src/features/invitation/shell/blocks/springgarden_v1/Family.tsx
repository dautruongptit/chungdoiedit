import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, setRsvpOpen } = ctx;
  const anyD = d as any;
  const ink = t.ink || "rgb(210, 95, 101)";
  const muted = t.muted || "rgb(181, 75, 81)";
  const fontFam = t.fontFamily || "Baskerville, \"Times New Roman\", ChungDoiIndic, serif";

  const brideFather = anyD.brideFather || "Phạm Văn Tân";
  const brideMother = anyD.brideMother || "Hoàng Thị Loan";
  const brideAddress = anyD.brideAddress || anyD.brideAddr || "Số 30, Đường Lê Ninh, Phường Hưng Bình, TP. Vinh, Nghệ An";

  const groomFather = anyD.groomFather || "Ngô Văn Hải";
  const groomMother = anyD.groomMother || "Đinh Thị Lệ";
  const groomAddress = anyD.groomAddress || anyD.groomAddr || "Xóm 5, Xã Nghi Phú, TP. Vinh, Nghệ An";

  const brideName = anyD.brideFull || "Phạm Thị Ngọc Hân";
  const brideTitle = anyD.brideOrder || anyD.brideRole || "Con Gái";

  const groomName = anyD.groomFull || "Ngô Xuân Trường";
  const groomTitle = anyD.groomOrder || anyD.groomRole || "Con Trai";

  const calUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("Đám cưới " + groomName + " & " + brideName) +
    "&dates=20260621T043000Z/20260621T063000Z&ctz=Asia/Ho_Chi_Minh&details=" +
    encodeURIComponent("Tiệc cưới của " + groomName + " & " + brideName + " tại Summer Vinh Convention Center, 343 Lê Duẩn, Trường Thi, Thành phố Vinh, Nghệ An") +
    "&location=" +
    encodeURIComponent("Summer Vinh Convention Center, 343 Lê Duẩn, Trường Thi, Thành phố Vinh, Nghệ An");

  return (
    <section className="relative flex flex-col gap-16 md:gap-20 px-3 md:px-6 pb-12 md:pb-16 z-10">
      {/* 1. Tiêu đề Lễ cưới */}
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: fontFam,
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span>THÔNG TIN LỄ&nbsp;CƯỚI</span>
      </h2>

      {/* 2. Hai bên gia đình */}
      <div
        className="relative grid grid-cols-2 gap-x-2 md:gap-x-3 text-center font-serif text-[14px] md:text-[18px] tracking-[0.05em] grid-rows-[repeat(4,auto)] gap-y-1.5"
        style={{ color: muted }}
      >
        {/* Nhà gái */}
        <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
          <span style={{ color: muted }}><span>Ông Bà</span></span>
          <span
            className="[overflow-wrap:anywhere]"
            style={{ color: muted, fontFamily: fontFam, fontSize: "13px" }}
          >
            <span>{brideFather}</span>
          </span>
          <span
            className="[overflow-wrap:anywhere]"
            style={{ color: muted, fontFamily: fontFam, fontSize: "13px" }}
          >
            <span>{brideMother}</span>
          </span>
          <div
            className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
            style={{ color: muted, fontFamily: fontFam }}
          >
            <span>{brideAddress}</span>
          </div>
        </div>

        {/* Nhà trai */}
        <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
          <span style={{ color: muted }}><span>Ông Bà</span></span>
          <span
            className="[overflow-wrap:anywhere]"
            style={{ color: muted, fontFamily: fontFam, fontSize: "13px" }}
          >
            <span>{groomFather}</span>
          </span>
          <span
            className="[overflow-wrap:anywhere]"
            style={{ color: muted, fontFamily: fontFam, fontSize: "13px" }}
          >
            <span>{groomMother}</span>
          </span>
          <div
            className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
            style={{ color: muted, fontFamily: fontFam }}
          >
            <span>{groomAddress}</span>
          </div>
        </div>
      </div>

      {/* 3. Dòng thông báo */}
      <div
        className="relative text-center font-serif text-[16px] md:text-[20px] flex flex-col gap-2 mx-auto md:max-w-[560px]"
        style={{ whiteSpace: "pre-line", color: ink }}
      >
        <span>
          TRÂN TRỌNG BÁO TIN{"\n"}
          LỄ THÀNH HÔN CỦA CON CHÚNG TÔI
        </span>
      </div>

      {/* 4. Tên Cô Dâu Chú Rể */}
      <div className="w-full min-w-0 relative flex flex-col items-center text-center gap-3 md:gap-4">
        <h3
          className="font-pinyon w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap"
          style={{
            fontSize: "27px",
            color: ink,
            fontWeight: 400,
            fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive',
          }}
        >
          {brideName}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: muted, fontFamily: fontFam }}
        >
          <span>{brideTitle}</span>
        </div>
        <div
          className="font-ampersand text-[35px] md:text-[48px]"
          style={{ color: ink }}
        >
          &amp;
        </div>
        <h3
          className="font-pinyon w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap"
          style={{
            fontSize: "27px",
            color: ink,
            fontWeight: 400,
            fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive',
          }}
        >
          {groomName}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{ color: muted, fontFamily: fontFam }}
        >
          <span>{groomTitle}</span>
        </div>
      </div>

      {/* 5. Lễ Thành Hôn tại tư gia */}
      <div
        className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
        style={{ fontFamily: fontFam }}
      >
        <div className="flex flex-col items-center gap-2" style={{ color: muted }}>
          <span className="whitespace-pre-line font-normal text-[16px] md:text-[20px] text-center">
            LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI{"\n"}
            {anyD.ceremonyLocation || anyD.ceremonyPlace || "TƯ GIA"}
          </span>
          <p className="font-normal text-[16px] md:text-[18px] mb-2 uppercase" style={{ color: muted }}>
            VÀO LÚC
          </p>
        </div>
        <div className="text-[20px] md:text-[30px]" style={{ color: ink, fontFamily: fontFam }}>
          {anyD.ceremonyTime || "09:00"}
        </div>
        <div className="flex items-center gap-6" style={{ color: ink }}>
          <span className="text-[12px] md:text-[16px]" style={{ fontFamily: fontFam, textAlign: "right" }}>
            <span>CHỦ NHẬT</span>
          </span>
          <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: ink }} />
          <span className="text-[30px] md:text-[40px]" style={{ fontFamily: fontFam }}>
            21
          </span>
          <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: ink }} />
          <span className="text-[12px] md:text-[16px]" style={{ fontFamily: fontFam, textAlign: "left" }}>
            <span>THÁNG 06</span>
          </span>
        </div>
        <div className="text-[18px] md:text-[24px]" style={{ color: ink, fontFamily: fontFam }}>
          2026
        </div>
        <div
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{ color: muted, fontFamily: fontFam }}
        >
          ( Tức ngày 7 tháng 5 năm Bính&nbsp;Ngọ)
        </div>
      </div>

      {/* 6. Tiêu đề Tiệc cưới */}
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: fontFam,
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span>THÔNG TIN TIỆC&nbsp;CƯỚI</span>
      </h2>

      {/* 7. Chi tiết Tiệc cưới */}
      <div
        className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
        style={{ fontFamily: fontFam }}
      >
        <h3
          className="font-normal uppercase text-[16px] md:text-[20px] flex flex-col items-center"
          style={{ color: ink, fontFamily: fontFam, letterSpacing: "0.05em" }}
        >
          <span>Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
        </h3>
        <div className="text-[20px] md:text-[30px]" style={{ color: ink, fontFamily: fontFam }}>
          {anyD.banquetTime || anyD.time || "11:30"}
        </div>
        <div className="flex items-center gap-6" style={{ color: ink }}>
          <span className="text-[12px] md:text-[16px]" style={{ color: ink, fontFamily: fontFam, textAlign: "right" }}>
            <span>CHỦ NHẬT</span>
          </span>
          <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: ink }} />
          <span className="text-[30px] md:text-[40px]" style={{ color: ink, fontFamily: fontFam }}>
            21
          </span>
          <div className="w-[2px] h-6 md:h-8" style={{ backgroundColor: ink }} />
          <span className="text-[12px] md:text-[16px]" style={{ color: ink, fontFamily: fontFam, textAlign: "left" }}>
            <span>THÁNG 06</span>
          </span>
        </div>
        <div className="text-[18px] md:text-[24px]" style={{ color: ink, fontFamily: fontFam }}>
          2026
        </div>
        <div
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{ color: muted, fontFamily: fontFam }}
        >
          ( Tức ngày 7 tháng 5 năm Bính&nbsp;Ngọ)
        </div>

        {/* Giờ đón khách & khai tiệc */}
        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: muted, fontFamily: fontFam }}
            >
              <span>Đón khách</span>
            </span>
            <span
              className="text-lg md:text-xl font-medium mt-1"
              style={{ color: ink, fontFamily: fontFam }}
            >
              11:00
            </span>
          </div>
          <div className="flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-wider"
              style={{ color: muted, fontFamily: fontFam }}
            >
              <span>Khai tiệc</span>
            </span>
            <span
              className="text-lg md:text-xl font-medium mt-1"
              style={{ color: ink, fontFamily: fontFam }}
            >
              11:30
            </span>
          </div>
        </div>

        {/* Lịch tháng 6/2026 */}
        <div className="mt-2 w-[296px] md:w-[352px] max-w-full mx-auto">
          <div
            className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border !max-w-none w-full"
            style={{
              borderColor: `color-mix(in srgb, ${ink} 27%, transparent 73%)`,
              color: ink,
            }}
          >
            <div
              className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b"
              style={{ borderColor: `color-mix(in srgb, ${ink} 27%, transparent 73%)` }}
            >
              Tháng 6 / 2026
            </div>
            <div className="grid grid-cols-7 border-b-2" style={{ borderColor: ink }}>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T2</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T3</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T4</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T5</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T6</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">T7</div>
              <div className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">CN</div>
            </div>
            <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
              {Array.from({ length: 30 }, (_, i) => i + 1).map((dNum) => (
                <div key={dNum} className="flex items-center justify-center h-[30px] md:h-[34px]">
                  {dNum === 21 ? (
                    <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                      <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill={ink}>
                        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                      </svg>
                      <span className="relative z-10 text-[11px] md:text-[12px] font-bold" style={{ color: "#ffffff" }}>
                        21
                      </span>
                    </div>
                  ) : (
                    <span className="text-[12px] md:text-[13px]">{dNum}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nút thêm vào lịch */}
        <a
          href={calUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center justify-center text-sm tracking-wider underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          style={{
            color: ink,
            fontFamily: fontFam,
            background: "none",
          }}
        >
          <span>Thêm vào lịch</span>
        </a>
      </div>

      {/* 8. Nút xác nhận tham dự */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full -mt-8">
        <button
          type="button"
          onClick={() => setRsvpOpen(true)}
          className="text-sm md:text-base tracking-wider inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: ink,
            color: "#ffffff",
            fontFamily: fontFam,
          }}
        >
          <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
            <span>XÁC NHẬN THAM DỰ</span>
          </span>
        </button>
      </div>
    </section>
  );
}
