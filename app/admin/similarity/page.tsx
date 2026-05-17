"use client";

import { useState, useTransition } from "react";
import ForceGraph from "./ForceGraph";

interface SimilarityEntry {
  jurisdiction: string;
  score: number;
}

interface MatrixRow {
  jurisdiction: string;
  name: string;
  country: "CA" | "US";
  similarities: SimilarityEntry[];
}

interface Cluster {
  clusterId: number;
  label: string;
  members: string[];
  memberNames: string[];
}

interface SimilarityResult {
  topic: string;
  scenario: string;
  matrix: MatrixRow[];
}

const TOPICS = [
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

function similarityColor(score: number): string {
  if (score >= 0.8) return "bg-red-100 text-red-800 border-red-200";
  if (score >= 0.6) return "bg-amber-100 text-amber-800 border-amber-200";
  if (score >= 0.4) return "bg-blue-100 text-blue-800 border-blue-200";
  return "bg-green-100 text-green-800 border-green-200";
}

function similarityLabel(score: number): string {
  if (score >= 0.8) return "Very similar";
  if (score >= 0.6) return "Similar";
  if (score >= 0.4) return "Somewhat similar";
  return "Different";
}

const CLUSTER_COLORS = [
  "bg-red-100 text-red-800 border-red-200",
  "bg-blue-100 text-blue-800 border-blue-200",
  "bg-green-100 text-green-800 border-green-200",
  "bg-amber-100 text-amber-800 border-amber-200",
  "bg-purple-100 text-purple-800 border-purple-200",
  "bg-pink-100 text-pink-800 border-pink-200",
  "bg-cyan-100 text-cyan-800 border-cyan-200",
  "bg-lime-100 text-lime-800 border-lime-200",
];

export default function SimilarityPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [scenario, setScenario] = useState("");
  const [isPendingMatrix, startMatrixTransition] = useTransition();
  const [isPendingClusters, startClustersTransition] = useTransition();
  const [matrixResult, setMatrixResult] = useState<SimilarityResult | null>(null);
  const [clusters, setClusters] = useState<Cluster[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [clusterK, setClusterK] = useState(3);

  function toggleRow(jurisdiction: string) {
    setExpandedRows((prev) => {
      const next = new Set(prev);
      if (next.has(jurisdiction)) {
        next.delete(jurisdiction);
      } else {
        next.add(jurisdiction);
      }
      return next;
    });
  }

  function computeMatrix() {
    setError(null);
    setMatrixResult(null);
    setClusters(null);

    if (!topic) {
      setError("Please select a topic.");
      return;
    }
    if (!scenario.trim() || scenario.trim().length <= 10) {
      setError("Please describe a scenario longer than 10 characters.");
      return;
    }

    startMatrixTransition(async () => {
      try {
        const res = await fetch("/api/similarity/matrix", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Matrix computation failed");
        } else {
          setMatrixResult(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function computeClusters() {
    setError(null);
    setClusters(null);

    if (!topic) {
      setError("Please select a topic.");
      return;
    }
    if (!scenario.trim() || scenario.trim().length <= 10) {
      setError("Please describe a scenario longer than 10 characters.");
      return;
    }

    startClustersTransition(async () => {
      try {
        const res = await fetch("/api/similarity/clusters", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario, k: clusterK }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Cluster computation failed");
        } else {
          setClusters(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    if (!matrixResult) return;
    const blob = new Blob([JSON.stringify(matrixResult, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `similarity-${matrixResult.topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function matrixToMarkdown(): string {
    if (!matrixResult) return "";
    let md = `# Jurisdiction Similarity Matrix — ${matrixResult.topic.replace(/-/g, " ")}\n\n`;
    md += `**Scenario:**\n> ${matrixResult.scenario}\n\n`;

    for (const row of matrixResult.matrix.slice(0, 15)) {
      const top = row.similarities.slice(0, 5);
      md += `## ${row.name} (${row.jurisdiction.toUpperCase()})\n`;
      md += top.map((s) => `- ${s.jurisdiction.toUpperCase()}: ${(s.score * 100).toFixed(1)}%`).join("\n");
      md += `\n\n`;
    }

    if (clusters) {
      md += `## Clusters (k=${clusterK})\n\n`;
      for (const c of clusters) {
        md += `### Cluster ${c.clusterId + 1}: ${c.label}\n`;
        md += `- Members: ${c.memberNames.join(", ")}\n\n`;
      }
    }

    return md;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Jurisdiction Similarity Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Compare how jurisdictions behave under the same scenario using vector
        similarity and clustering.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Similarity scores are based on structural
          alignment between rule data and scenario facts, not legal equivalence.
          Always consult a qualified attorney.
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
            {TOPICS.map((t) => (
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
            onClick={computeMatrix}
            disabled={isPendingMatrix}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingMatrix
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingMatrix ? "Computing…" : "Compute Similarity"}
          </button>

          <div className="flex items-center gap-2">
            <span className="text-sm text-slate-600">Clusters:</span>
            {[3, 4, 5].map((k) => (
              <button
                key={k}
                onClick={() => {
                  setClusterK(k);
                  computeClusters();
                }}
                disabled={isPendingClusters}
                className={`rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                  clusterK === k
                    ? "bg-blue-900 text-white"
                    : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                } ${isPendingClusters ? "opacity-50 cursor-wait" : ""}`}
              >
                k={k}
              </button>
            ))}
          </div>

          {matrixResult && (
            <>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Download JSON
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(matrixToMarkdown()).catch(() => {});
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy Markdown
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

      {matrixResult && (
        <div className="mt-8 space-y-10">
          {/* Force Graph */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Similarity Graph
            </h2>
            <p className="text-sm text-slate-600 mb-4">
              Nodes are jurisdictions. Edges connect jurisdictions with similarity &gt; 75%. Colors represent clusters.
            </p>
            <ForceGraph
              matrix={matrixResult.matrix}
              clusters={clusters}
            />
          </section>

          {/* Clusters */}
          {clusters && clusters.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Clusters (k={clusterK})
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {clusters.map((c) => (
                  <div
                    key={c.clusterId}
                    className="rounded-lg border border-slate-200 bg-white p-4"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                          CLUSTER_COLORS[c.clusterId % CLUSTER_COLORS.length]
                        }`}
                      >
                        Cluster {c.clusterId + 1}
                      </span>
                      <span className="text-xs text-slate-500">
                        {c.members.length} members
                      </span>
                    </div>
                    <h3 className="text-sm font-semibold text-slate-800 mb-2">
                      {c.label}
                    </h3>
                    <div className="flex flex-wrap gap-1">
                      {c.memberNames.map((name) => (
                        <span
                          key={name}
                          className="inline-flex items-center rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-700"
                        >
                          {name}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Similarity Matrix Table */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Similarity Matrix
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full text-sm">
                <thead className="sticky top-0 z-10 bg-slate-50 shadow-sm">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                      Jurisdiction
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Most Similar
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700 whitespace-nowrap">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {matrixResult.matrix.map((row) => {
                    const isExpanded = expandedRows.has(row.jurisdiction);
                    const top = row.similarities.slice(0, isExpanded ? 10 : 3);
                    return (
                      <tr
                        key={row.jurisdiction}
                        className="transition-colors hover:bg-slate-50"
                      >
                        <td className="px-4 py-3 whitespace-nowrap">
                          <div className="font-semibold text-slate-900">
                            {row.name}
                          </div>
                          <div className="text-xs text-slate-500">
                            {row.jurisdiction.toUpperCase()} · {row.country}
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex flex-wrap gap-1.5">
                            {top.map((sim) => (
                              <span
                                key={sim.jurisdiction}
                                className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${similarityColor(
                                  sim.score
                                )}`}
                                title={`${sim.jurisdiction.toUpperCase()}: ${(
                                  sim.score * 100
                                ).toFixed(1)}%`}
                              >
                                {sim.jurisdiction.toUpperCase()}{" "}
                                {sim.score >= 0.99
                                  ? "1.0"
                                  : sim.score.toFixed(2)}
                              </span>
                            ))}
                            {!isExpanded && row.similarities.length > 3 && (
                              <span className="text-xs text-slate-400">
                                +{row.similarities.length - 3} more
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap align-top">
                          <div className="flex flex-col gap-1.5">
                            <button
                              onClick={() => toggleRow(row.jurisdiction)}
                              className="text-xs font-medium text-blue-700 hover:underline"
                            >
                              {isExpanded ? "Collapse" : "Expand"}
                            </button>
                            <button
                              onClick={() => {
                                const md = `## ${row.name} (${row.jurisdiction.toUpperCase()})\n\n${row.similarities
                                  .slice(0, 10)
                                  .map(
                                    (s) =>
                                      `- ${s.jurisdiction.toUpperCase()}: ${(s.score * 100).toFixed(1)}%`
                                  )
                                  .join("\n")}\n`;
                                navigator.clipboard.writeText(md).catch(() => {});
                              }}
                              className="text-xs font-medium text-slate-600 hover:text-slate-900"
                            >
                              Copy row
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
