"use client";

interface ResultProps {
  weeks: number;
  explanation: string;
  citation: string;
}

export function Result({ weeks, explanation, citation }: ResultProps) {
  return (
    <div className="p-6 border rounded-lg bg-white shadow-sm space-y-3">
      <h2 className="text-2xl font-bold text-slate-900">
        Minimum Notice Period: {weeks} {weeks === 1 ? "week" : "weeks"}
      </h2>

      <p className="text-slate-700">{explanation}</p>

      <p className="text-sm text-slate-500 italic">Legal citation: {citation}</p>
    </div>
  );
}