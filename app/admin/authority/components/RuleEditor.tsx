"use client";

import { useState } from "react";
import { AdminCodeBlock } from "../../components/AdminCodeBlock";
import { AdminBadge } from "../../components/AdminBadge";

interface Citation {
  id: number;
  statute: string;
  url: string;
  excerpt: string;
  sourceType: string;
  lastUpdated: string;
  confidence: number;
}

interface Review {
  id?: number;
  status: string;
  reviewer: string | null;
  reviewedAt: string | null;
  notes: string;
}

interface RuleEditorProps {
  ruleId: number;
  initialDataJson: string;
  initialVersion: string;
  initialEffectiveDate: string;
  citations: Citation[];
  initialReview?: Review;
}

export function RuleEditor({
  ruleId,
  initialDataJson,
  initialVersion,
  initialEffectiveDate,
  citations: initialCitations,
  initialReview,
}: RuleEditorProps) {
  const [dataJson, setDataJson] = useState(initialDataJson);
  const [version, setVersion] = useState(initialVersion);
  const [effectiveDate, setEffectiveDate] = useState(initialEffectiveDate);
  const [citations, setCitations] = useState<Citation[]>(initialCitations);
  const [review, setReview] = useState<Review>(
    initialReview ?? {
      status: "placeholder",
      reviewer: null,
      reviewedAt: null,
      notes: "",
    }
  );
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleSaveRule() {
    setMessage(null);
    try {
      JSON.parse(dataJson);
    } catch {
      setMessage({ type: "error", text: "Invalid JSON in rule data" });
      return;
    }

    try {
      const res = await fetch("/api/admin/authority/rule/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ruleId, dataJson, version, effectiveDate }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to save" });
      } else {
        setMessage({ type: "success", text: "Rule saved successfully." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  async function handleSaveReview() {
    setMessage(null);
    try {
      const res = await fetch("/api/admin/authority/review/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ruleId,
          status: review.status,
          reviewer: review.reviewer,
          reviewedAt: review.reviewedAt,
          notes: review.notes,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to save review" });
      } else {
        setMessage({ type: "success", text: "Review saved successfully." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  async function handleSaveCitation(citation: Citation, index: number) {
    setMessage(null);
    try {
      const res = await fetch("/api/admin/authority/citation/upsert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ruleId,
          citation: {
            id: citation.id || undefined,
            statute: citation.statute,
            url: citation.url,
            excerpt: citation.excerpt,
            sourceType: citation.sourceType,
            lastUpdated: citation.lastUpdated,
            confidence: citation.confidence,
          },
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to save citation" });
      } else {
        setMessage({ type: "success", text: "Citation saved successfully. Reload to see updates." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  async function handleDeleteCitation(citationId: number, index: number) {
    if (!confirm("Delete this citation?")) return;
    setMessage(null);
    try {
      const res = await fetch("/api/admin/authority/citation/delete", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ citationId }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to delete" });
      } else {
        setCitations((prev) => prev.filter((_, i) => i !== index));
        setMessage({ type: "success", text: "Citation deleted." });
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  function addCitation() {
    setCitations((prev) => [
      ...prev,
      {
        id: 0,
        statute: "",
        url: "",
        excerpt: "",
        sourceType: "statute",
        lastUpdated: new Date().toISOString().split("T")[0],
        confidence: 1,
      },
    ]);
  }

  function updateCitation(index: number, patch: Partial<Citation>) {
    setCitations((prev) =>
      prev.map((c, i) => (i === index ? { ...c, ...patch } : c))
    );
  }

  const statusBanner =
    review.status === "placeholder"
      ? { color: "bg-red-50 text-red-800 border-red-200", text: "Status: Placeholder — this rule is not yet reviewed." }
      : review.status === "draft"
      ? { color: "bg-amber-50 text-amber-800 border-amber-200", text: "Status: Draft — under active research." }
      : review.status === "reviewed"
      ? { color: "bg-emerald-50 text-emerald-800 border-emerald-200", text: "Status: Reviewed — awaiting publication." }
      : { color: "bg-blue-50 text-blue-800 border-blue-200", text: "Status: Published — live and authoritative." };

  return (
    <div className="space-y-6">
      {/* Feedback */}
      {message && (
        <div
          className={`rounded-md p-4 text-sm ${
            message.type === "success"
              ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
              : "bg-red-50 text-red-800 border border-red-200"
          }`}
        >
          {message.text}
        </div>
      )}

      {/* Review status banner */}
      <div className={`rounded-md p-4 text-sm border ${statusBanner.color}`}>
        {statusBanner.text}
      </div>

      {/* Review editor */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Review Status
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Status
            </label>
            <select
              value={review.status}
              onChange={(e) => setReview((r) => ({ ...r, status: e.target.value }))}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="placeholder">Placeholder</option>
              <option value="draft">Draft</option>
              <option value="reviewed">Reviewed</option>
              <option value="published">Published</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Reviewer
            </label>
            <input
              type="text"
              value={review.reviewer ?? ""}
              onChange={(e) =>
                setReview((r) => ({
                  ...r,
                  reviewer: e.target.value || null,
                }))
              }
              placeholder="Name or email"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Reviewed At
            </label>
            <input
              type="date"
              value={review.reviewedAt ?? ""}
              onChange={(e) =>
                setReview((r) => ({
                  ...r,
                  reviewedAt: e.target.value || null,
                }))
              }
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-500 mb-1">
            Research Notes
          </label>
          <textarea
            value={review.notes}
            onChange={(e) =>
              setReview((r) => ({ ...r, notes: e.target.value }))
            }
            rows={4}
            placeholder="Freeform research notes, sources checked, open questions..."
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={handleSaveReview}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Save Review
        </button>
      </div>

      {/* Rule data */}
      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Rule Data
          </h2>
          <a
            href={`/admin/authority/research?existingRule=${encodeURIComponent(dataJson)}`}
            className="inline-flex items-center rounded-md bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700 hover:bg-slate-200 transition-colors"
          >
            Open in Research Assistant
          </a>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            JSON
          </label>
          <textarea
            value={dataJson}
            onChange={(e) => setDataJson(e.target.value)}
            rows={12}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Version
            </label>
            <input
              type="text"
              value={version}
              onChange={(e) => setVersion(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Effective Date
            </label>
            <input
              type="date"
              value={effectiveDate}
              onChange={(e) => setEffectiveDate(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>
        <button
          onClick={handleSaveRule}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Save Rule
        </button>
      </div>

      {/* Preview */}
      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
          Preview
        </h2>
        <AdminCodeBlock code={dataJson} />
      </div>

      {/* Citations */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Citations
          </h2>
          <button
            onClick={addCitation}
            className="inline-flex items-center rounded-md bg-slate-800 px-3 py-1.5 text-sm font-medium text-white hover:bg-slate-700 transition-colors"
          >
            Add Citation
          </button>
        </div>

        {citations.length === 0 && (
          <p className="text-sm text-slate-500">No citations.</p>
        )}

        {citations.map((citation, index) => (
          <div
            key={index}
            className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Statute
                </label>
                <input
                  type="text"
                  value={citation.statute}
                  onChange={(e) =>
                    updateCitation(index, { statute: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  URL
                </label>
                <input
                  type="url"
                  value={citation.url}
                  onChange={(e) =>
                    updateCitation(index, { url: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Source Type
                </label>
                <select
                  value={citation.sourceType}
                  onChange={(e) =>
                    updateCitation(index, { sourceType: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="statute">Statute</option>
                  <option value="regulation">Regulation</option>
                  <option value="case">Case</option>
                  <option value="ag-guidance">AG Guidance</option>
                  <option value="municipal-code">Municipal Code</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Confidence (0–1)
                </label>
                <input
                  type="number"
                  min={0}
                  max={1}
                  step={0.01}
                  value={citation.confidence}
                  onChange={(e) =>
                    updateCitation(index, {
                      confidence: parseFloat(e.target.value),
                    })
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Last Updated
                </label>
                <input
                  type="date"
                  value={citation.lastUpdated}
                  onChange={(e) =>
                    updateCitation(index, { lastUpdated: e.target.value })
                  }
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-slate-500 mb-1">
                  Excerpt
                </label>
                <textarea
                  value={citation.excerpt}
                  onChange={(e) =>
                    updateCitation(index, { excerpt: e.target.value })
                  }
                  rows={3}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleSaveCitation(citation, index)}
                className="inline-flex items-center rounded-md bg-blue-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-blue-500 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() =>
                  citation.id
                    ? handleDeleteCitation(citation.id, index)
                    : setCitations((prev) => prev.filter((_, i) => i !== index))
                }
                className="inline-flex items-center rounded-md bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700 hover:bg-red-100 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
