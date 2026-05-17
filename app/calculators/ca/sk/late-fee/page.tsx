import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";
import Link from "next/link";

export const metadata = {
  title: "Late Fee for SK | LegalCals",
  description: "This calculator is coming soon for SK.",
};

export default function Page() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="px-4 py-12 max-w-4xl mx-auto space-y-6">
        <RuleFreshnessBanner topic="late-fee" jurisdiction="sk" />
        <div className="rounded-lg border border-slate-200 bg-white p-8 text-center space-y-4">
          <h1 className="text-2xl font-bold text-slate-900">Late Fee</h1>
          <p className="text-slate-600">
            This calculator is not yet available for{" "}
            <strong>SK</strong>.
          </p>
          <p className="text-sm text-slate-500">
            We are working on adding jurisdiction-specific rules. Check back soon.
          </p>
          <div className="pt-2">
            <Link
              href="/admin/rules/late-fee/sk"
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
