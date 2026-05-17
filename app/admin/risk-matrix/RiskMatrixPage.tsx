"use client";

import { useState, useTransition } from "react";

interface RiskScore {
  jurisdiction: string;
  country: string;
  name: string;
  topic: string;
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  overallRisk: "low" | "medium" | "high";
  factors: string[];
  uncertainties: string[];
  warnings: string[];
}

interface MultiRiskResult {
  topic: string;
  scenario: string;
  results: RiskScore[];
}

interface RiskMatrixPageProps {
  topics: string[];
}

function riskBadgeClass(level: "low" | "medium" | "high"): string {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
}

function riskEmoji(level: "low" | "medium" | "high"): string {
  switch (level) {
    case "high":
      return "🟥";
    case "medium":
      return "🟧";
    default:
      return "🟩";
  }
}

function rowToMarkdown(r: RiskScore): string {
  let md = `## ${r.name} (${r.jurisdiction.toUpperCase()})\n\n`;
  md += `| Category | Risk |\n`;
  md += `|----------|------|\n`;
  md += `| Structural | ${r.structuralRisk} |\n`;
  md += `| Procedural | ${r.proceduralRisk} |\n`;
  md += `| Documentation | ${r.documentationRisk} |\n`;
  md += `| Overall | ${r.overallRisk} |\n`;
  md += `\n`;

  if (r.factors.length > 0) {
    md += `**Factors:** ${r.factors.join("; ")}\n\n`;
  }
  if (r.uncertainties.length > 0) {
    md += `**Uncertainties:** ${r.uncertainties.join("; ")}\n\n`;
  }
  if (r.warnings.length > 0) {
    md += `**Warnings:** ${r.warnings.join("; ")}\n\n`;
  }

  md += `---\n\n`;
  return md;
}

function resultsToMarkdown(result: MultiRiskResult): string {
  const topicLabel = result.topic.replace(/-/g, " ");
  let md = `# National Risk Matrix — ${topicLabel}\n\n`;
  md += `**Scenario:**\n> ${result.scenario}\n\n`;
  md += `**Jurisdictions analyzed:** ${result.results.length}\n\n`;

  for (const r of result.results) {
    md += rowToMarkdown(r);
  }

  return md;
}

export default function RiskMatrixPage({ topics }: RiskMatrixPageProps) {
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<MultiRiskResult | null>(null);
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
        const res = await fetch("/api/risk/multi", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario: scenario.trim() }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Risk scan failed");
        } else {
          setResult(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    if (!result) return;
    const blob = new Blob([JSON.stringify(result, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `risk-matrix-${result.topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  const highCount = result?.results.filter((r) => r.overallRisk === "high").length ?? 0;
  const mediumCount = result?.results.filter((r) => r.overallRisk === "medium").length ?? 0;
  const lowCount = result?.results.filter((r) => r.overallRisk === "low").length ?? 0;

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
            {isPending ? "Running national risk scan…" : "Run National Risk Scan"}
          </button>

          {result && (
            <>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Download Matrix (JSON)
              </button>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(resultsToMarkdown(result))
                    .catch(() => {});
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy Matrix (Markdown)
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
            <span className="text-red-700">
              <strong>{highCount}</strong> high risk
            </span>
            <span className="text-amber-700">
              <strong>{mediumCount}</strong> medium risk
            </span>
            <span className="text-green-700">
              <strong>{lowCount}</strong> low risk
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
                    Structural
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Procedural
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Documentation
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Overall
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 min-w-[200px]">
                    Factors
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {result.results.map((r) => {
                  const isExpanded = expandedRows.has(r.jurisdiction);
                  return (
                    <tr
                      key={r.jurisdiction}
                      className="transition-colors hover:bg-slate-50"
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
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadgeClass(
                            r.structuralRisk
                          )}`}
                        >
                          {riskEmoji(r.structuralRisk)} {r.structuralRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadgeClass(
                            r.proceduralRisk
                          )}`}
                        >
                          {riskEmoji(r.proceduralRisk)} {r.proceduralRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadgeClass(
                            r.documentationRisk
                          )}`}
                        >
                          {riskEmoji(r.documentationRisk)} {r.documentationRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span
                          className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadgeClass(
                            r.overallRisk
                          )}`}
                        >
                          {riskEmoji(r.overallRisk)} {r.overallRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 align-top">
                        {isExpanded ? (
                          <div className="space-y-2">
                            {r.factors.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-slate-700">
                                {r.factors.map((f, i) => (
                                  <li key={i}>{f}</li>
                                ))}
                              </ul>
                            )}
                            {r.uncertainties.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-amber-700">
                                {r.uncertainties.map((u, i) => (
                                  <li key={i}>{u}</li>
                                ))}
                              </ul>
                            )}
                            {r.warnings.length > 0 && (
                              <ul className="list-disc list-inside space-y-0.5 text-xs text-red-700">
                                {r.warnings.map((w, i) => (
                                  <li key={i}>{w}</li>
                                ))}
                              </ul>
                            )}
                          </div>
                        ) : (
                          <p className="text-slate-600 line-clamp-2">
                            {r.factors.slice(0, 2).join("; ")}
                            {r.factors.length > 2 ? "…" : ""}
                          </p>
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
                            onClick={() => {
                              navigator.clipboard
                                .writeText(rowToMarkdown(r))
                                .catch(() => {});
                            }}
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
