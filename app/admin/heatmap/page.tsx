"use client";

import { useState, useTransition } from "react";
import Heatmap from "@/app/components/heatmap/Heatmap";

interface HeatmapResult {
  jurisdiction: string;
  country: "CA" | "US";
  overallRisk: "low" | "medium" | "high";
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  isPlaceholder: boolean;
  name: string;
}

interface HeatmapData {
  topic: string;
  scenario: string;
  results: HeatmapResult[];
}

interface HeatmapPageProps {
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

export default function HeatmapPage() {
  // Client-only: load topics from a static list or API
  // Since we need topics at render time, we'll fetch them via an API or hardcode
  // For simplicity, we'll use a useEffect to fetch topics
  const [topics, setTopics] = useState<string[]>([]);
  const [topic, setTopic] = useState("");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<HeatmapData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"jurisdiction" | "overallRisk">("jurisdiction");

  // Fetch topics on mount
  useState(() => {
    // We can't use useState like this. Let me use useEffect pattern inline.
    // Actually, this is a client component, so let me use useEffect properly.
  });

  // Simple approach: fetch topics via API on first render
  const [topicsLoaded, setTopicsLoaded] = useState(false);

  if (!topicsLoaded) {
    setTopicsLoaded(true);
    fetch("/api/heatmap", { method: "OPTIONS" }).catch(() => {});
    // Actually, let me just hardcode the 19 topics since they're static
    const staticTopics = [
      "condition-inspection",
      "deposit-return",
      "duplicate-receipt",
      "ending-tenancy",
      "entry-notice",
      "eviction-timeline",
      "late-fee",
      "late-status",
      "lease-termination",
      "ledger-validation",
      "payment-methods",
      "payment-proof",
      "receipt-validation",
      "rent-increase",
      "rent-receipt",
      "repair-deduct",
      "repair-request",
      "security-deposit",
      "withhold-rent",
    ];
    setTopics(staticTopics);
    if (!topic) setTopic(staticTopics[0]);
  }

  function handleGenerate() {
    setError(null);
    setData(null);

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
        const res = await fetch("/api/heatmap", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario: scenario.trim() }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Heatmap generation failed");
        } else {
          setData(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    if (!data) return;
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `heatmap-${data.topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function toMarkdown(d: HeatmapData): string {
    let md = `# National Compliance Heatmap — ${d.topic.replace(/-/g, " ")}\n\n`;
    md += `**Scenario:**\n> ${d.scenario}\n\n`;

    const ca = d.results.filter((r) => r.country === "CA");
    const us = d.results.filter((r) => r.country === "US");

    md += `## Canada\n`;
    for (const r of ca) {
      const status = r.isPlaceholder ? "placeholder" : r.overallRisk;
      md += `- ${r.name} (${r.jurisdiction.toUpperCase()}): ${status}\n`;
    }
    md += `\n`;

    md += `## United States\n`;
    for (const r of us) {
      const status = r.isPlaceholder ? "placeholder" : r.overallRisk;
      md += `- ${r.name} (${r.jurisdiction.toUpperCase()}): ${status}\n`;
    }
    md += `\n`;

    return md;
  }

  const caResults = data?.results.filter((r) => r.country === "CA") ?? [];
  const usResults = data?.results.filter((r) => r.country === "US") ?? [];

  const allResults = data?.results ?? [];
  const sortedResults = [...allResults].sort((a, b) => {
    if (sortKey === "overallRisk") {
      const order = { high: 0, medium: 1, low: 2 };
      return order[a.overallRisk] - order[b.overallRisk];
    }
    return a.jurisdiction.localeCompare(b.jurisdiction);
  });

  const highCount = allResults.filter((r) => !r.isPlaceholder && r.overallRisk === "high").length;
  const mediumCount = allResults.filter((r) => !r.isPlaceholder && r.overallRisk === "medium").length;
  const lowCount = allResults.filter((r) => !r.isPlaceholder && r.overallRisk === "low").length;
  const placeholderCount = allResults.filter((r) => r.isPlaceholder).length;

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        National Compliance Heatmap
      </h1>
      <p className="mt-2 text-slate-600">
        Visualize risk across all jurisdictions for a single scenario.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Risk scores reflect structural alignment
          between scenario facts and rule data, not legal outcomes. Always
          consult a qualified attorney.
        </p>
      </div>

      {/* Input Panel */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 space-y-4">
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
            onClick={handleGenerate}
            disabled={isPending}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending ? "Generating heatmap…" : "Generate Heatmap"}
          </button>

          {data && (
            <>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy Heatmap Data (JSON)
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(toMarkdown(data)).catch(() => {});
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy Risk Summary (Markdown)
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {data && (
        <div className="mt-8 space-y-8">
          {/* Legend */}
          <div className="flex flex-wrap items-center gap-4">
            <span className="text-sm font-medium text-slate-700">Legend:</span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <span className="inline-block h-4 w-4 rounded bg-green-300 border-2 border-green-500" />
              Low
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <span className="inline-block h-4 w-4 rounded bg-amber-300 border-2 border-amber-500" />
              Medium
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <span className="inline-block h-4 w-4 rounded bg-red-300 border-2 border-red-500" />
              High
            </span>
            <span className="inline-flex items-center gap-1.5 text-sm text-slate-600">
              <span className="inline-block h-4 w-4 rounded bg-slate-200 border-2 border-slate-300" />
              Placeholder / No data
            </span>
          </div>

          {/* Risk Distribution Bar */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <h3 className="text-sm font-semibold text-slate-700 mb-3">
              Risk Distribution
            </h3>
            <div className="flex h-6 overflow-hidden rounded-full">
              {highCount > 0 && (
                <div
                  className="bg-red-400"
                  style={{
                    width: `${(highCount / allResults.length) * 100}%`,
                  }}
                  title={`${highCount} high`}
                />
              )}
              {mediumCount > 0 && (
                <div
                  className="bg-amber-400"
                  style={{
                    width: `${(mediumCount / allResults.length) * 100}%`,
                  }}
                  title={`${mediumCount} medium`}
                />
              )}
              {lowCount > 0 && (
                <div
                  className="bg-green-400"
                  style={{
                    width: `${(lowCount / allResults.length) * 100}%`,
                  }}
                  title={`${lowCount} low`}
                />
              )}
              {placeholderCount > 0 && (
                <div
                  className="bg-slate-300"
                  style={{
                    width: `${(placeholderCount / allResults.length) * 100}%`,
                  }}
                  title={`${placeholderCount} placeholder`}
                />
              )}
            </div>
            <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-600">
              <span className="text-red-700 font-medium">{highCount} high</span>
              <span className="text-amber-700 font-medium">{mediumCount} medium</span>
              <span className="text-green-700 font-medium">{lowCount} low</span>
              <span className="text-slate-500">{placeholderCount} placeholder</span>
            </div>
          </div>

          {/* SVG Heatmaps */}
          <Heatmap data={data.results} />

          {/* Jurisdiction List View */}
          <div className="rounded-lg border border-slate-200 bg-white overflow-x-auto">
            <div className="flex items-center justify-between px-4 py-3 bg-slate-50 border-b border-slate-200">
              <h3 className="text-sm font-semibold text-slate-700">
                Jurisdiction List
              </h3>
              <div className="flex gap-2">
                <button
                  onClick={() => setSortKey("jurisdiction")}
                  className={`text-xs px-2 py-1 rounded ${
                    sortKey === "jurisdiction"
                      ? "bg-blue-100 text-blue-800"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  A–Z
                </button>
                <button
                  onClick={() => setSortKey("overallRisk")}
                  className={`text-xs px-2 py-1 rounded ${
                    sortKey === "overallRisk"
                      ? "bg-blue-100 text-blue-800"
                      : "text-slate-600 hover:bg-slate-100"
                  }`}
                >
                  Risk
                </button>
              </div>
            </div>
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Structural
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Procedural
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Documentation
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Overall
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedResults.map((r) => (
                  <tr key={r.jurisdiction} className="hover:bg-slate-50">
                    <td className="px-4 py-2 whitespace-nowrap">
                      <span className="font-medium text-slate-900">
                        {r.name}
                      </span>
                      <span className="ml-2 text-xs text-slate-500">
                        {r.jurisdiction.toUpperCase()}
                      </span>
                      {r.isPlaceholder && (
                        <span className="ml-2 inline-flex items-center rounded-full bg-slate-100 px-1.5 py-0.5 text-xs text-slate-600">
                          placeholder
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskBadgeClass(
                          r.structuralRisk
                        )}`}
                      >
                        {r.structuralRisk}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskBadgeClass(
                          r.proceduralRisk
                        )}`}
                      >
                        {r.proceduralRisk}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskBadgeClass(
                          r.documentationRisk
                        )}`}
                      >
                        {r.documentationRisk}
                      </span>
                    </td>
                    <td className="px-4 py-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskBadgeClass(
                          r.overallRisk
                        )}`}
                      >
                        {r.overallRisk}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </main>
  );
}
