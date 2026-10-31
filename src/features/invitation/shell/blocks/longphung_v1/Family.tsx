import React from "react";
import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Family({ ctx }: { ctx: InvitationCtx }) {
  const { d, t, setRsvpOpen } = ctx;
  const assets = t.assets || "/images/themes/red-v1";
  const ink = t.ink || "rgb(233, 206, 158)";
  const muted = t.muted || "rgb(217, 188, 134)";

  // Lịch tháng 5/2026: bắt đầu thứ Sáu (cell 4)
  const cells: (number | null)[] = [
    null, null, null, null, 1, 2, 3,
    4, 5, 6, 7, 8, 9, 10,
    11, 12, 13, 14, 15, 16, 17,
    18, 19, 20, 21, 22, 23, 24,
    25, 26, 27, 28, 29, 30, 31
  ];

  const calUrl =
    "https://www.google.com/calendar/render?action=TEMPLATE&text=" +
    encodeURIComponent("Đám cưới " + (d.groomFull || "Phan Hoài Nam") + " & " + (d.brideFull || "Lê Ngọc Linh")) +
    "&dates=20260530T033000Z/20260530T053000Z&ctz=Asia/Ho_Chi_Minh&details=" +
    encodeURIComponent("Tiệc cưới của " + (d.groomFull || "Phan Hoài Nam") + " & " + (d.brideFull || "Lê Ngọc Linh") + " tại " + (d.locTitle || "Tiệc cưới Trống Đồng Cảnh Hồ, 173 Trường Chinh, Quận Thanh Xuân, Hà Nội")) +
    "&location=" +
    encodeURIComponent(d.locTitle || "Tiệc cưới Trống Đồng Cảnh Hồ, 173 Trường Chinh, Quận Thanh Xuân, Hà Nội");

  return (
    <section className="relative flex flex-col gap-16 md:gap-20 px-3 md:px-6 pb-24 md:pb-32 z-10">
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span>THÔNG TIN LỄ CƯỚI /&nbsp;婚禮資訊</span>
      </h2>

      <div className="relative grid grid-cols-2 gap-x-2 md:gap-x-3 text-center font-serif text-[14px] md:text-[18px] tracking-[0.05em] grid-rows-[repeat(4,auto)] gap-y-1">
        {/* Nhà trai */}
        <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
          <span style={{ color: muted }}>
            <span>{d.groomFamTitle || "Ông Bà"} / 先生與女士</span>
          </span>
          <span
            className="text-[13px] md:text-[23px] [overflow-wrap:anywhere]"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              fontSize: "13px",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.groomFather || "Phan Tiến Minh"}</span>
            </span>
          </span>
          <span
            className="text-[13px] md:text-[23px] [overflow-wrap:anywhere]"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              fontSize: "13px",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.groomMother || "Vương Thị Hồng"}</span>
            </span>
          </span>
          <div
            className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.groomAddr || "Số 85 Nguyễn Thái Sơn, Phường 4, Gò Vấp, TP. Hồ Chí Minh"}</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                台北市大安區忠孝東路123號
              </span>
            </span>
          </div>
        </div>

        {/* Nhà gái */}
        <div className="row-span-4 grid grid-rows-subgrid min-w-0 justify-items-center">
          <span style={{ color: muted }}>
            <span>{d.brideFamTitle || "Ông Bà"} / 先生與女士</span>
          </span>
          <span
            className="text-[13px] md:text-[23px] [overflow-wrap:anywhere]"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              fontSize: "13px",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.brideFather || "Lê  Đăng Khoa"}</span>
            </span>
          </span>
          <span
            className="text-[13px] md:text-[23px] [overflow-wrap:anywhere]"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              fontSize: "13px",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.brideMother || "Nguyễn Kim Oanh"}</span>
            </span>
          </span>
          <div
            className="whitespace-pre-line [overflow-wrap:anywhere] mt-1 text-[11px] md:text-[18px] tracking-normal w-[90%] md:w-[80%] mx-auto flex flex-col"
            style={{
              color: muted,
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">{d.brideAddr || "Ngõ 95 Láng Hạ, Láng Hạ, Đống Đa, Hà Nội"}</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                台北市信義區信義路456號
              </span>
            </span>
          </div>
        </div>
      </div>

      {/* Thông báo hôn lễ */}
      <div
        className="relative text-center font-serif text-[16px] md:text-[20px] flex flex-col gap-2 mx-auto md:max-w-[560px]"
        style={{ whiteSpace: "pre-line", color: ink }}
      >
        <span className="flex flex-col items-center">
          <span lang="vi">
            {"TRÂN TRỌNG BÁO TIN\nLỄ THÀNH HÔN CỦA CON CHÚNG TÔI"}
          </span>
          <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
            {"謹此敬告\n我們子女的婚禮"}
          </span>
        </span>
      </div>

      {/* Tên cô dâu chú rể */}
      <div className="w-full min-w-0 relative flex w-full min-w-0 flex-col items-center text-center gap-3 md:gap-4">
        <h3
          className="font-pinyon w-[80%] min-h-[80px] flex items-center justify-center leading-[50px] md:leading-[100px] whitespace-nowrap"
          style={{
            fontSize: "38px",
            fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive',
            fontWeight: 400,
            color: ink,
          }}
        >
          {d.groomFull || "Phan Hoài Nam"}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            color: muted,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          <span>{d.groomRole || "ÚT NAM"} / 幼子</span>
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
            fontSize: "38px",
            fontFamily: '"Pinyon Script", "Great Vibes", ChungDoiIndic, cursive',
            fontWeight: 400,
            color: ink,
          }}
        >
          {d.brideFull || "Lê Ngọc Linh"}
        </h3>
        <div
          className="text-xs uppercase tracking-[0.2em]"
          style={{
            color: muted,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          <span>{d.brideRole || "ÚT NỮ"} / 幼女</span>
        </div>
      </div>

      {/* Chi tiết Lễ thành hôn */}
      <div
        className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
        style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}
      >
        <div className="flex flex-col items-center gap-2" style={{ color: ink }}>
          <span className="flex flex-col items-center">
            <span lang="vi" className="whitespace-pre-line tracking-[0.05em] text-[16px] md:text-[20px]">
              {"LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA"}
            </span>
            <span
              lang="zh-Hant"
              className="whitespace-pre-line tracking-[0.05em] text-[16px] md:text-[20px] text-[0.85em] opacity-70"
            >
              {"婚禮儀式舉行地點\n自宅"}
            </span>
          </span>
          <p className="font-normal text-[16px] md:text-[18px] mb-2 uppercase" style={{ color: ink }}>
            VÀO LÚC / 時間
          </p>
        </div>
        <div
          className="text-[20px] md:text-[30px]"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          {d.ceremonies?.[0]?.time || "09:00"}
        </div>
        <div className="flex items-center gap-6" style={{ color: ink }}>
          <span
            className="text-[12px] md:text-[16px]"
            style={{
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              textAlign: "right",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">CHỦ NHẬT</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                星期日
              </span>
            </span>
          </span>
          <img alt="divider" className="h-6 md:h-8 w-[2px]" src={`${assets}/line6.svg`} />
          <span
            className="text-[30px] md:text-[40px]"
            style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}
          >
            01
          </span>
          <img alt="divider" className="h-6 md:h-8 w-[2px]" src={`${assets}/line6.svg`} />
          <span
            className="text-[12px] md:text-[16px]"
            style={{
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              textAlign: "left",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">THÁNG 02</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                2月
              </span>
            </span>
          </span>
        </div>
        <div
          className="text-[18px] md:text-[24px]"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          2026
        </div>
        <div
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          ( Tức ngày 14 tháng 12 năm Ất Tỵ /&nbsp;農曆乙巳年臘月十四)
        </div>
      </div>

      {/* Tiêu đề Tiệc cưới */}
      <h2
        className="uppercase font-normal text-[20px] md:text-[26px] text-center"
        style={{
          color: ink,
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          fontSize: "20px",
          letterSpacing: "0.05em",
        }}
      >
        <span>THÔNG TIN TIỆC CƯỚI /&nbsp;婚宴資訊</span>
      </h2>

      {/* Chi tiết Tiệc cưới */}
      <div
        className="relative flex flex-col items-center gap-4 md:gap-5 text-center"
        style={{
          fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          color: ink,
        }}
      >
        <h3
          className="font-normal uppercase text-[16px] md:text-[20px] flex flex-col items-center"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            letterSpacing: "0.05em",
          }}
        >
          <span className="flex flex-col items-center">
            <span lang="vi">Tiệc cưới sẽ diễn ra vào&nbsp;lúc:</span>
            <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
              婚宴將於以下時間舉行：
            </span>
          </span>
        </h3>
        <div
          className="text-[20px] md:text-[30px]"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          {d.time || "10:30"}
        </div>
        <div className="flex items-center gap-6" style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}>
          <span
            className="text-[12px] md:text-[16px] uppercase"
            style={{
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              textAlign: "right",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">THỨ BẢY</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                星期六
              </span>
            </span>
          </span>
          <img alt="divider" className="h-6 md:h-8 w-[2px]" src={`${assets}/line6.svg`} />
          <span
            className="text-[30px] md:text-[40px]"
            style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}
          >
            30
          </span>
          <img alt="divider" className="h-6 md:h-8 w-[2px]" src={`${assets}/line6.svg`} />
          <span
            className="text-[12px] md:text-[16px] uppercase"
            style={{
              fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              textAlign: "left",
            }}
          >
            <span className="flex flex-col items-center">
              <span lang="vi">THÁNG 05</span>
              <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                5月
              </span>
            </span>
          </span>
        </div>
        <div
          className="text-[18px] md:text-[24px]"
          style={{ fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif" }}
        >
          2026
        </div>
        <div
          className="text-xs md:text-sm uppercase tracking-[0.25em]"
          style={{
            color: muted,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          ( Tức ngày 14 tháng 4 năm Bính Ngọ /&nbsp;農曆丙午年四月十四)
        </div>

        <div className="flex items-center justify-center gap-8 mt-4">
          <div className="flex flex-col items-center">
            <span
              className="text-xs uppercase tracking-wider"
              style={{
                color: muted,
                fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              }}
            >
              <span className="flex flex-col items-center">
                <span lang="vi">Khai tiệc</span>
                <span lang="zh-Hant" className=" text-[0.85em] opacity-70">
                  開席
                </span>
              </span>
            </span>
            <span
              className="text-lg md:text-xl font-medium mt-1"
              style={{
                color: ink,
                fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
              }}
            >
              {d.time || "10:30"}
            </span>
          </div>
        </div>

        {/* Lịch tháng */}
        <div className="mt-2 w-[296px] md:w-[352px] max-w-full mx-auto">
          <div
            className="w-full max-w-[280px] md:max-w-[310px] mx-auto rounded-lg overflow-hidden border !max-w-none w-full"
            style={{
              borderColor: "color-mix(in srgb, rgb(233, 206, 158) 27%, transparent 73%)",
              color: ink,
            }}
          >
            <div
              className="text-center py-2.5 text-[13px] md:text-[14px] font-semibold tracking-wide border-b"
              style={{ borderColor: "color-mix(in srgb, rgb(233, 206, 158) 27%, transparent 73%)" }}
            >
              Tháng 5 / 2026
            </div>
            <div className="grid grid-cols-7 border-b-2" style={{ borderColor: ink }}>
              {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                <div key={day} className="text-center py-1.5 text-[10px] md:text-[11px] font-medium opacity-60">
                  {day}
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-y-0.5 px-1 py-2">
              {cells.map((val, idx) => (
                <div key={idx} className="flex items-center justify-center h-[30px] md:h-[34px]">
                  {val === 30 ? (
                    <div className="relative w-[26px] h-[24px] md:w-[30px] md:h-[28px] flex items-center justify-center">
                      <svg viewBox="0 0 24 22" className="absolute inset-0 w-full h-full drop-shadow-sm" fill="#e9ce9e">
                        <path d="M12 21C12 21 1.5 13.5 1.5 7.5C1.5 4.46 3.96 2 7 2C8.76 2 10.35 2.81 11.4 4.09L12 4.8L12.6 4.09C13.65 2.81 15.24 2 17 2C20.04 2 22.5 4.46 22.5 7.5C22.5 13.5 12 21 12 21Z" />
                      </svg>
                      <span
                        className="relative z-10 text-[11px] md:text-[12px] font-bold"
                        style={{ color: "rgb(51, 51, 51)" }}
                      >
                        30
                      </span>
                    </div>
                  ) : val !== null ? (
                    <span className="text-[12px] md:text-[13px]">{val}</span>
                  ) : null}
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
          className="mt-4 text-sm underline underline-offset-4 decoration-1 transition-opacity hover:opacity-70"
          style={{
            color: ink,
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
            background: "none",
          }}
        >
          <span>Thêm vào lịch / 添加到日曆</span>
        </a>
      </div>

      {/* Nút xác nhận RSVP */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full -mt-4 -mb-6">
        <button
          type="button"
          onClick={() => setRsvpOpen(true)}
          className="inline-flex items-center justify-center rounded-full px-6 py-2 font-semibold transition-transform hover:scale-[1.03]"
          style={{
            backgroundColor: ink,
            color: t.cardBg || "rgb(85, 63, 24)",
            fontFamily: "Baskerville, \"Times New Roman\", ChungDoiIndic, serif",
          }}
        >
          <span className="relative z-10 flex min-h-0 items-center justify-center gap-2">
            <span>XÁC NHẬN / 確認出席</span>
          </span>
        </button>
      </div>
    </section>
  );
}
