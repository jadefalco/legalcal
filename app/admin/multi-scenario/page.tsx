import { authorityBundle } from "@/lib/authority/bundle";
import MultiScenarioPage from "./MultiScenarioPage";

export default function MultiScenarioServerPage() {
  const topics = Object.keys(authorityBundle).sort();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        Multi-Jurisdiction Scenario Matrix
      </h1>
      <p className="mt-2 text-slate-600">
        Run a single scenario across all jurisdictions and compare structured
        reasoning side-by-side.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. This is not legal advice. Results compare
          rule structures, not real-world outcomes. Always consult a qualified
          attorney.
        </p>
      </div>

      <MultiScenarioPage topics={topics} />
    </main>
  );
}
