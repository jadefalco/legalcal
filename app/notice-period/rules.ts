import { NoticeRule } from "./types";

export const noticeRules: Record<string, NoticeRule> = {
  federal: {
    calculate: (years) => Math.min(8, Math.max(2, Math.floor(years))),
    citation: "Canada Labour Code, R.S.C. 1985, c. L-2, s.230(1)",
    explanation:
      "Federally regulated employees are entitled to 2–8 weeks of notice depending on years of service.",
  },

  bc: {
    calculate: (years) => Math.min(8, Math.max(1, Math.floor(years))),
    citation: "Employment Standards Act (BC), s.63",
    explanation:
      "BC requires 1–8 weeks of notice depending on years of service.",
  },

  ab: {
    calculate: (years) => {
      if (years < 0.25) return 0;
      if (years < 2) return 1;
      if (years < 4) return 2;
      if (years < 6) return 4;
      if (years < 8) return 5;
      if (years < 10) return 6;
      return 8;
    },
    citation: "Employment Standards Code (AB), s.56",
    explanation:
      "Alberta requires 1–8 weeks of notice depending on years of service.",
  },

  sk: {
    calculate: (years) => {
      if (years < 0.25) return 0;
      if (years < 1) return 1;
      if (years < 3) return 2;
      if (years < 5) return 4;
      if (years < 10) return 6;
      return 8;
    },
    citation: "Employment Act (SK), s.2‑60",
    explanation:
      "Saskatchewan requires 1–8 weeks of notice depending on years of service.",
  },

  mb: {
    calculate: (years) => {
      if (years < 0.08) return 0;
      if (years < 1) return 1;
      if (years < 3) return 2;
      if (years < 5) return 4;
      if (years < 10) return 6;
      return 8;
    },
    citation: "Employment Standards Code (MB), s.61",
    explanation:
      "Manitoba requires 1–8 weeks of notice depending on years of service.",
  },

  on: {
    calculate: (years) => Math.min(8, Math.max(1, Math.floor(years))),
    citation: "Employment Standards Act (ON), s.57",
    explanation:
      "Ontario requires 1–8 weeks of notice depending on years of service.",
  },

  qc: {
    calculate: (years) => {
      if (years < 0.25) return 0;
      if (years < 1) return 1;
      if (years < 5) return 2;
      if (years < 10) return 4;
      return 8;
    },
    citation: "Act Respecting Labour Standards (QC), s.82",
    explanation:
      "Quebec requires 1–8 weeks of notice depending on years of service.",
  },

  nb: {
    calculate: (years) => {
      if (years < 0.5) return 0;
      if (years < 5) return 2;
      if (years < 10) return 4;
      return 6;
    },
    citation: "Employment Standards Act (NB), s.30",
    explanation:
      "New Brunswick requires 2–6 weeks of notice depending on years of service.",
  },

  ns: {
    calculate: (years) => {
      if (years < 0.25) return 0;
      if (years < 2) return 1;
      if (years < 5) return 2;
      if (years < 10) return 4;
      return 8;
    },
    citation: "Labour Standards Code (NS), s.72",
    explanation:
      "Nova Scotia requires 1–8 weeks of notice depending on years of service.",
  },

  pei: {
    calculate: (years) => {
      if (years < 0.5) return 0;
      if (years < 5) return 2;
      if (years < 10) return 4;
      return 6;
    },
    citation: "Employment Standards Act (PEI), s.29",
    explanation:
      "PEI requires 2–6 weeks of notice depending on years of service.",
  },

  nl: {
    calculate: (years) => {
      if (years < 0.25) return 0;
      if (years < 2) return 1;
      if (years < 5) return 2;
      if (years < 10) return 3;
      return 6;
    },
    citation: "Labour Standards Act (NL), s.55",
    explanation:
      "Newfoundland & Labrador requires 1–6 weeks of notice depending on years of service.",
  },

  yt: {
    calculate: (years) => Math.min(8, Math.max(1, Math.floor(years))),
    citation: "Employment Standards Act (YT), s.58",
    explanation:
      "Yukon requires 1–8 weeks of notice depending on years of service.",
  },

  nt: {
    calculate: (years) => Math.min(8, Math.max(1, Math.floor(years))),
    citation: "Employment Standards Act (NT), s.41",
    explanation:
      "Northwest Territories requires 1–8 weeks of notice depending on years of service.",
  },

  nu: {
    calculate: (years) => Math.min(8, Math.max(1, Math.floor(years))),
    citation: "Labour Standards Act (NU), s.42",
    explanation:
      "Nunavut requires 1–8 weeks of notice depending on years of service.",
  },

  us: {
    calculate: () => 0,
    citation: "At‑will employment doctrine (all states except MT)",
    explanation:
      "Most US employees are employed at‑will, meaning no statutory notice period is required.",
  },
};