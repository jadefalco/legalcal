"use client";

import { useState, useTransition } from "react";

type ReasoningMode = "analyze" | "path" | "outcome";

interface ReasoningResult {
  scenarioSummary?: string;
  relevantRulePoints?: string[];
  potentialIssues?: string[];
  missingInformation?: string[];
  steps?: string[];
  warnings?: string[];
  assumptions?: string[];
  citations?: string[];
  likelyOutcome?: string;
  factors?: string[];
  uncertainties?: string[];
  alternativePaths?: string[];
}

interface ScenarioReasoningPageProps {
  topics: string[];
  jurisdictions: string[];
  jurisdictionsByTopic: Record<string, string[]>;
}

export default function ScenarioReasoningPage({
  topics,
  jurisdictions,
  jurisdictionsByTopic,
}: ScenarioReasoningPageProps) {
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [jurisdiction, setJurisdiction] = useState("");
  const [scenario, setScenario] = useState("");
  const [mode, setMode] = useState<ReasoningMode>("analyze");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ReasoningResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableJurisdictions = topic ? (jurisdictionsByTopic[topic] ?? []) : [];

  function handleTopicChange(newTopic: string) {
    setTopic(newTopic);
    setJurisdiction("");
    setResult(null);
    setError(null);
  }

  function fetchReasoning(selectedMode: ReasoningMode) {
    setError(null);
    setResult(null);
    setMode(selectedMode);

    if (!topic || !jurisdiction || !scenario.trim()) {
      setError("Please select a topic, jurisdiction, and describe a scenario.");
      return;
    }

    const endpointMap: Record<ReasoningMode, string> = {
      analyze: "/api/reasoning/analyze",
      path: "/api/reasoning/path",
      outcome: "/api/reasoning/outcome",
    };

    startTransition(async () => {
      try {
        const res = await fetch(endpointMap[selectedMode], {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, jurisdiction, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Reasoning failed");
        } else {
          setResult(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Topic
            </label>
            <select
              value={topic}
              onChange={(e) => handleTopicChange(e.target.value)}
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
              Jurisdiction
            </label>
            <select
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select jurisdiction</option>
              {availableJurisdictions.map((j) => (
                <option key={j} value={j}>
                  {j.toUpperCase()}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Scenario
          </label>
          <textarea
            value={scenario}
            onChange={(e) => setScenario(e.target.value)}
            placeholder="Describe a scenario... e.g. 'My landlord gave me 15 days notice of a 5% rent increase. I moved in 6 months ago.'"
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => fetchReasoning("analyze")}
            disabled={isPending}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending && mode === "analyze" ? "Analyzing…" : "Analyze Scenario"}
          </button>
          <button
            onClick={() => fetchReasoning("path")}
            disabled={isPending}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending && mode === "path" ? "Generating…" : "Compliance Path"}
          </button>
          <button
            onClick={() => fetchReasoning("outcome")}
            disabled={isPending}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending && mode === "outcome" ? "Reasoning…" : "Outcome Reasoning"}
          </button>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-6">
          {/* Scenario Summary */}
          {result.scenarioSummary && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Scenario Summary
              </h3>
              <p className="text-sm text-slate-700">{result.scenarioSummary}</p>
            </div>
          )}

          {/* Likely Outcome */}
          {result.likelyOutcome && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Likely Outcome
              </h3>
              <p className="text-sm text-slate-700">{result.likelyOutcome}</p>
            </div>
          )}

          {/* Relevant Rule Points */}
          {result.relevantRulePoints && result.relevantRulePoints.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Relevant Rule Points
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {result.relevantRulePoints.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Potential Issues */}
          {result.potentialIssues && result.potentialIssues.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Potential Issues
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {result.potentialIssues.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Missing Information */}
          {result.missingInformation && result.missingInformation.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Missing Information
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                {result.missingInformation.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {result.steps && result.steps.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Procedural Steps
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
                {result.steps.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Warnings */}
          {result.warnings && result.warnings.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Warnings
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {result.warnings.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Assumptions */}
          {result.assumptions && result.assumptions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Assumptions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-600">
                {result.assumptions.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Factors */}
          {result.factors && result.factors.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Factors
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {result.factors.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uncertainties */}
          {result.uncertainties && result.uncertainties.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Uncertainties
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                {result.uncertainties.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Alternative Paths */}
          {result.alternativePaths && result.alternativePaths.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Alternative Paths
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {result.alternativePaths.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Citations */}
          {result.citations && result.citations.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Citations
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.citations.map((c, i) => (
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
