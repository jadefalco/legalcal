"use client";

import { useState } from "react";
import type { DocumentTemplate } from "@/lib/authority/db";

interface DocumentGeneratorProps {
  template: DocumentTemplate;
}

export function DocumentGenerator({ template }: DocumentGeneratorProps) {
  const [jurisdiction, setJurisdiction] = useState("us-ca");
  const [topic, setTopic] = useState("entry-notice");
  const [userInput, setUserInput] = useState<Record<string, string>>({});
  const [result, setResult] = useState<{ html: string; variablesUsed: string[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function updateField(key: string, value: string) {
    setUserInput((prev) => ({ ...prev, [key]: value }));
  }

  async function handleGenerate(format: "html" | "pdf") {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch("/api/documents/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          template: template.slug,
          jurisdiction,
          topic,
          userInput,
          format,
        }),
      });

      if (format === "pdf") {
        if (!res.ok) {
          const json = await res.json();
          setError(json.error || "Failed to generate PDF");
          return;
        }
        const blob = await res.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${template.slug}.pdf`;
        a.click();
        window.URL.revokeObjectURL(url);
        return;
      }

      const json = await res.json();
      if (!json.success) {
        setError(json.error || "Failed to generate document");
        return;
      }
      setResult({ html: json.html, variablesUsed: json.variablesUsed });
    } catch (err) {
      setError("Network error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Jurisdiction
            </label>
            <input
              type="text"
              value={jurisdiction}
              onChange={(e) => setJurisdiction(e.target.value)}
              placeholder="us-ca"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">
              Topic
            </label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="entry-notice"
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        {template.requiredFields.length > 0 && (
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-slate-900">Required Information</h3>
            {template.requiredFields.map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-500 mb-1 capitalize">
                  {field.replace(/_/g, " ")}
                </label>
                <input
                  type="text"
                  value={userInput[field] ?? ""}
                  onChange={(e) => updateField(field, e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
            {error}
          </div>
        )}

        <div className="flex gap-3">
          <button
            onClick={() => handleGenerate("html")}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-slate-800 px-4 py-2 text-sm font-medium text-white hover:bg-slate-700 disabled:opacity-50 transition-colors"
          >
            {loading ? "Generating..." : "Preview HTML"}
          </button>
          <button
            onClick={() => handleGenerate("pdf")}
            disabled={loading}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? "Generating..." : "Download PDF"}
          </button>
        </div>
      </div>

      {result && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
          <div className="bg-slate-100 px-4 py-2 border-b border-slate-200 flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 uppercase">Preview</span>
            <span className="text-xs text-slate-500">
              {result.variablesUsed.length} variables resolved
            </span>
          </div>
          <div
            className="p-6 prose prose-slate max-w-none"
            dangerouslySetInnerHTML={{ __html: result.html }}
          />
        </div>
      )}
    </div>
  );
}
