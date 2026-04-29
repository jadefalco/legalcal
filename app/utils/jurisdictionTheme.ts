export const JURISDICTION_THEME: Record<
  string,
  {
    colorClass: string;
    borderClass: string;
    icon: string;
    label: string;
  }
> = {
  // Canada
  bc: {
    colorClass: "text-emerald-600",
    borderClass: "border-emerald-600",
    icon: "🏔️",
    label: "British Columbia",
  },
  ab: {
    colorClass: "text-amber-600",
    borderClass: "border-amber-600",
    icon: "⛽",
    label: "Alberta",
  },
  on: {
    colorClass: "text-red-600",
    borderClass: "border-red-600",
    icon: "🛶",
    label: "Ontario",
  },
  qc: {
    colorClass: "text-indigo-600",
    borderClass: "border-indigo-600",
    icon: "⚜️",
    label: "Quebec",
  },
  federal: {
    colorClass: "text-cyan-600",
    borderClass: "border-cyan-600",
    icon: "🇨🇦",
    label: "Federal (Canada)",
  },

  // United States
  us: {
    colorClass: "text-blue-600",
    borderClass: "border-blue-600",
    icon: "🇺🇸",
    label: "United States",
  },

  // Default fallback
  default: {
    colorClass: "text-slate-600",
    borderClass: "border-slate-600",
    icon: "🌐",
    label: "Your Region",
  },
};