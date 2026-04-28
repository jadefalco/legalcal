"use client";

import type { LCNoticeProps } from "./types";

export const LCNotice = ({
  label,
  value,
  icon: Icon,
  color,
  theme,
}: LCNoticeProps) => {
  const primaryColor = theme?.colors?.primary;
  const valueColor = color || primaryColor || "text-blue-700";

  return (
    <div className="space-y-1">
      <div className="text-xs uppercase tracking-wide text-slate-500 flex items-center gap-1">
        {Icon && (
          <Icon
            className="w-4 h-4"
            style={{ color: primaryColor }}
          />
        )}
        {label}
      </div>
      <div
        className="text-2xl font-bold"
        style={{ color: valueColor.startsWith("text-") ? undefined : valueColor }}
      >
        {value}
      </div>
    </div>
  );
};
