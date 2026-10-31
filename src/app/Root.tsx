import { useEffect } from "react";
import EditorPage from "@/features/editor/EditorPage";
import TopNav from "@/components/layout/TopNav";
import { Logo } from "@/components/layout/Logo";
import Home from "@/pages/Home";
import Pricing from "@/pages/Pricing";
import Dashboard from "@/pages/Dashboard";
import Account from "@/pages/Account";
import Guests from "@/pages/Guests";
import Templates from "@/pages/Templates";
import Demo from "@/pages/Demo";
import { Link, navigate, usePath } from "@/app/router";
import { templateByIdOrSlug } from "@/features/templates/data/templates";
import { createDraft, getDraftCard } from "@/services/storage/store";

function Redirect({ to }: { to: string }) {
  useEffect(() => navigate(to), [to]);
  return null;
}

function Stub({ title }: { title: string }) {
  return (
    <div className="page narrow">
      <h1 className="page-title">{title}</h1>
      <p className="page-sub">Trang này chưa nằm trong phạm vi clone.</p>
    </div>
  );
}

export default function Root() {
  const path = usePath().replace(/\/+$/, "") || "/";

  // The editor renders its own TopNav + header.
  if (path.startsWith("/edit/")) return <EditorPage />;

  // Tạo thiệp trực tiếp: /invitations/create/:themeId
  const createMatch = path.match(/^\/invitations\/create\/([^/]+)$/);
  if (createMatch) {
    const themeParam = decodeURIComponent(createMatch[1]);
    const tpl = templateByIdOrSlug(themeParam);
    if (!tpl) {
      return (
        <div className="site">
          <TopNav />
          <div className="page narrow" style={{ textAlign: "center", padding: "80px 20px" }}>
            <h1 className="page-title">Không tìm thấy mẫu thiệp</h1>
            <p className="page-sub" style={{ marginTop: 12, marginBottom: 24 }}>
              Không tìm thấy mẫu thiệp cưới phù hợp với mã <code>{themeParam}</code>.
            </p>
            <Link href="/vi/mau-thiep" className="btn-pill" style={{ display: "inline-block", padding: "10px 24px" }}>
              ← Xem danh sách mẫu thiệp
            </Link>
          </div>
          <Footer />
        </div>
      );
    }
    if (getDraftCard()) return <Redirect to={`/vi/mau-thiep/${tpl.slug}/demo`} />;
    const draftId = createDraft(tpl);
    history.replaceState({}, "", `/edit/${draftId}?template=${tpl.id}`);
    return <EditorPage />;
  }

  if (path === "/invitations/create") return <Redirect to="/vi/mau-thiep" />;

  // Demo standalone view (supports /vi/mau-thiep/:slug/demo, /demo/:slug, and /demo?template=...)
  const demoMatch =
    path.match(/^\/vi\/mau-thiep\/([^/]+)\/demo$/) ||
    path.match(/^\/demo\/([^/]+)$/);

  if (demoMatch) {
    const slug = decodeURIComponent(demoMatch[1]);
    return <Demo key={slug} slug={slug} />;
  }

  if (path === "/demo") {
    const params = new URLSearchParams(window.location.search);
    const slug = params.get("template") || params.get("slug") || "minimalism-do-dam";
    return <Demo key={slug} slug={slug} />;
  }

  let page;
  if (path === "/") page = <Redirect to="/vi" />;
  else if (path === "/vi") page = <Home />;
  else if (demoMatch) page = <Demo slug={demoMatch[1]} />;
  else if (path === "/vi/mau-thiep") page = <Templates />;
  else if (path === "/vi/bang-gia") page = <Pricing />;
  else if (path === "/dashboard") page = <Dashboard />;
  else if (path === "/account") page = <Account />;
  else if (path === "/guests") page = <Guests />;
  else page = <Stub title="Sắp có" />;

  const showFooter = !demoMatch;

  return (
    <div className="site">
      <TopNav />
      {page}
      {showFooter && <Footer />}
    </div>
  );
}

const FOOTER_COLS = [
  { title: "SẢN PHẨM", links: [["Mẫu thiệp cưới", "/vi/mau-thiep"], ["Bảng giá", "/vi/bang-gia"], ["Hướng dẫn tạo thiệp", "/vi/tao-thiep-cuoi-online"]] },
  { title: "CÔNG CỤ", links: [["Tạo thiệp ngay", "/vi/mau-thiep"], ["Kế hoạch cử trưởng", "#"], ["Quản lý khách mời", "/guests"], ["Scan QR mời tiệc cưới", "#"], ["Đếm ngược ngày cưới", "#"]] },
  { title: "TÀI NGUYÊN", links: [["Cẩm nang cưới", "/vi/blog"], ["Kinh nghiệm thiết kế", "#"], ["Những câu hỏi", "#"], ["Dài lý", "#"], ["Ý kiến khách hàng", "#"], ["Đề ý", "#"]] },
  { title: "PHÁP LÝ", links: [["Thông tin doanh nghiệp", "#"], ["Chính sách bảo mật", "#"], ["Điều khoản sử dụng", "#"], ["Chính sách thanh toán", "#"], ["Ký kết & Liên Minh", "#"], ["Giải quyết khiếu nại", "#"]] },
];

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <Logo />
          <p>chungdoi.com là một nền tảng thiệp cưới online hiện đại, giúp cô dâu &amp; chú rể tạo thiệp mời đám cưới hoàn toàn miễn phí với hàng trăm mẫu thiệp đẹp.</p>
          <div className="footer-socials">
            <a href="#" aria-label="Facebook"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg></a>
            <a href="#" aria-label="TikTok"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1 0-5.78 2.92 2.92 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 3 15.57 6.33 6.33 0 0 0 9.37 22a6.33 6.33 0 0 0 6.38-6.43V9.4a8.16 8.16 0 0 0 4.84 1.58V7.55a4.83 4.83 0 0 1-1-.86z" /></svg></a>
            <a href="#" aria-label="YouTube"><svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zM9 16V8l8 4-8 4z" /></svg></a>
          </div>
        </div>
        {FOOTER_COLS.map((c) => (
          <div className="footer-col" key={c.title}>
            <h4>{c.title}</h4>
            {c.links.map(([label, href]) => <Link key={label} href={href}>{label}</Link>)}
          </div>
        ))}
      </div>
      <div className="footer-bottom">
        <span>© 2025 Chung Đôi · Thiệp Cưới Online</span>
        <span>Cài đặt cookie · Tiếng Việt · hello@chungdoi.com</span>
      </div>
    </footer>
  );
}
