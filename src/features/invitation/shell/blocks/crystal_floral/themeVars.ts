export interface CrystalFloralThemeVars {
  templateId: string;
  rootTestId: string;
  primaryColor: string;
  textColor: string;
  innerBorder: string;
  wmPrefix: string;
  wmStyle: string;
  wmItems: Array<{ cls: string; src: string; style: string }>;
  flower1: string;
  flower2: string;
  flower3: string;
  flower4: string;
  flower5: string;
  flowerFrame: string;
  calendarFrame: string;
  filigree: string;
  envelopeImg: string;
  topDecor: {
    containerCls: string;
    aspectRatio: string;
    imgCls: string;
  };
  bottomDecor: {
    aspectRatio: string;
    imgCls: string;
  };
  hero: {
    headerPadding: string;
    nameFontSize: string;
    ampFontSize: string;
  };
  flowerOffsets: {
    f2Ceremony: string;
    f3Ceremony: string;
    f3Reception: string;
    f2Venue: string;
  };
  dressCode: {
    letterSpacing: string;
    description: string;
    colors: Array<{ bg: string; border?: string }>;
  };
  scheduleIcons: Array<{ src: string; cls: string }>;
  defaultWishes: Array<{ name: string; time: string; msg: string }>;
  defaultPhotos: string[];
  defaultAccounts: Array<{ title: string; bank: string; accNum: string; name: string; qrSrc: string }>;
  albumInitialSlide: number;
  albumIndicator: "counter" | "dots";
  headingLetterSpacing: string;
  lunarTracking: string;
  ceremonyHeader: string;
  receptionHeading: string;
  lunarCore: string;
  groomParents: { father: string; mother: string; address: string };
  brideParents: { father: string; mother: string; address: string };
  hasCountdown: boolean;
  countdownText: string;
  calendarFrameAspect: string;
  cdcrFontSize: string;
  venueFlowerTop?: string;
  photoAspectRatios?: string[];
  venueTitle: string;
  venueAddress: string;
}

const DATA_BLUE = {
  "wm": [
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfb-cw) + var(--cfb-garland) + 0 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfb-cw) + var(--cfb-garland) + 0 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfb-cw) + var(--cfb-garland) + 0 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfb-cw) + var(--cfb-garland) + 0 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(2.068823 * var(--cfb-cw) + var(--cfb-garland) + 2 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(2.068823 * var(--cfb-cw) + var(--cfb-garland) + 2 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(2.068823 * var(--cfb-cw) + var(--cfb-garland) + 2 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(2.068823 * var(--cfb-cw) + var(--cfb-garland) + 2 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(3.942867 * var(--cfb-cw) + var(--cfb-garland) + 4 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(3.942867 * var(--cfb-cw) + var(--cfb-garland) + 4 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(3.942867 * var(--cfb-cw) + var(--cfb-garland) + 4 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(3.942867 * var(--cfb-cw) + var(--cfb-garland) + 4 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(5.816911 * var(--cfb-cw) + var(--cfb-garland) + 6 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(5.816911 * var(--cfb-cw) + var(--cfb-garland) + 6 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(5.816911 * var(--cfb-cw) + var(--cfb-garland) + 6 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(5.816911 * var(--cfb-cw) + var(--cfb-garland) + 6 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(7.690955 * var(--cfb-cw) + var(--cfb-garland) + 8 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(7.690955 * var(--cfb-cw) + var(--cfb-garland) + 8 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(7.690955 * var(--cfb-cw) + var(--cfb-garland) + 8 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(7.690955 * var(--cfb-cw) + var(--cfb-garland) + 8 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(9.564999 * var(--cfb-cw) + var(--cfb-garland) + 10 * var(--cfb-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(9.564999 * var(--cfb-cw) + var(--cfb-garland) + 10 * var(--cfb-gap) + var(--cfb-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower2.webp",
      "style": "top: calc(9.564999 * var(--cfb-cw) + var(--cfb-garland) + 10 * var(--cfb-gap) + 0.958716 * var(--cfb-cw) + var(--cfb-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-blue/flower3.webp",
      "style": "top: calc(9.564999 * var(--cfb-cw) + var(--cfb-garland) + 10 * var(--cfb-gap) + var(--cfb-off2) + 0.915328 * var(--cfb-cw) + var(--cfb-gap));"
    }
  ],
  "wishes": [
    {
      "name": "Đức Thắng",
      "time": "13:52:39 26/6/2026",
      "msg": "Cuối cùng cũng tới ngày trọng đại. Chúc hai bạn xây dựng gia đình thật ấm êm!"
    },
    {
      "name": "Lan Phương",
      "time": "13:52:39 26/6/2026",
      "msg": "Chúc cô dâu chú rể luôn rạng rỡ như ngày hôm nay. Trăm năm hạnh phúc!"
    },
    {
      "name": "Quốc Bảo",
      "time": "13:52:39 26/6/2026",
      "msg": "Hạnh phúc trọn vẹn nhé hai bạn. Nhất định mình sẽ có mặt chung vui!"
    },
    {
      "name": "Thu Hà",
      "time": "13:52:39 26/6/2026",
      "msg": "Mừng đám cưới của hai em. Chúc tổ ấm nhỏ luôn đầy ắp tiếng cười!"
    },
    {
      "name": "Hoàng Long",
      "time": "13:52:39 26/6/2026",
      "msg": "Đẹp đôi quá trời! Chúc hai bạn mãi mãi yêu thương và thấu hiểu nhau."
    },
    {
      "name": "Minh Anh",
      "time": "13:52:39 26/6/2026",
      "msg": "Chúc Bảo Lâm và Thanh Trúc trăm năm hạnh phúc, bên nhau đến đầu bạc răng long nhé!"
    }
  ],
  "photos": [
    "https://assets.chungdoi.com/photo-library/design/036763c59f7ef906b62e30b7008f6767941432825703c7b068764409b423b3c6.webp",
    "https://assets.chungdoi.com/photo-library/design/6c45bc2dd70976099d7f59ad31bc02dd1ad8935ff18a10d38d238b2e36e5f12d.webp",
    "https://assets.chungdoi.com/photo-library/design/6fe9f62d36debb4a93e21ee8c95f358e0197c941f756841866ce75ab6c08ec72.webp",
    "https://assets.chungdoi.com/photo-library/design/cef6b293479df24384ee066fa987780018c7ce4167ad8e26e8b41936f490af16.webp",
    "https://assets.chungdoi.com/photo-library/design/69640c372895b8462fef289a7bd0b406b9f6496a875cd08b4f2a75c4f7ea9194.webp",
    "https://assets.chungdoi.com/photo-library/design/389a487d88ccb51e43634bec13d090b64f9d70bd13815457faf311f84f79785d.webp",
    "https://assets.chungdoi.com/photo-library/design/203d3be2336e5704edd15098294996a712bee4fc22395c1fbb52810908c8c0bc.webp",
    "https://assets.chungdoi.com/photo-library/design/b9ac0e81f7efaf0133c6d4c056e995017630d351ab17c3873d53335d73b95567.webp"
  ],
  "accounts": [
    {
      "title": "Chú Rể - rrrr",
      "bank": "Vietcombank",
      "accNum": "543",
      "name": "rrrr",
      "qrSrc": "/api/qr-png?d=00020101021238470010A0000007270117000697043601035430208QRIBFTTA53037045802VN63049AB9&amp;ec=M"
    }
  ]
};
const DATA_GREEN = {
  "wm": [
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(2.079925 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(2.079925 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(2.079925 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(2.079925 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(3.965071 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(3.965071 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(3.965071 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(3.965071 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(5.850217 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(5.850217 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(5.850217 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(5.850217 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(7.735363 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(7.735363 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(7.735363 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(7.735363 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(9.620509 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(9.620509 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower2.webp",
      "style": "top: calc(9.620509 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + 0.933551 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-green/flower3.webp",
      "style": "top: calc(9.620509 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + var(--cfr-off2) + 0.951595 * var(--cfr-cw) + var(--cfr-gap));"
    }
  ],
  "wishes": [
    {
      "name": "Minh Anh",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc mừng hai bạn! Chúc Hoàng Phúc và Như Khuê trăm năm hạnh phúc, bên nhau trọn đời."
    },
    {
      "name": "Gia đình cô Bảy",
      "time": "17:04:39 9/8/2026",
      "msg": "Mừng hạnh phúc hai cháu. Chúc hai cháu mãi yêu thương và thấu hiểu nhau nhé!"
    },
    {
      "name": "Thu Trang",
      "time": "17:04:39 9/8/2026",
      "msg": "Thiệp đẹp quá trời! Chúc hai bạn một đám cưới thật viên mãn."
    },
    {
      "name": "Đức Huy",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc mừng anh chị! Sớm có tin vui nha hai người."
    },
    {
      "name": "Lan Phương",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc Như Khuê làm cô dâu thật xinh đẹp và hạnh phúc trọn vẹn!"
    },
    {
      "name": "Vợ chồng Tú - Hằng",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc hai em xây dựng tổ ấm đầm ấm, ngập tràn tiếng cười."
    },
    {
      "name": "Quốc Bảo",
      "time": "17:04:39 9/8/2026",
      "msg": "Congrats hai đứa! Nhớ để dành phần cưới cho tụi mình nha."
    },
    {
      "name": "Ngọc Diệp",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc hai bạn mãi bên nhau, cùng nhau đi hết chặng đường dài phía trước."
    },
    {
      "name": "Hội bạn cấp 3",
      "time": "17:04:39 9/8/2026",
      "msg": "Cuối cùng cũng tới ngày này! Chúc mừng Hoàng Phúc và Như Khuê nhé."
    },
    {
      "name": "Bác Hùng - Bác Mai",
      "time": "17:04:39 9/8/2026",
      "msg": "Chúc hai cháu trăm năm hạnh phúc, thuận hoà và sung túc."
    }
  ],
  "photos": [
    "https://assets.chungdoi.com/photo-library/design/868ddb966956a9be3daceb4c5069c63402923a0db8fa90efda87fa0ddc8d417c.webp",
    "https://assets.chungdoi.com/photo-library/design/f4d501ac194bc87673a0260b53672083714f26a6807acdd15a0819cc80df2c3f.webp",
    "https://assets.chungdoi.com/photo-library/design/96a6b4bc3f9ba466dfcdd56b966b708dc43ea3e1743e7922185d6024a36cdef5.webp",
    "https://assets.chungdoi.com/photo-library/design/932d1cc8e900f348e154b162746ab5aef56c93670464ca81b4c93f1e53bb87fa.webp",
    "https://assets.chungdoi.com/photo-library/design/e675b91cf8fa3f9a97fe0dcc10cc51e61bdfd8491cbf9813e0dbe43413921993.webp",
    "https://assets.chungdoi.com/photo-library/design/b9a8c9056bad5f8b1d62e0a86b2b1a97d6a5f14c70f7c1c3c4ad9c99edcda787.webp",
    "https://assets.chungdoi.com/photo-library/design/a7d86e0a5cb47687efe046d667e6eedc0bce793c6d7a59f8c9385393bf30aa2a.webp",
    "https://assets.chungdoi.com/photo-library/design/65cc988c7cef94f66d9b5fff4cd1f92333d2b5c08acdd9c10e1cc7b5cd513620.webp",
    "https://assets.chungdoi.com/photo-library/design/5aceecdb76ac0b4e2d0b2a41a26a760cb29676a3edec0b5e79e688d2d9991f06.webp"
  ],
  "accounts": [
    {
      "title": "Chú Rể - NGUYEN HOANG PHUC",
      "bank": "BIDV",
      "accNum": "21510001234567",
      "name": "NGUYEN HOANG PHUC",
      "qrSrc": "/api/qr-png?d=00020101021238580010A000000727012800069704180114215100012345670208QRIBFTTA53037045802VN6304F5CA&amp;ec=M"
    },
    {
      "title": "Cô Dâu - DANG NHU KHUE",
      "bank": "MB Bank",
      "accNum": "0912345678",
      "name": "DANG NHU KHUE",
      "qrSrc": "/api/qr-png?d=00020101021238540010A00000072701240006970422011009123456780208QRIBFTTA53037045802VN63043763&amp;ec=M"
    }
  ]
};
const DATA_RED = {
  "wm": [
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(0.194779 * var(--cfr-cw) + var(--cfr-garland) + 0 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(2.068823 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(2.068823 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(2.068823 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(2.068823 * var(--cfr-cw) + var(--cfr-garland) + 2 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(3.942867 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(3.942867 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(3.942867 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(3.942867 * var(--cfr-cw) + var(--cfr-garland) + 4 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(5.816911 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(5.816911 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(5.816911 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(5.816911 * var(--cfr-cw) + var(--cfr-garland) + 6 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(7.690955 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(7.690955 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(7.690955 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(7.690955 * var(--cfr-cw) + var(--cfr-garland) + 8 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(9.564999 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + 0px);"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(9.564999 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + var(--cfr-off2));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -left-[10%] rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower2.webp",
      "style": "top: calc(9.564999 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + 0.958716 * var(--cfr-cw) + var(--cfr-gap));"
    },
    {
      "cls": "pointer-events-none absolute w-[50%] h-auto object-contain opacity-[0.07] -right-[10%] scale-x-[-1] -rotate-[20deg]",
      "src": "/images/themes/crystal-floral-red/flower3.webp",
      "style": "top: calc(9.564999 * var(--cfr-cw) + var(--cfr-garland) + 10 * var(--cfr-gap) + var(--cfr-off2) + 0.915328 * var(--cfr-cw) + var(--cfr-gap));"
    }
  ],
  "wishes": [
    {
      "name": "Minh Anh",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc mừng hạnh phúc hai bạn! Chúc anh chị trăm năm hạnh phúc, đầu bạc răng long."
    },
    {
      "name": "Bảo Trâm",
      "time": "17:05:17 3/8/2026",
      "msg": "Thiệp đẹp quá trời, chúc Hoàng Nam và Thuỳ Dương mãi bên nhau, yêu thương trọn đời nhé!"
    },
    {
      "name": "Quốc Huy",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc mừng đám cưới! Mong hai bạn luôn thấu hiểu, sẻ chia và hạnh phúc dài lâu."
    },
    {
      "name": "Thu Hà",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc cô dâu chú rể mãi mặn nồng, sớm có tin vui, tổ ấm ngập tràn tiếng cười!"
    },
    {
      "name": "Đức Thành",
      "time": "17:05:17 3/8/2026",
      "msg": "Mừng ngày trọng đại của hai bạn. Chúc gia đình nhỏ luôn ấm êm và thật nhiều may mắn."
    },
    {
      "name": "Lan Phương",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc hai bạn một hành trình mới thật rực rỡ, yêu nhau nhiều hơn mỗi ngày nhé!"
    },
    {
      "name": "Gia Bảo",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc mừng Hoàng Nam! Cuối cùng cũng tới ngày này, hạnh phúc bên nhau mãi mãi nha."
    },
    {
      "name": "Ngọc Diệp",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc mừng hai bạn! Chúc tình yêu luôn nồng ấm và mọi điều tốt đẹp sẽ đến."
    },
    {
      "name": "Tuấn Kiệt",
      "time": "17:05:17 3/8/2026",
      "msg": "Chúc anh chị trăm năm hạnh phúc, con đàn cháu đống, phú quý an khang!"
    },
    {
      "name": "Mỹ Linh",
      "time": "17:05:17 3/8/2026",
      "msg": "Thuỳ Dương xinh quá! Chúc hai bạn hạnh phúc viên mãn, mãi mãi yêu thương nhau."
    }
  ],
  "photos": [
    "https://assets.chungdoi.com/photo-library/design/91c89299e50d0147428d495685da42750d6dba505aa1bc5e08c9e3091aa8c85e.webp",
    "https://assets.chungdoi.com/photo-library/design/8ce9041b57ac75a40fda724daf408ed9c9f5f8c06fc07956e92321dcecb8c070.webp",
    "https://assets.chungdoi.com/photo-library/design/408e5eae5b0fbb8a3da6c7ff32d3647c032123a31e58705b1ffba426fed9c2c0.webp",
    "https://assets.chungdoi.com/photo-library/design/9719c21e23be54d0e4c95f83ab4bd82fe8b3e77b9abd0e2290a8c8c372793e3a.webp",
    "https://assets.chungdoi.com/photo-library/design/8f8b24ba9ae55bb862ba94a61da30b9355000b934e89933f672c0fa2393e56a2.webp",
    "https://assets.chungdoi.com/photo-library/design/48c8d683aee7dffb0d82fc344a10525d2baec7d678f34b07df8b78123cf83356.webp",
    "https://assets.chungdoi.com/photo-library/design/3ff467f130528703b7946df455fd535e4300004fe6785d301c15bbe37bfbe9ba.webp"
  ],
  "accounts": [
    {
      "title": "Chú Rể - LE HOANG NAM",
      "bank": "BIDV",
      "accNum": "21510009988776",
      "name": "LE HOANG NAM",
      "qrSrc": "/api/qr-png?d=00020101021238580010A000000727012800069704180114215100099887760208QRIBFTTA53037045802VN63041679&amp;ec=M"
    },
    {
      "title": "Cô Dâu - TRAN THUY DUONG",
      "bank": "MB Bank",
      "accNum": "0908776655",
      "name": "TRAN THUY DUONG",
      "qrSrc": "/api/qr-png?d=00020101021238540010A00000072701240006970422011009087766550208QRIBFTTA53037045802VN63041C95&amp;ec=M"
    }
  ]
};

export function getCrystalFloralThemeVars(templateId: string): CrystalFloralThemeVars {
  if (templateId === "crystal_floral_green" || templateId === "hoa-thuy-tinh-xanh") {
    return {
      templateId: "crystal_floral_green",
      rootTestId: "crystal-floral-green-template",
      primaryColor: "rgb(45, 90, 19)",
      textColor: "rgb(11, 46, 0)",
      innerBorder: "md:border-[#1f6b4a22]",
      wmPrefix: "cfr",
      wmStyle: ".cfr-wm{--cfr-cw:100vw;--cfr-gap:250px;--cfr-off2:150px;--cfr-garland:50px;}@media (min-width:768px){.cfr-wm{--cfr-gap:500px;--cfr-off2:300px;--cfr-garland:100px;}}@media (min-width:1024px){.cfr-wm{--cfr-cw:898px;--cfr-gap:600px;}}",
      wmItems: DATA_GREEN.wm,
      flower1: "/images/themes/crystal-floral-green/flower1.webp",
      flower2: "/images/themes/crystal-floral-green/flower2.webp",
      flower3: "/images/themes/crystal-floral-green/flower3.webp",
      flower4: "/images/themes/crystal-floral-green/flower4.webp",
      flower5: "/images/themes/crystal-floral-green/flower5.webp",
      flowerFrame: "/images/themes/crystal-floral-green/flower-frame.webp",
      calendarFrame: "/images/themes/crystal-floral-green/calendar-frame.webp",
      filigree: "/images/themes/crystal-floral-green/filigree.webp",
      envelopeImg: "/images/envelope/crystal_floral_green.webp",
      topDecor: {
        containerCls: "pointer-events-none absolute top-[-16px] md:top-[-32px] left-1/2 -translate-x-1/2 w-[90%] overflow-hidden z-0",
        aspectRatio: "2130 / 732",
        imgCls: "absolute top-[-26%] left-0 w-full max-w-none"
      },
      bottomDecor: {
        aspectRatio: "2172 / 501",
        imgCls: "absolute top-[30%] left-0 w-full max-w-none opacity-95"
      },
      hero: {
        headerPadding: "pb-6 md:pb-10",
        nameFontSize: "22px",
        ampFontSize: "22px"
      },
      flowerOffsets: {
        f2Ceremony: "28.02px",
        f3Ceremony: "-22.48px",
        f3Reception: "19.7px",
        f2Venue: "-16.64px"
      },
      venueFlowerTop: "top-[10%]",
      dressCode: {
        letterSpacing: "0.02em",
        description: "Trang phục dự tiệc",
        colors: [
          { bg: "rgb(31, 107, 74)" },
          { bg: "rgb(14, 58, 39)" },
          { bg: "rgb(246, 236, 217)", border: "1.5px solid rgba(45, 90, 19, 0.19)" }
        ]
      },
      scheduleIcons: [
        { src: "/images/themes/crystal-floral-green/ring.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[24%] h-[44px] md:h-[54px] w-auto max-w-none object-contain opacity-95" },
        { src: "/images/themes/crystal-floral-green/map.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[48%] h-[52px] md:h-[64px] w-auto max-w-none object-contain opacity-95" },
        { src: "/images/themes/crystal-floral-green/flowericon.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[74%] h-[58px] md:h-[72px] w-auto max-w-none object-contain opacity-95" }
      ],
      defaultWishes: DATA_GREEN.wishes,
      defaultPhotos: DATA_GREEN.photos,
      defaultAccounts: DATA_GREEN.accounts,
      albumInitialSlide: 1,
      albumIndicator: "counter",
      photoAspectRatios: [
        '0.666364 / 1', '0.663636 / 1', '0.664375 / 1', '0.664375 / 1',
        '0.664375 / 1', '0.664375 / 1', '0.664375 / 1', '0.664375 / 1',
        '0.664375 / 1'
      ],
      headingLetterSpacing: "0.02em",
      lunarTracking: "tracking-[0.12em]",
      ceremonyHeader: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
      receptionHeading: "Tiệc báo hỷ sẽ diễn ra vào lúc:",
      lunarCore: "Tức ngày 14 tháng 10 năm Bính\u00A0Ngọ",
      groomParents: {
        father: "Nguyễn Văn Đông",
        mother: "Lê Thị Bích",
        address: "Số 15, đường Trần Hưng Đạo,\nphường Cầu Ông Lãnh, quận 1, TP. Hồ Chí Minh"
      },
      brideParents: {
        father: "Đặng Quốc Hùng",
        mother: "Vũ Thị Lan",
        address: "Số 92, đường Lê Lợi,\nphường Bến Nghé, quận 1, TP. Hồ Chí Minh"
      },
      hasCountdown: true,
      countdownText: "21 ngày 5 giờ 6 phút 19 giây",
      calendarFrameAspect: "1370 / 1132",
      cdcrFontSize: "33px",
      venueTitle: "Tiệc báo hỷ sẽ tổ chức tại",
      venueAddress: "Trung tâm Hội nghị Tiệc cưới Riverside Palace, 360D Bến Vân Đồn, Phường 1, Quận 4, TP. Hồ Chí Minh"
    };
  }

  if (templateId === "crystal_floral_red" || templateId === "hoa-thuy-tinh-do") {
    return {
      templateId: "crystal_floral_red",
      rootTestId: "crystal-floral-red-template",
      primaryColor: "rgb(156, 31, 44)",
      textColor: "rgb(86, 2, 7)",
      innerBorder: "md:border-[#9c1f2c22]",
      wmPrefix: "cfr",
      wmStyle: ".cfr-wm{--cfr-cw:100vw;--cfr-gap:250px;--cfr-off2:150px;--cfr-garland:50px;}@media (min-width:768px){.cfr-wm{--cfr-gap:500px;--cfr-off2:300px;--cfr-garland:100px;}}@media (min-width:1024px){.cfr-wm{--cfr-cw:898px;--cfr-gap:600px;}}",
      wmItems: DATA_RED.wm,
      flower1: "/images/themes/crystal-floral-red/flower1.webp",
      flower2: "/images/themes/crystal-floral-red/flower2.webp",
      flower3: "/images/themes/crystal-floral-red/flower3.webp",
      flower4: "/images/themes/crystal-floral-red/flower4.webp",
      flower5: "/images/themes/crystal-floral-red/flower5.webp",
      flowerFrame: "/images/themes/crystal-floral-red/flower-frame.webp",
      calendarFrame: "/images/themes/crystal-floral-red/calendar-frame.webp",
      filigree: "/images/themes/crystal-floral-red/filigree.webp",
      envelopeImg: "/images/envelope/crystal_floral_red.webp",
      topDecor: {
        containerCls: "pointer-events-none absolute top-[-20px] md:top-[-40px] left-1/2 -translate-x-1/2 w-[90%] overflow-hidden z-0",
        aspectRatio: "3935 / 1021.94",
        imgCls: "absolute bottom-0 left-0 w-full max-w-none m scale-x-[-1] "
      },
      bottomDecor: {
        aspectRatio: "4096 / 626.6",
        imgCls: "absolute top-0 left-0 w-full max-w-none opacity-95"
      },
      hero: {
        headerPadding: "pb-6 md:pb-10",
        nameFontSize: "23px",
        ampFontSize: "23px"
      },
      flowerOffsets: {
        f2Ceremony: "27.68px",
        f3Ceremony: "-22.15px",
        f3Reception: "19.38px",
        f2Venue: "-15.9px"
      },
      dressCode: {
        letterSpacing: "0.02em",
        description: "Trang phục dự tiệc",
        colors: [
          { bg: "rgb(156, 31, 44)" },
          { bg: "rgb(86, 2, 7)" },
          { bg: "rgb(246, 236, 217)", border: "1.5px solid rgba(156, 31, 44, 0.19)" }
        ]
      },
      scheduleIcons: [
        { src: "/images/themes/crystal-floral-red/ring.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[24%] h-[44px] md:h-[54px] w-auto max-w-none object-contain opacity-95" },
        { src: "/images/themes/crystal-floral-red/map.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[48%] h-[52px] md:h-[64px] w-auto max-w-none object-contain opacity-95" },
        { src: "/images/themes/crystal-floral-red/flowericon.webp", cls: "pointer-events-none absolute z-20 left-[17%] md:left-[22%] -translate-x-1/2 top-[74%] h-[58px] md:h-[72px] w-auto max-w-none object-contain opacity-95" }
      ],
      defaultWishes: DATA_RED.wishes,
      defaultPhotos: DATA_RED.photos,
      defaultAccounts: DATA_RED.accounts,
      albumInitialSlide: 1,
      albumIndicator: "dots",
      photoAspectRatios: [
        '0.666875 / 1', '0.66625 / 1', '0.666875 / 1', '0.666875 / 1',
        '0.71375 / 1', '0.666875 / 1', '0.666875 / 1'
      ],
      headingLetterSpacing: "0.02em",
      lunarTracking: "tracking-[0.12em]",
      ceremonyHeader: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI\nTƯ GIA",
      receptionHeading: "Tiệc báo hỷ sẽ diễn ra vào lúc:",
      lunarCore: "Tức ngày 11 tháng 11 năm Bính\u00A0Ngọ",
      groomParents: {
        father: "Lê Văn Cường",
        mother: "Phạm Thị Hạnh",
        address: "Số 24, đường Phan Xích Long,\nphường 2, quận Phú Nhuận, TP. Hồ Chí Minh"
      },
      brideParents: {
        father: "Trần Đức Minh",
        mother: "Nguyễn Thị Thu",
        address: "Số 108, đường Nguyễn Trãi,\nphường Bến Thành, quận 1, TP. Hồ Chí Minh"
      },
      hasCountdown: true,
      countdownText: "48 ngày 5 giờ 35 phút 29 giây",
      calendarFrameAspect: "358 / 304",
      cdcrFontSize: "37px",
      venueFlowerTop: "top-[10%]",
      venueTitle: "Tiệc báo hỷ sẽ tổ chức tại",
      venueAddress: "Trung tâm Hội nghị Tiệc cưới Adora, 431 Hoàng Văn Thụ, phường 4, quận Tân Bình, TP. Hồ Chí Minh"
    };
  }

  // Default to blue
  return {
    templateId: "crystal_floral_blue",
    rootTestId: "crystal-floral-blue-template",
    primaryColor: "rgb(33, 85, 137)",
    textColor: "rgb(47, 58, 69)",
    innerBorder: "md:border-[#21558922]",
    wmPrefix: "cfb",
    wmStyle: ".cfb-wm{--cfb-cw:100vw;--cfb-gap:250px;--cfb-off2:150px;--cfb-garland:50px;}@media (min-width:768px){.cfb-wm{--cfb-gap:500px;--cfb-off2:300px;--cfb-garland:100px;}}@media (min-width:1024px){.cfb-wm{--cfb-cw:898px;--cfb-gap:600px;}}",
    wmItems: DATA_BLUE.wm,
    flower1: "/images/themes/crystal-floral-blue/flower1.webp",
    flower2: "/images/themes/crystal-floral-blue/flower2.webp",
    flower3: "/images/themes/crystal-floral-blue/flower3.webp",
    flower4: "/images/themes/crystal-floral-blue/flower4.webp",
    flower5: "/images/themes/crystal-floral-blue/flower5.webp",
    flowerFrame: "/images/themes/crystal-floral-blue/flower-frame.webp",
    calendarFrame: "/images/themes/crystal-floral-blue/calendar-frame.webp",
    filigree: "/images/themes/crystal-floral-blue/filigree.webp",
    envelopeImg: "/images/envelope/crystal_floral_blue.webp",
    topDecor: {
      containerCls: "pointer-events-none absolute top-0 left-1/2 -translate-x-1/2 w-[75%] overflow-hidden z-0",
      aspectRatio: "3935 / 1021.94",
      imgCls: "absolute bottom-0 left-0 w-full max-w-none scale-x-[-1] scale-y-[-1]"
    },
    bottomDecor: {
      aspectRatio: "4096 / 626.6",
      imgCls: "absolute top-0 left-0 w-full max-w-none opacity-95"
    },
    hero: {
      headerPadding: "pb-4 md:pb-8",
      nameFontSize: "23px",
      ampFontSize: "12px"
    },
    flowerOffsets: {
      f2Ceremony: "27.9px",
      f3Ceremony: "-22.4px",
      f3Reception: "19.5px",
      f2Venue: "-15.58px"
    },
    venueFlowerTop: "top-0",
    dressCode: {
      letterSpacing: "0.08em",
      description: "Sắc xanh pha lê - tông màu chủ đạo của ngày vui",
      colors: [
        { bg: "rgb(30, 58, 95)" },
        { bg: "rgb(74, 123, 176)" },
        { bg: "rgb(127, 168, 212)" },
        { bg: "rgb(214, 230, 245)", border: "1.5px solid rgba(33, 85, 137, 0.19)" }
      ]
    },
    scheduleIcons: [
      { src: "/images/themes/crystal-floral-blue/gift.webp", cls: "pointer-events-none absolute z-20 start-[17%] md:start-[22%] -translate-x-1/2 rtl:translate-x-1/2 top-[30%] h-[52px] md:h-[64px] w-auto max-w-none object-contain opacity-95" },
      { src: "/images/themes/crystal-floral-blue/cake.webp", cls: "pointer-events-none absolute z-20 start-[17%] md:start-[22%] -translate-x-1/2 rtl:translate-x-1/2 top-[62%] h-[52px] md:h-[64px] w-auto max-w-none object-contain opacity-95" }
    ],
    defaultWishes: DATA_BLUE.wishes,
    defaultPhotos: DATA_BLUE.photos,
    defaultAccounts: DATA_BLUE.accounts,
    albumInitialSlide: 2,
    albumIndicator: "counter",
    photoAspectRatios: [
      '0.664062 / 1', '0.664062 / 1', '1.2 / 1', '0.664062 / 1',
      '0.664062 / 1', '0.664062 / 1', '1.2 / 1', '0.664062 / 1'
    ],
    headingLetterSpacing: "0.08em",
    lunarTracking: "tracking-[0.25em]",
    ceremonyHeader: "LỄ THÀNH HÔN ĐƯỢC CỬ HÀNH TẠI",
    receptionHeading: "Tiệc cưới sẽ diễn ra vào lúc:",
    lunarCore: "Tức ngày 9 tháng 8 năm Bính\u00A0Ngọ",
    groomParents: {
      father: "Phạm Văn Hùng",
      mother: "Trần Thị Hạnh",
      address: "Đà Lạt, Lâm Đồng"
    },
    brideParents: {
      father: "Nguyễn Đức Thịnh",
      mother: "Lê Thị Kim Oanh",
      address: "Thành phố Huế, Thừa Thiên Huế"
    },
    hasCountdown: false,
    countdownText: "",
    calendarFrameAspect: "358 / 304",
    cdcrFontSize: "34px",
    venueTitle: "Tiệc cưới sẽ tổ chức tại",
    venueAddress: "Trung tâm Tiệc cưới Bạch Kim, 58 Trần Hưng Đạo, Quận 1, TP. Hồ Chí Minh"
  };
}
