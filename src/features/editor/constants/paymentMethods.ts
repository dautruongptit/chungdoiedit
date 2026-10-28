export interface PaymentMethodConfig {
  id: string;
  name: string;
  category: "vietnam" | "international" | "other";
  icon: string;
  accent: string;
  description: string;
  supportsQR: boolean;
}

export const PAYMENT_METHODS: PaymentMethodConfig[] = [
  // Việt Nam & Phổ biến
  {
    id: "vietqr",
    name: "VietQR",
    category: "vietnam",
    icon: "/icons/payments/vietqr.svg",
    accent: "#E11D48",
    description: "Quét mã chuyển khoản ngân hàng nhanh qua Napas 247",
    supportsQR: true,
  },
  {
    id: "bank_generic",
    name: "Ngân hàng",
    category: "vietnam",
    icon: "/icons/payments/bank-generic.svg",
    accent: "#0F766E",
    description: "Chuyển khoản qua số tài khoản ngân hàng",
    supportsQR: true,
  },
  {
    id: "registry",
    name: "Danh sách quà cưới",
    category: "vietnam",
    icon: "/icons/payments/registry.svg",
    accent: "#7C3AED",
    description: "Liên kết danh sách quà hoặc registry",
    supportsQR: true,
  },
  {
    id: "upload_qr",
    name: "Ảnh mã QR",
    category: "vietnam",
    icon: "/icons/payments/upload-qr.svg",
    accent: "#4F46E5",
    description: "Tải ảnh mã QR cá nhân của bạn",
    supportsQR: false,
  },

  // Quốc tế
  {
    id: "paypal",
    name: "PayPal",
    category: "international",
    icon: "/icons/payments/paypal.svg",
    accent: "#003087",
    description: "Nhận tiền mừng quốc tế qua tài khoản PayPal",
    supportsQR: true,
  },
  {
    id: "wise",
    name: "Wise",
    category: "international",
    icon: "/icons/payments/wise.svg",
    accent: "#163300",
    description: "Nhận tiền chuyển khoản quốc tế chi phí thấp",
    supportsQR: true,
  },
  {
    id: "line_pay",
    name: "LINE Pay",
    category: "international",
    icon: "/icons/payments/line-pay.svg",
    accent: "#06C755",
    description: "Nhận thanh toán qua LINE Pay (Nhật Bản, Đài Loan...)",
    supportsQR: true,
  },
  {
    id: "venmo",
    name: "Venmo",
    category: "international",
    icon: "/icons/payments/venmo.svg",
    accent: "#3D95CE",
    description: "Thanh toán qua @handle Venmo (Mỹ)",
    supportsQR: true,
  },
  {
    id: "cashapp",
    name: "Cash App",
    category: "international",
    icon: "/icons/payments/cashapp.svg",
    accent: "#00D632",
    description: "Thanh toán qua $cashtag Cash App",
    supportsQR: true,
  },
  {
    id: "revolut",
    name: "Revolut",
    category: "international",
    icon: "/icons/payments/revolut.svg",
    accent: "#0666EB",
    description: "Thanh toán qua Revolut Pay (Châu Âu, Anh...)",
    supportsQR: true,
  },
  {
    id: "zelle",
    name: "Zelle",
    category: "international",
    icon: "/icons/payments/zelle.svg",
    accent: "#6D1ED4",
    description: "Chuyển tiền nhanh qua email/SĐT Zelle (Mỹ)",
    supportsQR: false,
  },
  {
    id: "sepa",
    name: "SEPA",
    category: "international",
    icon: "/icons/payments/sepa.svg",
    accent: "#003399",
    description: "Chuyển khoản IBAN liên ngân hàng Châu Âu",
    supportsQR: true,
  },

  // Khác
  {
    id: "note",
    name: "Lời nhắn",
    category: "other",
    icon: "/icons/payments/note.svg",
    accent: "#B45309",
    description: "Nhận lời chúc riêng hoặc phong bì trực tiếp",
    supportsQR: false,
  },
];
