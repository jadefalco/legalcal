import Link from "next/link";
import { loadRuleHistory } from "@/lib/authority/history";

interface RuleHistoryPageProps {
  params: {
    topic: string;
    jurisdiction: string;
  };
}

export default function RuleHistoryPage({ params }: RuleHistoryPageProps) {
  const { topic, jurisdiction } = params;
  const history = loadRuleHistory(topic, jurisdiction);

  return (
    <main className="mx-auto max-w-4xl px-6 py-10">
      <Link
        href={`/admin/rules/${topic}/${jurisdiction}`}
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to Rule Detail
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Rule History: {topic} / {jurisdiction.toUpperCase()}
      </h1>
      <p className="mt-2 text-slate-600">
        All preserved versions of this rule. Select a version to view the diff
        or full snapshot.
      </p>

      {history.length === 0 ? (
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <p className="text-slate-500">No history entries found.</p>
        </div>
      ) : (
        <div className="mt-8 space-y-4">
          {history.map((entry, index) => {
            const isLatest = index === history.length - 1;
            return (
              <div
                key={entry.version}
                className="rounded-lg border border-slate-200 bg-white p-5"
              >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-semibold text-slate-900">
                        {entry.version}
                      </span>
                      {isLatest && (
                        <span className="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          Latest
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-slate-500">
                      Saved on{" "}
                      {new Date(entry.savedAt).toLocaleString("en-US", {
                        dateStyle: "medium",
                        timeStyle: "short",
                      })}
                    </p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {index > 0 && (
                      <Link
                        href={`/admin/rules/${topic}/${jurisdiction}/history/${entry.version}`}
                        className="rounded-md bg-blue-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
                      >
                        View Diff
                      </Link>
                    )}
                    <Link
                      href={`/admin/rules/${topic}/${jurisdiction}/history/${entry.version}?view=json`}
                      className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
                    >
                      View JSON
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </main>
  );
}
