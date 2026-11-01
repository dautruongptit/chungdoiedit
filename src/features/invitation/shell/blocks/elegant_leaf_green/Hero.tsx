import type { InvitationCtx } from "@/features/invitation/shell/useInvitationCtx";

export function Hero({ ctx }: { ctx: InvitationCtx }) {
  const anyD = ctx.d as any;
  const groomPhoto = anyD.groomPhoto || ctx.d.photos?.[0] || ctx.heroSrc;
  const bridePhoto = anyD.bridePhoto || ctx.d.photos?.[1] || ctx.heroSrc;

  return (
    <header className="relative flex flex-col items-center justify-center text-center z-10 px-6 md:px-[31px] lg:px-[36px] pb-[148px] md:pb-[192px] lg:pb-[222px] pt-12 md:pt-[62px] lg:pt-[72px] min-h-[600px] md:min-h-[780px] lg:min-h-[900px] overflow-visible" style={{ backgroundColor: "rgb(255, 255, 255)" }}><div className="absolute -top-0 -left-20 w-[390px] md:w-[507px] lg:w-[585px] z-0 opacity-100" style={{ willChange: "transform", transform: "rotate(-30deg) translateY(111.75px)" }}><img alt="Leaf decoration" className="w-full h-auto" src="/images/themes/thanhdiep-green/la2.webp" /></div><div className="absolute -bottom-[50px] -right-40 w-[390px] md:w-[507px] lg:w-[585px] z-0 opacity-100" style={{ willChange: "transform", transform: "rotate(20deg) translateY(111.75px)" }}><img alt="Leaf decoration" className="w-full h-auto" src="/images/themes/thanhdiep-green/la1.webp" /></div><div className="relative z-10 mb-8 md:mb-[42px] lg:mb-[48px] mt-8 md:mt-[42px] lg:mt-[48px]"><h1 className="mb-1 whitespace-pre-line text-[14px] tracking-[0.3em] md:text-[18px] lg:text-[21px]" style={{ color: "rgb(78, 100, 57)", fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif" }}>THE STORY of LOVE</h1></div><div className="relative z-10 w-full max-w-[540px] md:max-w-[702px] lg:max-w-[810px] h-[560px] md:h-[728px] lg:h-[840px] mb-4 md:mb-[21px] lg:mb-[24px]"><div className="absolute -left-5 top-0 flex items-center gap-6 md:gap-[31px] lg:gap-[36px]" data-avatar-column="true"><div className="rotate-[-8deg] w-[245px] md:w-[318px] lg:w-[367px]"><div className="border-[8px] md:border-[10px] lg:border-[12px] border-white shadow-2xl overflow-hidden bg-white aspect-square relative"><img alt="Văn Toàn" className="w-full h-full object-cover" src={groomPhoto} /></div></div><div className="flex flex-col items-start mr-4 md:mr-[21px] lg:mr-[24px]"><div className="text-[12px] md:text-[16px] lg:text-[18px] tracking-widest mb-2" style={{ color: "rgb(78, 100, 57)", fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontStyle: "italic" }}><span>Trưởng Nam / Groom</span></div><div className="text-[24px] md:text-[31px] lg:text-[36px]" style={{ color: "rgb(78, 100, 57)", fontFamily: "&quot;EB Garamond&quot;, ChungDoiIndic, serif" }}>Văn Toàn</div></div></div><div className="absolute -right-5 bottom-[80px] md:bottom-[104px] lg:bottom-[120px] flex flex-row-reverse items-center gap-6 md:gap-[31px] lg:gap-[36px]" data-avatar-column="true"><div className="rotate-[6deg] w-[245px] md:w-[318px] lg:w-[367px]"><div className="border-[8px] md:border-[10px] lg:border-[12px] border-white shadow-2xl overflow-hidden bg-white aspect-square relative"><img alt="Thanh Diệp" className="w-full h-full object-cover" src={groomPhoto} /></div></div><div className="flex flex-col items-end ml-4 md:ml-[21px] lg:ml-[24px]"><div className="text-[12px] md:text-[16px] lg:text-[18px] tracking-widest mb-2" style={{ color: "rgb(78, 100, 57)", fontFamily: "Baskerville, &quot;Times New Roman&quot;, ChungDoiIndic, serif", fontStyle: "italic" }}><span>Út Nữ / Bride</span></div><div className="text-[24px] md:text-[31px] lg:text-[36px] text-right" style={{ color: "rgb(78, 100, 57)", fontFamily: "&quot;EB Garamond&quot;, ChungDoiIndic, serif" }}>Thanh Diệp</div></div></div></div><style>
            .la3-decoration &#123;
              transform: translateX(calc(-50% - 100px)) translateY(var(--parallax-la3, 0px));
            &#125;
            @media (min-width: 768px) &#123;
              .la3-decoration &#123;
                transform: translateX(calc(-50% - 130px)) translateY(var(--parallax-la3, 0px));
              &#125;
            &#125;
            @media (min-width: 1024px) &#123;
              .la3-decoration &#123;
                transform: translateX(calc(-50% - 150px)) translateY(var(--parallax-la3, 0px));
              &#125;
            &#125;
          </style><div className="absolute left-1/2 bottom-[-400px] md:bottom-[-300px] lg:bottom-[-700px] w-[500px] md:w-[650px] lg:w-[750px] z-[1] opacity-50 pointer-events-none la3-decoration" style={{ willChange: "transform", "--parallax-la3": "186.25px" } as any}><img alt="Leaf decoration" className="w-full h-auto" src="/images/themes/thanhdiep-green/la3.webp" /></div></header>
  );
}
