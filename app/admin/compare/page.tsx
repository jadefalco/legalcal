"use client";

import { useState, useTransition } from "react";

interface ComparisonResult {
  differences: string[];
  similarities: string[];
  severity: "low" | "medium" | "high";
}

function severityBadge(severity: string) {
  switch (severity) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
}

export default function ComparePage() {
  const [topic, setTopic] = useState("");
  const [jurisdictionA, setJurisdictionA] = useState("");
  const [jurisdictionB, setJurisdictionB] = useState("");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ComparisonResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleCompare() {
    setError(null);
    setResult(null);

    if (!topic || !jurisdictionA || !jurisdictionB) {
      setError("Please fill in all fields.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/intelligence/compare", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topic,
            jurisdictionA: jurisdictionA.toLowerCase(),
            jurisdictionB: jurisdictionB.toLowerCase(),
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Comparison failed");
        } else {
          setResult(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Compare Jurisdictions
      </h1>
      <p className="mt-2 text-slate-600">
        Select a topic and two jurisdictions to compare their rules side-by-side.
      </p>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-3">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              placeholder="e.g. rent-increase"
              value={topic}
              onChange={(e) => setTopic(e.target.value.toLowerCase())}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Jurisdiction A
            </label>
            <input
              type="text"
              placeholder="e.g. bc"
              value={jurisdictionA}
              onChange={(e) => setJurisdictionA(e.target.value.toLowerCase())}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Jurisdiction B
            </label>
            <input
              type="text"
              placeholder="e.g. ab"
              value={jurisdictionB}
              onChange={(e) => setJurisdictionB(e.target.value.toLowerCase())}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleCompare}
          disabled={isPending}
          className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
            isPending
              ? "bg-blue-300 cursor-wait"
              : "bg-blue-900 hover:bg-blue-800"
          }`}
        >
          {isPending ? "Comparing…" : "Compare"}
        </button>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && (
        <div className="mt-6 rounded-lg border border-slate-200 bg-white p-6 space-y-6">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-bold text-slate-900">Comparison Result</h2>
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityBadge(
                result.severity
              )}`}
            >
              {result.severity} severity
            </span>
          </div>

          {result.differences.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                Differences
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {result.differences.map((d, i) => (
                  <li key={i}>{d}</li>
                ))}
              </ul>
            </div>
          )}

          {result.similarities.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold text-slate-800 mb-2">
                Similarities
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {result.similarities.map((s, i) => (
                  <li key={i}>{s}</li>
                ))}
              </ul>
            </div>
          )}

          {result.differences.length === 0 && result.similarities.length === 0 && (
            <p className="text-sm text-slate-500">
              No differences or similarities found. The rules may be identical or have no structured data.
            </p>
          )}
        </div>
      )}
    </main>
  );
}
