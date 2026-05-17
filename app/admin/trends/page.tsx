"use client";

import { useState, useTransition } from "react";

interface TrendSnapshot {
  topic: string;
  jurisdiction: string;
  timestamp: string;
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  overallRisk: "low" | "medium" | "high";
  similarityVector: number[];
  ruleVersion: string;
}

interface TrendAnalysis {
  topic: string;
  jurisdiction: string;
  snapshots: TrendSnapshot[];
  riskTrend: {
    structural: number[];
    procedural: number[];
    documentation: number[];
    overall: number[];
  };
  similarityDrift: number[];
  ruleChanges: Array<{
    fromVersion: string;
    toVersion: string;
    timestamp: string;
  }>;
  volatilityScore: number;
}

interface NationalTrendItem {
  jurisdiction: string;
  name: string;
  country: string;
  volatilityScore: number;
  trendDirection: "tightening" | "loosening" | "stable";
  lastRisk: "low" | "medium" | "high";
  lastRuleVersion: string;
}

interface NationalTrendReport {
  topic: string;
  jurisdictions: NationalTrendItem[];
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

function volatilityBadge(score: number): string {
  if (score >= 0.5) return "bg-red-100 text-red-800 border-red-200";
  if (score >= 0.25) return "bg-amber-100 text-amber-800 border-amber-200";
  return "bg-green-100 text-green-800 border-green-200";
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

// ── Sparkline SVG ──

function Sparkline({
  data,
  color,
  width = 200,
  height = 60,
}: {
  data: number[];
  color: string;
  width?: number;
  height?: number;
}) {
  if (data.length === 0) {
    return (
      <svg width={width} height={height} className="text-slate-300">
        <text x={width / 2} y={height / 2} textAnchor="middle" fontSize={10}>
          No data
        </text>
      </svg>
    );
  }

  const padding = 4;
  const maxVal = 1;
  const minVal = 0;
  const range = maxVal - minVal || 1;

  const points = data.map((v, i) => {
    const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
    const y = height - padding - ((v - minVal) / range) * (height - padding * 2);
    return `${x},${y}`;
  });

  const areaPoints = `${padding},${height - padding} ` + points.join(" ") + ` ${width - padding},${height - padding}`;

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Grid lines */}
      <line x1={padding} y1={height / 2} x2={width - padding} y2={height / 2} stroke="#e2e8f0" strokeDasharray="2,2" />
      {/* Area */}
      <polygon points={areaPoints} fill={color} opacity={0.1} />
      {/* Line */}
      <polyline
        points={points.join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Dots */}
      {data.map((v, i) => {
        const x = padding + (i / (data.length - 1 || 1)) * (width - padding * 2);
        const y = height - padding - ((v - minVal) / range) * (height - padding * 2);
        return (
          <circle key={i} cx={x} cy={y} r={3} fill={color} stroke="white" strokeWidth={1.5} />
        );
      })}
    </svg>
  );
}

// ── Drift Graph ──

function DriftGraph({
  drift,
  width = 500,
  height = 120,
}: {
  drift: number[];
  width?: number;
  height?: number;
}) {
  if (drift.length === 0) {
    return (
      <svg width={width} height={height} className="text-slate-300">
        <text x={width / 2} y={height / 2} textAnchor="middle" fontSize={10}>
          No drift data
        </text>
      </svg>
    );
  }

  const padding = { top: 10, right: 10, bottom: 24, left: 32 };
  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;
  const maxVal = Math.max(0.01, ...drift);

  const bars = drift.map((v, i) => {
    const barW = (chartW / drift.length) * 0.7;
    const x = padding.left + (i / drift.length) * chartW + (chartW / drift.length - barW) / 2;
    const barH = (v / maxVal) * chartH;
    const y = padding.top + chartH - barH;
    return { x, y, w: barW, h: barH, value: v };
  });

  return (
    <svg width={width} height={height} className="overflow-visible">
      {/* Axes */}
      <line x1={padding.left} y1={padding.top} x2={padding.left} y2={height - padding.bottom} stroke="#cbd5e1" />
      <line x1={padding.left} y1={height - padding.bottom} x2={width - padding.right} y2={height - padding.bottom} stroke="#cbd5e1" />

      {/* Y-axis labels */}
      <text x={padding.left - 4} y={padding.top + 4} textAnchor="end" fontSize={9} fill="#94a3b8">
        {maxVal.toFixed(2)}
      </text>
      <text x={padding.left - 4} y={height - padding.bottom} textAnchor="end" fontSize={9} fill="#94a3b8">
        0
      </text>

      {/* Bars */}
      {bars.map((bar, i) => (
        <g key={i}>
          <rect
            x={bar.x}
            y={bar.y}
            width={bar.w}
            height={bar.h}
            fill={bar.value > 0.3 ? "#ef4444" : bar.value > 0.15 ? "#f59e0b" : "#22c55e"}
            rx={2}
            opacity={0.85}
          />
          <text
            x={bar.x + bar.w / 2}
            y={height - padding.bottom + 14}
            textAnchor="middle"
            fontSize={8}
            fill="#64748b"
          >
            {i + 1}
          </text>
        </g>
      ))}
    </svg>
  );
}

// ── Main Page ──

export default function TrendsPage() {
  const [topic, setTopic] = useState(TOPICS[0]);
  const [jurisdiction, setJurisdiction] = useState("bc");
  const [scenario, setScenario] = useState("");
  const [isPendingJurisdiction, startJurisdiction] = useTransition();
  const [isPendingNational, startNational] = useTransition();
  const [analysis, setAnalysis] = useState<TrendAnalysis | null>(null);
  const [national, setNational] = useState<NationalTrendReport | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<"volatility" | "name" | "risk">("volatility");

  function analyzeJurisdiction() {
    setError(null);
    setAnalysis(null);

    if (!topic || !jurisdiction) {
      setError("Please select a topic and jurisdiction.");
      return;
    }

    startJurisdiction(async () => {
      try {
        const res = await fetch("/api/trends/jurisdiction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, jurisdiction, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Trend analysis failed");
        } else {
          setAnalysis(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function analyzeNational() {
    setError(null);
    setNational(null);

    if (!topic) {
      setError("Please select a topic.");
      return;
    }

    startNational(async () => {
      try {
        const res = await fetch("/api/trends/national", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "National trend analysis failed");
        } else {
          setNational(json);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    const payload = analysis || national;
    if (!payload) return;
    const blob = new Blob([JSON.stringify(payload, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `trends-${topic}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function toMarkdown(): string {
    let md = `# Regulatory Trend Report — ${topic.replace(/-/g, " ")}\n\n`;

    if (analysis) {
      md += `## ${analysis.jurisdiction.toUpperCase()} Trend Analysis\n\n`;
      md += `**Volatility Score:** ${analysis.volatilityScore}\n\n`;
      md += `### Risk Trend\n`;
      md += `| Snapshot | Structural | Procedural | Documentation | Overall | Version |\n`;
      md += `|----------|------------|------------|---------------|---------|---------|\n`;
      for (const s of analysis.snapshots) {
        md += `| ${formatDate(s.timestamp)} | ${s.structuralRisk} | ${s.proceduralRisk} | ${s.documentationRisk} | ${s.overallRisk} | ${s.ruleVersion} |\n`;
      }
      md += `\n`;

      if (analysis.ruleChanges.length > 0) {
        md += `### Rule Changes\n`;
        for (const rc of analysis.ruleChanges) {
          md += `- ${formatDate(rc.timestamp)}: ${rc.fromVersion} → ${rc.toVersion}\n`;
        }
        md += `\n`;
      }

      if (analysis.similarityDrift.length > 0) {
        md += `### Similarity Drift\n`;
        for (let i = 0; i < analysis.similarityDrift.length; i++) {
          md += `- Snapshot ${i + 1} → ${i + 2}: ${analysis.similarityDrift[i].toFixed(3)}\n`;
        }
        md += `\n`;
      }
    }

    if (national) {
      md += `## National Trends\n\n`;
      md += `| Jurisdiction | Trend | Volatility | Last Risk | Version |\n`;
      md += `|--------------|-------|------------|-----------|---------|\n`;
      for (const j of national.jurisdictions) {
        md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.trendDirection} | ${j.volatilityScore} | ${j.lastRisk} | ${j.lastRuleVersion} |\n`;
      }
      md += `\n`;
    }

    return md;
  }

  const sortedNational = national
    ? [...national.jurisdictions].sort((a, b) => {
        if (sortKey === "volatility") return b.volatilityScore - a.volatilityScore;
        if (sortKey === "name") return a.name.localeCompare(b.name);
        const riskOrder = { high: 0, medium: 1, low: 2 };
        return riskOrder[a.lastRisk] - riskOrder[b.lastRisk];
      })
    : [];

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Regulatory Trend Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Track rule changes, risk shifts, similarity drift, and jurisdiction
        movement over time.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Trend analysis reflects historical snapshots
          and structural alignment, not legal predictions. Always consult a
          qualified attorney.
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
            Scenario (optional — used for fresh snapshot)
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe a scenario to append a fresh snapshot..."
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={analyzeJurisdiction}
            disabled={isPendingJurisdiction}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingJurisdiction
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingJurisdiction ? "Analyzing…" : "Analyze Trends"}
          </button>
          <button
            onClick={analyzeNational}
            disabled={isPendingNational}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingNational
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingNational ? "Analyzing…" : "National Trends"}
          </button>

          {(analysis || national) && (
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

      {/* Jurisdiction Analysis Results */}
      {analysis && analysis.snapshots.length > 0 && (
        <div className="mt-10 space-y-10">
          {/* Volatility */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Volatility Score
            </h2>
            <div className="flex items-center gap-3">
              <span
                className={`inline-flex items-center rounded-full border px-4 py-1.5 text-lg font-bold ${volatilityBadge(
                  analysis.volatilityScore
                )}`}
              >
                {analysis.volatilityScore.toFixed(2)}
              </span>
              <span className="text-sm text-slate-600">
                {analysis.volatilityScore >= 0.5
                  ? "High volatility — significant shifts detected"
                  : analysis.volatilityScore >= 0.25
                  ? "Medium volatility — moderate changes over time"
                  : "Low volatility — relatively stable"}
              </span>
            </div>
          </section>

          {/* Risk Trend Sparklines */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Risk Trend Over Time
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {[
                { label: "Structural", data: analysis.riskTrend.structural, color: "#ef4444" },
                { label: "Procedural", data: analysis.riskTrend.procedural, color: "#f59e0b" },
                { label: "Documentation", data: analysis.riskTrend.documentation, color: "#3b82f6" },
                { label: "Overall", data: analysis.riskTrend.overall, color: "#22c55e" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="rounded-lg border border-slate-200 bg-white p-4"
                >
                  <div className="text-sm font-semibold text-slate-700 mb-2">
                    {item.label}
                  </div>
                  <Sparkline data={item.data} color={item.color} />
                  <div className="mt-2 flex items-center justify-between text-xs text-slate-500">
                    <span>Low (0)</span>
                    <span>High (1)</span>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Similarity Drift */}
          {analysis.similarityDrift.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Similarity Drift
              </h2>
              <p className="text-sm text-slate-600 mb-4">
                Cosine distance between consecutive behavior vectors. Higher bars
                indicate larger shifts in how the jurisdiction aligns with the
                scenario.
              </p>
              <div className="rounded-lg border border-slate-200 bg-white p-4 overflow-x-auto">
                <DriftGraph drift={analysis.similarityDrift} />
              </div>
            </section>
          )}

          {/* Rule Change Timeline */}
          {analysis.ruleChanges.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-slate-900 mb-4">
                Rule Change Timeline
              </h2>
              <div className="relative border-l-2 border-slate-200 pl-6 space-y-6">
                {analysis.ruleChanges.map((rc, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[31px] top-1.5 h-3 w-3 rounded-full bg-blue-500 ring-4 ring-white" />
                    <div className="rounded-lg border border-slate-200 bg-white p-4">
                      <div className="text-xs text-slate-500 mb-1">
                        {formatDate(rc.timestamp)}
                      </div>
                      <div className="text-sm font-semibold text-slate-800">
                        Version {rc.fromVersion} → {rc.toVersion}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Snapshot History Table */}
          <section>
            <h2 className="text-xl font-bold text-slate-900 mb-4">
              Snapshot History
            </h2>
            <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Date
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Structural
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Procedural
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Documentation
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Overall
                    </th>
                    <th className="px-4 py-3 text-left font-semibold text-slate-700">
                      Version
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {analysis.snapshots.map((s, i) => (
                    <tr key={i} className="hover:bg-slate-50">
                      <td className="px-4 py-3 whitespace-nowrap text-slate-700">
                        {formatDate(s.timestamp)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                            s.structuralRisk
                          )}`}
                        >
                          {riskEmoji(s.structuralRisk)} {s.structuralRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                            s.proceduralRisk
                          )}`}
                        >
                          {riskEmoji(s.proceduralRisk)} {s.proceduralRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                            s.documentationRisk
                          )}`}
                        >
                          {riskEmoji(s.documentationRisk)} {s.documentationRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                            s.overallRisk
                          )}`}
                        >
                          {riskEmoji(s.overallRisk)} {s.overallRisk}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                        {s.ruleVersion}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      )}

      {/* National Trends Table */}
      {national && (
        <div className="mt-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              National Trends — {national.topic.replace(/-/g, " ")}
            </h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-slate-600">Sort by:</span>
              {([
                ["volatility", "Volatility"],
                ["name", "Name"],
                ["risk", "Risk"],
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
                    Trend Direction
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Volatility
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Last Risk
                  </th>
                  <th className="px-4 py-3 text-left font-semibold text-slate-700">
                    Last Version
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
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                        {trendArrow(j.trendDirection)}
                        <span className="capitalize">{j.trendDirection}</span>
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${volatilityBadge(
                          j.volatilityScore
                        )}`}
                      >
                        {j.volatilityScore.toFixed(2)}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
                          j.lastRisk
                        )}`}
                      >
                        {riskEmoji(j.lastRisk)} {j.lastRisk}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 font-mono text-xs">
                      {j.lastRuleVersion}
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
