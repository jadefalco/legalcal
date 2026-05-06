import Link from "next/link";
import { getWidgetStats } from "@/lib/authority/db";
import { AdminShell } from "../components/AdminShell";
import { AdminTable } from "../components/AdminTable";

export default async function WidgetAnalyticsPage() {
  const stats = await getWidgetStats();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Widget Analytics</span>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Widget Analytics</h1>
          <p className="text-slate-600 mt-1">
            Usage data for embedded calculator widgets.
          </p>
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <SummaryCard label="Total Views" value={stats.totalViews} />
          <SummaryCard label="Total Calculations" value={stats.totalCalculations} />
        </div>

        {/* Top calculators */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Top Calculators
          </h2>
          {stats.topCalculators.length > 0 ? (
            <AdminTable
              columns={[
                { label: "Calculator", key: "calculator" },
                { label: "Events", key: "count" },
              ]}
              rows={stats.topCalculators}
              getRowKey={(row) => row.calculator}
            />
          ) : (
            <p className="text-sm text-slate-500">No widget usage data yet.</p>
          )}
        </div>

        {/* Top states */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Top States
          </h2>
          {stats.topStates.length > 0 ? (
            <AdminTable
              columns={[
                { label: "State", key: "state" },
                { label: "Events", key: "count" },
              ]}
              rows={stats.topStates}
              getRowKey={(row) => row.state}
            />
          ) : (
            <p className="text-sm text-slate-500">No widget usage data yet.</p>
          )}
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
