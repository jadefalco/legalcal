"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import type { LegalRuleBlock } from "@/data/authority/schema";
import type { RuleDiff } from "@/lib/authority/history";

interface RuleDiffViewerProps {
  before: LegalRuleBlock | null;
  after: LegalRuleBlock;
  diff: RuleDiff;
  topic?: string;
  jurisdiction?: string;
  versionLabel?: string;
}

function highlightDiff(before: string, after: string): JSX.Element {
  if (before === after) return <span>{after}</span>;

  let i = 0;
  while (i < before.length && i < after.length && before[i] === after[i]) i++;

  let j = 0;
  while (
    j < before.length - i &&
    j < after.length - i &&
    before[before.length - 1 - j] === after[after.length - 1 - j]
  )
    j++;

  const prefix = after.slice(0, i);
  const removed = before.slice(i, before.length - j);
  const added = after.slice(i, after.length - j);
  const suffix = after.slice(after.length - j);

  return (
    <span className="whitespace-pre-wrap break-words">
      {prefix}
      {removed && (
        <span className="bg-red-200 text-red-900 line-through">
          {removed}
        </span>
      )}
      {added && (
        <span className="bg-green-200 text-green-900 font-semibold">
          {added}
        </span>
      )}
      {suffix}
    </span>
  );
}

function renderValue(value: unknown): string {
  if (value === undefined) return "undefined";
  if (value === null) return "null";
  if (typeof value === "string") return value;
  return JSON.stringify(value);
}

function ValueDiff({
  before,
  after,
}: {
  before: unknown;
  after: unknown;
}) {
  const beforeStr = renderValue(before);
  const afterStr = renderValue(after);

  if (typeof before === "string" && typeof after === "string") {
    return <div className="text-sm">{highlightDiff(before, after)}</div>;
  }

  return (
    <div className="text-sm space-y-1">
      <div className="text-red-700 line-through">{beforeStr}</div>
      <div className="text-green-700 font-semibold">{afterStr}</div>
    </div>
  );
}

function PrettyJSON({ data }: { data: unknown }) {
  const json = JSON.stringify(data, null, 2);
  return (
    <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs leading-relaxed text-slate-700">
      {json.split("\n").map((line, i) => {
        const trimmed = line.trimStart();
        const indent = line.length - trimmed.length;
        const keyMatch = trimmed.match(/^"([^"]+)":/);
        const key = keyMatch ? keyMatch[1] : null;
        const matchLength = keyMatch ? keyMatch[0].length : 0;
        const rest = key ? trimmed.slice(matchLength) : trimmed;

        return (
          <div key={i} style={{ paddingLeft: `${indent * 0.5}rem` }}>
            {key && (
              <>
                <span className="text-slate-500">&quot;</span>
                <span className="font-semibold text-blue-700">{key}</span>
                <span className="text-slate-500">&quot;</span>
                <span className="text-slate-500">:</span>
              </>
            )}
            <span
              className={
                rest.startsWith('"')
                  ? "text-green-700"
                  : rest === "true" || rest === "false"
                  ? "text-purple-700"
                  : rest === "null"
                  ? "text-slate-400"
                  : /^-?\d/.test(rest)
                  ? "text-amber-700"
                  : ""
              }
            >
              {rest}
            </span>
          </div>
        );
      })}
    </pre>
  );
}

function DiffBlock({
  id,
  title,
  type,
  children,
  blockRef,
}: {
  id: string;
  title: string;
  type: "added" | "removed" | "changed";
  children: React.ReactNode;
  blockRef: (el: HTMLDivElement | null) => void;
}) {
  const colors = {
    added: "border-green-300 bg-green-50",
    removed: "border-red-300 bg-red-50",
    changed: "border-yellow-300 bg-yellow-50",
  };

  const badgeColors = {
    added: "bg-green-100 text-green-800",
    removed: "bg-red-100 text-red-800",
    changed: "bg-yellow-100 text-yellow-800",
  };

  const labels = { added: "Added", removed: "Removed", changed: "Changed" };

  return (
    <div
      id={id}
      ref={blockRef}
      className={`rounded-lg border p-4 ${colors[type]}`}
    >
      <div className="mb-3 flex items-center gap-2">
        <span
          className={`rounded-full px-2 py-0.5 text-xs font-semibold ${badgeColors[type]}`}
        >
          {labels[type]}
        </span>
        <h3 className="font-semibold text-slate-900">{title}</h3>
      </div>
      {children}
    </div>
  );
}

export default function RuleDiffViewer({
  before,
  after,
  diff,
  topic,
  jurisdiction,
  versionLabel,
}: RuleDiffViewerProps) {
  const [viewMode, setViewMode] = useState<"side-by-side" | "unified">(
    "side-by-side"
  );
  const [activeBlock, setActiveBlock] = useState(0);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  const allDiffKeys = [
    ...diff.changedKeys.map((k) => ({ key: k, type: "changed" as const })),
    ...diff.addedKeys.map((k) => ({ key: k, type: "added" as const })),
    ...diff.removedKeys.map((k) => ({ key: k, type: "removed" as const })),
  ];

  const scrollToBlock = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, allDiffKeys.length - 1));
    setActiveBlock(clamped);
    const el = blockRefs.current[clamped];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }, [allDiffKeys.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === "j" || e.key === "J") {
        e.preventDefault();
        scrollToBlock(activeBlock + 1);
      }
      if (e.key === "k" || e.key === "K") {
        e.preventDefault();
        scrollToBlock(activeBlock - 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeBlock, scrollToBlock]);

  const generateMarkdown = (): string => {
    const header =
      topic && jurisdiction
        ? `### ${topic} / ${jurisdiction.toUpperCase()}${
            versionLabel ? ` — ${versionLabel}` : ""
          }`
        : "### Rule Diff";

    const lines: string[] = [header, ""];

    if (diff.changedKeys.length > 0) {
      for (const key of diff.changedKeys) {
        const d = diff.dataDiff[key];
        lines.push(`- **Changed:** ${key}`);
        lines.push(`  - Before: ${JSON.stringify(d.before)}`);
        lines.push(`  - After: ${JSON.stringify(d.after)}`);
      }
    }
    if (diff.addedKeys.length > 0) {
      for (const key of diff.addedKeys) {
        const d = diff.dataDiff[key];
        lines.push(`- **Added:** ${key}`);
        lines.push(`  - ${JSON.stringify(d.after)}`);
      }
    }
    if (diff.removedKeys.length > 0) {
      for (const key of diff.removedKeys) {
        const d = diff.dataDiff[key];
        lines.push(`- **Removed:** ${key}`);
        lines.push(`  - ${JSON.stringify(d.before)}`);
      }
    }

    return lines.join("\n");
  };

  const copyMarkdown = () => {
    navigator.clipboard.writeText(generateMarkdown());
  };

  const beforeData = before?.data ?? {};
  const afterData = after.data;

  const renderUnified = () => (
    <div className="space-y-4">
      {diff.changedKeys.map((key, idx) => (
        <DiffBlock
          key={key}
          id={`diff-key-${key}`}
          title={key}
          type="changed"
          blockRef={(el) => { blockRefs.current[idx] = el; }}
        >
          <ValueDiff
            before={diff.dataDiff[key].before}
            after={diff.dataDiff[key].after}
          />
        </DiffBlock>
      ))}
      {diff.addedKeys.map((key, idx) => (
        <DiffBlock
          key={key}
          id={`diff-key-${key}`}
          title={key}
          type="added"
          blockRef={(el) => {
            blockRefs.current[diff.changedKeys.length + idx] = el;
          }}
        >
          <div className="text-sm text-green-800">
            {JSON.stringify(diff.dataDiff[key].after)}
          </div>
        </DiffBlock>
      ))}
      {diff.removedKeys.map((key, idx) => (
        <DiffBlock
          key={key}
          id={`diff-key-${key}`}
          title={key}
          type="removed"
          blockRef={(el) => {
            blockRefs.current[
              diff.changedKeys.length + diff.addedKeys.length + idx
            ] = el;
          }}
        >
          <div className="text-sm text-red-800 line-through">
            {JSON.stringify(diff.dataDiff[key].before)}
          </div>
        </DiffBlock>
      ))}
    </div>
  );

  const renderSideBySide = () => (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Before
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <PrettyJSON data={beforeData} />
        </div>
      </div>
      <div className="space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          After
        </p>
        <div className="rounded-lg border border-slate-200 bg-white p-4">
          <PrettyJSON data={afterData} />
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Controls */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="inline-flex rounded-md border border-slate-200 bg-white shadow-sm">
          <button
            onClick={() => setViewMode("side-by-side")}
            className={`rounded-l-md px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === "side-by-side"
                ? "bg-blue-900 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Side-by-Side
          </button>
          <button
            onClick={() => setViewMode("unified")}
            className={`rounded-r-md px-4 py-2 text-sm font-medium transition-colors ${
              viewMode === "unified"
                ? "bg-blue-900 text-white"
                : "text-slate-700 hover:bg-slate-50"
            }`}
          >
            Unified
          </button>
        </div>
        <button
          onClick={copyMarkdown}
          className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
        >
          Copy Diff as Markdown
        </button>
        <span className="text-xs text-slate-500">
          Press <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono">j</kbd>{" "}
          /{" "}
          <kbd className="rounded bg-slate-100 px-1 py-0.5 font-mono">k</kbd> to
          navigate
        </span>
      </div>

      {/* Sections */}
      <details className="rounded-lg border border-slate-200 bg-white" open>
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Data ({Object.keys(afterData).length} keys)
        </summary>
        <div className="border-t border-slate-200 p-4">
          {viewMode === "unified" ? renderUnified() : renderSideBySide()}
        </div>
      </details>

      <details className="rounded-lg border border-slate-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Citations ({after.citations.length})
        </summary>
        <div className="border-t border-slate-200 p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Before
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                {JSON.stringify(before?.citations ?? [], null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                After
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                {JSON.stringify(after.citations, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </details>

      <details className="rounded-lg border border-slate-200 bg-white">
        <summary className="cursor-pointer px-4 py-3 text-sm font-semibold text-slate-700 hover:bg-slate-50">
          Version Metadata
        </summary>
        <div className="border-t border-slate-200 p-4">
          <div className="grid gap-4 lg:grid-cols-2">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Before
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                {JSON.stringify(before?.version ?? {}, null, 2)}
              </pre>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                After
              </p>
              <pre className="mt-2 overflow-x-auto rounded-md bg-slate-50 p-3 text-xs text-slate-600">
                {JSON.stringify(after.version, null, 2)}
              </pre>
            </div>
          </div>
        </div>
      </details>
    </div>
  );
}
