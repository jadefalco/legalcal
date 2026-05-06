import Link from "next/link";
import { listResearchQueue } from "@/lib/authority/db";
import { AdminShell } from "../../../components/AdminShell";
import { AdminTable } from "../../../components/AdminTable";
import { AdminBadge } from "../../../components/AdminBadge";

export default async function ResearchQueuePage() {
  const items = await listResearchQueue();

  const statusVariant = (status: string) => {
    switch (status) {
      case "pending":
        return "low confidence";
      case "in-progress":
        return "medium confidence";
      case "complete":
        return "high confidence";
      default:
        return "default";
    }
  };

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority/research" className="hover:text-slate-900">Research</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Queue</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Research Queue</h1>
          <p className="text-slate-600 mt-1">
            Track AI-assisted research tasks across jurisdictions and topics.
          </p>
        </div>

        {items.length === 0 ? (
          <div className="rounded-md bg-slate-50 border border-slate-200 p-4 text-sm text-slate-600">
            No items in the research queue.
          </div>
        ) : (
          <AdminTable
            columns={[
              { label: "State", key: "jurisdiction", render: (row) => row.jurisdiction.state },
              {
                label: "City",
                key: "jurisdiction",
                render: (row) => row.jurisdiction.city ?? "—",
              },
              { label: "Topic", key: "topic" },
              {
                label: "Status",
                key: "status",
                render: (row) => (
                  <AdminBadge variant={statusVariant(row.status)}>
                    {row.status}
                  </AdminBadge>
                ),
              },
              {
                label: "Assigned To",
                key: "assignedTo",
                render: (row) => row.assignedTo ?? "—",
              },
              {
                label: "Notes",
                key: "notes",
                render: (row) => (
                  <span className="truncate max-w-[200px] block" title={row.notes}>
                    {row.notes || "—"}
                  </span>
                ),
              },
            ]}
            rows={items}
            getRowKey={(row) => row.id}
            actions={(row) => (
              <Link
                href={`/admin/authority/research`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                Open Research Assistant
              </Link>
            )}
          />
        )}
      </div>
    </AdminShell>
  );
}
