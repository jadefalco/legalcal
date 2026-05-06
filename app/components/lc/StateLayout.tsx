import type { Theme } from "@/app/types/Theme";

interface StateLayoutProps {
  stateCode: string;
  theme: Theme;
  children: React.ReactNode;
  header?: React.ReactNode;
  sidebar?: React.ReactNode;
  footer?: React.ReactNode;
}

/**
 * Reusable layout wrapper for state-specific pages.
 *
 * Provides consistent spacing, max-width, and optional slots for
 * a header banner, sidebar navigation, and footer navigation.
 *
 * Usage:
 *   <StateLayout stateCode="ca" theme={theme} sidebar={<StateSidebar ... />}>
 *     <section>...</section>
 *   </StateLayout>
 */
export default function StateLayout({
  children,
  header,
  sidebar,
  footer,
}: StateLayoutProps) {
  return (
    <main className="max-w-4xl mx-auto px-4 py-12 space-y-12">
      {header}

      {sidebar ? (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1 min-w-0 space-y-12">{children}</div>
          <aside className="lg:w-64 shrink-0">{sidebar}</aside>
        </div>
      ) : (
        <div className="space-y-12">{children}</div>
      )}

      {footer}
    </main>
  );
}
