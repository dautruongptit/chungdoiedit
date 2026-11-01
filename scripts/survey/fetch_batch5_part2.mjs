import { fetchAndDumpTemplates } from "./batch_fetch_and_dump.mjs";

const batch5_part2 = [
  { id: "qasr_blue", slug: "thanhcung-lam" },
  { id: "san_miguel_yellow", slug: "san-miguel-vang" },
  { id: "hoa_kho_orange", slug: "hoa-kho-cam" },
  { id: "mahal_gold", slug: "mahal-vang" },
  { id: "floral_fiesta_yellow", slug: "floral-fiesta-vang" },
  { id: "nomad_brown", slug: "du-muc-nau" },
  { id: "saraya_gold", slug: "kim-dien-vang" },
  { id: "qasr_gold", slug: "thanhcung-vang" },
  { id: "qasr_green", slug: "thanhcung-xanh" },
  { id: "mandap_darkred", slug: "mandap-do-dam" },
  { id: "brocade_flower_red", slug: "gam-hoa-do" },
];

await fetchAndDumpTemplates(batch5_part2, { headless: false });
