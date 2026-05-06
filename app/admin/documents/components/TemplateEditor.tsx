"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminCodeBlock } from "../../components/AdminCodeBlock";
import type { DocumentTemplate } from "@/lib/authority/db";

interface TemplateEditorProps {
  template: DocumentTemplate;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const router = useRouter();
  const [name, setName] = useState(template.name);
  const [description, setDescription] = useState(template.description ?? "");
  const [category, setCategory] = useState(template.category ?? "");
  const [templateHtml, setTemplateHtml] = useState(template.templateHtml);
  const [requiredFields, setRequiredFields] = useState(
    template.requiredFields.join(", ")
  );
  const [autoFields, setAutoFields] = useState(
    template.autoFields.join(", ")
  );
  const [jurisdictionScopes, setJurisdictionScopes] = useState(
    template.jurisdictionScopes.join(", ")
  );
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function handleSave() {
    setMessage(null);
    try {
      const res = await fetch(`/api/admin/documents/template/update`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: template.id,
          name,
          description: description || undefined,
          category: category || undefined,
          templateHtml,
          requiredFields: requiredFields.split(",").map((s) => s.trim()).filter(Boolean),
          autoFields: autoFields.split(",").map((s) => s.trim()).filter(Boolean),
          jurisdictionScopes: jurisdictionScopes.split(",").map((s) => s.trim()).filter(Boolean),
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to save" });
      } else {
        setMessage({ type: "success", text: "Template saved successfully." });
        router.refresh();
      }
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">{template.name}</h1>
        <p className="text-slate-600 mt-1">{template.slug}</p>
      </div>

      {message && (
        <div className={`rounded-md p-4 text-sm border ${
          message.type === "success"
            ? "bg-emerald-50 text-emerald-800 border-emerald-200"
            : "bg-red-50 text-red-800 border-red-200"
        }`}>
          {message.text}
        </div>
      )}

      <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Description</label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Template HTML
          </label>
          <textarea
            value={templateHtml}
            onChange={(e) => setTemplateHtml(e.target.value)}
            rows={12}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm font-mono focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Required Fields (comma-separated)
            </label>
            <input
              type="text"
              value={requiredFields}
              onChange={(e) => setRequiredFields(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Auto Fields (comma-separated)
            </label>
            <input
              type="text"
              value={autoFields}
              onChange={(e) => setAutoFields(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-500 mb-1">
              Jurisdiction Scopes (comma-separated)
            </label>
            <input
              type="text"
              value={jurisdictionScopes}
              onChange={(e) => setJurisdictionScopes(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSave}
          className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
        >
          Save Template
        </button>
      </div>

      <div className="space-y-2">
        <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Preview</h2>
        <AdminCodeBlock code={templateHtml} language="html" />
      </div>
    </div>
  );
}
