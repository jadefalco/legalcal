import { existsSync, readFileSync } from "fs";
import { authorityBundle } from "@/lib/authority/bundle";
import { checkAllRules } from "@/lib/authority/freshness";
import type { SourceChangeResult } from "@/lib/authority/sourceMonitor";
import { jurisdictions } from "@/lib/authority/jurisdictions";
import RuleDashboardClient from "./RuleDashboardClient";

interface RuleRow {
  topic: string;
  jurisdiction: string;
  country: string;
  isExpired: boolean;
  isStale: boolean;
  missingNextYear: boolean;
  warnings: string[];
  lastUpdated: string;
  effectiveYear: number | null;
}

interface GroupedRules {
  [topic: string]: RuleRow[];
}

function loadSourceChanges(): Map<string, SourceChangeResult> {
  const path = "reports/source-changes.json";
  if (!existsSync(path)) {
    return new Map();
  }
  try {
    const data: SourceChangeResult[] = JSON.parse(readFileSync(path, "utf-8"));
    const map = new Map<string, SourceChangeResult>();
    for (const item of data) {
      map.set(`${item.topic}/${item.jurisdiction}`, item);
    }
    return map;
  } catch {
    return new Map();
  }
}

const jurisdictionCountryMap = new Map<string, string>();
for (const j of jurisdictions) {
  jurisdictionCountryMap.set(j.code.toLowerCase(), j.country.toLowerCase());
}

export default function RulesDashboardPage() {
  const reports = checkAllRules(authorityBundle);
  const sourceChanges = loadSourceChanges();

  const rows: RuleRow[] = reports.map((report) => {
    const rule = authorityBundle[report.topic]?.[report.jurisdiction];
    const year =
      typeof rule?.data.year === "number" ? rule.data.year : null;
    const lastUpdated =
      rule?.lastUpdated ?? rule?.version.effectiveDate ?? "";
    const country = jurisdictionCountryMap.get(report.jurisdiction.toLowerCase()) ?? "unknown";

    return {
      topic: report.topic,
      jurisdiction: report.jurisdiction,
      country,
      ...report.freshness,
      lastUpdated,
      effectiveYear: year,
    };
  });

  const grouped: GroupedRules = {};
  for (const row of rows) {
    if (!grouped[row.topic]) {
      grouped[row.topic] = [];
    }
    grouped[row.topic].push(row);
  }

  const sortedGrouped: GroupedRules = {};
  for (const topic of Object.keys(grouped).sort()) {
    sortedGrouped[topic] = grouped[topic].sort((a, b) => {
      // Sort by country first, then alphabetically by jurisdiction
      if (a.country !== b.country) {
        return a.country.localeCompare(b.country);
      }
      return a.jurisdiction.localeCompare(b.jurisdiction);
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Rule Freshness Dashboard
      </h1>
      <p className="mt-4 max-w-2xl text-lg text-slate-700">
        Internal overview of rule accuracy, expiry, and update requirements
        across all jurisdictions.
      </p>

      <div className="mt-10">
        <RuleDashboardClient
          grouped={sortedGrouped}
          sourceChanges={sourceChanges}
        />
      </div>
    </main>
  );
}
