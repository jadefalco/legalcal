"use client";

import { useState, useEffect, Suspense } from "react";
import { AdminShell } from "../../components/AdminShell";
import { AdminTable } from "../../components/AdminTable";
import { AdminBadge } from "../../components/AdminBadge";
import { usStates } from "@/app/config/usStates";

interface ImportJob {
  id: number;
  state: string;
  status: string;
  startedAt: string;
  finishedAt: string | null;
  errorMessage: string | null;
}

interface ImportLog {
  statuteUrl: string;
  topic: string | null;
  action: string;
  message: string;
  createdAt: string;
}

function ImportPageContent() {
  const [jobs, setJobs] = useState<ImportJob[]>([]);
  const [logs, setLogs] = useState<ImportLog[]>([]);
  const [selectedJobId, setSelectedJobId] = useState<number | null>(null);
  const [starting, setStarting] = useState(false);
  const [selectedState, setSelectedState] = useState("");
  const [error, setError] = useState<string | null>(null);

  async function fetchJobs() {
    try {
      const res = await fetch("/api/admin/authority/import/jobs");
      const data = await res.json();
      if (data.success) {
        setJobs(data.jobs);
      }
    } catch (err) {
      console.error("Failed to fetch jobs", err);
    }
  }

  async function fetchLogs(jobId: number) {
    try {
      const res = await fetch(`/api/admin/authority/import/logs?jobId=${jobId}`);
      const data = await res.json();
      if (data.success) {
        setLogs(data.logs);
        setSelectedJobId(jobId);
      }
    } catch (err) {
      console.error("Failed to fetch logs", err);
    }
  }

  useEffect(() => {
    fetchJobs();
    const interval = setInterval(fetchJobs, 5000);
    return () => clearInterval(interval);
  }, []);

  async function startImport() {
    if (!selectedState) return;
    setStarting(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/authority/import/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ state: selectedState }),
      });
      const data = await res.json();
      if (!data.success) {
        setError(data.error || "Failed to start import");
      } else {
        setSelectedState("");
        await fetchJobs();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setStarting(false);
    }
  }

  const stateOptions = Object.entries(usStates).map(([slug, info]) => ({
    slug,
    name: info.name,
  }));

  return (
    <AdminShell breadcrumb={<span>Bulk State Importer</span>}>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Bulk State Importer</h1>
        <p className="text-slate-600">
          Scrape state statute websites, classify statutes into topics, generate rule drafts, and queue them for review.
        </p>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
          <h2 className="text-lg font-semibold text-slate-800">Start New Import</h2>
          <div className="flex gap-3">
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-slate-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select a state...</option>
              {stateOptions.map((s) => (
                <option key={s.slug} value={s.slug}>
                  {s.name}
                </option>
              ))}
            </select>
            <button
              onClick={startImport}
              disabled={!selectedState || starting}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {starting ? "Starting..." : "Start Import"}
            </button>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6">
          <h2 className="text-lg font-semibold text-slate-800 mb-4">Import Jobs</h2>
          <AdminTable
            columns={[
              {
                label: "ID",
                key: "id",
                render: (row: ImportJob) => (
                  <button
                    onClick={() => fetchLogs(row.id)}
                    className="text-blue-600 hover:underline text-sm"
                  >
                    {row.id}
                  </button>
                ),
              },
              { label: "State", key: "state" },
              {
                label: "Status",
                key: "status",
                render: (row: ImportJob) => (
                  <AdminBadge variant={row.status}>{row.status}</AdminBadge>
                ),
              },
              { label: "Started", key: "startedAt" },
              {
                label: "Finished",
                key: "finishedAt",
                render: (row: ImportJob) => row.finishedAt ?? "—",
              },
              {
                label: "Error",
                key: "errorMessage",
                render: (row: ImportJob) =>
                  row.errorMessage ? (
                    <span className="text-red-600 text-xs">{row.errorMessage}</span>
                  ) : (
                    "—"
                  ),
              },
            ]}
            rows={jobs}
            getRowKey={(row) => row.id}
          />
        </div>

        {selectedJobId !== null && (
          <div className="bg-white border border-slate-200 rounded-lg p-6">
            <h2 className="text-lg font-semibold text-slate-800 mb-4">
              Logs for Job #{selectedJobId}
            </h2>
            <AdminTable
              columns={[
                {
                  label: "Action",
                  key: "action",
                  render: (row: ImportLog) => (
                    <AdminBadge variant={row.action}>{row.action}</AdminBadge>
                  ),
                },
                {
                  label: "Topic",
                  key: "topic",
                  render: (row: ImportLog) => row.topic ?? "—",
                },
                {
                  label: "URL",
                  key: "statuteUrl",
                  render: (row: ImportLog) => (
                    <a
                      href={row.statuteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline text-xs truncate max-w-[200px] block"
                    >
                      {row.statuteUrl}
                    </a>
                  ),
                },
                { label: "Message", key: "message" },
                { label: "Time", key: "createdAt" },
              ]}
              rows={logs}
              getRowKey={(row) => `${row.statuteUrl}-${row.createdAt}`}
            />
          </div>
        )}
      </div>
    </AdminShell>
  );
}

export default function ImportPage() {
  return (
    <Suspense fallback={<div className="p-6 text-slate-600">Loading...</div>}>
      <ImportPageContent />
    </Suspense>
  );
}
