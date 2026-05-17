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

interface RiskPageProps {
  topics: string[];
  jurisdictions: string[];
  jurisdictionsByTopic: Record<string, string[]>;
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

function scoreToMarkdown(score: RiskScore): string {
  let md = `# Risk Profile — ${score.jurisdiction.toUpperCase()} ${score.topic.replace(/-/g, " ")}\n\n`;
  md += `**Overall Risk:** ${score.overallRisk.toUpperCase()}\n\n`;
  md += `| Category | Risk |\n`;
  md += `|----------|------|\n`;
  md += `| Structural | ${score.structuralRisk} |\n`;
  md += `| Procedural | ${score.proceduralRisk} |\n`;
  md += `| Documentation | ${score.documentationRisk} |\n`;
  md += `\n`;

  if (score.factors.length > 0) {
    md += `## Factors\n`;
    for (const f of score.factors) {
      md += `- ${f}\n`;
    }
    md += `\n`;
  }

  if (score.uncertainties.length > 0) {
    md += `## Uncertainties\n`;
    for (const u of score.uncertainties) {
      md += `- ${u}\n`;
    }
    md += `\n`;
  }

  if (score.warnings.length > 0) {
    md += `## Warnings\n`;
    for (const w of score.warnings) {
      md += `- ${w}\n`;
    }
    md += `\n`;
  }

  return md;
}

export default function RiskPage({
  topics,
  jurisdictions,
  jurisdictionsByTopic,
}: RiskPageProps) {
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [jurisdiction, setJurisdiction] = useState("");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [score, setScore] = useState<RiskScore | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableJurisdictions = topic
    ? jurisdictionsByTopic[topic] ?? []
    : [];

  function handleTopicChange(newTopic: string) {
    setTopic(newTopic);
    setJurisdiction("");
    setScore(null);
    setError(null);
  }

  function handleScore() {
    setError(null);
    setScore(null);

    if (!topic || !jurisdiction) {
      setError("Please select a topic and jurisdiction.");
      return;
    }
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

  function downloadJson() {
    if (!score) return;
    const blob = new Blob([JSON.stringify(score, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `risk-${topic}-${jurisdiction}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
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
            placeholder="Describe a scenario... e.g. 'My landlord gave me 30 days notice of a 5% rent increase. I moved in 6 months ago.'"
            rows={5}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="flex flex-wrap gap-2">
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

          {score && (
            <>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(scoreToMarkdown(score)).catch(() => {});
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Copy as Markdown
              </button>
              <button
                onClick={downloadJson}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Download JSON
              </button>
            </>
          )}
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {score && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">
            Risk Profile — {score.jurisdiction.toUpperCase()}
          </h2>

          {/* Risk Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Structural", value: score.structuralRisk },
              { label: "Procedural", value: score.proceduralRisk },
              { label: "Documentation", value: score.documentationRisk },
              { label: "Overall", value: score.overallRisk },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border p-3 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.label}
                </div>
                <div
                  className={`mt-2 inline-flex items-center rounded-full border px-3 py-1 text-sm font-medium ${riskBadgeClass(
                    item.value
                  )}`}
                >
                  {riskEmoji(item.value)} {item.value}
                </div>
              </div>
            ))}
          </div>

          {/* Factors */}
          {score.factors.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Contributing Factors
              </h3>
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
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Uncertainties
              </h3>
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
              <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Warnings
              </h3>
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
