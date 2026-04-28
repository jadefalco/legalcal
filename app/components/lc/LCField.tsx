"use client";

import type { LCFieldProps } from "./types";

export const LCField = ({
  label,
  children,
  theme,
}: LCFieldProps) => {
  const primaryColor = theme?.colors?.primary;

  return (
    <div className="space-y-2">
      <label
        className="block text-sm font-medium"
        style={{ color: primaryColor }}
      >
        {label}
      </label>
      {children}
    </div>
  );
};
