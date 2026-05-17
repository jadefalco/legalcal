"use client";

import type { RuleDiff } from "@/lib/authority/history";

interface RuleDiffSummaryProps {
  diff: RuleDiff;
}

export default function RuleDiffSummary({ diff }: RuleDiffSummaryProps) {
  const hasAny =
    diff.changedKeys.length > 0 ||
    diff.addedKeys.length > 0 ||
    diff.removedKeys.length > 0;

  if (!hasAny) {
    return (
      <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-center">
        <p className="text-sm text-slate-500">No changes detected.</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {diff.changedKeys.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Changed ({diff.changedKeys.length})
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {diff.changedKeys.map((key) => (
              <a
                key={key}
                href={`#diff-key-${key}`}
                className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800 transition-colors hover:bg-yellow-200"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      )}

      {diff.addedKeys.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Added ({diff.addedKeys.length})
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {diff.addedKeys.map((key) => (
              <a
                key={key}
                href={`#diff-key-${key}`}
                className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-800 transition-colors hover:bg-green-200"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      )}

      {diff.removedKeys.length > 0 && (
        <div>
          <h3 className="text-sm font-semibold text-slate-900">
            Removed ({diff.removedKeys.length})
          </h3>
          <div className="mt-2 flex flex-wrap gap-2">
            {diff.removedKeys.map((key) => (
              <a
                key={key}
                href={`#diff-key-${key}`}
                className="rounded-full bg-red-100 px-3 py-1 text-xs font-medium text-red-800 transition-colors hover:bg-red-200"
              >
                {key}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
