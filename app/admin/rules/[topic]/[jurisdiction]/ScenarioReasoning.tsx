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

interface ScenarioReasoningProps {
  topic: string;
  jurisdiction: string;
}

export default function ScenarioReasoning({
  topic,
  jurisdiction,
}: ScenarioReasoningProps) {
  const [scenario, setScenario] = useState("");
  const [mode, setMode] = useState<ReasoningMode>("analyze");
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<ReasoningResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  function fetchReasoning(selectedMode: ReasoningMode) {
    setError(null);
    setResult(null);
    setMode(selectedMode);

    if (!scenario.trim()) {
      setError("Please describe a scenario first.");
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
    <div className="space-y-4">
      <div className="rounded-lg border border-amber-200 bg-amber-50 p-3">
        <p className="text-xs text-amber-800 font-medium">
          ⚠️ Informational only. This is not legal advice. Always consult a qualified attorney.
        </p>
      </div>

      <textarea
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        placeholder="Describe a scenario... e.g. 'My landlord gave me 15 days notice of a 5% rent increase. I moved in 6 months ago.'"
        rows={4}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => fetchReasoning("analyze")}
          disabled={isPending}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "analyze" && !isPending
              ? "bg-blue-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          } ${isPending ? "opacity-50 cursor-wait" : ""}`}
        >
          {isPending && mode === "analyze" ? "Analyzing…" : "Analyze Scenario"}
        </button>
        <button
          onClick={() => fetchReasoning("path")}
          disabled={isPending}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "path" && !isPending
              ? "bg-blue-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          } ${isPending ? "opacity-50 cursor-wait" : ""}`}
        >
          {isPending && mode === "path" ? "Generating…" : "Compliance Path"}
        </button>
        <button
          onClick={() => fetchReasoning("outcome")}
          disabled={isPending}
          className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
            mode === "outcome" && !isPending
              ? "bg-blue-900 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          } ${isPending ? "opacity-50 cursor-wait" : ""}`}
        >
          {isPending && mode === "outcome" ? "Reasoning…" : "Outcome Reasoning"}
        </button>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {result && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-4">
          {/* Scenario Summary */}
          {result.scenarioSummary && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Scenario Summary
              </h4>
              <p className="text-sm text-slate-700">{result.scenarioSummary}</p>
            </div>
          )}

          {/* Likely Outcome */}
          {result.likelyOutcome && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-1">
                Likely Outcome
              </h4>
              <p className="text-sm text-slate-700">{result.likelyOutcome}</p>
            </div>
          )}

          {/* Relevant Rule Points */}
          {result.relevantRulePoints && result.relevantRulePoints.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Relevant Rule Points
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Potential Issues
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Missing Information
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Procedural Steps
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Warnings
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Assumptions
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Factors
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Uncertainties
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Alternative Paths
              </h4>
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
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Citations
              </h4>
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
