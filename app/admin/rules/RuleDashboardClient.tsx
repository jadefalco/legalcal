"use client";

import { useState, useMemo } from "react";
import Link from "next/link";

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

interface SourceChangeInfo {
  changed: boolean;
  error?: string;
}

interface GroupedRules {
  [topic: string]: RuleRow[];
}

const filters = ["All", "Fresh", "Stale", "Expired", "Missing Next Year"] as const;
type Filter = (typeof filters)[number];

function getStatus(row: RuleRow): Filter {
  if (row.isExpired) return "Expired";
  if (row.missingNextYear) return "Missing Next Year";
  if (row.isStale) return "Stale";
  return "Fresh";
}

function statusColor(status: Filter): string {
  switch (status) {
    case "Fresh":
      return "text-green-700 font-semibold";
    case "Stale":
      return "text-amber-700 font-semibold";
    case "Expired":
      return "text-red-700 font-semibold";
    case "Missing Next Year":
      return "text-red-700 font-semibold";
    default:
      return "text-slate-700";
  }
}

function sourceChangedText(info?: SourceChangeInfo): string {
  if (!info) return "No";
  if (info.error) return "Error";
  return info.changed ? "Yes" : "No";
}

function sourceChangedClass(info?: SourceChangeInfo): string {
  if (!info) return "text-slate-500";
  if (info.error) return "text-amber-700 font-semibold";
  return info.changed ? "text-red-700 font-semibold" : "text-slate-500";
}

function countryBadge(country: string): string {
  switch (country.toLowerCase()) {
    case "ca":
      return "CA";
    case "us":
      return "US";
    default:
      return country.toUpperCase();
  }
}

function countryBadgeClass(country: string): string {
  switch (country.toLowerCase()) {
    case "ca":
      return "bg-red-100 text-red-800";
    case "us":
      return "bg-blue-100 text-blue-800";
    default:
      return "bg-slate-100 text-slate-800";
  }
}

export default function RuleDashboardClient({
  grouped,
  sourceChanges,
}: {
  grouped: GroupedRules;
  sourceChanges: Map<string, SourceChangeInfo>;
}) {
  const [activeFilter, setActiveFilter] = useState<Filter>("All");

  const filteredGrouped = useMemo(() => {
    if (activeFilter === "All") return grouped;
    const result: GroupedRules = {};
    for (const [topic, rows] of Object.entries(grouped)) {
      const filtered = rows.filter((row) => getStatus(row) === activeFilter);
      if (filtered.length > 0) {
        result[topic] = filtered;
      }
    }
    return result;
  }, [grouped, activeFilter]);

  const topicCount = Object.keys(filteredGrouped).length;
  const ruleCount = Object.values(filteredGrouped).reduce(
    (sum, rows) => sum + rows.length,
    0
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
              activeFilter === f
                ? "bg-blue-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="text-sm text-slate-500">
        Showing {ruleCount} rule{ruleCount !== 1 ? "s" : ""} across{" "}
        {topicCount} topic{topicCount !== 1 ? "s" : ""}.
      </p>

      {Object.entries(filteredGrouped).map(([topic, rows]) => (
        <section key={topic} className="space-y-3">
          <h2 className="text-xl font-bold text-slate-900 capitalize">
            {topic.replace(/-/g, " ")}
          </h2>
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Country
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Warnings
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Source Changed
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Last Updated
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Effective Year
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {rows.map((row) => {
                  const status = getStatus(row);
                  const sourceInfo = sourceChanges.get(
                    `${row.topic}/${row.jurisdiction}`
                  );
                  return (
                    <tr key={row.jurisdiction}>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${countryBadgeClass(
                            row.country
                          )}`}
                        >
                          {countryBadge(row.country)}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium uppercase text-slate-900">
                        <Link
                          href={`/admin/rules/${row.topic}/${row.jurisdiction}`}
                          className="hover:text-blue-700 hover:underline"
                        >
                          {row.jurisdiction}
                        </Link>
                      </td>
                      <td className={`px-4 py-3 ${statusColor(status)}`}>
                        {status}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.warnings[0] ?? "—"}
                      </td>
                      <td className={`px-4 py-3 ${sourceChangedClass(sourceInfo)}`}>
                        {sourceChangedText(sourceInfo)}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.lastUpdated}
                      </td>
                      <td className="px-4 py-3 text-slate-600">
                        {row.effectiveYear ?? "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      {topicCount === 0 && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-slate-500">No rules match the selected filter.</p>
        </div>
      )}
    </div>
  );
}
