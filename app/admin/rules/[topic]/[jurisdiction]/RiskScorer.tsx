"use client";

import { useState, useTransition } from "react";

interface RiskScore {
  jurisdiction: string;
  topic: string;
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  overallRisk: "low" | "medium" | "high";
  factors: string[];
  uncertainties: string[];
  warnings: string[];
}

interface RiskScorerProps {
  topic: string;
  jurisdiction: string;
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

export default function RiskScorer({ topic, jurisdiction }: RiskScorerProps) {
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [score, setScore] = useState<RiskScore | null>(null);
  const [error, setError] = useState<string | null>(null);

  function handleScore() {
    setError(null);
    setScore(null);

    if (!scenario.trim() || scenario.trim().length <= 10) {
      setError("Please describe a scenario longer than 10 characters.");
      return;
    }

    startTransition(async () => {
      try {
        const res = await fetch("/api/risk/single", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, jurisdiction, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Risk scoring failed");
        } else {
          setScore(json);
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
          ⚠️ Informational only. Risk scores reflect structural alignment between
          scenario facts and rule data, not legal outcomes. Always consult a
          qualified attorney.
        </p>
      </div>

      <textarea
        value={scenario}
        onChange={(e) => setScenario(e.target.value)}
        placeholder="Describe a scenario... e.g. 'My landlord gave me 30 days notice of a 5% rent increase. I moved in 6 months ago.'"
        rows={4}
        className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
      />

      <button
        onClick={handleScore}
        disabled={isPending}
        className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
          isPending
            ? "bg-blue-300 cursor-wait"
            : "bg-blue-900 hover:bg-blue-800"
        }`}
      >
        {isPending ? "Scoring…" : "Score Risk"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {score && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-5 space-y-5">
          {/* Risk Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Structural
              </div>
              <div
                className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${riskBadgeClass(
                  score.structuralRisk
                )}`}
              >
                {riskEmoji(score.structuralRisk)} {score.structuralRisk}
              </div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Procedural
              </div>
              <div
                className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${riskBadgeClass(
                  score.proceduralRisk
                )}`}
              >
                {riskEmoji(score.proceduralRisk)} {score.proceduralRisk}
              </div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Documentation
              </div>
              <div
                className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${riskBadgeClass(
                  score.documentationRisk
                )}`}
              >
                {riskEmoji(score.documentationRisk)} {score.documentationRisk}
              </div>
            </div>
            <div className="rounded-lg border p-3 text-center">
              <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Overall
              </div>
              <div
                className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${riskBadgeClass(
                  score.overallRisk
                )}`}
              >
                {riskEmoji(score.overallRisk)} {score.overallRisk}
              </div>
            </div>
          </div>

          {/* Factors */}
          {score.factors.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Contributing Factors
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {score.factors.map((f, i) => (
                  <li key={i}>{f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uncertainties */}
          {score.uncertainties.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Uncertainties
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                {score.uncertainties.map((u, i) => (
                  <li key={i}>{u}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {score.warnings.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Warnings
              </h4>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {score.warnings.map((w, i) => (
                  <li key={i}>{w}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
