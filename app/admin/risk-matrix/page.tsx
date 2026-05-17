import { authorityBundle } from "@/lib/authority/bundle";
import RiskMatrixPage from "./RiskMatrixPage";

export default function RiskMatrixServerPage() {
  const topics = Object.keys(authorityBundle).sort();

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="text-3xl font-bold text-slate-900">
        National Risk Matrix
      </h1>
      <p className="mt-2 text-slate-600">
        Run a scenario across all jurisdictions and compare risk profiles
        side-by-side.
      </p>

      <div className="mt-6 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Risk scores reflect structural alignment
          between scenario facts and rule data, not legal outcomes. Always
          consult a qualified attorney.
        </p>
      </div>

      <RiskMatrixPage topics={topics} />
    </main>
  );
}
