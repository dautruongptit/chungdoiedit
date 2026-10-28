import { useEffect, useState, useMemo } from "react";
import type { Inv } from "@/types/invitation";
import { defaultInv } from "@/features/editor/data/defaultData";
import Preview from "@/features/invitation/components/Preview";
import { createDraft } from "@/services/storage/store";
import { Link, navigate } from "@/app/router";
import { TEMPLATES, Tpl, TPL_CDN, introDefaultFor, templateByIdOrSlug } from "@/features/templates/data/templates";
import { TEMPLATE_THEMES } from "@/features/invitation/config/templateThemes";
import { getGiftboxConfig } from "@/features/invitation/config/giftboxConfigs";
import { getTemplateManifest, getThemeBackgroundUrl } from "@/features/templates/data/themeManifest";

import { REFERENCE_COUPLES } from "@/features/templates/data/referenceCouples";
import { REFERENCE_COVERS } from "@/features/templates/data/referenceCovers";
import { assetUrl } from "@/services/asset";
import { getTemplateDemo } from "@/features/invitation/shell/specs";

/**
 * Xây dựng dữ liệu thiệp mời mẫu (Demo data) chuẩn mực cho từng mẫu thiệp.
 * Đảm bảo sử dụng đúng định danh theme, đúng ảnh của mẫu thiệp,
 * không mượn ảnh của mẫu khác, không hardcode một mẫu cho toàn bộ.
 */
function buildDemoInv(tpl: Tpl): Inv {
  const isTraditional = [
    "song_hy", "song_long", "dragon_phoenix", "song_hac", "double_phoenix",
    "double_dragon", "nhat_binh", "royal", "co_ba", "traditional", "chibi"
  ].some((k) => tpl.id.includes(k) || tpl.slug.includes(k));

  const isMinimalism = tpl.id.includes("minimalism") || tpl.slug.includes("minimalism");
  const isDarkRed = tpl.id === "minimalism_darkred";
  const isBrown = tpl.id === "minimalism_brown";

  // Phân bổ ảnh đại diện cô dâu - chú rể
  let heroPhoto = defaultInv.heroPhoto;
  if (isBrown) {
    heroPhoto = "/images/photo-library/design/1e0986014ff4206f135df254987fb52eb45ae964e8cce6f0dba29a905e0e0b67.webp";
  } else if (isDarkRed) {
    heroPhoto = assetUrl("/images/photo-library/design/cdecf6cfe2eeb3cfd63829abde62f1066f10a364ec27d4c997c0f51012c8803e.webp");
  } else if (tpl.id === "dragon_phoenix_v2_red") {
    heroPhoto = assetUrl("/images/photo-library/design/c0c85699ec961efa2db8747663ff1a34ad9237b8f5c4bc9c18db8e5c33e16f76.webp");
  }

  // Tên cặp đôi chính xác theo từng mẫu từ website gốc
  const refCouple = REFERENCE_COUPLES[tpl.id];
  const gFull = refCouple?.groom || "Trần Thế Bảo";
  const gNick = refCouple?.groom ? refCouple.groom.split(" ").slice(-2).join(" ") : "Thế Bảo";
  const bFull = refCouple?.bride || "Lê Ngọc Ánh";
  const bNick = refCouple?.bride ? refCouple.bride.split(" ").slice(-2).join(" ") : "Ngọc Ánh";

  // Bảng màu trang phục & nhận diện theme
  const palette = TEMPLATE_THEMES[tpl.id];
  let dressColors = ["#542e08", "#9c7653", "#d6c5b3", "#ece5dd"];
  if (palette) {
    dressColors = [palette.ink, palette.bg, "#d6c5b3", "#ece5dd"];
  }

  // Dữ liệu màn hình mở thiệp chính xác theo từng mẫu
  const refCover = REFERENCE_COVERS[tpl.id];
  const coverDate = refCover?.date || "2026-11-28";
  const coverGuest = refCover?.envelopeGuestBadge || refCover?.envelopeGuest || "Thân Mời";
  const coverInviteMsg = refCover?.envelopeInviteMessage ?? "đến dự buổi tiệc chung vui cùng gia đình chúng tôi";

  if (tpl.id === "boho_floral_green") {
    return {
      ...defaultInv,
      templateId: "boho_floral_green",
      templateName: "Hoa Mộc - Xanh",
      templateThumb: TPL_CDN + tpl.img,
      heroOn: true,
      heroPhoto: "/images/photo-library/design/5b2fafb74f1aa84ca843acded191b5e4629c62f9b73820281864f27167312b06.webp",
      groomFull: "Trần Minh Quân",
      groomNick: "Minh Quân",
      groomRole: "Trưởng Nam",
      brideFull: "Nguyễn Thu Hà",
      brideNick: "Thu Hà",
      brideRole: "Út Nữ",
      groomFamTitle: "Ông Bà",
      groomFather: "Trần Văn Hùng",
      groomMother: "Hạm Thị Lan",
      groomAddr: "25 Ngõ 12 Đặng Văn Ngữ, Đống Đa, Hà Nội",
      brideFamTitle: "Ông Bà",
      brideFather: "Nguyễn Văn Bình",
      brideMother: "Phan Thị Hương",
      brideAddr: "18 Ngõ 86 Chùa Hà, Cầu Giấy, Hà Nội",
      announcementLine1: "TRÂN TRỌNG BÁO TIN",
      announcementLine2: "LỄ THÀNH HÔN CỦA CON CHÚNG TÔI",
      date: "2026-05-24",
      time: "18:00",
      welcomeTime: "17:30",
      startTime: "18:00",
      locTitle: "TIỆC CƯỚI SẼ TỔ CHỨC TẠI",
      address: "Tiệc Cưới Hoàng Gia, Ngõ 74 P. Nguyễn Thị Định, Nhân Chính, Thanh Xuân, Hà Nội",
      dressColors: ["#224327", "#4a6b4f", "#c2e3c7", "#fffaf7"],
      envelopeGuest: "Thân Mời",
      envelopeInviteMessage: "",
      musicUrl: "/music/my-love-westlife.mp3",
      musicName: "My Love - Westlife",
      musicAutoPlay: true,
      albumLayout: "3d",
      photos: [
        "/images/photo-library/design/5019eadee002f02ce6f39d9c5bdb7304d4da683b4e109c41e7ed14e63391d9b0.webp",
        "/images/photo-library/design/1f83fb78c75b96a05661eca4cbc50dd771fc37411920623d6d9729eea1daa7c8.webp",
        "/images/photo-library/design/a4bacc8760315d26e8660bcd2943d479c968e7e92892d2e367cfab6facb63017.webp",
        "/images/photo-library/design/655375b2b2c6edb9772053c6a2150a6247ccf7002f69a1b733f682fa05d6309f.webp",
        "/images/photo-library/design/fb57414f47aa2c9189bc9fa20f34d557dd1a4cd13a908fd30633275ca5abaf6d.webp",
        "/images/photo-library/design/76763999ecb5db3569cea7991a2ea4fdf32e4a2639daeb28c6f2a9b5fdf6f313.webp",
        "/images/photo-library/design/da4ca736067f9572362cd90a28e95274e985ffa76cc58e3c36b23219ebf4f6f7.webp",
        "/images/photo-library/design/107e38d720d04da6442122cbe91d47eda6ebc8c962579a14b345ba3ad6dd49a4.webp",
        "/images/photo-library/design/5b2fafb74f1aa84ca843acded191b5e4629c62f9b73820281864f27167312b06.webp",
        "/images/photo-library/design/3fcfad216695abf4dbd4198edb2ba4d451546d5e1231aafbc66559e164daad27.webp",
      ],
      gifts: [
        {
          id: "g1",
          who: "groom",
          bankName: "Vietcombank",
          bankCode: "VCB",
          bankBin: "970436",
          bankLogo: "",
          accountNumber: "0000000000",
          accountName: "THIEP CUOI DEMO",
          qrUrl: "/images/qr/boho_floral_green_groom.png",
        },
        {
          id: "g2",
          who: "bride",
          bankName: "Vietcombank",
          bankCode: "VCB",
          bankBin: "970436",
          bankLogo: "",
          accountNumber: "6665558888",
          accountName: "NGUYEN THU HA",
          qrUrl: "/images/qr/boho_floral_green_bride.png",
        },
      ],
      wishes: [
        { name: "Bạn Hoàng dev", msg: "Chúc 2 bạn mãi yêu nhau, đầu bạc răng long", at: "13:44:27 7/4/2026" },
        { name: "Hoài Nam", msg: "Chúc hai bạn luôn nắm tay nhau qua mọi chặng đường!!!", at: "13:43:31 7/4/2026" },
        { name: "Bạn Linh", msg: "Mừng ngày trọng đại! Chúc hai bạn cười nhiều hơn cãi, yêu nhiều hơn giận nhen!", at: "13:42:43 7/4/2026" },
        { name: "Chị Hạnh", msg: "Chúc hai em trăm năm hạnh phúc, sớm sinh quý tử nhé!", at: "12:15:00 7/4/2026" },
      ],
      ceremonies: [],
    };
  }

  const giftConfig = getGiftboxConfig(tpl.id);

  const base: Inv = {
    ...defaultInv,
    templateId: tpl.id,
    templateName: tpl.name,
    templateThumb: TPL_CDN + tpl.img,
    heroOn: true,
    heroPhoto,
    introCustom: false,
    introText: "",
    groomFull: gFull,
    groomNick: gNick,
    brideFull: bFull,
    brideNick: bNick,
    dressColors,
    envelopeGuest: coverGuest,
    envelopeInviteMessage: coverInviteMsg,
    ...(isDarkRed ? {
      // Dữ liệu demo của trang gốc (Minimalism - Đỏ Đậm)
      order: "groom" as const,
      albumLayout: "3d" as const,
      countdown: false,
      wishes: [
        { name: "Duy Khang", msg: "Chúc mừng ngày vui của hai bạn, trăm năm hạnh phúc bền lâu!", at: "12:30:49 26/7/2026" },
        { name: "Lan Chi", msg: "Đẹp đôi quá! Chúc hai bạn sống bên nhau đầu bạc răng long.", at: "12:30:49 26/7/2026" },
        { name: "Tuấn Anh", msg: "Mừng hạnh phúc hai bạn! Chúc gia đình nhỏ luôn đầy ắp tiếng cười.", at: "12:30:49 26/7/2026" },
        { name: "Khánh Vy", msg: "Chúc cô dâu chú rể luôn giữ được nụ cười này mãi mãi nhé!", at: "12:30:49 26/7/2026" },
        { name: "Gia Bảo", msg: "Nhìn thiệp là thấy tình yêu rồi. Chúc hai bạn trăm năm viên mãn!", at: "12:30:49 26/7/2026" },
        { name: "Phương Anh", msg: "Chúc đám cưới thật trọn vẹn và ấm áp. Hạnh phúc nhé hai bạn!", at: "12:30:49 26/7/2026" },
        { name: "Minh Đức", msg: "Cuối cùng cũng tới ngày trọng đại, chúc mừng cặp đôi xứng lứa vừa đôi!", at: "12:30:49 26/7/2026" },
        { name: "Thu Hà", msg: "Chúc hai bạn mãi mãi yêu thương và bên nhau trọn đời!", at: "12:30:49 26/7/2026" },
        { name: "Hoàng Long", msg: "Mẫu thiệp đẹp quá, tông đỏ đô sang trọng ghê. Chúc mừng hai bạn!", at: "12:30:49 26/7/2026" },
        { name: "Ngọc Trâm", msg: "Chúc Tuấn Kiệt và Minh Anh trăm năm hạnh phúc, sớm sinh quý tử nhé!", at: "12:30:49 26/7/2026" },
      ],
      photos: [
        "abd329aeb24dfdb5db34be2cd39ccbe4b5b0f943f66a89f8c855b2d615cc4e24",
        "09c78712bd94460430a8a633a8e72a0576016ea56e183d89d97c551649ee9ece",
        "d7695e2fed94d3347e78455624c26164a088b3a365bce422de1ef752fdcab2c1",
        "07db56b959aa4410010132a54bfbedd0518e911389a0c6623b946096377bbb97",
        "a054d52f9d4d1ed606a4226463f555e359dee874ba7138eab94e10a18b39ddda",
        "1cfc881768c6a5c42054d40c4239f4f56b59a159692734f3deb8e79fc55499d2",
        "e13655d0de07f307824d9dd1ad5a399434ebc0c016d86aaa4c1bde7452a4abb1",
      ].map((h) => assetUrl(`/images/photo-library/design/${h}.webp`)),
      groomFull: "Đặng Hoàng Long",
      brideFull: "Vũ Bảo Ngọc",
      groomRole: "Trưởng Nam",
      brideRole: "Út Nữ",
      groomFather: "Đặng Văn Thắng",
      groomMother: "Bùi Thị Mai",
      groomAddr: "Quận 1, TP. Hồ Chí Minh",
      brideFather: "Vũ Đức Trung",
      brideMother: "Ngô Thị Hạnh",
      brideAddr: "Quận 3, TP. Hồ Chí Minh",
      ceremonies: [{
        title: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
        date: "2026-01-03",
        time: "09:00",
        place: "TƯ GIA",
        lunar: "Tức ngày 15 tháng 11 năm Ất Tỵ",
      }],
    } : {}),
    ...(isBrown ? {
      // Dữ liệu demo của trang gốc (Minimalism - Nâu); mọi mục của thiệp đọc từ dữ liệu này
      photos: ["/images/photo-library/design/1e0986014ff4206f135df254987fb52eb45ae964e8cce6f0dba29a905e0e0b67.webp", "/images/photo-library/design/cea4d58014368af2908a492045ec39a91ab5ed17d4544eb6520733a40beb078a.webp", "/images/photo-library/design/6c5d0a317cc97ce46cf6798f0248ceb3d97739840e1f27fc5040798c21ad55c6.webp", "/images/photo-library/design/3f8b94b89026dc3738bb80e625b8ee993ce93949e595ef9539b9c41d17898671.webp", "/images/photo-library/design/6f6851cc63126158d802563c047297dd76ba3f532c1e3809a556ab617c312000.webp", "/images/photo-library/design/1c177f9721cd1802abf4fa62e6f22113bb477130cbc30b138c7a42cd995bb670.webp", "/images/photo-library/design/0c4b3896fb70a7e08523a1299f851735fa4544c530ad41ab5ce1a6dc4677173c.webp", "/images/photo-library/design/1bbb42e6ee9c2736341c2a79759bae02176bbb899bfca22cc71c0fa860f64a9e.webp"],
      order: "groom" as const,
      groomNick: "Hoàng Nam",
      brideNick: "Thảo Vy",
      groomFull: "Nguyễn Hoàng Nam",
      brideFull: "Trần Thảo Vy",
      groomRole: "Trưởng Nam",
      brideRole: "Út Nữ",
      groomFamTitle: "Ông Bà",
      brideFamTitle: "Ông Bà",
      groomFather: "Trần Quốc Hưng",
      groomMother: "Nguyễn Thị Hồng",
      groomAddr: "Quận 1, TP. Hồ Chí Minh",
      brideFather: "Lê Văn Thành",
      brideMother: "Phạm Thị Lan",
      brideAddr: "Quận 3, TP. Hồ Chí Minh",
      ceremonies: [{
        title: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
        date: "2026-01-03",
        time: "09:00",
        place: "TƯ GIA",
        lunar: "Tức ngày 15 tháng 11 năm Ất Tỵ",
      }],
      hideWelcomeTimes: false,
      mapUrl: "",
      countdown: false,
      dressOn: true,
      dressText: "Trang phục dự tiệc",
      dressColors: ["#001a08", "#e1bc7c", "#3b5d3b", "#f5e6c8"],
      schedOn: true,
      sched: [
        { time: "17:00", text: "Đón khách" },
        { time: "18:00", text: "Khai tiệc" },
        { time: "18:30", text: "Nghi thức cưới" },
        { time: "19:00", text: "Cắt bánh & nâng ly" },
        { time: "20:30", text: "Kết thúc tiệc" },
      ],
      thanksOn: true,
      thanks: "Sự hiện diện của quý khách là niềm vinh hạnh của gia đình chúng tôi!",
      wishes: [
        { name: "Mỹ Linh", msg: "Chúc hai bạn trăm năm hạnh phúc, vạn sự như ý, một đám cưới thật vui!", at: "21:20:27 14/7/2026" },
        { name: "Trọng Nhân", msg: "Chúc mừng hai bạn về chung một nhà! Chúc luôn vui vẻ và yêu thương nhau thật nhiều.", at: "21:20:27 14/7/2026" },
        { name: "Phương Vy", msg: "Chúc Nam và Vy mãi ngọt ngào như ngày đầu, hạnh phúc trọn đời bên nhau!", at: "21:20:27 14/7/2026" },
        { name: "Hải Đăng", msg: "Chúc mừng anh chị! Chúc hai người xây dựng tổ ấm thật hạnh phúc và bền lâu.", at: "21:20:27 14/7/2026" },
        { name: "Ngọc Diệp", msg: "Nhìn thiệp mà thấy ấm áp ghê. Chúc hai bạn một hôn lễ thật trọn vẹn và đáng nhớ!", at: "21:20:27 14/7/2026" },
        { name: "Đức Thịnh", msg: "Chúc cô dâu chú rể trăm năm hạnh phúc, gia đình êm ấm, con cái đủ đầy!", at: "21:20:27 14/7/2026" },
        { name: "Lan Anh", msg: "Chúc mừng hạnh phúc hai bạn nhé! Mong hai bạn luôn nắm tay nhau đi hết cuộc đời.", at: "21:20:27 14/7/2026" },
        { name: "Quốc Bảo", msg: "Mừng đám cưới của cậu mợ! Chúc hai bạn mãi yêu thương và thấu hiểu nhau.", at: "21:20:27 14/7/2026" },
        { name: "Thu Hà", msg: "Ôi tấm thiệp đẹp quá! Chúc hai đứa hạnh phúc viên mãn, sớm có tin vui.", at: "21:20:27 14/7/2026" },
        { name: "Minh Tuấn", msg: "Chúc mừng Hoàng Nam và Thảo Vy! Chúc hai bạn trăm năm hạnh phúc, đầu bạc răng long nhé!", at: "21:20:27 14/7/2026" },
      ],
      giftOn: true,
      gifts: [
        { id: "g1", who: "groom" as const, bankName: "Vietcombank", bankCode: "VCB", bankBin: "970436", accountNumber: "1023456789", accountName: "TRAN TUAN KIET", qrUrl: "/images/qr/boho_floral_green_groom.png" },
        { id: "g2", who: "bride" as const, bankName: "Techcombank", bankCode: "TCB", bankBin: "970407", accountNumber: "9988776655", accountName: "LE MINH ANH", qrUrl: "/images/qr/boho_floral_green_groom.png" },
      ],
    } : {}),
    giftDisplayMode: giftConfig.giftboxType === "envelope" ? "envelope" : "gift_box",
    date: coverDate,
    time: "18:00",
    welcomeTime: "17:30",
    startTime: "18:00",
    locTitle: isDarkRed || isBrown ? "Tiệc cưới sẽ tổ chức tại" : "TIỆC CƯỚI SẼ DIỄN RA VÀO LÚC:",
    address: isDarkRed || isBrown
      ? "Trung Tâm Hội Nghị White Palace, 194 Hoàng Văn Thụ, Phường 9, Quận Phú Nhuận, TP. Hồ Chí Minh"
      : "Trung tâm Hội nghị Tiệc cưới Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh",
  };
  return { ...base, ...(getTemplateDemo(tpl.id) ?? {}) } as Inv;
}

/**
 * Trang xem Demo thiệp cưới độc lập:
 * - Đường dẫn chuẩn: /vi/mau-thiep/<slug>/demo
 * - Đường dẫn trực tiếp / rút gọn: /demo/<slug> hoặc /demo?template=<id>
 * - Hỗ trợ cả slug (dạng url thân thiện) và id (mã kỹ thuật).
 */
export default function Demo({ slug }: { slug: string }) {
  // 1. Xác định chính xác template được chọn (hỗ trợ slug, id, và hyphenated id)
  const tpl = useMemo(() => templateByIdOrSlug(slug), [slug]);

  // 2. Trạng thái dữ liệu thiệp demo tương ứng với template
  const [d, setD] = useState<Inv>(() => (tpl ? buildDemoInv(tpl) : defaultInv));

  // 3. Trạng thái đã mở thiệp hay chưa (ẩn thanh nổi trên màn hình bì thư)
  const [isOpened, setIsOpened] = useState(() => {
    return typeof location !== "undefined" && new URLSearchParams(location.search).get("open") === "1";
  });

  // Như trang gốc: thiệp đã mở tự cuộn xuống (~50px/giây) cho tới khi khách tự thao tác (?autoscroll=0 để tắt)
  useEffect(() => {
    if (!isOpened || new URLSearchParams(location.search).get("autoscroll") === "0") return;
    let raf = 0;
    let last = 0;
    let acc = 0;
    const stop = () => cancelAnimationFrame(raf);
    const tick = (t: number) => {
      if (last) {
        acc += ((t - last) * 50) / 1000;
        const px = Math.floor(acc);
        if (px) { window.scrollBy(0, px); acc -= px; }
      }
      last = t;
      if (window.innerHeight + window.scrollY < document.documentElement.scrollHeight - 2) raf = requestAnimationFrame(tick);
    };
    const events = ["wheel", "touchstart", "mousedown", "keydown"] as const;
    events.forEach((e) => window.addEventListener(e, stop, { passive: true, once: true }));
    raf = requestAnimationFrame(tick);
    return () => { stop(); events.forEach((e) => window.removeEventListener(e, stop)); };
  }, [isOpened]);

  // 4. Xử lý khi bấm nút "Tạo thiệp theo mẫu này"
  const choose = () => {
    if (!tpl) return;
    const id = createDraft(tpl);
    navigate(`/edit/${id}?template=${tpl.id}`);
  };

  // 5. Nếu không tìm thấy template: hiển thị trang Not Found chuẩn UI, không crash, không fallback âm thầm
  if (!tpl) {
    return (
      <div className="page narrow text-center" style={{ minHeight: "80vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "60px 20px" }}>
        <div style={{ width: "68px", height: "68px", borderRadius: "50%", background: "rgba(239, 68, 68, 0.12)", display: "flex", alignItems: "center", justifyContent: "center", color: "#ef4444", marginBottom: "20px" }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="10" />
            <line x1="15" y1="9" x2="9" y2="15" />
            <line x1="9" y1="9" x2="15" y2="15" />
          </svg>
        </div>
        <h1 className="page-title" style={{ fontSize: "26px", fontWeight: 700, marginBottom: "8px" }}>
          Không tìm thấy mẫu thiệp
        </h1>
        <p className="page-sub" style={{ maxWidth: "460px", marginBottom: "28px", color: "rgba(var(--fgrgb), 0.7)", lineHeight: "1.6" }}>
          Mẫu thiệp với mã định danh <code style={{ background: "rgba(var(--fgrgb), 0.08)", padding: "2px 8px", borderRadius: "6px" }}>"{slug}"</code> không tồn tại trong hệ thống hoặc đường dẫn không hợp lệ.
        </p>
        <Link href="/vi/mau-thiep" className="btn-pill" style={{ display: "inline-flex", alignItems: "center", gap: "8px", padding: "0 28px", height: "46px" }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
          <span>Xem tất cả 75 mẫu thiệp</span>
        </Link>
      </div>
    );
  }

  // 6. Render bản xem trước trực tiếp chuẩn 100% như website gốc chungdoi.com
  // Mặc định giao diện demo hoàn toàn thuần khiết (không có thanh floating navigation đè lên thiệp).
  // Nếu có tham số ?actions=1, mới hiển thị thanh công cụ tiện ích.
  const showActions = typeof location !== "undefined" && new URLSearchParams(location.search).get("actions") === "1";

  return (
    <div className="demo-standalone-wrap">
      {/* Floating Action Bar - Chỉ hiển thị khi có tham số ?actions=1 */}
      {showActions && (
        <div className="demo-floating-header" style={{ position: "fixed", bottom: "24px", right: "20px", zIndex: 100, display: "flex", alignItems: "center", gap: "10px" }}>
          <Link
            href="/vi/mau-thiep"
            className="demo-float-btn back"
            title="Quay lại kho mẫu"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Kho mẫu</span>
          </Link>
          <button
            type="button"
            className="demo-float-btn choose"
            onClick={choose}
            title="Tạo thiệp theo mẫu này"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 5v14M5 12h14" />
            </svg>
            <span>Tạo thiệp</span>
          </button>
        </div>
      )}

      {/* Invitation Preview Component */}
      <Preview
        d={d}
        set={(p) => setD((prev) => ({ ...prev, ...p }))}
        standalone={true}
        onEnvelopeOpen={() => setIsOpened(true)}
      />
    </div>
  );
}
