export type Jurisdiction =
  | "federal"
  | "bc"
  | "ab"
  | "sk"
  | "mb"
  | "on"
  | "qc"
  | "nb"
  | "ns"
  | "pei"
  | "nl"
  | "yt"
  | "nt"
  | "nu"
  | "us";

export interface NoticeRule {
  calculate: (years: number) => number;
  citation: string;
  explanation: string;
}