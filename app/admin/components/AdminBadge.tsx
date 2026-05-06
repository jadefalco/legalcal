import { ReactNode } from "react";

const variantMap: Record<string, string> = {
  state: "bg-blue-100 text-blue-800",
  city: "bg-purple-100 text-purple-800",
  override: "bg-orange-100 text-orange-800",
  "high confidence": "bg-emerald-100 text-emerald-800",
  "medium confidence": "bg-yellow-100 text-yellow-800",
  "low confidence": "bg-red-100 text-red-800",
  pending: "bg-yellow-100 text-yellow-800",
  running: "bg-blue-100 text-blue-800",
  complete: "bg-emerald-100 text-emerald-800",
  error: "bg-red-100 text-red-800",
  skipped: "bg-slate-100 text-slate-500",
  classified: "bg-indigo-100 text-indigo-800",
  queued: "bg-teal-100 text-teal-800",
  default: "bg-slate-100 text-slate-700",
};

export function AdminBadge({
  children,
  variant = "default",
}: {
  children: ReactNode;
  variant?: string;
}) {
  const cls = variantMap[variant] ?? variantMap.default;
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${cls}`}
    >
      {children}
    </span>
  );
}
