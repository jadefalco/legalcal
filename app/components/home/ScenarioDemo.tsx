"use client";

import { useState } from "react";

const JURISDICTIONS = [
  { code: "bc", name: "British Columbia" },
  { code: "ca", name: "California" },
  { code: "ny", name: "New York" },
  { code: "tx", name: "Texas" },
  { code: "on", name: "Ontario" },
];

const TOPICS = [
  "rent-increase",
  "security-deposit",
  "lease-termination",
  "entry-notice",
  "eviction-timeline",
];

const MOCK_RESULTS: Record<string, { summary: string; risk: string; checklist: string[] }> = {
  "bc-rent-increase": {
    summary:
      "BC requires 90 days written notice on the approved form. Increases are capped at 3.5% for 2024. A 5% increase would exceed the cap and likely be invalid unless mutually agreed.",
    risk: "high",
    checklist: [
      "Serve 90-day notice using approved RTB form",
      "Confirm increase is within annual cap",
      "Provide signed copy to tenant",
      "Document service date and method",
    ],
  },
  "ca-rent-increase": {
    summary:
      "California requires 30 days notice for increases under 10% and 90 days for increases over 10%. Statewide rent caps apply in many jurisdictions. A 5% increase with 30 days notice may be permissible depending on local ordinances.",
    risk: "medium",
    checklist: [
      "Verify local rent control ordinance",
      "Serve proper notice (30 or 90 days)",
      "Calculate allowable increase percentage",
      "Keep proof of service",
    ],
  },
  default: {
    summary:
      "This jurisdiction requires specific notice periods and may impose caps on rent increases. Review local statutes before proceeding.",
    risk: "medium",
    checklist: [
      "Verify statutory notice period",
      "Check for rent increase caps",
      "Use jurisdiction-approved form if required",
      "Document service and retain copies",
    ],
  },
};

function riskBadge(risk: string) {
  switch (risk) {
    case "high":
      return "bg-red-50 text-red-800 border-red-200";
    case "medium":
      return "bg-yellow-50 text-yellow-800 border-yellow-200";
    default:
      return "bg-green-50 text-green-800 border-green-200";
  }
}

export default function ScenarioDemo() {
  const [jurisdiction, setJurisdiction] = useState("bc");
  const [topic, setTopic] = useState("rent-increase");
  const [scenario, setScenario] = useState(
    "Proposed rent increase of 5% with 30 days' notice."
  );
  const [result, setResult] = useState<typeof MOCK_RESULTS["default"] | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  function handleAnalyze() {
    setAnalyzing(true);
    setResult(null);
    setTimeout(() => {
      const key = `${jurisdiction}-${topic}`;
      setResult(MOCK_RESULTS[key] || MOCK_RESULTS.default);
      setAnalyzing(false);
    }, 600);
  }

  return (
    <section className="bg-slate-50 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Try the Scenario Analyzer
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Select a jurisdiction, topic, and scenario to see how LegalCals
            reasons about compliance in seconds.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-4xl">
          <div className="rounded-xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Jurisdiction
                </label>
                <select
                  value={jurisdiction}
                  onChange={(e) => setJurisdiction(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 focus:outline-none"
                >
                  {JURISDICTIONS.map((j) => (
                    <option key={j.code} value={j.code}>
                      {j.name}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 focus:outline-none"
                >
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t.replace(/-/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-medium text-slate-700">
                Scenario
              </label>
              <textarea
                value={scenario}
                onChange={(e) => setScenario(e.target.value)}
                rows={3}
                className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm transition-colors focus:border-brandBlue focus:ring-2 focus:ring-brandBlue/20 focus:outline-none"
              />
            </div>
            <div className="mt-6">
              <button
                onClick={handleAnalyze}
                disabled={analyzing}
                className={`inline-flex items-center rounded-lg px-6 py-3 text-sm font-semibold text-white transition-all ${
                  analyzing
                    ? "bg-brandBlue/50 cursor-wait"
                    : "bg-brandBlue shadow-md shadow-brandBlue/20 hover:bg-brandBlue-light hover:shadow-lg hover:shadow-brandBlue/25"
                }`}
              >
                {analyzing ? "Analyzing…" : "Analyze Scenario"}
              </button>
            </div>
          </div>

          {result && (
            <div className="mt-8 grid gap-6 md:grid-cols-3">
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Intelligence
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-700">
                  {result.summary}
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Risk Score
                </h3>
                <div className="mt-4">
                  <span
                    className={`inline-flex items-center rounded-full border px-4 py-1.5 text-sm font-bold ${riskBadge(
                      result.risk
                    )}`}
                  >
                    {result.risk.toUpperCase()}
                  </span>
                </div>
                <p className="mt-3 text-xs text-slate-500">
                  Based on structural, procedural, and documentation analysis.
                </p>
              </div>
              <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  Checklist
                </h3>
                <ul className="mt-3 space-y-2">
                  {result.checklist.map((item, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full border border-slate-300" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
