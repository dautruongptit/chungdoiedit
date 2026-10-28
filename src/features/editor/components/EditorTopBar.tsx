import { useState } from "react";
import { useTheme } from "@/app/theme";
import { LoginModal } from "@/features/auth/components/LoginModal";

const LOGO_SRC = "data:image/svg+xml;utf8," + encodeURIComponent("<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32'><rect width='32' height='32' rx='8' fill='#fc0081'/><g fill='none' stroke='#fff' stroke-width='1.6' stroke-linecap='round' stroke-linejoin='round'><path d='M16 7c-2.4 2.6-3.4 5.6-3.4 8.6 0 3 1.4 5.4 3.4 7.4 2-2 3.4-4.4 3.4-7.4C19.4 12.6 18.4 9.6 16 7Z'/><path d='M12.4 13.2C9.8 12.6 7.4 13 6 14.6c.4 3.6 3.4 6.8 7.6 8'/><path d='M19.6 13.2c2.6-.6 5 -.2 6.4 1.4-.4 3.6-3.4 6.8-7.6 8'/><path d='M10 24.4h12'/></g></svg>");

/**
 * Thanh trên cùng của editor ở trạng thái chưa đăng nhập — dựng theo HTML đo từ trang gốc (daisyUI navbar).
 * Khi đã đăng nhập, EditorPage vẫn dùng TopNav chung.
 */
export default function EditorTopBar() {
  const { toggle } = useTheme();
  const [loginOpen, setLoginOpen] = useState(false);
  const onLogin = () => setLoginOpen(true);
  return (
    <>
      <div className="inv-root"><div className="navbar bg-base-100 shadow-sm"><div className="navbar-start lg:hidden"><a className="btn btn-ghost text-xl gap-2" href="/vi"><img alt="Chung Đôi" width="28" height="28" className="object-contain" src={LOGO_SRC} /><span style={{ fontFamily: "Pattaya, cursive" }}>Chung Đôi</span></a></div><div className="navbar-end lg:hidden"><button onClick={toggle} className="btn btn-ghost btn-circle btn-sm" aria-label="Switch to light mode" title="Chế độ sáng"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></button><button onClick={onLogin} className="btn btn-primary btn-sm">Đăng Nhập</button></div><div className="navbar-start hidden lg:flex"><a className="btn btn-ghost text-xl gap-2" href="/vi"><img alt="Chung Đôi" width="28" height="28" className="object-contain" src={LOGO_SRC} /><span style={{ fontFamily: "Pattaya, cursive" }}>Chung Đôi</span></a></div><div className="navbar-center hidden lg:flex"><div className="flex items-center gap-6"><a className="font-medium hover:text-primary transition-colors text-base-content" href="/vi/mau-thiep">Mẫu Thiệp</a><a className="font-medium hover:text-primary transition-colors text-base-content" href="/dashboard">Thiệp Của Tôi</a></div></div><div className="navbar-end hidden lg:flex"><button onClick={toggle} className="btn btn-ghost btn-circle btn-sm" aria-label="Switch to light mode" title="Chế độ sáng"><svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg></button><button onClick={onLogin} className="btn btn-primary">Đăng Nhập</button></div></div></div>
      {loginOpen && <LoginModal onClose={() => setLoginOpen(false)} />}
    </>
  );
}
