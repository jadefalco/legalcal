"use client";

import { useState } from "react";
import type { Jurisdiction } from "@/app/notice-period/types";

interface Props {
  value: Jurisdiction;
  onChange: (j: Jurisdiction) => void;
}

const GROUPS = [
  {
    label: "Canada (Federal)",
    items: [
      { code: "federal", name: "Federal (Canada Labour Code)", flag: "🇨🇦" },
    ],
  },
  {
    label: "Canadian Provinces",
    items: [
      { code: "bc", name: "British Columbia", flag: "🏔️" },
      { code: "ab", name: "Alberta", flag: "⛽" },
      { code: "sk", name: "Sask", flag: "🌾" },
      { code: "mb", name: "Manitoba", flag: "🌻" },
      { code: "on", name: "Ontario", flag: "🛶" },
      { code: "qc", name: "Quebec", flag: "⚜️" },
      { code: "nb", name: "New Brunswick", flag: "🌊" },
      { code: "ns", name: "Nova Scotia", flag: "⚓" },
      { code: "pei", name: "Prince Edward Island", flag: "🍓" },
      { code: "nl", name: "Newfoundland & Labrador", flag: "🐟" },
    ],
  },
  {
    label: "Canadian Territories",
    items: [
      { code: "yt", name: "Yukon", flag: "❄️" },
      { code: "nt", name: "Northwest Territories", flag: "🧭" },
      { code: "nu", name: "Nunavut", flag: "🐻‍❄️" },
    ],
  },
  {
    label: "United States",
    items: [
      { code: "us", name: "United States (At‑Will Employment)", flag: "🇺🇸" },
    ],
  },
];

export function LCJurisdictionSelect({ value, onChange }: Props) {
  const [open, setOpen] = useState(false);

  const selected =
    GROUPS.flatMap((g) => g.items).find((i) => i.code === value) ??
    GROUPS[0].items[0];

  return (
    <div className="relative">
      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full border rounded-lg p-3 flex items-center justify-between bg-white shadow-sm"
      >
        <span className="flex items-center gap-2">
          <span>{selected.flag}</span>
          <span className="font-medium">{selected.name}</span>
        </span>
        <span className="text-slate-500">▾</span>
      </button>

      {/* Dropdown */}
      {open && (
        <div className="absolute z-20 mt-2 w-full bg-white border rounded-lg shadow-lg max-h-80 overflow-y-auto">
          {GROUPS.map((group) => (
            <div key={group.label} className="border-b last:border-none">
              <div className="px-3 py-2 text-xs font-semibold text-slate-500 uppercase tracking-wide bg-slate-50">
                {group.label}
              </div>

              {group.items.map((item) => (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => {
                    onChange(item.code as Jurisdiction);
                    setOpen(false);
                  }}
                  className={`w-full text-left px-4 py-2 flex items-center gap-2 hover:bg-blue-50 ${
                    value === item.code ? "bg-blue-100" : ""
                  }`}
                >
                  <span>{item.flag}</span>
                  <span>{item.name}</span>
                </button>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}