import { theme as usAL } from "./us/al";
import { theme as usAK } from "./us/ak";
import { theme as usAZ } from "./us/az";
import { theme as usAR } from "./us/ar";
import { theme as usCA } from "./us/ca";
import { theme as usCO } from "./us/co";
import { theme as usCT } from "./us/ct";
import { theme as usDE } from "./us/de";
import { theme as usFL } from "./us/fl";
import { theme as usGA } from "./us/ga";
import { theme as usHI } from "./us/hi";
import { theme as usID } from "./us/id";
import { theme as usIL } from "./us/il";
import { theme as usIN } from "./us/in";
import { theme as usIA } from "./us/ia";
import { theme as usKS } from "./us/ks";
import { theme as usKY } from "./us/ky";
import { theme as usLA } from "./us/la";
import { theme as usME } from "./us/me";
import { theme as usMD } from "./us/md";
import { theme as usMA } from "./us/ma";
import { theme as usMI } from "./us/mi";
import { theme as usMN } from "./us/mn";
import { theme as usMS } from "./us/ms";
import { theme as usMO } from "./us/mo";
import { theme as usMT } from "./us/mt";
import { theme as usNE } from "./us/ne";
import { theme as usNV } from "./us/nv";
import { theme as usNH } from "./us/nh";
import { theme as usNJ } from "./us/nj";
import { theme as usNM } from "./us/nm";
import { theme as usNY } from "./us/ny";
import { theme as usNC } from "./us/nc";
import { theme as usND } from "./us/nd";
import { theme as usOH } from "./us/oh";
import { theme as usOK } from "./us/ok";
import { theme as usOR } from "./us/or";
import { theme as usPA } from "./us/pa";
import { theme as usRI } from "./us/ri";
import { theme as usSC } from "./us/sc";
import { theme as usSD } from "./us/sd";
import { theme as usTN } from "./us/tn";
import { theme as usTX } from "./us/tx";
import { theme as usUT } from "./us/ut";
import { theme as usVT } from "./us/vt";
import { theme as usVA } from "./us/va";
import { theme as usWA } from "./us/wa";
import { theme as usWV } from "./us/wv";
import { theme as usWI } from "./us/wi";
import { theme as usWY } from "./us/wy";
import { theme as caAB } from "./ca/ab";
import { theme as caBC } from "./ca/bc";
import { theme as caMB } from "./ca/mb";
import { theme as caNB } from "./ca/nb";
import { theme as caNL } from "./ca/nl";
import { theme as caNS } from "./ca/ns";
import { theme as caNT } from "./ca/nt";
import { theme as caNU } from "./ca/nu";
import { theme as caON } from "./ca/on";
import { theme as caPE } from "./ca/pe";
import { theme as caQC } from "./ca/qc";
import { theme as caSK } from "./ca/sk";
import { theme as caYT } from "./ca/yt";

import type { Theme } from "@/app/types/Theme";

const defaultTheme: Theme = {
  colors: {
    primary: "#1E3A5F",
    accent: "#2563EB",
    background: "#F8FAFC",
  },
  emblem: "/emblems/default.svg",
  gradient: "from-slate-800 to-slate-600",
};

const usThemes: Record<string, Theme> = {
  al: usAL,
  ak: usAK,
  az: usAZ,
  ar: usAR,
  ca: usCA,
  co: usCO,
  ct: usCT,
  de: usDE,
  fl: usFL,
  ga: usGA,
  hi: usHI,
  id: usID,
  il: usIL,
  in: usIN,
  ia: usIA,
  ks: usKS,
  ky: usKY,
  la: usLA,
  me: usME,
  md: usMD,
  ma: usMA,
  mi: usMI,
  mn: usMN,
  ms: usMS,
  mo: usMO,
  mt: usMT,
  ne: usNE,
  nv: usNV,
  nh: usNH,
  nj: usNJ,
  nm: usNM,
  ny: usNY,
  nc: usNC,
  nd: usND,
  oh: usOH,
  ok: usOK,
  or: usOR,
  pa: usPA,
  ri: usRI,
  sc: usSC,
  sd: usSD,
  tn: usTN,
  tx: usTX,
  ut: usUT,
  vt: usVT,
  va: usVA,
  wa: usWA,
  wv: usWV,
  wi: usWI,
  wy: usWY,
};

const caThemes: Record<string, Theme> = {
  ab: caAB,
  bc: caBC,
  mb: caMB,
  nb: caNB,
  nl: caNL,
  ns: caNS,
  nt: caNT,
  nu: caNU,
  on: caON,
  pe: caPE,
  qc: caQC,
  sk: caSK,
  yt: caYT,
};

export function getTheme(country: "us" | "ca", code: string): Theme {
  const map = country === "us" ? usThemes : caThemes;
  return map[code.toLowerCase()] ?? defaultTheme;
}

export { defaultTheme };
