import { buildTemplate } from "./auto_build_template.mjs";

const final11 = [
  { id: "qasr_blue", family: "qasr_blue", slug: "thanhcung-lam" },
  { id: "san_miguel_yellow", family: "san_miguel_yellow", slug: "san-miguel-vang" },
  { id: "hoa_kho_orange", family: "hoa_kho_orange", slug: "hoa-kho-cam" },
  { id: "mahal_gold", family: "mahal_gold", slug: "mahal-vang" },
  { id: "floral_fiesta_yellow", family: "floral_fiesta_yellow", slug: "floral-fiesta-vang" },
  { id: "nomad_brown", family: "nomad_brown", slug: "du-muc-nau" },
  { id: "saraya_gold", family: "saraya_gold", slug: "kim-dien-vang" },
  { id: "qasr_gold", family: "qasr_gold", slug: "thanhcung-vang" },
  { id: "qasr_green", family: "qasr_green", slug: "thanhcung-xanh" },
  { id: "mandap_darkred", family: "mandap_darkred", slug: "mandap-do-dam" },
  { id: "brocade_flower_red", family: "brocade_flower_red", slug: "gam-hoa-do" },
];

for (const it of final11) {
  try {
    buildTemplate({
      ...it,
      htmlPath: `docs/survey/raw/${it.id}_demo_outer.html`,
      dumpPath: `docs/survey/raw/${it.id}_dump_open_390.json`
    });
  } catch (err) {
    console.error(`Error building ${it.id}:`, err);
  }
}
