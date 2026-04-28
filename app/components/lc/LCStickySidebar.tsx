"use client";

import type { LCStickySidebarProps } from "./types";

export const LCStickySidebar = ({
  children,
  theme,
}: LCStickySidebarProps) => {
  const primaryColor = theme?.colors?.primary;

  return (
    <aside
      className="md:sticky md:top-20 h-fit space-y-4 border rounded-xl p-4"
      style={{ borderColor: primaryColor ? `${primaryColor}33` : undefined }}
    >
      {children}
    </aside>
  );
};
