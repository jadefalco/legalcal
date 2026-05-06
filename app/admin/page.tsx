import Link from "next/link";
import { getCounts } from "@/lib/authority/db";
import { AdminShell } from "./components/AdminShell";

export default async function AdminDashboardPage() {
  const counts = await getCounts();

  return (
    <AdminShell>
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
        <p className="text-slate-600 mt-1">
          Overview of the LegalCals authority data layer.
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <SummaryCard label="Jurisdictions" value={counts.jurisdictions} />
        <SummaryCard label="Topics" value={counts.topics} />
        <SummaryCard label="Rules" value={counts.rules} />
        <SummaryCard label="Citations" value={counts.citations} />
      </div>

      {/* Quick links */}
      <div className="bg-white rounded-lg border border-slate-200 p-6 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Quick Links</h2>
        <div className="space-y-3">
          <Link
            href="/admin/authority"
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            View Authority Data
          </Link>
        </div>
      </div>

      {/* Ingestion instructions */}
      <div className="bg-slate-100 rounded-lg border border-slate-200 p-6">
        <h2 className="text-lg font-semibold text-slate-900 mb-2">
          Run Ingestion Script
        </h2>
        <p className="text-sm text-slate-600 mb-3">
          To rebuild the authority database from JSON source files, run:
        </p>
        <code className="block bg-slate-900 text-slate-100 px-4 py-3 rounded-md text-sm font-mono">
          npm run ingest:authority
        </code>
        <p className="text-xs text-slate-500 mt-2">
          This re-ingests all JSON files into SQLite and regenerates the client bundle.
          Manual DB edits made through this admin will be overwritten unless you also update the source JSON.
        </p>
      </div>
    </div>
    </AdminShell>
  );
}

function SummaryCard({ label, value }: { label: string; value: number }) {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
      <div className="text-3xl font-bold text-slate-900">{value}</div>
      <div className="text-sm text-slate-500 mt-1">{label}</div>
    </div>
  );
}
