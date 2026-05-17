import { authorityBundle } from "@/lib/authority/bundle";
import RiskPage from "./RiskPage";

export default function RiskServerPage() {
  const topics = Object.keys(authorityBundle).sort();
  const jurisdictionsByTopic: Record<string, string[]> = {};

  for (const topic of topics) {
    jurisdictionsByTopic[topic] = Object.keys(authorityBundle[topic]).sort();
  }

  const allJurisdictions = Array.from(
    new Set(Object.values(jurisdictionsByTopic).flat())
  ).sort();

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Risk Scoring
      </h1>
      <p className="mt-2 text-slate-600">
        Evaluate a scenario against a jurisdiction&apos;s rule structure and receive
        a neutral, non-advisory risk profile.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Risk scores reflect structural alignment
          between scenario facts and rule data, not legal outcomes. Always
          consult a qualified attorney.
        </p>
      </div>

      <RiskPage
        topics={topics}
        jurisdictions={allJurisdictions}
        jurisdictionsByTopic={jurisdictionsByTopic}
      />
    </main>
  );
}
