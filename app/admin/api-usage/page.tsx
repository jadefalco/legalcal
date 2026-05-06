"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "../components/AdminShell";
import { AdminTable } from "../components/AdminTable";

interface UsageLog {
  id: number;
  apiKeyId: number;
  route: string;
  timestamp: string;
  statusCode: number;
  responseTimeMs: number;
}

interface DailyStat {
  date: string;
  requests: number;
}

interface RouteStat {
  route: string;
  requests: number;
}

interface StatusStat {
  statusCode: number;
  requests: number;
}

export default function ApiUsagePage() {
  const [logs, setLogs] = useState<UsageLog[]>([]);
  const [dailyStats, setDailyStats] = useState<DailyStat[]>([]);
  const [routeStats, setRouteStats] = useState<RouteStat[]>([]);
  const [statusStats, setStatusStats] = useState<StatusStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    apiKeyId: "",
    route: "",
    startDate: "",
    endDate: "",
  });

  async function fetchData() {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (filters.apiKeyId) params.append("apiKeyId", filters.apiKeyId);
      if (filters.route) params.append("route", filters.route);
      if (filters.startDate) params.append("startDate", filters.startDate);
      if (filters.endDate) params.append("endDate", filters.endDate);

      const [logsRes, dailyRes, routeRes, statusRes] = await Promise.all([
        fetch(`/api/admin/authority/api-usage?${params.toString()}`),
        fetch("/api/admin/authority/api-usage/daily"),
        fetch("/api/admin/authority/api-usage/routes"),
        fetch("/api/admin/authority/api-usage/status"),
      ]);

      const logsJson = await logsRes.json();
      const dailyJson = await dailyRes.json();
      const routeJson = await routeRes.json();
      const statusJson = await statusRes.json();

      if (logsJson.success) setLogs(logsJson.logs);
      if (dailyJson.success) setDailyStats(dailyJson.data);
      if (routeJson.success) setRouteStats(routeJson.data);
      if (statusJson.success) setStatusStats(statusJson.data);
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const maxDaily = Math.max(...dailyStats.map((d) => d.requests), 1);
  const maxRoute = Math.max(...routeStats.map((r) => r.requests), 1);

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">API Usage</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">API Usage Dashboard</h1>
          <p className="text-slate-600 mt-1">Monitor API requests, quotas, and performance.</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Filters</h2>
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">API Key ID</label>
              <input
                type="text"
                value={filters.apiKeyId}
                onChange={(e) => setFilters((f) => ({ ...f, apiKeyId: e.target.value }))}
                placeholder="e.g. 123"
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Route</label>
              <input
                type="text"
                value={filters.route}
                onChange={(e) => setFilters((f) => ({ ...f, route: e.target.value }))}
                placeholder="e.g. /api/authority/us/ca/..."
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">Start Date</label>
              <input
                type="date"
                value={filters.startDate}
                onChange={(e) => setFilters((f) => ({ ...f, startDate: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">End Date</label>
              <input
                type="date"
                value={filters.endDate}
                onChange={(e) => setFilters((f) => ({ ...f, endDate: e.target.value }))}
                className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
              />
            </div>
          </div>
          <button
            onClick={fetchData}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            Apply Filters
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Daily requests bar chart */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Requests per Day (Last 30 Days)
            </h2>
            {dailyStats.length === 0 ? (
              <p className="text-sm text-slate-500">No data</p>
            ) : (
              <div className="space-y-2">
                {dailyStats.slice(-14).map((d) => (
                  <div key={d.date} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 w-20 shrink-0">{d.date}</span>
                    <div className="flex-1 h-4 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-blue-500 rounded"
                        style={{ width: `${(d.requests / maxDaily) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700 w-10 text-right">
                      {d.requests}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Route distribution */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Requests per Route
            </h2>
            {routeStats.length === 0 ? (
              <p className="text-sm text-slate-500">No data</p>
            ) : (
              <div className="space-y-2">
                {routeStats.slice(0, 10).map((r) => (
                  <div key={r.route} className="flex items-center gap-3">
                    <span className="text-xs text-slate-500 truncate flex-1" title={r.route}>
                      {r.route}
                    </span>
                    <div className="w-24 h-4 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-emerald-500 rounded"
                        style={{ width: `${(r.requests / maxRoute) * 100}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700 w-10 text-right">
                      {r.requests}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Status distribution */}
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Status Code Distribution
            </h2>
            {statusStats.length === 0 ? (
              <p className="text-sm text-slate-500">No data</p>
            ) : (
              <div className="space-y-2">
                {statusStats.map((s) => (
                  <div key={s.statusCode} className="flex items-center gap-3">
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        s.statusCode < 300
                          ? "bg-emerald-50 text-emerald-700"
                          : s.statusCode < 400
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {s.statusCode}
                    </span>
                    <div className="flex-1 h-4 bg-slate-100 rounded overflow-hidden">
                      <div
                        className="h-full bg-slate-500 rounded"
                        style={{
                          width: `${(s.requests / Math.max(...statusStats.map((x) => x.requests), 1)) * 100}%`,
                        }}
                      />
                    </div>
                    <span className="text-xs font-medium text-slate-700 w-10 text-right">
                      {s.requests}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Logs table */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">Usage Logs</h2>
          {loading ? (
            <p className="text-sm text-slate-500">Loading...</p>
          ) : logs.length === 0 ? (
            <p className="text-sm text-slate-500">No usage logs found.</p>
          ) : (
            <AdminTable
              columns={[
                { label: "Timestamp", key: "timestamp" },
                { label: "API Key ID", key: "apiKeyId" },
                { label: "Route", key: "route" },
                {
                  label: "Status",
                  key: "statusCode",
                  render: (row: UsageLog) => (
                    <span
                      className={`text-xs font-medium px-2 py-0.5 rounded ${
                        row.statusCode < 300
                          ? "bg-emerald-50 text-emerald-700"
                          : row.statusCode < 400
                          ? "bg-amber-50 text-amber-700"
                          : "bg-red-50 text-red-700"
                      }`}
                    >
                      {row.statusCode}
                    </span>
                  ),
                },
                { label: "Response Time", key: "responseTimeMs", render: (row: UsageLog) => `${row.responseTimeMs}ms` },
              ]}
              rows={logs}
              getRowKey={(row: UsageLog) => row.id}
            />
          )}
        </div>
      </div>
    </AdminShell>
  );
}
