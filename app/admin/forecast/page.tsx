"use client";

import { useState, useTransition } from "react";

interface ForecastResult {
  topic: string;
  jurisdiction: string;
  predictedStructuralRisk: "low" | "medium" | "high";
  predictedProceduralRisk: "low" | "medium" | "high";
  predictedDocumentationRisk: "low" | "medium" | "high";
  predictedOverallRisk: "low" | "medium" | "high";
  confidence: {
    structural: number;
    procedural: number;
    documentation: number;
    overall: number;
  };
  drivers: string[];
  volatility: number;
  similarityShift: number;
  clusterMovement: string;
  lastSnapshot: {
    timestamp: string;
    structuralRisk: "low" | "medium" | "high";
    proceduralRisk: "low" | "medium" | "high";
    documentationRisk: "low" | "medium" | "high";
    overallRisk: "low" | "medium" | "high";
    ruleVersion: string;
  } | null;
}

interface NationalForecastItem {
  jurisdiction: string;
  name: string;
  country: string;
  predictedRisk: "low" | "medium" | "high";
  confidence: number;
  trendDirection: "tightening" | "loosening" | "stable";
  clusterMovement: string;
  volatility: number;
}

interface NationalForecastReport {
  topic: string;
  jurisdictions: NationalForecastItem[];
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

const JURISDICTIONS = [
  { code: "ab", name: "Alberta", country: "CA" },
  { code: "bc", name: "British Columbia", country: "CA" },
  { code: "mb", name: "Manitoba", country: "CA" },
  { code: "nb", name: "New Brunswick", country: "CA" },
  { code: "nl", name: "Newfoundland and Labrador", country: "CA" },
  { code: "ns", name: "Nova Scotia", country: "CA" },
  { code: "nt", name: "Northwest Territories", country: "CA" },
  { code: "nu", name: "Nunavut", country: "CA" },
  { code: "on", name: "Ontario", country: "CA" },
  { code: "pe", name: "Prince Edward Island", country: "CA" },
  { code: "qc", name: "Quebec", country: "CA" },
  { code: "sk", name: "Saskatchewan", country: "CA" },
  { code: "yt", name: "Yukon", country: "CA" },
  { code: "ak", name: "Alaska", country: "US" },
  { code: "al", name: "Alabama", country: "US" },
  { code: "ar", name: "Arkansas", country: "US" },
  { code: "az", name: "Arizona", country: "US" },
  { code: "ca", name: "California", country: "US" },
  { code: "co", name: "Colorado", country: "US" },
  { code: "ct", name: "Connecticut", country: "US" },
  { code: "dc", name: "District of Columbia", country: "US" },
  { code: "de", name: "Delaware", country: "US" },
  { code: "fl", name: "Florida", country: "US" },
  { code: "ga", name: "Georgia", country: "US" },
  { code: "hi", name: "Hawaii", country: "US" },
  { code: "ia", name: "Iowa", country: "US" },
  { code: "id", name: "Idaho", country: "US" },
  { code: "il", name: "Illinois", country: "US" },
  { code: "in", name: "Indiana", country: "US" },
  { code: "ks", name: "Kansas", country: "US" },
  { code: "ky", name: "Kentucky", country: "US" },
  { code: "la", name: "Louisiana", country: "US" },
  { code: "ma", name: "Massachusetts", country: "US" },
  { code: "md", name: "Maryland", country: "US" },
  { code: "me", name: "Maine", country: "US" },
  { code: "mi", name: "Michigan", country: "US" },
  { code: "mn", name: "Minnesota", country: "US" },
  { code: "mo", name: "Missouri", country: "US" },
  { code: "ms", name: "Mississippi", country: "US" },
  { code: "mt", name: "Montana", country: "US" },
  { code: "nc", name: "North Carolina", country: "US" },
  { code: "nd", name: "North Dakota", country: "US" },
  { code: "ne", name: "Nebraska", country: "US" },
  { code: "nh", name: "New Hampshire", country: "US" },
  { code: "nj", name: "New Jersey", country: "US" },
  { code: "nm", name: "New Mexico", country: "US" },
  { code: "nv", name: "Nevada", country: "US" },
  { code: "ny", name: "New York", country: "US" },
  { code: "oh", name: "Ohio", country: "US" },
  { code: "ok", name: "Oklahoma", country: "US" },
  { code: "or", name: "Oregon", country: "US" },
  { code: "pa", name: "Pennsylvania", country: "US" },
  { code: "ri", name: "Rhode Island", country: "US" },
  { code: "sc", name: "South Carolina", country: "US" },
  { code: "sd", name: "South Dakota", country: "US" },
  { code: "tn", name: "Tennessee", country: "US" },
  { code: "tx", name: "Texas", country: "US" },
  { code: "ut", name: "Utah", country: "US" },
  { code: "va", name: "Virginia", country: "US" },
  { code: "vt", name: "Vermont", country: "US" },
  { code: "wa", name: "Washington", country: "US" },
  { code: "wi", name: "Wisconsin", country: "US" },
  { code: "wv", name: "West Virginia", country: "US" },
  { code: "wy", name: "Wyoming", country: "US" },
];

// ── Helpers ──

function riskColor(level: "low" | "medium" | "high"): string {
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

function confidenceColor(score: number): string {
  if (score >= 0.66) return "bg-green-500";
  if (score >= 0.33) return "bg-amber-500";
  return "bg-red-500";
}

function confidenceLabel(score: number): string {
  if (score >= 0.66) return "High";
  if (score >= 0.33) return "Medium";
  return "Low";
}

function trendArrow(dir: "tightening" | "loosening" | "stable"): string {
  if (dir === "tightening") return "↗️";
  if (dir === "loosening") return "↘️";
  return "➡️";
}

function formatDate(ts: string): string {
  try {
    return new Date(ts).toLocaleDateString();
  } catch {
    return ts;
  }
}

// ── Confidence Bar ──

function ConfidenceBar({ score, label }: { score: number; label: string }) {
  const pct = Math.round(score * 100);
  return (
    <div className="space-y-1">
      <div className="flex items-center justify-between text-xs">
        <span className="font-medium text-slate-700">{label}</span>
        <span className="text-slate-500">{pct}%</span>
      </div>
      <div className="h-2.5 w-full rounded-full bg-slate-200">
        <div
          className={`h-2.5 rounded-full transition-all ${confidenceColor(score)}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}

// ── Main Page ──

export default function ForecastPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [jurisdiction, setJurisdiction] = useState("bc");
  const [scenario, setScenario] = useState("");
  const [isPendingJurisdiction, startJurisdiction] = useTransition();
  const [isPendingNational, startNational] = useTransition();
  const [forecast, setForecast] = useState<ForecastResult | null>(null);
  const [national, setNational] = useState<NationalForecastReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"risk" | "confidence" | "volatility" | "name">("risk");

  function generateForecast() {
    setError(null);
    setForecast(null);

    if (!topic || !jurisdiction) {
      setError("Please select a topic and jurisdiction.");
      return;
    }

    startJurisdiction(async () => {
      try {
        const res = await fetch("/api/forecast/jurisdiction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, jurisdiction, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Forecast generation failed");
        } else {
          setForecast(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function generateNational() {
    setError(null);
    setNational(null);

    if (!topic) {
      setError("Please select a topic.");
      return;
    }

    startNational(async () => {
      try {
        const res = await fetch("/api/forecast/national", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "National forecast failed");
        } else {
          setNational(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    const payload = forecast || national;
    if (!payload) return;
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `forecast-${topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function toMarkdown(): string {
    let md = `# Regulatory Forecast — ${topic.replace(/-/g, " ")}\n\n`;

    if (forecast) {
      md += `## ${forecast.jurisdiction.toUpperCase()} Forecast\n\n`;
      md += `**Predicted Overall Risk:** ${forecast.predictedOverallRisk.toUpperCase()}\n\n`;
      md += `| Category | Predicted | Confidence |\n`;
      md += `|----------|-----------|------------|\n`;
      md += `| Structural | ${forecast.predictedStructuralRisk} | ${(forecast.confidence.structural * 100).toFixed(0)}% |\n`;
      md += `| Procedural | ${forecast.predictedProceduralRisk} | ${(forecast.confidence.procedural * 100).toFixed(0)}% |\n`;
      md += `| Documentation | ${forecast.predictedDocumentationRisk} | ${(forecast.confidence.documentation * 100).toFixed(0)}% |\n`;
      md += `| Overall | ${forecast.predictedOverallRisk} | ${(forecast.confidence.overall * 100).toFixed(0)}% |\n`;
      md += `\n`;
      md += `**Volatility:** ${forecast.volatility}\n`;
      md += `**Similarity Shift:** ${forecast.similarityShift.toFixed(3)}\n`;
      md += `**Cluster Movement:** ${forecast.clusterMovement}\n\n`;
      md += `### Drivers\n`;
      for (const d of forecast.drivers) {
        md += `- ${d}\n`;
      }
      md += `\n`;
      if (forecast.lastSnapshot) {
        md += `### Last Snapshot\n`;
        md += `- Date: ${formatDate(forecast.lastSnapshot.timestamp)}\n`;
        md += `- Version: ${forecast.lastSnapshot.ruleVersion}\n`;
        md += `- Current Overall Risk: ${forecast.lastSnapshot.overallRisk}\n\n`;
      }
    }

    if (national) {
      md += `## National Forecast\n\n`;
      md += `| Jurisdiction | Predicted Risk | Confidence | Trend | Cluster Movement | Volatility |\n`;
      md += `|--------------|----------------|------------|-------|------------------|------------|\n`;
      for (const j of national.jurisdictions) {
        md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.predictedRisk} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} | ${j.clusterMovement} | ${j.volatility} |\n`;
      }
      md += `\n`;
    }

    return md;
  }

  const sortedNational = national
    ? [...national.jurisdictions].sort((a, b) => {
        if (sortKey === "name") return a.name.localeCompare(b.name);
        if (sortKey === "risk") {
          const order = { high: 0, medium: 1, low: 2 };
          const diff = order[a.predictedRisk] - order[b.predictedRisk];
          if (diff !== 0) return diff;
          const confDiff = a.confidence - b.confidence;
          if (confDiff !== 0) return confDiff;
          return b.volatility - a.volatility;
        }
        if (sortKey === "confidence") {
          const diff = a.confidence - b.confidence;
          if (diff !== 0) return diff;
          const order = { high: 0, medium: 1, low: 2 };
          return order[a.predictedRisk] - order[b.predictedRisk];
        }
        // volatility
        const volDiff = b.volatility - a.volatility;
        if (volDiff !== 0) return volDiff;
        const order = { high: 0, medium: 1, low: 2 };
        return order[a.predictedRisk] - order[b.predictedRisk];
      })
    : [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Regulatory Forecast Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Predictive modeling of future regulatory behavior using trend data,
        volatility, similarity drift, and cluster movement.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Forecasts are statistical projections based on
          historical snapshots and structural patterns, not legal predictions.
          Always consult a qualified attorney.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
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
              Jurisdiction
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {JURISDICTIONS.map((j) => (
                <option key={j.code} value={j.code}>
                  {j.name} ({j.country})
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Scenario (optional)
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe a scenario to contextualize the forecast..."
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateForecast}
            disabled={isPendingJurisdiction}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingJurisdiction
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingJurisdiction ? "Generating…" : "Generate Forecast"}
          </button>
          <button
            onClick={generateNational}
            disabled={isPendingNational}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingNational
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingNational ? "Generating…" : "National Forecast"}
          </button>

          {(forecast || national) && (
            <>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Download JSON
              </button>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(toMarkdown()).catch(() => {});
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

      {/* Jurisdiction Forecast Results */}
      {forecast && (
        <div className="mt-10 space-y-10">
          {/* Forecast Badges */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Predicted Risk Levels
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Structural", value: forecast.predictedStructuralRisk },
                { label: "Procedural", value: forecast.predictedProceduralRisk },
                { label: "Documentation", value: forecast.predictedDocumentationRisk },
                { label: "Overall", value: forecast.predictedOverallRisk },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 bg-white p-5 text-center"
                >
                  <div className="text-sm font-medium text-slate-600 mb-2">
                    {item.label}
                  </div>
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full border px-4 py-2 text-lg font-bold ${riskColor(
                      item.value
                    )}`}
                  >
                    {riskEmoji(item.value)}
                    {item.value.charAt(0).toUpperCase() + item.value.slice(1)}
                  </span>
                </div>
              ))}
            </div>
          </section>

          {/* Confidence Meters */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Confidence
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <ConfidenceBar
                score={forecast.confidence.structural}
                label="Structural"
              />
              <ConfidenceBar
                score={forecast.confidence.procedural}
                label="Procedural"
              />
              <ConfidenceBar
                score={forecast.confidence.documentation}
                label="Documentation"
              />
              <ConfidenceBar
                score={forecast.confidence.overall}
                label="Overall"
              />
            </div>
          </section>

          {/* Drivers Panel */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Forecast Drivers
            </h2>
            <div className="rounded-lg border border-slate-200 bg-white p-5">
              <ul className="space-y-2">
                {forecast.drivers.map((driver, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                    <span className="mt-0.5 text-blue-500">▸</span>
                    <span>{driver}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Metrics Grid */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Supporting Metrics
            </h2>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Volatility
                </div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {forecast.volatility.toFixed(2)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Similarity Shift
                </div>
                <div className="mt-1 text-2xl font-bold text-slate-900">
                  {forecast.similarityShift.toFixed(3)}
                </div>
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                  Cluster Movement
                </div>
                <div className="mt-1 text-lg font-semibold text-slate-900">
                  {forecast.clusterMovement}
                </div>
              </div>
            </div>
          </section>

          {/* Last Snapshot */}
          {forecast.lastSnapshot && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Last Snapshot
              </h2>
              <div className="rounded-lg border border-slate-200 bg-white p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
                  <div>
                    <span className="text-slate-500">Date:</span>{" "}
                    <span className="font-medium text-slate-800">
                      {formatDate(forecast.lastSnapshot.timestamp)}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Version:</span>{" "}
                    <span className="font-mono text-slate-800">
                      {forecast.lastSnapshot.ruleVersion}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Current Overall:</span>{" "}
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                        forecast.lastSnapshot.overallRisk
                      )}`}
                    >
                      {riskEmoji(forecast.lastSnapshot.overallRisk)}{" "}
                      {forecast.lastSnapshot.overallRisk}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-500">Predicted Overall:</span>{" "}
                    <span
                      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                        forecast.predictedOverallRisk
                      )}`}
                    >
                      {riskEmoji(forecast.predictedOverallRisk)}{" "}
                      {forecast.predictedOverallRisk}
                    </span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </div>
      )}

      {/* National Forecast Table */}
      {national && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              National Forecast — {national.topic.replace(/-/g, " ")}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Sort by:</span>
              {([
                ["risk", "Predicted Risk"],
                ["confidence", "Confidence"],
                ["volatility", "Volatility"],
                ["name", "Name"],
              ] as const).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setSortKey(key)}
                  className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
                    sortKey === key
                      ? "bg-blue-900 text-white"
                      : "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Predicted Risk
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Confidence
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Trend Direction
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Cluster Movement
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Volatility
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {sortedNational.map((j) => (
                  <tr key={j.jurisdiction} className="hover:bg-slate-50">
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="font-semibold text-slate-900">
                        {j.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {j.jurisdiction.toUpperCase()} · {j.country}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                          j.predictedRisk
                        )}`}
                      >
                        {riskEmoji(j.predictedRisk)} {j.predictedRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-16 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full ${confidenceColor(
                              j.confidence
                            )}`}
                            style={{ width: `${j.confidence * 100}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">
                          {(j.confidence * 100).toFixed(0)}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                        {trendArrow(j.trendDirection)}
                        <span className="capitalize">{j.trendDirection}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-slate-600">
                      {j.clusterMovement}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                          j.volatility >= 0.5
                            ? "bg-red-100 text-red-800 border-red-200"
                            : j.volatility >= 0.25
                            ? "bg-amber-100 text-amber-800 border-amber-200"
                            : "bg-green-100 text-green-800 border-green-200"
                        }`}
                      >
                        {j.volatility.toFixed(2)}
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
