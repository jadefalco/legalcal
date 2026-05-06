

import type { Theme } from "@/app/types/Theme";

interface StateSectionHeaderProps {
  title: string;
  description?: string;
  icon: React.ComponentType<any>;
  theme: Theme;
}

/**
 * Reusable, themed section header for state-specific pages.
 *
 * Renders an icon (colored by theme), a bold title, and an optional
 * description with consistent spacing.
 *
 * Usage:
 *   <StateSectionHeader
 *     title="Eviction Rules"
 *     description="Notice periods and filing deadlines."
 *     icon={ScaleIcon}
 *     theme={theme}
 *   />
 */
export default function StateSectionHeader({
  title,
  description,
  icon: Icon,
  theme,
}: StateSectionHeaderProps) {
  return (
    <div className="space-y-2">
      <h2 className="text-xl font-semibold text-slate-800 flex items-center gap-2">
        <Icon className="w-6 h-6" style={{ color: theme.colors.primary }} />
        {title}
      </h2>
      {description && (
        <p className="text-sm text-slate-600">{description}</p>
      )}
    </div>
  );
}
