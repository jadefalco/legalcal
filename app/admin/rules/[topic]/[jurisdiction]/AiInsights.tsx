"use client";

import { useState, useTransition } from "react";

interface AiInsightsProps {
  topic: string;
  jurisdiction: string;
}

type Tab = "summary" | "explain" | "compare" | "overview";

interface InsightData {
  title?: string;
  summary?: string;
  keyPoints?: string[];
  citationsUsed?: string[];
  citations?: string[];
  headline?: string;
  explanation?: string;
  bulletPoints?: string[];
  differences?: string[];
  similarities?: string[];
  severity?: "low" | "medium" | "high";
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

export default function AiInsights({ topic, jurisdiction }: AiInsightsProps) {
  const [activeTab, setActiveTab] = useState<Tab>("summary");
  const [isPending, startTransition] = useTransition();
  const [data, setData] = useState<InsightData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [compareJurisdiction, setCompareJurisdiction] = useState("");

  function fetchInsight(tab: Tab) {
    setError(null);
    setData(null);
    setActiveTab(tab);

    let endpoint = "";
    let body: Record<string, string> = { topic, jurisdiction };

    if (tab === "summary") {
      endpoint = "/api/intelligence/summarize";
    } else if (tab === "explain") {
      endpoint = "/api/intelligence/explain-change";
    } else if (tab === "compare") {
      endpoint = "/api/intelligence/compare";
      if (!compareJurisdiction) return;
      body = { topic, jurisdictionA: jurisdiction, jurisdictionB: compareJurisdiction };
    } else if (tab === "overview") {
      endpoint = "/api/intelligence/jurisdiction-summary";
    }

    startTransition(async () => {
      try {
        const res = await fetch(endpoint, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to load insight");
        } else {
          setData(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  const tabs: { key: Tab; label: string }[] = [
    { key: "summary", label: "Summary" },
    { key: "explain", label: "Explain Change" },
    { key: "compare", label: "Compare" },
    { key: "overview", label: "Overview" },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => fetchInsight(t.key)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              activeTab === t.key
                ? "bg-blue-900 text-white"
                : "bg-slate-100 text-slate-700 hover:bg-slate-200"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {activeTab === "compare" && (
        <div className="flex items-center gap-2">
          <input
            type="text"
            placeholder="Compare with (e.g. ab)"
            value={compareJurisdiction}
            onChange={(e) => setCompareJurisdiction(e.target.value.toLowerCase())}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={() => fetchInsight("compare")}
            disabled={!compareJurisdiction || isPending}
            className="rounded-md bg-blue-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-800 disabled:bg-slate-300"
          >
            Compare
          </button>
        </div>
      )}

      {isPending && (
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
          <p className="text-sm text-slate-500">Generating insight…</p>
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {data && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
          {/* Summary / Overview */}
          {(data.summary || data.explanation) && (
            <div>
              {data.headline && (
                <h4 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-1">
                  {data.headline}
                </h4>
              )}
              <p className="text-sm text-slate-700 leading-relaxed">
                {data.summary || data.explanation}
              </p>
            </div>
          )}

          {/* Severity badge for compare */}
          {data.severity && (
            <div>
              <span
                className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${severityBadge(
                  data.severity
                )}`}
              >
                Severity: {data.severity}
              </span>
            </div>
          )}

          {/* Bullet points */}
          {(data.keyPoints?.length ?? 0) > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Key Points
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {data.keyPoints!.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {data.bulletPoints && data.bulletPoints.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Changes
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {data.bulletPoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Differences */}
          {data.differences && data.differences.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Differences
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {data.differences.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Similarities */}
          {data.similarities && data.similarities.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Similarities
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {data.similarities.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Citations */}
          {(data.citationsUsed?.length ?? data.citations?.length ?? 0) > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Citations
              </h4>
              <div className="flex flex-wrap gap-2">
                {(data.citationsUsed ?? data.citations ?? []).map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {c}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
