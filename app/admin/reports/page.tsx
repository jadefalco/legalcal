"use client";

import { useState, useTransition } from "react";

// ── Types ──

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

interface NationalRiskResult {
  topic: string;
  scenario: string;
  results: RiskScore[];
}

interface HeatmapData {
  topic: string;
  scenario: string;
  results: Array<{
    jurisdiction: string;
    country: "CA" | "US";
    overallRisk: "low" | "medium" | "high";
    structuralRisk: "low" | "medium" | "high";
    proceduralRisk: "low" | "medium" | "high";
    documentationRisk: "low" | "medium" | "high";
    isPlaceholder: boolean;
    name: string;
  }>;
}

interface NationalSimilaritySummary {
  topClusters: Array<{ clusterId: number; members: string[] }>;
  outliers: string[];
  strongestPairs: Array<{ a: string; b: string; score: number }>;
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

interface TopicCoverage {
  total: number;
  placeholder: number;
  real: number;
  coveragePercent: number;
}

interface RuleChangeSummary {
  jurisdiction: string;
  fromVersion: string;
  toVersion: string;
  timestamp: string;
}

interface QuarterlyTopicReport {
  topic: string;
  nationalRisk: NationalRiskResult;
  nationalHeatmap: HeatmapData;
  nationalSimilarity: NationalSimilaritySummary;
  nationalTrends: NationalTrendReport;
  nationalForecast: NationalForecastReport;
  coverage: TopicCoverage;
  ruleChanges: RuleChangeSummary[];
}

interface QuarterlyReport {
  type: "quarterly";
  quarter: string;
  generatedAt: string;
  topics: QuarterlyTopicReport[];
}

interface RiskTrendItem {
  jurisdiction: string;
  name: string;
  country: string;
  deltaStructural: number;
  deltaProcedural: number;
  deltaDocumentation: number;
  deltaOverall: number;
  previousRisk: "low" | "medium" | "high";
  currentRisk: "low" | "medium" | "high";
}

interface RiskTrendSummary {
  topic: string;
  jurisdictions: RiskTrendItem[];
}

interface VolatilityRanking {
  jurisdiction: string;
  name: string;
  country: string;
  volatilityScore: number;
  rank: number;
}

interface ClusterMovementSummary {
  jurisdiction: string;
  name: string;
  country: string;
  movement: string;
}

interface ForecastOutlookItem {
  jurisdiction: string;
  name: string;
  country: string;
  outlook: "low" | "medium" | "high";
  confidence: number;
  trendDirection: "tightening" | "loosening" | "stable";
}

interface ForecastOutlookSummary {
  topic: string;
  jurisdictions: ForecastOutlookItem[];
}

interface AnnualTopicReport {
  topic: string;
  riskTrends: RiskTrendSummary;
  volatilityRanking: VolatilityRanking[];
  clusterMovement: ClusterMovementSummary[];
  forecastOutlook: ForecastOutlookSummary;
  nationalHeatmap: HeatmapData;
  nationalSimilarity: NationalSimilaritySummary;
  coverage: TopicCoverage;
  ruleChanges: RuleChangeSummary[];
}

interface AnnualReport {
  type: "annual";
  year: number;
  generatedAt: string;
  topics: AnnualTopicReport[];
}

type Report = QuarterlyReport | AnnualReport;

// ── Constants ──

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

function trendArrow(dir: "tightening" | "loosening" | "stable"): string {
  if (dir === "tightening") return "↗️";
  if (dir === "loosening") return "↘️";
  return "➡️";
}

function coverageBar(percent: number): string {
  if (percent >= 80) return "bg-emerald-500";
  if (percent >= 50) return "bg-amber-500";
  return "bg-red-500";
}

// ── Components ──

function SectionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="mt-10">
      <h2 className="text-xl font-bold text-slate-900 mb-4">{title}</h2>
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        {children}
      </div>
    </section>
  );
}

function Badge({
  level,
}: {
  level: "low" | "medium" | "high" | string;
}) {
  const l = level as "low" | "medium" | "high";
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${riskColor(
        l
      )}`}
    >
      {riskEmoji(l)} {l}
    </span>
  );
}

// ── Main Page ──

export default function ReportsPage() {
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["rent-increase"]);
  const [scenario, setScenario] = useState(
    "Proposed rent increase of 5% with 30 days' notice."
  );
  const [report, setReport] = useState<Report | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isPendingQuarterly, startQuarterly] = useTransition();
  const [isPendingAnnual, startAnnual] = useTransition();

  function toggleTopic(topic: string) {
    setSelectedTopics((prev) =>
      prev.includes(topic) ? prev.filter((t) => t !== topic) : [...prev, topic]
    );
  }

  function generateQuarterly() {
    setError(null);
    setReport(null);
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic.");
      return;
    }
    startQuarterly(async () => {
      try {
        const res = await fetch("/api/reports/quarterly", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topics: selectedTopics, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Quarterly report generation failed");
        } else {
          setReport(json as QuarterlyReport);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function generateAnnual() {
    setError(null);
    setReport(null);
    if (selectedTopics.length === 0) {
      setError("Please select at least one topic.");
      return;
    }
    startAnnual(async () => {
      try {
        const res = await fetch("/api/reports/annual", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topics: selectedTopics, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Annual report generation failed");
        } else {
          setReport(json as AnnualReport);
        }
      } catch {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    if (!report) return;
    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `report-${report.type}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function toMarkdown(): string {
    if (!report) return "";
    let md = `# National Regulatory Report\n\n`;
    md += `**Type:** ${report.type === "quarterly" ? `Quarterly (${report.quarter})` : `Annual (${report.year})`}  \n`;
    md += `**Generated:** ${new Date(report.generatedAt).toLocaleString("en-US")}  \n\n`;

    for (const t of report.topics) {
      md += `## Topic: ${t.topic.replace(/-/g, " ")}\n\n`;

      // Coverage
      md += `### Coverage\n\n`;
      md += `- Total: ${t.coverage.total}\n`;
      md += `- Real rules: ${t.coverage.real}\n`;
      md += `- Placeholders: ${t.coverage.placeholder}\n`;
      md += `- Coverage: ${t.coverage.coveragePercent}%\n\n`;

      if (report.type === "quarterly") {
        const qt = t as QuarterlyTopicReport;
        md += `### Risk Profile\n\n`;
        md += `| Jurisdiction | Overall |\n`;
        md += `|--------------|---------|\n`;
        for (const r of qt.nationalRisk.results.slice(0, 10)) {
          md += `| ${r.name} (${r.jurisdiction.toUpperCase()}) | ${r.overallRisk} |\n`;
        }
        md += `\n`;

        md += `### Forecast\n\n`;
        md += `| Jurisdiction | Predicted | Confidence | Trend |\n`;
        md += `|--------------|-----------|------------|-------|\n`;
        for (const j of qt.nationalForecast.jurisdictions.slice(0, 10)) {
          md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.predictedRisk} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} |\n`;
        }
        md += `\n`;
      } else {
        const at = t as AnnualTopicReport;
        md += `### Volatility Rankings\n\n`;
        md += `| Rank | Jurisdiction | Volatility |\n`;
        md += `|------|--------------|------------|\n`;
        for (const j of at.volatilityRanking.slice(0, 10)) {
          md += `| ${j.rank} | ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.volatilityScore.toFixed(3)} |\n`;
        }
        md += `\n`;

        md += `### Forecast Outlook\n\n`;
        md += `| Jurisdiction | Outlook | Confidence | Trend |\n`;
        md += `|--------------|---------|------------|-------|\n`;
        for (const j of at.forecastOutlook.jurisdictions.slice(0, 10)) {
          md += `| ${j.name} (${j.jurisdiction.toUpperCase()}) | ${j.outlook} | ${(j.confidence * 100).toFixed(0)}% | ${j.trendDirection} |\n`;
        }
        md += `\n`;
      }
    }

    return md;
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        National Regulatory Reports Dashboard
      </h1>
      <p className="mt-2 text-slate-600">
        Generate comprehensive quarterly and annual regulatory intelligence
        reports across all jurisdictions.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Reports are informational only. They compose risk, trend,
          forecast, and similarity data for strategic awareness, not legal
          advice.
        </p>
      </div>

      {/* Inputs */}
      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-2">
            Topics
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-48 overflow-y-auto rounded-md border border-slate-300 p-3">
            {TOPICS.map((topic) => (
              <label
                key={topic}
                className="flex items-center gap-2 text-sm text-slate-700 cursor-pointer hover:bg-slate-50 rounded px-1 py-0.5"
              >
                <input
                  type="checkbox"
                  checked={selectedTopics.includes(topic)}
                  onChange={() => toggleTopic(topic)}
                  className="rounded border-slate-300 text-blue-900 focus:ring-blue-500"
                />
                <span className="capitalize">{topic.replace(/-/g, " ")}</span>
              </label>
            ))}
          </div>
          <p className="mt-1 text-xs text-slate-500">
            {selectedTopics.length} topic{selectedTopics.length !== 1 ? "s" : ""} selected
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Scenario
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe a scenario to contextualize the report..."
            rows={3}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={generateQuarterly}
            disabled={isPendingQuarterly}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingQuarterly
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingQuarterly
              ? "Generating Quarterly…"
              : "Generate Quarterly Report"}
          </button>
          <button
            onClick={generateAnnual}
            disabled={isPendingAnnual}
            className={`rounded-md px-5 py-2.5 text-sm font-medium text-white transition-colors ${
              isPendingAnnual
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPendingAnnual
              ? "Generating Annual…"
              : "Generate Annual Report"}
          </button>

          {report && (
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
              <button
                onClick={() => {
                  const blob = new Blob([toMarkdown()], {
                    type: "text/markdown",
                  });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement("a");
                  a.href = url;
                  a.download = `report-${report.type}-${Date.now()}.md`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Generate Publication-Ready Report
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

      {report && <ReportView report={report} />}
    </main>
  );
}

// ── Report View ──

function ReportView({ report }: { report: Report }) {
  return (
    <div className="mt-6 space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900">
              {report.type === "quarterly"
                ? `Quarterly Report — ${report.quarter}`
                : `Annual Report — ${report.year}`}
            </h2>
            <p className="text-sm text-slate-500">
              Generated {new Date(report.generatedAt).toLocaleString("en-US")}
            </p>
          </div>
          <span
            className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium ${
              report.type === "quarterly"
                ? "bg-blue-100 text-blue-800 border-blue-200"
                : "bg-purple-100 text-purple-800 border-purple-200"
            }`}
          >
            {report.type === "quarterly" ? "Quarterly" : "Annual"}
          </span>
        </div>
      </div>

      {report.topics.map((topicReport) =>
        report.type === "quarterly" ? (
          <QuarterlyTopicView
            key={topicReport.topic}
            data={topicReport as QuarterlyTopicReport}
          />
        ) : (
          <AnnualTopicView
            key={topicReport.topic}
            data={topicReport as AnnualTopicReport}
          />
        )
      )}
    </div>
  );
}

// ── Quarterly Topic View ──

function QuarterlyTopicView({ data }: { data: QuarterlyTopicReport }) {
  const highRisk = data.nationalRisk.results
    .filter((r) => r.overallRisk === "high")
    .slice(0, 5);
  const tightening = data.nationalTrends.jurisdictions
    .filter((j) => j.trendDirection === "tightening")
    .slice(0, 5);
  const forecastHigh = data.nationalForecast.jurisdictions
    .filter((j) => j.predictedRisk === "high")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 capitalize">
          {data.topic.replace(/-/g, " ")}
        </h3>
      </div>

      {/* A. Executive Summary */}
      <SectionCard title="Executive Summary">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 High-Risk
            </h4>
            <ul className="space-y-1">
              {highRisk.map((r) => (
                <li
                  key={r.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {r.name} ({r.jurisdiction.toUpperCase()})
                  </span>
                  <Badge level={r.overallRisk} />
                </li>
              ))}
              {highRisk.length === 0 && (
                <li className="text-sm text-slate-500">No high-risk jurisdictions.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 Tightening
            </h4>
            <ul className="space-y-1">
              {tightening.map((j) => (
                <li
                  key={j.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {j.name} ({j.jurisdiction.toUpperCase()})
                  </span>
                  <span className="text-sm">
                    {trendArrow(j.trendDirection)} {j.trendDirection}
                  </span>
                </li>
              ))}
              {tightening.length === 0 && (
                <li className="text-sm text-slate-500">No tightening jurisdictions.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 Forecasted High-Risk
            </h4>
            <ul className="space-y-1">
              {forecastHigh.map((j) => (
                <li
                  key={j.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {j.name} ({j.jurisdiction.toUpperCase()})
                  </span>
                  <Badge level={j.predictedRisk} />
                </li>
              ))}
              {forecastHigh.length === 0 && (
                <li className="text-sm text-slate-500">No forecasted high-risk jurisdictions.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top Cluster Movements
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.nationalSimilarity.topClusters.map((c) => (
                <div
                  key={c.clusterId}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-700">
                    Cluster {c.clusterId + 1}
                  </span>
                  <span className="ml-2 text-slate-500">
                    {c.members.map((m) => m.toUpperCase()).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Coverage Summary
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Coverage</span>
                <span className="font-medium text-slate-900">
                  {data.coverage.real} / {data.coverage.total} (
                  {data.coverage.coveragePercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2.5 rounded-full ${coverageBar(
                    data.coverage.coveragePercent
                  )}`}
                  style={{ width: `${data.coverage.coveragePercent}%` }}
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Real: {data.coverage.real}</span>
                <span>Placeholder: {data.coverage.placeholder}</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* B. National Heatmap Snapshot */}
      <SectionCard title="National Heatmap Snapshot">
        <HeatmapTable data={data.nationalHeatmap} />
      </SectionCard>

      {/* C. National Similarity Snapshot */}
      <SectionCard title="National Similarity Snapshot">
        <SimilarityView data={data.nationalSimilarity} />
      </SectionCard>

      {/* D. Trend & Forecast Panels */}
      <SectionCard title="Trend & Forecast Panels">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Volatility Rankings
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Jurisdiction
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Volatility
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Trend
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Last Risk
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.nationalTrends.jurisdictions.slice(0, 10).map((j) => (
                    <tr key={j.jurisdiction} className="hover:bg-slate-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {j.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {j.jurisdiction.toUpperCase()} · {j.country}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                            j.volatilityScore >= 0.5
                              ? "bg-red-100 text-red-800 border-red-200"
                              : j.volatilityScore >= 0.25
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }`}
                        >
                          {j.volatilityScore.toFixed(2)}
                        </span>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                          {trendArrow(j.trendDirection)}
                          <span className="capitalize">{j.trendDirection}</span>
                        </span>
                      </td>
                      <td className="px-4 py-2">
                        <Badge level={j.lastRisk} />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Forecast Outlook
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Jurisdiction
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Predicted
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Confidence
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.nationalForecast.jurisdictions.slice(0, 10).map((j) => (
                    <tr key={j.jurisdiction} className="hover:bg-slate-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {j.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {j.jurisdiction.toUpperCase()} · {j.country}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Badge level={j.predictedRisk} />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-slate-200">
                            <div
                              className={`h-2 rounded-full ${
                                j.confidence >= 0.66
                                  ? "bg-green-500"
                                  : j.confidence >= 0.33
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${j.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600">
                            {(j.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                          {trendArrow(j.trendDirection)}
                          <span className="capitalize">{j.trendDirection}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* E. Topic Coverage Summary */}
      <SectionCard title="Topic Coverage Summary">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Jurisdictions
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.total}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Active Rules
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.real}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Placeholders
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.placeholder}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-600">Coverage</span>
            <span className="font-medium text-slate-900">
              {data.coverage.coveragePercent}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <div
              className={`h-3 rounded-full ${coverageBar(
                data.coverage.coveragePercent
              )}`}
              style={{ width: `${data.coverage.coveragePercent}%` }}
            />
          </div>
        </div>
      </SectionCard>

      {/* F. Rule Changes */}
      {data.ruleChanges.length > 0 && (
        <SectionCard title="Recent Rule Changes (90 days)">
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    From
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    To
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.ruleChanges.map((rc, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900 uppercase">
                      {rc.jurisdiction}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {rc.fromVersion}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {rc.toVersion}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {new Date(rc.timestamp).toLocaleDateString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ── Annual Topic View ──

function AnnualTopicView({ data }: { data: AnnualTopicReport }) {
  const topVolatile = data.volatilityRanking.slice(0, 5);
  const topDeltas = [...data.riskTrends.jurisdictions]
    .sort((a, b) => b.deltaOverall - a.deltaOverall)
    .slice(0, 5);
  const forecastHigh = data.forecastOutlook.jurisdictions
    .filter((j) => j.outlook === "high")
    .slice(0, 5);

  return (
    <div className="space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 capitalize">
          {data.topic.replace(/-/g, " ")}
        </h3>
      </div>

      {/* A. Executive Summary */}
      <SectionCard title="Executive Summary">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 Most Volatile
            </h4>
            <ul className="space-y-1">
              {topVolatile.map((j) => (
                <li
                  key={j.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {j.name} ({j.jurisdiction.toUpperCase()})
                  </span>
                  <span className="font-medium text-slate-900">
                    {j.volatilityScore.toFixed(3)}
                  </span>
                </li>
              ))}
              {topVolatile.length === 0 && (
                <li className="text-sm text-slate-500">No volatility data.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 Largest Risk Deltas
            </h4>
            <ul className="space-y-1">
              {topDeltas.map((j) => (
                <li
                  key={j.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {j.name} ({j.jurisdiction.toUpperCase()})
                  </span>
                  <span
                    className={`font-medium ${
                      j.deltaOverall > 0
                        ? "text-red-700"
                        : j.deltaOverall < 0
                        ? "text-green-700"
                        : "text-slate-700"
                    }`}
                  >
                    {j.deltaOverall >= 0 ? "+" : ""}
                    {j.deltaOverall.toFixed(2)}
                  </span>
                </li>
              ))}
              {topDeltas.length === 0 && (
                <li className="text-sm text-slate-500">No trend data.</li>
              )}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top 5 Forecasted High-Risk
            </h4>
            <ul className="space-y-1">
              {forecastHigh.map((j) => (
                <li
                  key={j.jurisdiction}
                  className="flex items-center justify-between text-sm"
                >
                  <span className="text-slate-700">
                    {j.name} ({j.jurisdiction.toUpperCase()})
                  </span>
                  <Badge level={j.outlook} />
                </li>
              ))}
              {forecastHigh.length === 0 && (
                <li className="text-sm text-slate-500">No forecasted high-risk jurisdictions.</li>
              )}
            </ul>
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Top Cluster Movements
            </h4>
            <div className="flex flex-wrap gap-2">
              {data.nationalSimilarity.topClusters.map((c) => (
                <div
                  key={c.clusterId}
                  className="rounded-md border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
                >
                  <span className="font-medium text-slate-700">
                    Cluster {c.clusterId + 1}
                  </span>
                  <span className="ml-2 text-slate-500">
                    {c.members.map((m) => m.toUpperCase()).join(", ")}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Coverage Summary
            </h4>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">Coverage</span>
                <span className="font-medium text-slate-900">
                  {data.coverage.real} / {data.coverage.total} (
                  {data.coverage.coveragePercent}%)
                </span>
              </div>
              <div className="h-2.5 w-full rounded-full bg-slate-200">
                <div
                  className={`h-2.5 rounded-full ${coverageBar(
                    data.coverage.coveragePercent
                  )}`}
                  style={{ width: `${data.coverage.coveragePercent}%` }}
                />
              </div>
              <div className="flex items-center gap-4 text-xs text-slate-500">
                <span>Real: {data.coverage.real}</span>
                <span>Placeholder: {data.coverage.placeholder}</span>
              </div>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* B. National Heatmap Snapshot */}
      <SectionCard title="National Heatmap Snapshot">
        <HeatmapTable data={data.nationalHeatmap} />
      </SectionCard>

      {/* C. National Similarity Snapshot */}
      <SectionCard title="National Similarity Snapshot">
        <SimilarityView data={data.nationalSimilarity} />
      </SectionCard>

      {/* D. Trend & Forecast Panels */}
      <SectionCard title="Trend & Forecast Panels">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Volatility Rankings
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Rank
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Jurisdiction
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Volatility
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.volatilityRanking.slice(0, 10).map((j) => (
                    <tr key={j.jurisdiction} className="hover:bg-slate-50">
                      <td className="px-4 py-2 font-medium text-slate-900">
                        {j.rank}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {j.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {j.jurisdiction.toUpperCase()} · {j.country}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <span
                          className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${
                            j.volatilityScore >= 0.5
                              ? "bg-red-100 text-red-800 border-red-200"
                              : j.volatilityScore >= 0.25
                              ? "bg-amber-100 text-amber-800 border-amber-200"
                              : "bg-green-100 text-green-800 border-green-200"
                          }`}
                        >
                          {j.volatilityScore.toFixed(3)}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
              Forecast Outlook
            </h4>
            <div className="overflow-x-auto rounded-lg border border-slate-200">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Jurisdiction
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Outlook
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Confidence
                    </th>
                    <th className="px-4 py-2 text-left font-semibold text-slate-700">
                      Trend
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {data.forecastOutlook.jurisdictions.slice(0, 10).map((j) => (
                    <tr key={j.jurisdiction} className="hover:bg-slate-50">
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="font-medium text-slate-900">
                          {j.name}
                        </div>
                        <div className="text-xs text-slate-500">
                          {j.jurisdiction.toUpperCase()} · {j.country}
                        </div>
                      </td>
                      <td className="px-4 py-2">
                        <Badge level={j.outlook} />
                      </td>
                      <td className="px-4 py-2">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-16 rounded-full bg-slate-200">
                            <div
                              className={`h-2 rounded-full ${
                                j.confidence >= 0.66
                                  ? "bg-green-500"
                                  : j.confidence >= 0.33
                                  ? "bg-amber-500"
                                  : "bg-red-500"
                              }`}
                              style={{ width: `${j.confidence * 100}%` }}
                            />
                          </div>
                          <span className="text-xs text-slate-600">
                            {(j.confidence * 100).toFixed(0)}%
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <span className="inline-flex items-center gap-1 text-sm text-slate-700">
                          {trendArrow(j.trendDirection)}
                          <span className="capitalize">{j.trendDirection}</span>
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </SectionCard>

      {/* E. Topic Coverage Summary */}
      <SectionCard title="Topic Coverage Summary">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Total Jurisdictions
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.total}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Active Rules
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.real}
            </div>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="text-xs font-medium text-slate-500 uppercase tracking-wide">
              Placeholders
            </div>
            <div className="mt-1 text-2xl font-bold text-slate-900">
              {data.coverage.placeholder}
            </div>
          </div>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-slate-600">Coverage</span>
            <span className="font-medium text-slate-900">
              {data.coverage.coveragePercent}%
            </span>
          </div>
          <div className="h-3 w-full rounded-full bg-slate-200">
            <div
              className={`h-3 rounded-full ${coverageBar(
                data.coverage.coveragePercent
              )}`}
              style={{ width: `${data.coverage.coveragePercent}%` }}
            />
          </div>
        </div>
      </SectionCard>

      {/* F. Rule Changes */}
      {data.ruleChanges.length > 0 && (
        <SectionCard title="Recent Rule Changes (Annual)">
          <div className="overflow-x-auto rounded-lg border border-slate-200">
            <table className="min-w-full text-sm">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Jurisdiction
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    From
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    To
                  </th>
                  <th className="px-4 py-2 text-left font-semibold text-slate-700">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {data.ruleChanges.map((rc, i) => (
                  <tr key={i} className="hover:bg-slate-50">
                    <td className="px-4 py-2 font-medium text-slate-900 uppercase">
                      {rc.jurisdiction}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {rc.fromVersion}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {rc.toVersion}
                    </td>
                    <td className="px-4 py-2 text-slate-600">
                      {new Date(rc.timestamp).toLocaleDateString("en-US")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      )}
    </div>
  );
}

// ── Heatmap Table ──

function HeatmapTable({ data }: { data: HeatmapData }) {
  const ca = data.results.filter((r) => r.country === "CA");
  const us = data.results.filter((r) => r.country === "US");

  return (
    <div className="space-y-4">
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Canada
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {ca.map((r) => (
            <div
              key={r.jurisdiction}
              className={`rounded-md border px-2 py-2 text-center text-xs font-medium ${
                r.isPlaceholder
                  ? "bg-slate-100 text-slate-400 border-slate-200"
                  : riskColor(r.overallRisk)
              }`}
              title={`${r.name} — Structural: ${r.structuralRisk}, Procedural: ${r.proceduralRisk}, Documentation: ${r.documentationRisk}`}
            >
              <div className="uppercase">{r.jurisdiction}</div>
              <div className="text-[10px] opacity-80">
                {r.isPlaceholder ? "N/A" : r.overallRisk}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          United States
        </h4>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {us.map((r) => (
            <div
              key={r.jurisdiction}
              className={`rounded-md border px-2 py-2 text-center text-xs font-medium ${
                r.isPlaceholder
                  ? "bg-slate-100 text-slate-400 border-slate-200"
                  : riskColor(r.overallRisk)
              }`}
              title={`${r.name} — Structural: ${r.structuralRisk}, Procedural: ${r.proceduralRisk}, Documentation: ${r.documentationRisk}`}
            >
              <div className="uppercase">{r.jurisdiction}</div>
              <div className="text-[10px] opacity-80">
                {r.isPlaceholder ? "N/A" : r.overallRisk}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── Similarity View ──

function SimilarityView({
  data,
}: {
  data: NationalSimilaritySummary;
}) {
  return (
    <div className="space-y-6">
      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Clusters
        </h4>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {data.topClusters.map((c) => (
            <div
              key={c.clusterId}
              className="rounded-lg border border-slate-200 bg-slate-50 p-4"
            >
              <div className="text-sm font-bold text-slate-900 mb-1">
                Cluster {c.clusterId + 1}
              </div>
              <div className="flex flex-wrap gap-1">
                {c.members.map((m) => (
                  <span
                    key={m}
                    className="inline-flex items-center rounded-full border border-slate-300 bg-white px-2 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {m.toUpperCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {data.outliers.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
            Outliers
          </h4>
          <div className="flex flex-wrap gap-2">
            {data.outliers.map((o) => (
              <span
                key={o}
                className="inline-flex items-center rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-700"
              >
                {o.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      )}

      <div>
        <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-2">
          Strongest Pairs
        </h4>
        <div className="overflow-x-auto rounded-lg border border-slate-200">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-50">
              <tr>
                <th className="px-4 py-2 text-left font-semibold text-slate-700">
                  Jurisdiction A
                </th>
                <th className="px-4 py-2 text-left font-semibold text-slate-700">
                  Jurisdiction B
                </th>
                <th className="px-4 py-2 text-left font-semibold text-slate-700">
                  Similarity
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {data.strongestPairs.map((p, i) => (
                <tr key={i} className="hover:bg-slate-50">
                  <td className="px-4 py-2 font-medium text-slate-900 uppercase">
                    {p.a}
                  </td>
                  <td className="px-4 py-2 font-medium text-slate-900 uppercase">
                    {p.b}
                  </td>
                  <td className="px-4 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-16 rounded-full bg-slate-200">
                        <div
                          className="h-2 rounded-full bg-blue-500"
                          style={{ width: `${p.score * 100}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-600">
                        {(p.score * 100).toFixed(1)}%
                      </span>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
