import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";
import { getBohoFloralTheme } from "./themeVars";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const d = (ctx.d || {}) as any;
  const theme = getBohoFloralTheme(ctx);

  const groomPhoto =
    (d.photos && d.photos[0]) ||
    (theme.isGreen
      ? "https://assets.chungdoi.com/photo-library/design/5b2fafb74f1aa84ca843acded191b5e4629c62f9b73820281864f27167312b06.webp"
      : theme.isPink
      ? "https://assets.chungdoi.com/photo-library/design/a0666f1639ce05b0a9478c751fbb2d7c00986fe850d2107b1caf49710ac9e5cf.webp"
      : "https://assets.chungdoi.com/photo-library/design/9c1c61b16fa1ff694846b781f371bc3b437a49a092300a1778bdd9ed56ff81d9.webp");

  const bridePhoto =
    (d.photos && d.photos[1]) ||
    (theme.isGreen
      ? "https://assets.chungdoi.com/photo-library/design/3fcfad216695abf4dbd4198edb2ba4d451546d5e1231aafbc66559e164daad27.webp"
      : theme.isPink
      ? "https://assets.chungdoi.com/photo-library/design/75a2233917e5a0c905f5f1094d7bed67cd0b648ffa0634f13376aec8357bc96e.webp"
      : "https://assets.chungdoi.com/photo-library/design/454f856986dc4e94052eee2148f9c0006732d70700ff963c796fc737dfc84839.webp");

  if (theme.isPink) {
    return (
      <header className="relative flex flex-col items-center justify-start text-center z-10 px-6 md:px-8 pb-4 md:pb-8 pt-[190px] md:pt-[300px] min-h-[910px] md:min-h-[900px] overflow-visible">
        <div
          className="absolute top-[-20px] left-[-70px] w-[440px] md:top-[-210px] md:left-[-100px] md:w-[560px] lg:top-[-20px] lg:left-[0px] lg:w-[670px] -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(27.5px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_1.webp" />
        </div>
        <div
          className="absolute top-[10px] md:top-[20px] lg:top-[30px] left-[calc(80%-300px)] md:left-[calc(80%-400px)] lg:left-[calc(80%-480px)] w-[600px] md:w-[800px] lg:w-[960px] -z-10 opacity-[0.15] pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(35.75px) rotate(162deg)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-pink/asset_2.webp" />
        </div>
        <style>{`
          .boho-pink-names {
            position: absolute;
            right: 70px;
            top: 160px;
            z-index: 30;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 4px;
          }
          .boho-pink-fixed-flower {
            top: 530px;
            right: -72px;
            width: 370px;
          }
          @media (min-width: 768px) {
            .boho-pink-names {
              right: 180px;
              top: 130px;
            }
            .boho-pink-fixed-flower {
              top: 600px;
              right: -88px;
              width: 480px;
            }
          }
          @media (min-width: 1024px) {
            .boho-pink-names {
              right: 190px;
              top: 160px;
            }
            .boho-pink-fixed-flower {
              top: 700px;
              right: -104px;
              width: 580px;
            }
          }
        `}</style>
        <div className="boho-pink-names">
          <div className="flex flex-col items-center">
            <div
              className="text-[13px] md:text-[16px] tracking-widest"
              style={{ color: "rgb(122, 90, 82)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
            >
              <span dir="auto">{d.groomBirthOrder || "Trưởng Nam"}</span>
            </div>
            <div
              className="text-[29px] md:text-[36px] whitespace-nowrap leading-tight"
              style={{ color: "rgb(157, 109, 99)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
            >
              {d.groomShortName || "Hoàng Nam"}
            </div>
          </div>
          <div className="flex flex-col items-center mt-1">
            <div
              className="text-[13px] md:text-[16px] tracking-widest"
              style={{ color: "rgb(122, 90, 82)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
            >
              <span dir="auto">{d.brideBirthOrder || "Út Nữ"}</span>
            </div>
            <div
              className="text-[29px] md:text-[36px] whitespace-nowrap leading-tight"
              style={{ color: "rgb(157, 109, 99)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
            >
              {d.brideShortName || "Thanh Tú"}
            </div>
          </div>
        </div>
        <div className="relative z-10 mx-auto w-[300px] md:w-[480px] h-[460px] md:h-[720px] translate-x-[20px] translate-y-[80px] md:translate-x-0 md:translate-y-0">
          <div className="absolute left-[45px] md:left-[90px] top-[30px] md:top-[50px] z-10">
            <div className="rotate-[13deg] w-[155px] md:w-[235px] shrink-0">
              <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(245, 198, 201)" }}>
                <img alt={d.groomShortName || "Hoàng Nam"} className="w-full h-full object-cover" src={groomPhoto} />
              </div>
            </div>
          </div>
          <div className="absolute left-[0px] md:left-[0px] top-[230px] md:top-[360px] z-20">
            <div className="rotate-[-13deg] w-[155px] md:w-[235px] shrink-0">
              <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(186, 180, 199)" }}>
                <img alt={d.brideShortName || "Thanh Tú"} className="w-full h-full object-cover" src={bridePhoto} />
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }

  if (theme.isBrown) {
    return (
      <header className="relative flex flex-col items-center justify-start text-center z-10 px-6 md:px-8 pb-[240px] md:pb-8 pt-[160px] md:pt-[180px] min-h-[min(100svh,900px)] overflow-visible">
        <div
          className="absolute -top-[77px] lg:-top-[147px] left-1/2 -translate-x-1/2 w-[700px] md:w-[900px] lg:w-[1100px] -z-10 pointer-events-none"
          style={{ willChange: "transform", transform: "translateX(60px) translateY(31.56px)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_top.webp" />
        </div>
        <div
          className="absolute top-[2101px] md:top-[1401px] right-[-60px] w-[340px] md:w-[442px] -z-10 opacity-[0.08] pointer-events-none"
          style={{ willChange: "transform", transform: "translateY(52.6px) rotate(131deg)" }}
        >
          <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/flower_bottom.webp" />
        </div>
        <style>{`
          .boho-decoration-bar {
            top: 170px;
          }
          @media (min-width: 768px) {
            .boho-decoration-bar {
              top: 280px;
            }
          }
        `}</style>
        <div className="relative z-10 mx-auto mt-[120px] md:mt-[70px] lg:mt-[230px] w-[320px] max-[353px]:w-[286px] md:w-[540px] lg:w-[620px] h-[440px] max-[353px]:h-[390px] md:h-[690px] lg:h-[760px]">
          <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-[140%] md:w-screen z-[15] boho-decoration-bar">
            <img alt="" className="w-full h-auto md:h-[150px] md:object-cover" src="/images/themes/boho-floral-brown/decoration_bar.webp" />
          </div>
          <div className="absolute left-1/2 -translate-x-[55%] max-[353px]:-translate-x-[52%] md:-translate-x-[56%] -top-[40px] md:-top-[60px] z-20 flex items-center gap-3 md:gap-4">
            <div className="rotate-[-17deg] w-[170px] max-[353px]:w-[160px] md:w-[235px] shrink-0">
              <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(132, 103, 88)" }}>
                <img alt={d.groomShortName || "Hoàng Nam"} className="w-full h-full object-cover" src={groomPhoto} />
              </div>
            </div>
            <div className="flex flex-col items-start">
              <div
                className="text-[12px] md:text-[14px] tracking-widest"
                style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
              >
                <span dir="auto">{d.groomBirthOrder || "Út Nam"}</span>
              </div>
              <div
                className="text-[25px] md:text-[32px] whitespace-nowrap"
                style={{ color: "rgb(74, 40, 22)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
              >
                {d.groomShortName || "Hoàng Nam"}
              </div>
            </div>
          </div>
          <div className="absolute left-1/2 -translate-x-[40%] max-[353px]:-translate-x-[41%] md:-translate-x-[18%] top-[150px] max-[353px]:top-[140px] md:top-[260px] z-30 flex flex-row-reverse items-center gap-3 md:gap-4">
            <div className="rotate-[13deg] w-[170px] max-[353px]:w-[160px] md:w-[235px] shrink-0">
              <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(132, 103, 88)" }}>
                <img alt={d.brideShortName || "Thanh Tú"} className="w-full h-full object-cover" src={bridePhoto} />
              </div>
            </div>
            <div className="flex flex-col items-end">
              <div
                className="text-[12px] md:text-[14px] tracking-widest"
                style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
              >
                <span dir="auto">{d.brideBirthOrder || "Thứ Nữ"}</span>
              </div>
              <div
                className="text-[25px] md:text-[32px] whitespace-nowrap"
                style={{ color: "rgb(74, 40, 22)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
              >
                {d.brideShortName || "Thanh Tú"}
              </div>
            </div>
          </div>
          <div className="absolute z-[25] pointer-events-none -scale-y-100 rotate-[-70deg] -bottom-[265px] md:-bottom-[150px] lg:-bottom-[165px] -left-[100px] md:-left-[225px] lg:-left-[225px] w-[280px] md:w-[360px]">
            <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-brown/fixed_flower.webp" />
          </div>
        </div>
      </header>
    );
  }

  // Green
  return (
    <header className="relative flex flex-col items-center justify-start text-center z-10 px-6 md:px-8 pb-4 md:pb-8 pt-[210px] md:pt-[330px] min-h-[840px] md:min-h-[900px] overflow-visible">
      <div
        className="absolute top-[-327px] left-[111.5px] w-[622.77px] md:top-[-390px] md:left-[130px] md:w-[760px] lg:top-[-470px] lg:left-[170px] lg:w-[900px] -z-10 pointer-events-none rotate-[-0.76deg]"
        style={{ willChange: "transform", transform: "translateY(25.8px)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <div
        className="absolute top-[5px] md:top-[18px] lg:top-[24px] left-[-83px] md:left-[-66px] lg:left-[-44px] w-[450px] md:w-[507px] lg:w-[608px] -z-10 opacity-20 pointer-events-none scale-x-[-1]"
        style={{ willChange: "transform", transform: "translateY(33.54px) rotate(142deg)" }}
      >
        <img alt="" className="w-full h-auto" src="/images/themes/boho-floral-green/flower.webp" />
      </div>
      <style>{`
        .boho-green-fixed-flower {
          top: 503px;
          left: -181.5px;
          width: 415.05px;
        }
        .boho-green-decoration-bar {
          top: 170px;
        }
        @media (min-width: 768px) {
          .boho-green-fixed-flower {
            top: 608px;
            left: -228px;
            width: 530px;
          }
          .boho-green-decoration-bar {
            top: 280px;
          }
        }
        @media (min-width: 1024px) {
          .boho-green-fixed-flower {
            top: 700px;
            left: -278px;
            width: 650px;
          }
        }
      `}</style>
      <div className="relative z-10 mx-auto w-[320px] md:w-[500px] h-[440px] md:h-[640px]">
        <div className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-screen -z-10 boho-green-decoration-bar">
          <img alt="" className="w-full h-auto md:h-[150px] md:object-cover" src="/images/themes/boho-floral-green/decoration_bar.webp" />
        </div>
        <div className="absolute left-[20px] md:left-[25px] -top-[40px] md:-top-[60px] z-20 flex items-center gap-3 md:gap-4">
          <div className="rotate-[-17deg] w-[155px] md:w-[235px] shrink-0">
            <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(178, 142, 114)" }}>
              <img alt={d.groomShortName || "Minh Quân"} className="w-full h-full object-cover" src={groomPhoto} />
            </div>
          </div>
          <div className="flex flex-col items-start">
            <div
              className="text-[12px] md:text-[14px] tracking-widest"
              style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
            >
              <span dir="auto">{d.groomBirthOrder || "Trưởng Nam"}</span>
            </div>
            <div
              className="text-[25px] md:text-[32px] whitespace-nowrap"
              style={{ color: "rgb(48, 83, 15)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
            >
              {d.groomShortName || "Minh Quân"}
            </div>
          </div>
        </div>
        <div className="absolute left-[55px] md:left-[115px] top-[165px] md:top-[260px] z-30 flex flex-row-reverse items-center gap-3 md:gap-4">
          <div className="rotate-[13deg] w-[155px] md:w-[235px] shrink-0">
            <div className="border-[5px] overflow-hidden aspect-[2/3] relative" style={{ borderColor: "rgb(178, 142, 114)" }}>
              <img alt={d.brideShortName || "Thu Hà"} className="w-full h-full object-cover" src={bridePhoto} />
            </div>
          </div>
          <div className="flex flex-col items-end">
            <div
              className="text-[12px] md:text-[14px] tracking-widest"
              style={{ color: "rgb(70, 70, 70)", fontFamily: 'Baskerville, "Times New Roman", ChungDoiIndic, serif' }}
            >
              <span dir="auto">{d.brideBirthOrder || "Út Nữ"}</span>
            </div>
            <div
              className="text-[25px] md:text-[32px] whitespace-nowrap"
              style={{ color: "rgb(48, 83, 15)", fontFamily: '"Playfair Display", ChungDoiIndic, serif' }}
            >
              {d.brideShortName || "Thu Hà"}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
