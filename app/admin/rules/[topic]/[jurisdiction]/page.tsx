import Link from "next/link";
import { existsSync, readFileSync } from "fs";
import { authorityBundle } from "@/lib/authority/bundle";
import { getRuleFreshness } from "@/lib/authority/freshness";
import type { SourceChangeResult } from "@/lib/authority/sourceMonitor";
import CitationExtractor from "./CitationExtractor";
import AiInsights from "./AiInsights";
import ScenarioReasoning from "./ScenarioReasoning";
import ChecklistGenerator from "./ChecklistGenerator";
import RiskScorer from "./RiskScorer";

interface RuleDetailPageProps {
  params: {
    topic: string;
    jurisdiction: string;
  };
}

function loadSourceChange(topic: string, jurisdiction: string): SourceChangeResult | undefined {
  const path = "reports/source-changes.json";
  if (!existsSync(path)) return undefined;
  try {
    const data: SourceChangeResult[] = JSON.parse(readFileSync(path, "utf-8"));
    return data.find((d) => d.topic === topic && d.jurisdiction === jurisdiction);
  } catch {
    return undefined;
  }
}

function isPlaceholderRule(rule: any): boolean {
  if (!rule) return false;
  if (rule.version?.version === "0.0") return true;
  if (Array.isArray(rule.version?.notes) && rule.version.notes.some((n: string) => n.includes("Placeholder auto-generated"))) {
    return true;
  }
  return false;
}

function confidenceBadge(confidence: number): { label: string; className: string } {
  if (confidence >= 0.7) {
    return {
      label: "High",
      className: "bg-green-100 text-green-800 border-green-200",
    };
  }
  if (confidence >= 0.4) {
    return {
      label: "Medium",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    };
  }
  return {
    label: "Low",
    className: "bg-red-100 text-red-800 border-red-200",
  };
}

export default function RuleDetailPage({ params }: RuleDetailPageProps) {
  const { topic, jurisdiction } = params;
  const rule = authorityBundle[topic]?.[jurisdiction];
  const sourceChange = loadSourceChange(topic, jurisdiction);

  if (!rule) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href="/admin/rules"
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to Dashboard
        </Link>
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">Rule Not Found</h1>
          <p className="mt-2 text-slate-600">
            No rule found for <strong>{topic}</strong> /{" "}
            <strong>{jurisdiction}</strong>.
          </p>
        </div>
      </main>
    );
  }

  const placeholder = isPlaceholderRule(rule);
  const freshness = placeholder ? null : getRuleFreshness(rule);

  const effectiveYear =
    typeof rule.data.year === "number" ? rule.data.year : null;
  const lastUpdated = rule.lastUpdated ?? rule.version.effectiveDate;
  const expiresOn =
    rule.expiresOn ??
    (effectiveYear ? `${effectiveYear}-12-31` : undefined);
  const sourceUrl =
    typeof rule.data.sourceUrl === "string"
      ? rule.data.sourceUrl
      : undefined;

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href="/admin/rules"
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to Dashboard
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Rule Detail: {topic} / {jurisdiction.toUpperCase()}
      </h1>

      <div className="mt-4 flex gap-3">
        <Link
          href={`/admin/rules/${topic}/${jurisdiction}/history`}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          View History →
        </Link>
      </div>

      {/* Freshness Banner */}
      {placeholder ? (
        <div className="mt-6 rounded-lg border border-slate-200 bg-slate-50 p-4">
          <p className="text-sm font-medium text-slate-600">
            Freshness: Not applicable (placeholder rule)
          </p>
        </div>
      ) : (
        <div
          className={`mt-6 rounded-lg border p-4 ${
            freshness!.warnings.length > 0
              ? "border-amber-200 bg-amber-50"
              : "border-green-200 bg-green-50"
          }`}
        >
          {freshness!.warnings.length > 0 ? (
            <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
              {freshness!.warnings.map((w, i) => (
                <li key={i}>{w}</li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-medium text-green-800">
              This rule is up to date.
            </p>
          )}
        </div>
      )}

      {/* Metadata Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Metadata</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Effective Year
            </dt>
            <dd className="mt-1 text-slate-900">
              {effectiveYear ?? "—"}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Last Updated
            </dt>
            <dd className="mt-1 text-slate-900">{lastUpdated ?? "—"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Expires On
            </dt>
            <dd className="mt-1 text-slate-900">{expiresOn ?? "—"}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Version
            </dt>
            <dd className="mt-1 text-slate-900">{rule.version.version}</dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Effective Date
            </dt>
            <dd className="mt-1 text-slate-900">
              {rule.version.effectiveDate ?? "—"}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Supersedes
            </dt>
            <dd className="mt-1 text-slate-900">
              {rule.version.supersedes ?? "—"}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Source Changed
            </dt>
            <dd className="mt-1">
              {sourceChange ? (
                sourceChange.error ? (
                  <span className="text-amber-700 font-semibold">
                    Error ({sourceChange.error})
                  </span>
                ) : sourceChange.changed ? (
                  <span className="text-red-700 font-semibold">
                    Yes — source page has changed
                  </span>
                ) : (
                  <span className="text-slate-600">No</span>
                )
              ) : (
                <span className="text-slate-500">Not checked</span>
              )}
            </dd>
          </div>
          {sourceUrl && (
            <div className="rounded-lg border border-slate-200 bg-white p-4 sm:col-span-2">
              <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Source URL
              </dt>
              <dd className="mt-1">
                <a
                  href={sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="break-all text-sm font-medium text-blue-700 hover:underline"
                >
                  {sourceUrl}
                </a>
              </dd>
            </div>
          )}
        </dl>
      </section>

      {/* Data Section */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Data</h2>
        {placeholder ? (
          <div className="mt-4 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
            <p className="text-slate-600">No data available yet.</p>
            <p className="mt-2 text-sm text-slate-500">
              This is a placeholder rule. Data will appear once the jurisdiction
              is fully researched and ingested.
            </p>
          </div>
        ) : (
          <div className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Key
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Value
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {Object.entries(rule.data).map(([key, value]) => (
                  <tr key={key}>
                    <td className="px-4 py-3 font-medium text-slate-900 whitespace-nowrap">
                      {key}
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {typeof value === "object"
                        ? JSON.stringify(value, null, 2)
                        : String(value)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Citations Section */}
      <section className="mt-8">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900">Citations</h2>
        </div>

        <div className="mt-4">
          <CitationExtractor
            topic={topic}
            jurisdiction={jurisdiction}
            hasSourceUrl={!!sourceUrl}
          />
        </div>

        <div className="mt-4 space-y-4">
          {rule.citations.length === 0 && placeholder && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
              <p className="text-sm text-slate-500">No citations available yet.</p>
            </div>
          )}
          {rule.citations.map((citation, i) => {
            const badge = confidenceBadge(citation.confidence ?? 0.5);
            return (
              <div
                key={i}
                className="rounded-lg border border-slate-200 bg-white p-4"
              >
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-semibold text-slate-900">
                    {citation.statute}
                  </h3>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}
                    title="Confidence is based on pattern matching and excerpt quality."
                  >
                    {badge.label}
                  </span>
                </div>
                {citation.excerpt && (
                  <p className="mt-2 text-sm italic text-slate-600">
                    “{citation.excerpt}”
                  </p>
                )}
                <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-500">
                  {citation.url && (
                    <a
                      href={citation.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-blue-700 hover:underline"
                    >
                      View Source
                    </a>
                  )}
                  <span>Updated: {citation.lastUpdated}</span>
                  <span>Confidence: {Math.round((citation.confidence ?? 0.5) * 100)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* AI Insights */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">AI Insights</h2>
        <div className="mt-4">
          <AiInsights topic={topic} jurisdiction={jurisdiction} />
        </div>
      </section>

      {/* Scenario Reasoning */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Scenario Reasoning</h2>
        <div className="mt-4">
          <ScenarioReasoning topic={topic} jurisdiction={jurisdiction} />
        </div>
      </section>

      {/* Checklist */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Compliance Checklist</h2>
        <div className="mt-4">
          <ChecklistGenerator topic={topic} jurisdiction={jurisdiction} />
        </div>
      </section>

      {/* Risk Scoring */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Risk Scoring</h2>
        <div className="mt-4">
          <RiskScorer topic={topic} jurisdiction={jurisdiction} />
        </div>
      </section>

      {/* JSON Preview */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">JSON Preview</h2>
        <details className="mt-4 rounded-lg border border-slate-200 bg-white">
          <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
            Show full rule JSON
          </summary>
          <pre className="overflow-x-auto p-4 text-xs text-slate-600">
            {JSON.stringify(rule, null, 2)}
          </pre>
        </details>
      </section>
    </main>
  );
}
