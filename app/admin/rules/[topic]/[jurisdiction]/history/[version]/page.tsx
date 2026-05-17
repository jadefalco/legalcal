import Link from "next/link";
import { authorityBundle } from "@/lib/authority/bundle";
import { loadRuleHistory, compareRules } from "@/lib/authority/history";
import { rollbackRule } from "../actions";
import RuleDiffViewer from "@/components/RuleDiffViewer";
import RuleDiffSummary from "@/components/RuleDiffSummary";

interface DiffPageProps {
  params: {
    topic: string;
    jurisdiction: string;
    version: string;
  };
  searchParams: {
    view?: string;
  };
}

export default function DiffPage({ params, searchParams }: DiffPageProps) {
  const { topic, jurisdiction, version } = params;
  const history = loadRuleHistory(topic, jurisdiction);
  const entry = history.find((h) => h.version === version);

  if (!entry) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href={`/admin/rules/${topic}/${jurisdiction}/history`}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to History
        </Link>
        <div className="mt-8 rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
          <h1 className="text-2xl font-bold text-slate-900">
            Version Not Found
          </h1>
          <p className="mt-2 text-slate-600">
            No history entry found for version <strong>{version}</strong>.
          </p>
        </div>
      </main>
    );
  }

  const currentRule = authorityBundle[topic]?.[jurisdiction];
  const isJsonView = searchParams.view === "json";

  if (isJsonView) {
    return (
      <main className="mx-auto max-w-4xl px-6 py-10">
        <Link
          href={`/admin/rules/${topic}/${jurisdiction}/history`}
          className="text-sm font-medium text-blue-700 hover:underline"
        >
          ← Back to History
        </Link>
        <h1 className="mt-6 text-3xl font-bold text-slate-900">
          Snapshot: {topic} / {jurisdiction.toUpperCase()} — {version}
        </h1>
        <pre className="mt-6 overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
          {JSON.stringify(entry.rule, null, 2)}
        </pre>
      </main>
    );
  }

  const diff = currentRule
    ? compareRules(currentRule, entry.rule)
    : { changedKeys: [], addedKeys: [], removedKeys: [], dataDiff: {} };

  const hasChanges =
    diff.changedKeys.length > 0 ||
    diff.addedKeys.length > 0 ||
    diff.removedKeys.length > 0;

  const versionLabel = currentRule
    ? `${currentRule.version.version} → ${entry.version}`
    : entry.version;

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href={`/admin/rules/${topic}/${jurisdiction}/history`}
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to History
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Diff: {topic} / {jurisdiction.toUpperCase()}
      </h1>
      <p className="mt-2 text-slate-600">
        Comparing current rule with version <strong>{version}</strong> (saved{" "}
        {new Date(entry.savedAt).toLocaleString()}).
      </p>

      {/* Summary Cards */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Summary</h2>
        <dl className="mt-4 grid gap-4 sm:grid-cols-3">
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Changed Keys
            </dt>
            <dd className="mt-1 text-2xl font-bold text-yellow-700">
              {diff.changedKeys.length}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Added Keys
            </dt>
            <dd className="mt-1 text-2xl font-bold text-green-700">
              {diff.addedKeys.length}
            </dd>
          </div>
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <dt className="text-xs font-semibold uppercase tracking-wide text-slate-500">
              Removed Keys
            </dt>
            <dd className="mt-1 text-2xl font-bold text-red-700">
              {diff.removedKeys.length}
            </dd>
          </div>
        </dl>
      </section>

      {/* Compact Diff Summary */}
      {hasChanges && (
        <section className="mt-8">
          <h2 className="text-xl font-bold text-slate-900">Changed Fields</h2>
          <div className="mt-4 rounded-lg border border-slate-200 bg-white p-4">
            <RuleDiffSummary diff={diff} />
          </div>
        </section>
      )}

      {/* Visual Diff Viewer */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Detailed Diff</h2>
        <div className="mt-4">
          {currentRule ? (
            <RuleDiffViewer
              before={currentRule}
              after={entry.rule}
              diff={diff}
              topic={topic}
              jurisdiction={jurisdiction}
              versionLabel={versionLabel}
            />
          ) : (
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-6 text-center">
              <p className="text-slate-600">
                Current rule not found in bundle. Showing historical snapshot
                only.
              </p>
              <pre className="mt-4 overflow-x-auto rounded-lg border border-slate-200 bg-white p-4 text-xs text-slate-600">
                {JSON.stringify(entry.rule, null, 2)}
              </pre>
            </div>
          )}
        </div>
      </section>

      {/* Rollback Action */}
      <section className="mt-8">
        <h2 className="text-xl font-bold text-slate-900">Rollback</h2>
        <p className="mt-2 text-sm text-slate-600">
          Restoring version <strong>{version}</strong> will overwrite the
          current rule in the bundle and create a new history snapshot.
        </p>
        <form
          action={async () => {
            "use server";
            await rollbackRule(topic, jurisdiction, version);
          }}
          className="mt-4"
        >
          <button
            type="submit"
            className="rounded-md bg-red-700 px-6 py-3 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-700 focus:ring-offset-2"
          >
            Restore Version {version}
          </button>
        </form>
      </section>
    </main>
  );
}
