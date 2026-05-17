"use client";

import Link from "next/link";
import { useRuleFreshness } from "@/lib/authority/hooks/useRuleFreshness";
import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";

interface RuleFreshnessBannerProps {
  topic: string;
  jurisdiction: string;
}

export default function RuleFreshnessBanner({
  topic,
  jurisdiction,
}: RuleFreshnessBannerProps) {
  const freshness = useRuleFreshness(topic, jurisdiction);

  if (!freshness || freshness.warnings.length === 0) {
    return null;
  }

  const isSevere = freshness.isExpired || freshness.missingNextYear;

  return (
    <div
      className={`rounded-lg border p-3 ${
        isSevere
          ? "border-red-200 bg-red-50"
          : "border-amber-200 bg-amber-50"
      }`}
    >
      <div className="flex items-start gap-3">
        <ExclamationTriangleIcon
          className={`mt-0.5 h-5 w-5 shrink-0 ${
            isSevere ? "text-red-600" : "text-amber-600"
          }`}
        />
        <div className="flex-1">
          <p
            className={`text-sm font-medium ${
              isSevere ? "text-red-800" : "text-amber-800"
            }`}
          >
            {freshness.warnings[0]}
          </p>
          <Link
            href={`/admin/rules/${topic}/${jurisdiction}`}
            className={`mt-1 inline-block text-xs font-medium hover:underline ${
              isSevere
                ? "text-red-700"
                : "text-amber-700"
            }`}
          >
            View rule details →
          </Link>
        </div>
      </div>
    </div>
  );
}
