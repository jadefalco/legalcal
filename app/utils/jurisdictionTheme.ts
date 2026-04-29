export const JURISDICTION_THEME: Record<
  string,
  { color: string; icon: string; label: string }
> = {
  // Canada
  bc: { color: "emerald", icon: "🏔️", label: "British Columbia" },
  ab: { color: "amber", icon: "⛽", label: "Alberta" },
  sk: { color: "yellow", icon: "🌾", label: "Saskatchewan" },
  mb: { color: "yellow", icon: "🌻", label: "Manitoba" },
  on: { color: "red", icon: "🛶", label: "Ontario" },
  qc: { color: "indigo", icon: "⚜️", label: "Quebec" },
  nb: { color: "blue", icon: "🌊", label: "New Brunswick" },
  ns: { color: "blue", icon: "⚓", label: "Nova Scotia" },
  pei: { color: "green", icon: "🍓", label: "Prince Edward Island" },
  nl: { color: "rose", icon: "🐟", label: "Newfoundland & Labrador" },

  // Territories
  yt: { color: "slate", icon: "❄️", label: "Yukon" },
  nt: { color: "slate", icon: "🧭", label: "Northwest Territories" },
  nu: { color: "slate", icon: "🐻‍❄️", label: "Nunavut" },

  // Federal
  federal: { color: "cyan", icon: "🇨🇦", label: "Federal (Canada)" },

  // United States
  us: { color: "blue", icon: "🇺🇸", label: "United States" },
};