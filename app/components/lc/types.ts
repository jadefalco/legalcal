/**
 * Shared types for LC (Legal Calculators) components.
 */

import type { ComponentType, SVGProps, ReactNode } from "react";
import type { Theme } from "@/app/types/Theme";

/**
 * Re-export Theme as LCTheme for backward compatibility.
 */
export type LCTheme = Theme;

/**
 * Standard icon type used across LC components.
 */
export type LCIcon = ComponentType<SVGProps<SVGSVGElement>>;

/**
 * Base props shared by most LC components.
 */
export interface LCBaseProps {
  /** Optional theme overrides */
  theme?: LCTheme;
}

/**
 * Props for the LCCard component.
 */
export interface LCCardProps extends LCBaseProps {
  children: ReactNode;
  className?: string;
}

/**
 * Props for the LCSection component.
 */
export interface LCSectionProps extends LCBaseProps {
  title: string;
  description?: string;
  icon?: LCIcon;
}

/**
 * Props for the LCNotice component.
 */
export interface LCNoticeProps extends LCBaseProps {
  label: string;
  value: string;
  icon?: LCIcon;
  color?: string;
}

/**
 * Single step in an LCTimeline.
 */
export interface LCTimelineStep {
  title: string;
  description: string;
  icon: LCIcon;
  color: string;
}

/**
 * Props for the LCTimeline component.
 */
export interface LCTimelineProps extends LCBaseProps {
  steps: LCTimelineStep[];
  title?: string;
  icon?: LCIcon;
}

/**
 * Props for the LCButton component.
 */
export interface LCButtonProps extends LCBaseProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
}

/**
 * Props for the LCField component.
 */
export interface LCFieldProps extends LCBaseProps {
  label: string;
  children: ReactNode;
}

/**
 * Props for the LCStickySidebar component.
 */
export interface LCStickySidebarProps extends LCBaseProps {
  children: ReactNode;
}
