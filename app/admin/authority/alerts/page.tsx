import Link from "next/link";
import { listActiveAlerts } from "@/lib/authority/db";
import { AdminShell } from "../../components/AdminShell";
import { AdminTable } from "../../components/AdminTable";

export default async function StatuteAlertsPage() {
  const alerts = await listActiveAlerts();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Statute Change Alerts</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statute Change Alerts</h1>
          <p className="text-slate-600 mt-1">
            Automatically detected changes to cited statutes.
          </p>
        </div>

        {alerts.length === 0 ? (
          <div className="rounded-md bg-green-50 border border-green-200 p-4 text-sm text-green-800">
            No active alerts. All monitored statutes match their last known snapshot.
          </div>
        ) : (
          <AdminTable
            columns={[
              { label: "State", key: "state" },
              {
                label: "City",
                key: "city",
                render: (row) => row.city ?? "—",
              },
              { label: "Topic", key: "topicName" },
              { label: "Statute", key: "statute" },
              { label: "Detected", key: "detectedAt" },
            ]}
            rows={alerts}
            getRowKey={(row) => row.id}
            actions={(row) => (
              <Link
                href={`/admin/authority/alerts/${row.id}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View Diff
              </Link>
            )}
          />
        )}
      </div>
    </AdminShell>
  );
}
