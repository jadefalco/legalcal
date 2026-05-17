import Link from "next/link";
import { generateChangelog, formatChangelogMarkdown } from "@/lib/authority/changelog";
import type { ChangelogEntry } from "@/lib/authority/changelog";

interface ChangelogPageProps {
  searchParams: {
    since?: string;
    until?: string;
  };
}

function ChangelogResults({
  entries,
  since,
}: {
  entries: ChangelogEntry[];
  since: string;
}) {
  const markdown = formatChangelogMarkdown(entries, since);
  const jsonData = JSON.stringify(entries, null, 2);
  const jsonBlob = `data:application/json;charset=utf-8,${encodeURIComponent(jsonData)}`;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-xl font-bold text-slate-900">
          Results ({entries.length} entries)
        </h2>
        <a
          href={jsonBlob}
          download={`changelog-${new Date().toISOString().split("T")[0]}.json`}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Download JSON
        </a>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-6">
        <div className="prose prose-slate max-w-none">
          {entries.length === 0 ? (
            <p className="text-slate-500 italic">
              No rule changes found in the selected date range.
            </p>
          ) : (
            <div className="space-y-8">
              {entries.map((entry, i) => (
                <div key={i} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                  <h3 className="text-lg font-bold text-slate-900">
                    {entry.jurisdiction.toUpperCase()} —{" "}
                    {entry.topic
                      .split("-")
                      .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                      .join(" ")}
                  </h3>
                  <p className="mt-1 text-sm text-slate-500">
                    {entry.previousVersion
                      ? `Version ${entry.previousVersion} → ${entry.version}`
                      : `Version ${entry.version} (initial)`}
                    {" — "}
                    {new Date(entry.savedAt).toLocaleString("en-US")}
                  </p>

                  <div className="mt-3 space-y-2">
                    {entry.changes.changedKeys.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Changed
                        </p>
                        <ul className="mt-1 list-disc list-inside text-sm text-slate-600">
                          {entry.changes.changedKeys.map((key) => (
                            <li key={key}>
                              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
                                {key}
                              </code>
                              :{" "}
                              {JSON.stringify(
                                entry.changes.dataDiff[key].before
                              )}{" "}
                              →{" "}
                              {JSON.stringify(
                                entry.changes.dataDiff[key].after
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.changes.addedKeys.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Added
                        </p>
                        <ul className="mt-1 list-disc list-inside text-sm text-slate-600">
                          {entry.changes.addedKeys.map((key) => (
                            <li key={key}>
                              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
                                {key}
                              </code>
                              :{" "}
                              {JSON.stringify(
                                entry.changes.dataDiff[key].after
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {entry.changes.removedKeys.length > 0 && (
                      <div>
                        <p className="text-sm font-semibold text-slate-700">
                          Removed
                        </p>
                        <ul className="mt-1 list-disc list-inside text-sm text-slate-600">
                          {entry.changes.removedKeys.map((key) => (
                            <li key={key}>
                              <code className="rounded bg-slate-100 px-1 py-0.5 text-xs">
                                {key}
                              </code>
                              :{" "}
                              {JSON.stringify(
                                entry.changes.dataDiff[key].before
                              )}{" "}
                              → (removed)
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <details className="rounded-lg border border-slate-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          View Raw Markdown
        </summary>
        <pre className="overflow-x-auto p-4 text-xs text-slate-600">
          {markdown}
        </pre>
      </details>
    </div>
  );
}

export default function ChangelogPage({ searchParams }: ChangelogPageProps) {
  const since = searchParams.since;
  const until = searchParams.until;

  const entries =
    since && !Number.isNaN(new Date(since).getTime())
      ? generateChangelog({ since, until })
      : [];

  const showResults = !!since && !Number.isNaN(new Date(since).getTime());

  return (
    <main className="mx-auto max-w-5xl px-6 py-10">
      <Link
        href="/admin/rules"
        className="text-sm font-medium text-blue-700 hover:underline"
      >
        ← Back to Rule Dashboard
      </Link>

      <h1 className="mt-6 text-3xl font-bold text-slate-900">
        Changelog Generator
      </h1>
      <p className="mt-2 text-slate-600">
        Generate human-readable changelogs from rule history snapshots.
      </p>

      <form className="mt-8 flex flex-wrap items-end gap-4">
        <div>
          <label
            htmlFor="since"
            className="block text-sm font-medium text-slate-700"
          >
            Since
          </label>
          <input
            type="date"
            id="since"
            name="since"
            defaultValue={since ?? ""}
            required
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <div>
          <label
            htmlFor="until"
            className="block text-sm font-medium text-slate-700"
          >
            Until (optional)
          </label>
          <input
            type="date"
            id="until"
            name="until"
            defaultValue={until ?? ""}
            className="mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        <button
          type="submit"
          className="rounded-md bg-blue-900 px-6 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          Generate Changelog
        </button>
      </form>

      {showResults && (
        <div className="mt-10">
          <ChangelogResults entries={entries} since={since} />
        </div>
      )}
    </main>
  );
}
