"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { AdminCodeBlock } from "../../components/AdminCodeBlock";
import { AdminTable } from "../../components/AdminTable";

interface ExtractedCitation {
  statute: string;
  url: string | null;
  excerpt: string;
  sourceType: string;
  confidence: number;
}

export function ResearchAssistantClient() {
  const searchParams = useSearchParams();
  const prefillSource = searchParams.get("sourceText") ?? "";
  const prefillRule = searchParams.get("existingRule") ?? "";

  const [sourceText, setSourceText] = useState(prefillSource);
  const [existingRuleJson, setExistingRuleJson] = useState(prefillRule);
  const [loadingExtract, setLoadingExtract] = useState(false);
  const [loadingCompare, setLoadingCompare] = useState(false);
  const [loadingApply, setLoadingApply] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [extractedData, setExtractedData] = useState<Record<string, unknown> | null>(null);
  const [extractedCitations, setExtractedCitations] = useState<ExtractedCitation[]>([]);
  const [extractedNotes, setExtractedNotes] = useState<string[]>([]);

  const [compareResult, setCompareResult] = useState<{
    missingFields: string[];
    outdatedFields: string[];
    inconsistentFields: string[];
    suggestedUpdates: Record<string, unknown>;
    notes: string[];
  } | null>(null);

  const [applyJurisdiction, setApplyJurisdiction] = useState("");
  const [applyTopic, setApplyTopic] = useState("");
  const [showApplyModal, setShowApplyModal] = useState(false);

  useEffect(() => {
    if (prefillSource) setSourceText(prefillSource);
    if (prefillRule) setExistingRuleJson(prefillRule);
  }, [prefillSource, prefillRule]);

  async function handleExtract() {
    setLoadingExtract(true);
    setMessage(null);
    try {
      const res = await fetch("/api/admin/authority/research/extract", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sourceText }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Extraction failed" });
        return;
      }
      setExtractedData(json.data);
      setExtractedCitations(json.citations);
      setExtractedNotes(json.notes);
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoadingExtract(false);
    }
  }

  async function handleCompare() {
    if (!existingRuleJson.trim()) {
      setMessage({ type: "error", text: "Paste existing rule JSON to compare" });
      return;
    }
    setLoadingCompare(true);
    setMessage(null);
    try {
      let existingRuleData;
      try {
        existingRuleData = JSON.parse(existingRuleJson);
      } catch {
        setMessage({ type: "error", text: "Invalid JSON in existing rule" });
        return;
      }
      const res = await fetch("/api/admin/authority/research/compare", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ existingRuleData, sourceText }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Comparison failed" });
        return;
      }
      setCompareResult(json);
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoadingCompare(false);
    }
  }

  async function handleApply() {
    if (!applyJurisdiction || !applyTopic) {
      setMessage({ type: "error", text: "Select jurisdiction and topic" });
      return;
    }
    setLoadingApply(true);
    setMessage(null);
    try {
      const lookupRes = await fetch(`/api/authority/us/${applyJurisdiction}/${applyTopic}`);
      if (!lookupRes.ok) {
        setMessage({ type: "error", text: "Rule not found for selected jurisdiction/topic" });
        return;
      }
      const ruleJson = await lookupRes.json();
      const ruleId = ruleJson?.rule?.id;
      if (typeof ruleId !== "number") {
        setMessage({ type: "error", text: "Could not resolve rule ID" });
        return;
      }

      const data = extractedData ?? {};
      const res = await fetch("/api/admin/authority/research/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ruleId,
          data,
          citations: extractedCitations,
          notes: extractedNotes,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Apply failed" });
        return;
      }
      setMessage({ type: "success", text: "Applied successfully. Rule updated to draft." });
      setShowApplyModal(false);
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    } finally {
      setLoadingApply(false);
    }
  }

  return (
    <div className="space-y-6">
      {message && (
        <div
          className={`rounded-md p-4 text-sm border ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border-emerald-200"
              : "bg-red-50 text-red-800 border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Inputs */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Source Text
            </h2>
            <textarea
              value={sourceText}
              onChange={(e) => setSourceText(e.target.value)}
              rows={12}
              placeholder="Paste statute or legal text here..."
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
            <div className="flex gap-2">
              <button
                onClick={handleExtract}
                disabled={loadingExtract || !sourceText.trim()}
                className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors disabled:opacity-50"
              >
                {loadingExtract ? "Extracting..." : "Extract Rule"}
              </button>
              <button
                onClick={handleCompare}
                disabled={loadingCompare || !sourceText.trim()}
                className="inline-flex items-center rounded-md bg-slate-800 px-4 py-2 text-sm font-semibold text-white hover:bg-slate-700 transition-colors disabled:opacity-50"
              >
                {loadingCompare ? "Comparing..." : "Compare to Existing Rule"}
              </button>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Existing Rule (Optional)
            </h2>
            <textarea
              value={existingRuleJson}
              onChange={(e) => setExistingRuleJson(e.target.value)}
              rows={8}
              placeholder='Paste existing rule JSON here, e.g. { "maxMonthsRent": 1, ... }'
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Right: AI Output */}
        <div className="space-y-6">
          {extractedData && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Suggested Rule Data
              </h2>
              <AdminCodeBlock code={JSON.stringify(extractedData)} language="json" />
            </div>
          )}

          {extractedCitations.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Suggested Citations
              </h2>
              <AdminTable
                columns={[
                  { label: "Statute", key: "statute" },
                  { label: "Type", key: "sourceType" },
                  { label: "Confidence", key: "confidence" },
                ]}
                rows={extractedCitations}
                getRowKey={(row) => `${row.statute}-${row.confidence}`}
              />
            </div>
          )}

          {extractedNotes.length > 0 && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-2">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Research Notes
              </h2>
              <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                {extractedNotes.map((note, i) => (
                  <li key={i}>{note}</li>
                ))}
              </ul>
            </div>
          )}

          {compareResult && (
            <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
              <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                Comparison Results
              </h2>

              {compareResult.missingFields.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Missing Fields</p>
                  <div className="flex flex-wrap gap-2">
                    {compareResult.missingFields.map((f) => (
                      <span key={f} className="px-2 py-1 rounded bg-red-50 text-red-700 text-xs">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {compareResult.outdatedFields.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Outdated Fields</p>
                  <div className="flex flex-wrap gap-2">
                    {compareResult.outdatedFields.map((f) => (
                      <span key={f} className="px-2 py-1 rounded bg-amber-50 text-amber-700 text-xs">
                        {f}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {Object.keys(compareResult.suggestedUpdates).length > 0 && (
                <div>
                  <p className="text-xs font-medium text-slate-500 mb-1">Suggested Updates</p>
                  <AdminCodeBlock code={JSON.stringify(compareResult.suggestedUpdates)} language="json" />
                </div>
              )}

              {compareResult.notes.length > 0 && (
                <ul className="list-disc list-inside text-sm text-slate-700 space-y-1">
                  {compareResult.notes.map((note, i) => (
                    <li key={i}>{note}</li>
                  ))}
                </ul>
              )}
            </div>
          )}

          {extractedData && (
            <div>
              <button
                onClick={() => setShowApplyModal(true)}
                className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors"
              >
                Apply Suggested Rule to Jurisdiction
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Apply Modal */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-lg w-full max-w-md space-y-4">
            <h3 className="text-lg font-semibold text-slate-900">Apply to Jurisdiction</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">State Code</label>
                <input
                  type="text"
                  value={applyJurisdiction}
                  onChange={(e) => setApplyJurisdiction(e.target.value.toLowerCase())}
                  placeholder="e.g. ca, ny, tx"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Topic</label>
                <input
                  type="text"
                  value={applyTopic}
                  onChange={(e) => setApplyTopic(e.target.value.toLowerCase())}
                  placeholder="e.g. security-deposit, lease-termination"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2 justify-end">
              <button
                onClick={() => setShowApplyModal(false)}
                className="inline-flex items-center rounded-md bg-slate-100 px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleApply}
                disabled={loadingApply}
                className="inline-flex items-center rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-500 transition-colors disabled:opacity-50"
              >
                {loadingApply ? "Applying..." : "Confirm Apply"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
