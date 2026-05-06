import Link from "next/link";
import { LockClosedIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import type { Theme } from "@/app/types/Theme";

interface PaywallProps {
  featureName: string;
  description?: string;
  ctaLabel?: string;
  theme?: Theme;
}

export function Paywall({
  featureName,
  description = `Unlock ${featureName} and other premium tools with a Pro or Business plan.`,
  ctaLabel = "Upgrade to Unlock",
  theme,
}: PaywallProps) {
  const primaryColor = theme?.colors?.primary || "#2563EB";

  return (
    <div
      className="border-2 border-dashed rounded-xl p-1"
      style={{ borderColor: `${primaryColor}40` }}
    >
      <LCCard theme={theme} className="space-y-4">
        <div className="flex items-center gap-3">
          <div
            className="p-2 rounded-full"
            style={{ backgroundColor: `${primaryColor}15` }}
          >
            <LockClosedIcon
              className="w-6 h-6"
              style={{ color: primaryColor }}
            />
          </div>
          <div>
            <h3 className="font-semibold text-slate-800">
              {featureName} — Premium Feature
            </h3>
          </div>
        </div>

        <p className="text-sm text-slate-600 leading-relaxed">{description}</p>

        <div className="flex flex-wrap gap-3">
          <Link href="/pricing">
            <LCButton variant="primary" theme={theme}>
              <ArrowRightIcon className="w-4 h-4" />
              {ctaLabel}
            </LCButton>
          </Link>
          <Link href="/pricing">
            <LCButton variant="ghost" theme={theme}>
              View Plans
            </LCButton>
          </Link>
        </div>
      </LCCard>
    </div>
  );
}
