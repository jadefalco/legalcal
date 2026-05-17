"use client";

import { useState, useTransition } from "react";

const JURISDICTIONS = [
  { code: "ab", name: "Alberta", country: "CA" },
  { code: "bc", name: "British Columbia", country: "CA" },
  { code: "mb", name: "Manitoba", country: "CA" },
  { code: "nb", name: "New Brunswick", country: "CA" },
  { code: "nl", name: "Newfoundland and Labrador", country: "CA" },
  { code: "ns", name: "Nova Scotia", country: "CA" },
  { code: "nt", name: "Northwest Territories", country: "CA" },
  { code: "nu", name: "Nunavut", country: "CA" },
  { code: "on", name: "Ontario", country: "CA" },
  { code: "pe", name: "Prince Edward Island", country: "CA" },
  { code: "qc", name: "Quebec", country: "CA" },
  { code: "sk", name: "Saskatchewan", country: "CA" },
  { code: "yt", name: "Yukon", country: "CA" },
  { code: "ak", name: "Alaska", country: "US" },
  { code: "al", name: "Alabama", country: "US" },
  { code: "ar", name: "Arkansas", country: "US" },
  { code: "az", name: "Arizona", country: "US" },
  { code: "ca", name: "California", country: "US" },
  { code: "co", name: "Colorado", country: "US" },
  { code: "ct", name: "Connecticut", country: "US" },
  { code: "dc", name: "District of Columbia", country: "US" },
  { code: "de", name: "Delaware", country: "US" },
  { code: "fl", name: "Florida", country: "US" },
  { code: "ga", name: "Georgia", country: "US" },
  { code: "hi", name: "Hawaii", country: "US" },
  { code: "ia", name: "Iowa", country: "US" },
  { code: "id", name: "Idaho", country: "US" },
  { code: "il", name: "Illinois", country: "US" },
  { code: "in", name: "Indiana", country: "US" },
  { code: "ks", name: "Kansas", country: "US" },
  { code: "ky", name: "Kentucky", country: "US" },
  { code: "la", name: "Louisiana", country: "US" },
  { code: "ma", name: "Massachusetts", country: "US" },
  { code: "md", name: "Maryland", country: "US" },
  { code: "me", name: "Maine", country: "US" },
  { code: "mi", name: "Michigan", country: "US" },
  { code: "mn", name: "Minnesota", country: "US" },
  { code: "mo", name: "Missouri", country: "US" },
  { code: "ms", name: "Mississippi", country: "US" },
  { code: "mt", name: "Montana", country: "US" },
  { code: "nc", name: "North Carolina", country: "US" },
  { code: "nd", name: "North Dakota", country: "US" },
  { code: "ne", name: "Nebraska", country: "US" },
  { code: "nh", name: "New Hampshire", country: "US" },
  { code: "nj", name: "New Jersey", country: "US" },
  { code: "nm", name: "New Mexico", country: "US" },
  { code: "nv", name: "Nevada", country: "US" },
  { code: "ny", name: "New York", country: "US" },
  { code: "oh", name: "Ohio", country: "US" },
  { code: "ok", name: "Oklahoma", country: "US" },
  { code: "or", name: "Oregon", country: "US" },
  { code: "pa", name: "Pennsylvania", country: "US" },
  { code: "ri", name: "Rhode Island", country: "US" },
  { code: "sc", name: "South Carolina", country: "US" },
  { code: "sd", name: "South Dakota", country: "US" },
  { code: "tn", name: "Tennessee", country: "US" },
  { code: "tx", name: "Texas", country: "US" },
  { code: "ut", name: "Utah", country: "US" },
  { code: "va", name: "Virginia", country: "US" },
  { code: "vt", name: "Vermont", country: "US" },
  { code: "wa", name: "Washington", country: "US" },
  { code: "wi", name: "Wisconsin", country: "US" },
  { code: "wv", name: "West Virginia", country: "US" },
  { code: "wy", name: "Wyoming", country: "US" },
];

interface UnifiedResult {
  engine: string;
  status: "idle" | "loading" | "done" | "error";
  data: any;
  error?: string;
}

export default function UnifiedCalculator({ topic }: { topic: string }) {
  const [jurisdiction, setJurisdiction] = useState("bc");
  const [scenario, setScenario] = useState("");
  const [isPending, startTransition] = useTransition();
  const [results, setResults] = useState<UnifiedResult[]>([]);
  const [error, setError] = useState<string | null>(null);

  const engines = [
    { name: "Intelligence", endpoint: "/api/intelligence/summarize" },
    { name: "Reasoning", endpoint: "/api/reasoning/analyze" },
    { name: "Checklist", endpoint: "/api/checklist" },
    { name: "Risk", endpoint: "/api/risk/score" },
    { name: "Heatmap", endpoint: "/api/heatmap" },
    { name: "Similarity", endpoint: "/api/similarity/matrix" },
    { name: "Trends", endpoint: "/api/trends/jurisdiction" },
    { name: "Forecast", endpoint: "/api/forecast/jurisdiction" },
  ];

  function analyze() {
    setError(null);
    if (!scenario.trim() || scenario.trim().length <= 10) {
      setError("Please describe a scenario longer than 10 characters.");
      return;
    }

    const initialResults: UnifiedResult[] = engines.map((e) => ({
      engine: e.name,
      status: "loading",
      data: null,
    }));
    setResults(initialResults);

    startTransition(async () => {
      await Promise.all(
        engines.map(async (engine, index) => {
          try {
            let body: any = { topic, scenario };
            if (engine.name !== "Heatmap" && engine.name !== "Similarity") {
              body.jurisdiction = jurisdiction;
            }

            const res = await fetch(engine.endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(body),
            });

            const data = await res.json();
            setResults((prev) => {
              const next = [...prev];
              next[index] = {
                engine: engine.name,
                status: res.ok ? "done" : "error",
                data,
                error: res.ok ? undefined : data.error || "Request failed",
              };
              return next;
            });
          } catch (err) {
            setResults((prev) => {
              const next = [...prev];
              next[index] = {
                engine: engine.name,
                status: "error",
                data: null,
                error: (err as Error).message,
              };
              return next;
            });
          }
        })
      );
    });
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">
            Jurisdiction
          </label>
          <select
            value={jurisdiction}
            onChange={(e) => setJurisdiction(e.target.value)}
            className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
          >
            {JURISDICTIONS.map((j) => (
              <option key={j.code} value={j.code}>
                {j.name} ({j.country})
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Scenario
        </label>
        <textarea
          value={scenario}
          onChange={(e) => setScenario(e.target.value)}
          placeholder="Describe a scenario..."
          rows={4}
          className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm"
        />
      </div>

      <button
        onClick={analyze}
        disabled={isPending}
        className={`rounded-md px-6 py-2.5 text-sm font-medium text-white ${
          isPending ? "bg-blue-300" : "bg-blue-900 hover:bg-blue-800"
        }`}
      >
        {isPending ? "Analyzing…" : "Analyze All Engines"}
      </button>

      {error && (
        <div className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2">
          {results.map((r) => (
            <div
              key={r.engine}
              className="rounded-lg border border-slate-200 bg-white p-4"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-slate-800">{r.engine}</span>
                <span
                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    r.status === "done"
                      ? "bg-green-100 text-green-800"
                      : r.status === "error"
                      ? "bg-red-100 text-red-800"
                      : "bg-blue-100 text-blue-800"
                  }`}
                >
                  {r.status === "done"
                    ? "Done"
                    : r.status === "error"
                    ? "Error"
                    : "Loading"}
                </span>
              </div>
              {r.status === "done" && r.data && (
                <pre className="max-h-40 overflow-auto rounded bg-slate-50 p-2 text-xs text-slate-700">
                  {JSON.stringify(r.data, null, 2)}
                </pre>
              )}
              {r.status === "error" && r.error && (
                <p className="text-xs text-red-600">{r.error}</p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
