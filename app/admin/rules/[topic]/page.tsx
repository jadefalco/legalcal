import { existsSync, readFileSync } from "fs";
import Link from "next/link";
import { authorityBundle } from "@/lib/authority/bundle";
import { jurisdictions } from "@/lib/authority/jurisdictions";
import { getTopicCoverage } from "@/lib/authority/topic";

interface RuleRow {
  jurisdiction: string;
  name: string;
  country: string;
  isPlaceholder: boolean;
  version: string;
  hasCitations: boolean;
}

function isPlaceholderRule(rule: any): boolean {
  if (!rule) return true;
  if (rule.version?.version === "0.0") return true;
  if (
    Array.isArray(rule.version?.notes) &&
    rule.version.notes.some((n: string) => n.includes("Placeholder auto-generated"))
  ) {
    return true;
  }
  return false;
}

function loadHistory(topic: string, jurisdiction: string) {
  const file = `data/rule-history/${topic}/${jurisdiction}.json`;
  if (!existsSync(file)) return [];
  try {
    return JSON.parse(readFileSync(file, "utf-8"));
  } catch {
    return [];
  }
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = params.topic.toLowerCase();
  const topicRules = authorityBundle[topic] || {};
  const coverage = getTopicCoverage(topic);

  const rows: RuleRow[] = jurisdictions.map((j) => {
    const rule = topicRules[j.code];
    const history = loadHistory(topic, j.code);
    return {
      jurisdiction: j.code,
      name: j.name,
      country: j.country.toUpperCase(),
      isPlaceholder: isPlaceholderRule(rule),
      version: rule?.version?.version || "0.0",
      hasCitations: Array.isArray(rule?.citations) && rule.citations.length > 0,
    };
  });

  const caRows = rows.filter((r) => r.country === "CA");
  const usRows = rows.filter((r) => r.country === "US");

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-6">
        <Link
          href="/admin/rules"
          className="text-sm text-blue-700 hover:underline"
        >
          ← Back to Rules Dashboard
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        {topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>
      <p className="mt-2 text-slate-600">
        Manage rules across all jurisdictions for this topic.
      </p>

      {/* Coverage Stats */}
      <div className="mt-6 grid gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500 uppercase">
            Total Jurisdictions
          </div>
          <div className="mt-1 text-2xl font-bold text-slate-900">
            {coverage.total}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500 uppercase">
            Real Rules
          </div>
          <div className="mt-1 text-2xl font-bold text-green-700">
            {coverage.real}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500 uppercase">
            Placeholders
          </div>
          <div className="mt-1 text-2xl font-bold text-amber-700">
            {coverage.placeholder}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <div className="text-xs font-medium text-slate-500 uppercase">
            Coverage
          </div>
          <div className="mt-1 text-2xl font-bold text-blue-700">
            {coverage.coveragePercent}%
          </div>
        </div>
      </div>

      {/* Jurisdiction Grid */}
      <div className="mt-10 space-y-10">
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            Canada ({caRows.length} jurisdictions)
          </h2>
          <JurisdictionGrid rows={caRows} topic={topic} />
        </section>

        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">
            United States ({usRows.length} jurisdictions)
          </h2>
          <JurisdictionGrid rows={usRows} topic={topic} />
        </section>
      </div>
    </main>
  );
}

function JurisdictionGrid({ rows, topic }: { rows: RuleRow[]; topic: string }) {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      {rows.map((row) => (
        <div
          key={row.jurisdiction}
          className={`rounded-lg border p-4 transition-colors hover:bg-slate-50 ${
            row.isPlaceholder
              ? "border-amber-200 bg-amber-50/30"
              : "border-slate-200 bg-white"
          }`}
        >
          <div className="flex items-center justify-between">
            <div className="font-semibold text-slate-900">
              {row.name}
            </div>
            {row.isPlaceholder ? (
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-medium text-amber-800">
                Placeholder
              </span>
            ) : (
              <span className="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium text-green-800">
                Active
              </span>
            )}
          </div>
          <div className="mt-1 text-xs text-slate-500">
            {row.jurisdiction.toUpperCase()} · v{row.version}
          </div>
          {row.hasCitations && (
            <div className="mt-1 text-xs text-blue-600">
              Has citations
            </div>
          )}
          <div className="mt-3 flex gap-2">
            <Link
              href={`/admin/rules/${topic}/${row.jurisdiction}`}
              className="rounded bg-blue-900 px-3 py-1 text-xs font-medium text-white transition-colors hover:bg-blue-800"
            >
              Edit Rule
            </Link>
            <Link
              href={`/admin/rules/${topic}/${row.jurisdiction}/history`}
              className="rounded border border-slate-300 bg-white px-3 py-1 text-xs font-medium text-slate-700 transition-colors hover:bg-slate-50"
            >
              History
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
