"use client";

import { useState } from "react";

export function AdminCodeBlock({
  code,
  language = "json",
}: {
  code: string;
  language?: string;
}) {
  const [collapsed, setCollapsed] = useState(false);

  let formatted = code;
  if (language === "json") {
    try {
      formatted = JSON.stringify(JSON.parse(code), null, 2);
    } catch {
      // leave as-is if invalid JSON
    }
  }

  return (
    <div className="rounded-lg border border-slate-200 bg-slate-900 text-slate-100 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 border-b border-slate-700">
        <span className="text-xs font-mono text-slate-400 uppercase">
          {language}
        </span>
        <button
          onClick={() => setCollapsed((v) => !v)}
          className="text-xs text-slate-400 hover:text-white"
        >
          {collapsed ? "Expand" : "Collapse"}
        </button>
      </div>
      {!collapsed && (
        <pre className="px-4 py-3 text-xs font-mono overflow-auto max-h-96">
          <code>{formatted}</code>
        </pre>
      )}
    </div>
  );
}
