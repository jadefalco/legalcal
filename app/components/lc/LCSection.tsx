"use client";

import type { LCSectionProps } from "./types";

export const LCSection = ({
  title,
  description,
  icon: Icon,
  theme,
}: LCSectionProps) => {
  const primaryColor = theme?.colors?.primary;

  return (
    <div className="space-y-2">
      <h2
        className="text-xl font-semibold flex items-center gap-2"
        style={{ color: primaryColor }}
      >
        {Icon && (
          <Icon
            className="w-6 h-6"
            style={{ color: primaryColor }}
          />
        )}
        {title}
      </h2>
      {description && (
        <p className="text-slate-600 text-sm">
          {description}
        </p>
      )}
    </div>
  );
};
