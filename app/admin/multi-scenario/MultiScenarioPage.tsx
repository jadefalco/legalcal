"use client";

import { useState, useTransition } from "react";

interface ScenarioAnalysis {
  scenarioSummary: string;
  relevantRulePoints: string[];
  potentialIssues: string[];
  missingInformation: string[];
}

interface CompliancePath {
  steps: string[];
  warnings: string[];
  assumptions: string[];
  citations: string[];
}

interface OutcomeReasoning {
  likelyOutcome: string;
  factors: string[];
  uncertainties: string[];
  alternativePaths: string[];
}

interface JurisdictionResult {
  jurisdiction: string;
  country: string;
  name: string;
  analysis: ScenarioAnalysis;
  compliance: CompliancePath;
  outcome: OutcomeReasoning;
  isPlaceholder: boolean;
  hasRule: boolean;
}

interface MultiScenarioResult {
  topic: string;
  scenario: string;
  results: JurisdictionResult[];
}

interface MultiScenarioPageProps {
  topics: string[];
}

function severityForRow(result: JurisdictionResult): {
  level: "green" | "amber" | "red";
  label: string;
} {
  if (result.isPlaceholder || !result.hasRule) {
    return { level: "green", label: "No data" };
  }

  const hasIssues = result.analysis.potentialIssues.length > 0;
  const hasFactorConcerns = result.outcome.factors.some(
    (f) =>
      f.includes("exceed") ||
      f.includes("not permitted") ||
      f.includes("shorter")
  );

  if (hasIssues || hasFactorConcerns) {
    return { level: "red", label: "Issues found" };
  }

  const hasMissing =
    result.analysis.missingInformation.length > 0 ||
    result.outcome.uncertainties.length > 0;
  if (hasMissing) {
    return { level: "amber", label: "Missing info" };
  }

  return { level: "green", label: "Aligned" };
}

function severityBadgeClass(level: "green" | "amber" | "red"): string {
  switch (level) {
    case "red":
      return "bg-red-100 text-red-800 border-red-200";
    case "amber":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
}

function rowToMarkdown(result: JurisdictionResult): string {
  const sev = severityForRow(result);
  let md = `## ${result.name} (${result.jurisdiction.toUpperCase()})\n\n`;
  md += `**Status:** ${result.isPlaceholder ? "Placeholder" : sev.label}\n\n`;

  md += `### Analysis\n`;
  md += `- ${result.analysis.scenarioSummary}\n`;
  if (result.analysis.potentialIssues.length > 0) {
    md += `- **Issues:** ${result.analysis.potentialIssues.join("; ")}\n`;
  }
  if (result.analysis.missingInformation.length > 0) {
    md += `- **Missing:** ${result.analysis.missingInformation.join("; ")}\n`;
  }
  md += `\n`;

  md += `### Compliance Path\n`;
  if (result.compliance.steps.length > 0) {
    for (const step of result.compliance.steps) {
      md += `- ${step}\n`;
    }
  }
  if (result.compliance.warnings.length > 0) {
    md += `\n**Warnings:** ${result.compliance.warnings.join("; ")}\n`;
  }
  md += `\n`;

  md += `### Outcome Reasoning\n`;
  md += `- ${result.outcome.likelyOutcome}\n`;
  if (result.outcome.factors.length > 0) {
    md += `- **Factors:** ${result.outcome.factors.join("; ")}\n`;
  }
  if (result.outcome.uncertainties.length > 0) {
    md += `- **Uncertainties:** ${result.outcome.uncertainties.join("; ")}\n`;
  }
  if (result.outcome.alternativePaths.length > 0) {
    md += `- **Alternatives:** ${result.outcome.alternativePaths.join("; ")}\n`;
  }
  md += `\n---\n\n`;

  return md;
}

function resultsToMarkdown(result: MultiScenarioResult): string {
  const topicLabel = result.topic.replace(/-/g, " ");
  let md = `# Multi-Jurisdiction Scenario Analysis — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${result.scenario}\n\n`;
  md += `**Jurisdictions analyzed:** ${result.results.length}\n\n`;

  for (const r of result.results) {
    md += rowToMarkdown(r);
  }

  return md;
}

export default function MultiScenarioPage({ topics }: MultiScenarioPageProps) {
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<MultiScenarioResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());

  function toggleRow(code: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(code)) {
        next.delete(code);
      } else {
        next.add(code);
      }
      return next;
    });
  }

  function handleRun() {
    setError(null);
    setResult(null);
    setExpandedRows(new Set());

    if (!topic) {
      setError("Please select a topic.");
      return;
    }
    if (!scenario.trim() || scenario.trim().length <= 10) {
      setError("Please describe a scenario longer than 10 characters.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/multi-scenario", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario: scenario.trim() }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Multi-scenario run failed");
        } else {
          setResult(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  function copyRowMarkdown(resultItem: JurisdictionResult) {
    const md = rowToMarkdown(resultItem);
    navigator.clipboard.writeText(md).catch(() => {});
  }

  function downloadJson() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `multi-scenario-${result.topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const realCount = result?.results.filter((r) => !r.isPlaceholder && r.hasRule).length ?? 0;
  const placeholderCount = result?.results.filter((r) => r.isPlaceholder).length ?? 0;

  return (
    <div className="mt-8 space-y-6">
      {/* Input Panel */}
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Topic
          </label>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {topics.map((t) => (
              <option key={t} value={t}>
                {t.replace(/-/g, " ")}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Scenario
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe a scenario... e.g. 'My landlord gave me 30 days notice of a 5% rent increase. I moved in 6 months ago.'"
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={handleRun}
            disabled={isPending}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending ? "Running across jurisdictions…" : "Run Across All Jurisdictions"}
          </button>

          {result && (
            <>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Download Full Matrix (JSON)
              </button>
              <button
                onClick={() => {
                  const md = resultsToMarkdown(result);
                  navigator.clipboard.writeText(md).catch(() => {});
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy Full Matrix (Markdown)
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="space-y-4">
          {/* Summary bar */}
          <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
            <span>
              <strong>{result.results.length}</strong> jurisdictions
            </span>
            <span>
              <strong>{realCount}</strong> with real data
            </span>
            <span>
              <strong>{placeholderCount}</strong> placeholders
            </span>
          </div>

          {/* Matrix Table */}
          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Status
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 min-w-[240px]">
                    Scenario Analysis
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 min-w-[240px]">
                    Compliance Path
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 min-w-[240px]">
                    Outcome Reasoning
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.results.map((r) => {
                  const sev = severityForRow(r);
                  const isExpanded = expandedRows.has(r.jurisdiction);
                  return (
                    <tr
                      key={r.jurisdiction}
                      className={`transition-colors hover:bg-slate-50 ${
                        r.isPlaceholder ? "bg-slate-50/50" : ""
                      }`}
                    >
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="font-semibold text-slate-900">
                          {r.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {r.jurisdiction.toUpperCase()} · {r.country.toUpperCase()}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityBadgeClass(
                            sev.level
                          )}`}
                        >
                          {sev.label}
                        </span>
                        {r.isPlaceholder && (
                          <span className="ml-2 inline-flex items-center rounded-full border border-slate-200 bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600">
                            Placeholder
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        <p className="text-slate-700">
                          {r.analysis.scenarioSummary}
                        </p>
                        {r.analysis.potentialIssues.length > 0 && (
                          <ul className="mt-2 list-disc list-inside space-y-0.5 text-xs text-red-700">
                            {r.analysis.potentialIssues.map((issue, i) => (
                              <li key={i}>{issue}</li>
                            ))}
                          </ul>
                        )}
                        {r.analysis.missingInformation.length > 0 && (
                          <ul className="mt-2 list-disc list-inside space-y-0.5 text-xs text-amber-700">
                            {r.analysis.missingInformation.map((m, i) => (
                              <li key={i}>{m}</li>
                            ))}
                          </ul>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isExpanded ? (
                          <div className="space-y-2">
                            {r.compliance.steps.length > 0 && (
                              <ol className="list-decimal list-inside space-y-0.5 text-slate-700">
                                {r.compliance.steps.map((s, i) => (
                                  <li key={i}>{s}</li>
                                ))}
                              </ol>
                            )}
                            {r.compliance.warnings.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-red-700">
                                {r.compliance.warnings.map((w, i) => (
                                  <li key={i}>{w}</li>
                                ))}
                              </ul>
                            )}
                            {r.compliance.citations.length > 0 && (
                              <div className="flex flex-wrap gap-1">
                                {r.compliance.citations.map((c, i) => (
                                  <span
                                    key={i}
                                    className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600"
                                  >
                                    {c}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-slate-600">
                              {r.compliance.steps.length} step
                              {r.compliance.steps.length !== 1 ? "s" : ""}
                              {r.compliance.warnings.length > 0
                                ? `, ${r.compliance.warnings.length} warning${r.compliance.warnings.length !== 1 ? "s" : ""}`
                                : ""}
                            </p>
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isExpanded ? (
                          <div className="space-y-2">
                            <p className="text-slate-700">
                              {r.outcome.likelyOutcome}
                            </p>
                            {r.outcome.factors.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                                {r.outcome.factors.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            )}
                            {r.outcome.uncertainties.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-700">
                                {r.outcome.uncertainties.map((u, i) => (
                                  <li key={i}>{u}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <div>
                            <p className="text-slate-600 line-clamp-3">
                              {r.outcome.likelyOutcome}
                            </p>
                            {r.outcome.factors.length > 0 && (
                              <p className="mt-1 text-xs text-slate-500">
                                {r.outcome.factors.length} factor
                                {r.outcome.factors.length !== 1 ? "s" : ""}
                              </p>
                            )}
                          </div>
                        )}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap align-top">
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => toggleRow(r.jurisdiction)}
                            className="text-xs font-medium text-blue-700 hover:underline"
                          >
                            {isExpanded ? "Collapse" : "Expand"}
                          </button>
                          <button
                            onClick={() => copyRowMarkdown(r)}
                            className="text-xs font-medium text-slate-600 hover:text-slate-900"
                          >
                            Copy Markdown
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
