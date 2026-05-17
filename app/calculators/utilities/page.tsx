import Link from "next/link";
import { calculators } from "@/app/config/calculators";
import { usStates } from "@/app/config/usStates";
import { caProvinces } from "@/app/config/caProvinces";

export const metadata = {
  title: "Utilities and Essential Services Calculator — Select Your Jurisdiction",
  description: "Calculate utilities and essential services rules and deadlines for your jurisdiction.",
};

export default function utilitiesCalculatorPage() {
  const calc = calculators.find((c) => c.slug === "utilities");

  return (
    <main className="min-h-screen px-4 py-12 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-slate-900 mb-2">
        {calc?.name || "Utilities and Essential Services"} Calculator
      </h1>
      <p className="text-slate-600 mb-8">
        {calc?.description || "Calculate rules and deadlines for your jurisdiction."}
      </p>

      <div className="grid gap-8 lg:grid-cols-2">
        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Canada</h2>
          <div className="grid gap-2">
            {Object.values(caProvinces).map((province) => (
              <Link
                key={province.slug}
                href={`/calculators/ca/${province.slug}/utilities`}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {province.name}
              </Link>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-xl font-semibold text-slate-800 mb-4">United States</h2>
          <div className="grid gap-2 sm:grid-cols-2">
            {Object.values(usStates).map((state) => (
              <Link
                key={state.slug}
                href={`/calculators/us/${state.slug}/utilities`}
                className="rounded-lg border border-slate-200 bg-white p-3 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                {state.name}
              </Link>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-12 rounded-lg border border-slate-200 bg-white p-6">
        <h2 className="text-lg font-semibold text-slate-800 mb-2">Unified Analysis</h2>
        <p className="text-sm text-slate-600 mb-4">
          Run all engines (intelligence, reasoning, risk, forecast, etc.) against a single scenario.
        </p>
        <Link
          href={`/admin/unified/utilities`}
          className="inline-block rounded-md bg-blue-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          Open Unified View
        </Link>
      </div>
    </main>
  );
}
