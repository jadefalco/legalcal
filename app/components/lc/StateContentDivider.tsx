

import type { Theme } from "@/app/types/Theme";

interface StateContentDividerProps {
  theme: Theme;
}

/**
 * Reusable, themed horizontal divider for state-specific pages.
 *
 * Usage:
 *   <StateContentDivider theme={theme} />
 */
export default function StateContentDivider({
  theme,
}: StateContentDividerProps) {
  return (
    <div
      className="h-px w-full rounded my-8"
      style={{
        backgroundColor: theme.colors.primary,
        opacity: 0.25,
      }}
    />
  );
}
