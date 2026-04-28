"use client";

import type { Theme } from "@/app/types/Theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";

export default function USCalculatorClient({
  theme,
  title,
  description,
  sections = [],
}: {
  theme: Theme;
  title: string;
  description: string;
  sections?: Array<{
    title: string;
    content: string;
  }>;
}) {
  return (
    <div className="space-y-6">
      <LCSection title={title} description={description} theme={theme} />

      {sections.length > 0 && (
        <div className="space-y-4">
          {sections.map((section, i) => (
            <LCSection
              key={i}
              title={section.title}
              description={section.content}
              theme={theme}
            />
          ))}
        </div>
      )}

      <LCCard theme={theme}>
        <p>
          This calculator provides state‑specific information for{" "}
          {title.toLowerCase()}.
        </p>
      </LCCard>
    </div>
  );
}