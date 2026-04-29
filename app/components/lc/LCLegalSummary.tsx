"use client";

import { JURISDICTION_THEME } from "@/app/utils/jurisdictionTheme";

interface Props {
  jurisdiction: string;
  summary: string;
  citation: string;
}

export function LCLegalSummary({ jurisdiction, summary, citation }: Props) {
  const theme = JURISDICTION_THEME[jurisdiction] ?? JURISDICTION_THEME.default;

  return (
    <div
      className={`
        border-l-4 p-4 rounded-md shadow-sm bg-white animate-fadeIn
        ${theme.borderClass}
      `}
    >
      <div className="flex items-start gap-3">
        <div className={`${theme.colorClass} text-3xl`}>
          {theme.icon}
        </div>

        <div className="space-y-1">
          <h4 className="font-semibold text-slate-800">
            Legal Summary for {theme.label}
          </h4>

          <p className="text-slate-600 text-sm leading-relaxed">
            {summary}
          </p>

          <p className="text-xs text-slate-500 italic">
            {citation}
          </p>
        </div>
      </div>
    </div>
  );
}