import { noticeRules } from "./rules";
import { Jurisdiction } from "./types";

export function calculateNoticePeriod(
  jurisdiction: Jurisdiction,
  years: number
) {
  const rule = noticeRules[jurisdiction];

  const weeks = rule.calculate(years);

  return {
    weeks,
    explanation: rule.explanation,
    citation: rule.citation,
  };
}