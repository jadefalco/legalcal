import Link from "next/link";
import UnifiedCalculator from "@/app/components/UnifiedCalculator";

export default function UnifiedTopicPage({ params }: { params: { topic: string } }) {
  const topic = params.topic.toLowerCase();

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <div className="mb-6">
        <Link href="/admin/topics" className="text-sm text-blue-700 hover:underline">
          ← Back to Topics
        </Link>
      </div>

      <h1 className="text-3xl font-bold text-slate-900">
        {topic.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())}
      </h1>
      <p className="mt-2 text-slate-600">
        Unified analysis across all engines for this topic.
      </p>

      <div className="mt-8 rounded-lg border border-amber-200 bg-amber-50 p-4">
        <p className="text-sm text-amber-800 font-medium">
          ⚠️ Informational only. Results are based on structural alignment
          between scenario facts and rule data, not legal advice.
        </p>
      </div>

      <div className="mt-8 rounded-lg border border-slate-200 bg-white p-6">
        <UnifiedCalculator topic={topic} />
      </div>
    </main>
  );
}
