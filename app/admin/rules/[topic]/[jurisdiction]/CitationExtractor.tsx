"use client";

import { useState, useTransition } from "react";
import { extractCitationsForRule } from "./actions";
import type { CitationExtractionResult } from "./actions";

interface CitationExtractorProps {
  topic: string;
  jurisdiction: string;
  hasSourceUrl: boolean;
}

function confidenceBadge(confidence: number): { label: string; className: string } {
  if (confidence >= 0.7) {
    return {
      label: "High",
      className: "bg-green-100 text-green-800 border-green-200",
    };
  }
  if (confidence >= 0.4) {
    return {
      label: "Medium",
      className: "bg-amber-100 text-amber-800 border-amber-200",
    };
  }
  return {
    label: "Low",
    className: "bg-red-100 text-red-800 border-red-200",
  };
}

export default function CitationExtractor({
  topic,
  jurisdiction,
  hasSourceUrl,
}: CitationExtractorProps) {
  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<CitationExtractionResult | null>(null);

  function handleExtract() {
    startTransition(async () => {
      const res = await extractCitationsForRule(topic, jurisdiction);
      setResult(res);
    });
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <button
          onClick={handleExtract}
          disabled={isPending || !hasSourceUrl}
          className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${
            !hasSourceUrl
              ? "cursor-not-allowed bg-slate-100 text-slate-400"
              : isPending
              ? "bg-blue-300 text-white cursor-wait"
              : "bg-blue-900 text-white hover:bg-blue-800"
          }`}
        >
          {isPending ? "Extracting…" : "Auto-Extract Citations"}
        </button>
        {!hasSourceUrl && (
          <span className="text-xs text-slate-500">
            No source URL available for this rule.
          </span>
        )}
      </div>

      {result && (
        <div className="rounded-lg border border-slate-200 bg-white p-4 space-y-3">
          {result.error && !result.success && (
            <p className="text-sm text-red-700 font-medium">
              Extraction failed: {result.error}
            </p>
          )}

          {result.success && result.added === 0 && (
            <p className="text-sm text-slate-600">
              No new citations found. {result.error ?? ""}
            </p>
          )}

          {result.success && result.added > 0 && (
            <p className="text-sm font-medium text-green-700">
              {result.added} new citation{result.added !== 1 ? "s" : ""} added.
            </p>
          )}

          {result.citations.length > 0 && (
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Extracted Citations
              </p>
              {result.citations.map((c, i) => {
                const badge = confidenceBadge(c.confidence);
                return (
                  <div
                    key={i}
                    className="rounded-md border border-slate-200 p-3 space-y-1"
                  >
                    <div className="flex items-center gap-2 flex-wrap">
                      <h4 className="font-semibold text-slate-900 text-sm">
                        {c.statute}
                      </h4>
                      {c.isNew && (
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-800">
                          New (auto-extracted)
                        </span>
                      )}
                    </div>
                    {c.section && (
                      <p className="text-xs text-slate-600">
                        Section: {c.section}
                      </p>
                    )}
                    {c.excerpt && (
                      <p className="text-xs italic text-slate-600">
                        “{c.excerpt}”
                      </p>
                    )}
                    <div className="flex items-center gap-3 pt-1">
                      {c.url && (
                        <a
                          href={c.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs font-medium text-blue-700 hover:underline"
                        >
                          View Source
                        </a>
                      )}
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${badge.className}`}
                        title="Confidence is based on pattern matching and excerpt quality."
                      >
                        {badge.label} ({Math.round(c.confidence * 100)}%)
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
