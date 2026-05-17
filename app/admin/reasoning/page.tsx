import { authorityBundle } from "@/lib/authority/bundle";
import ScenarioReasoningPage from "./ScenarioReasoningPage";

export default function ReasoningPage() {
  const topics = Object.keys(authorityBundle).sort();
  const jurisdictionsByTopic: Record<string, string[]> = {};

  for (const topic of topics) {
    jurisdictionsByTopic[topic] = Object.keys(authorityBundle[topic]).sort();
  }

  // Flatten unique jurisdictions across all topics
  const allJurisdictions = Array.from(
    new Set(
      Object.values(jurisdictionsByTopic).flat()
    )
  ).sort();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Scenario Reasoning
      </h1>
      <p className="mt-2 text-slate-600">
        Describe a scenario, select a topic and jurisdiction, and receive structured, non-advisory guidance.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. This is not legal advice. Always consult a qualified attorney.
        </p>
      </div>

      <ScenarioReasoningPage
        topics={topics}
        jurisdictions={allJurisdictions}
        jurisdictionsByTopic={jurisdictionsByTopic}
      />
    </main>
  );
}
