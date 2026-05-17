"use client";

import { useState, useTransition } from "react";

interface ComplianceChecklist {
  title: string;
  preconditions: string[];
  steps: string[];
  documents: string[];
  datesToCheck: string[];
  uncertainties: string[];
  warnings: string[];
  citations: string[];
}

interface ChecklistPageProps {
  topics: string[];
  jurisdictions: string[];
  jurisdictionsByTopic: Record<string, string[]>;
}

function checklistToMarkdown(checklist: ComplianceChecklist): string {
  let md = `# ${checklist.title}\n\n`;

  if (checklist.preconditions.length > 0) {
    md += `## Preconditions\n`;
    for (const item of checklist.preconditions) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.steps.length > 0) {
    md += `## Steps\n`;
    let i = 1;
    for (const item of checklist.steps) {
      md += `${i}. ${item}\n`;
      i++;
    }
    md += `\n`;
  }

  if (checklist.documents.length > 0) {
    md += `## Documents\n`;
    for (const item of checklist.documents) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.datesToCheck.length > 0) {
    md += `## Dates to Check\n`;
    for (const item of checklist.datesToCheck) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.uncertainties.length > 0) {
    md += `## Uncertainties\n`;
    for (const item of checklist.uncertainties) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.warnings.length > 0) {
    md += `## Warnings\n`;
    for (const item of checklist.warnings) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  if (checklist.citations.length > 0) {
    md += `## Citations\n`;
    for (const item of checklist.citations) {
      md += `- ${item}\n`;
    }
    md += `\n`;
  }

  return md;
}

export default function ChecklistPage({
  topics,
  jurisdictions,
  jurisdictionsByTopic,
}: ChecklistPageProps) {
  const [topic, setTopic] = useState(topics[0] ?? "");
  const [jurisdiction, setJurisdiction] = useState("");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [checklist, setChecklist] = useState<ComplianceChecklist | null>(null);
  const [error, setError] = useState<string | null>(null);

  const availableJurisdictions = topic
    ? jurisdictionsByTopic[topic] ?? []
    : [];

  function handleTopicChange(newTopic: string) {
    setTopic(newTopic);
    setJurisdiction("");
    setChecklist(null);
    setError(null);
  }

  function handleGenerate() {
    setError(null);
    setChecklist(null);

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
        const res = await fetch("/api/checklist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic, jurisdiction, scenario }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Checklist generation failed");
        } else {
          setChecklist(json);
        }
      } catch (e) {
        setError("Network error");
      }
    });
  }

  function downloadJson() {
    if (!checklist) return;
    const blob = new Blob([JSON.stringify(checklist, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `checklist-${topic}-${jurisdiction}-${Date.now()}.json`;
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
            onClick={handleGenerate}
            disabled={isPending}
            className={`rounded-md px-4 py-2 text-sm font-medium text-white transition-colors ${
              isPending
                ? "bg-blue-300 cursor-wait"
                : "bg-blue-900 hover:bg-blue-800"
            }`}
          >
            {isPending ? "Generating…" : "Generate Checklist"}
          </button>

          {checklist && (
            <>
              <button
                onClick={() => {
                  navigator.clipboard
                    .writeText(checklistToMarkdown(checklist))
                    .catch(() => {});
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

      {checklist && !isPending && (
        <div className="rounded-lg border border-slate-200 bg-white p-6 space-y-6">
          <h2 className="text-xl font-bold text-slate-900">
            {checklist.title}
          </h2>

          {/* Preconditions */}
          {checklist.preconditions.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Preconditions
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {checklist.preconditions.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Steps */}
          {checklist.steps.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Steps
              </h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-slate-700">
                {checklist.steps.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ol>
            </div>
          )}

          {/* Documents */}
          {checklist.documents.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Documents
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {checklist.documents.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Dates to Check */}
          {checklist.datesToCheck.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Dates to Check
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-slate-700">
                {checklist.datesToCheck.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Uncertainties */}
          {checklist.uncertainties.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-amber-600 mb-2">
                Uncertainties
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-amber-800">
                {checklist.uncertainties.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Warnings */}
          {checklist.warnings.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-red-500 mb-2">
                Warnings
              </h3>
              <ul className="list-disc list-inside space-y-1 text-sm text-red-700">
                {checklist.warnings.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Citations */}
          {checklist.citations.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wide text-slate-500 mb-2">
                Citations
              </h3>
              <div className="flex flex-wrap gap-2">
                {checklist.citations.map((item, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-700"
                  >
                    {item}
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
