import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";
import Link from "next/link";

export const metadata = {
  title: "Rent Increase for MB | LegalCals",
  description: "This calculator is coming soon for MB.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-6">
        <RuleFreshnessBanner topic="rent-increase" jurisdiction="mb" />
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Rent Increase</h1>
          <p className="text-slate-600">
            This calculator is not yet available for{" "}
            <strong>MB</strong>.
          </p>
          <p className="text-sm text-slate-500">
            We are working on adding jurisdiction-specific rules. Check back soon.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/rules/rent-increase/mb"
              className="inline-flex items-center gap-1 text-sm font-medium text-blue-700 hover:underline"
            >
              View Admin Rule Detail →
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
