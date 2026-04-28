"use client";

import type { LCTimelineProps } from "./types";

export const LCTimeline = ({
  steps,
  title = "Timeline",
  icon: Icon,
  theme,
}: LCTimelineProps) => {
  const primaryColor = theme?.colors?.primary;

  return (
    <div
      className="mt-8 border rounded-lg p-6 shadow-sm"
      style={{
        borderColor: primaryColor ? `${primaryColor}33` : undefined,
        backgroundColor: theme?.colors?.background,
      }}
    >
      <h2
        className="text-lg font-semibold mb-4 flex items-center gap-2"
        style={{ color: primaryColor }}
      >
        {Icon && (
          <Icon
            className="w-5 h-5"
            style={{ color: primaryColor }}
          />
        )}
        {title}
      </h2>

      <ol
        className="relative space-y-8 ml-3"
        style={{ borderLeftWidth: 2, borderLeftStyle: "solid", borderLeftColor: primaryColor ? `${primaryColor}4D` : "#cbd5e1" }}
      >
        {steps.map((step, index) => {
          const StepIcon = step.icon;
          return (
            <li key={index} className="ml-6">
              <span
                className="absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full bg-white border"
                style={{ borderColor: primaryColor ? `${primaryColor}66` : "#cbd5e1" }}
              >
                <StepIcon
                  className="w-4 h-4"
                  style={{ color: primaryColor || undefined }}
                />
              </span>

              <h3 className="font-medium text-slate-800">
                {step.title}
              </h3>
              <p className="text-sm text-slate-600 mt-1">
                {step.description}
              </p>
            </li>
          );
        })}
      </ol>
    </div>
  );
};
