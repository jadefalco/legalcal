"use client";

import type { LCCardProps } from "./types";

export const LCCard = ({
  children,
  className = "",
  theme,
}: LCCardProps) => {
  const borderColor = theme?.colors?.primary;
  const bgColor = theme?.colors?.background;

  return (
    <div
      className={`shadow-sm border rounded-xl p-6 ${className}`}
      style={{
        borderColor: borderColor ? `${borderColor}33` : undefined,
        backgroundColor: bgColor,
      }}
    >
      {children}
    </div>
  );
};
