import Link from "next/link";
import { listReviewSummary } from "@/lib/authority/db";
import { AdminShell } from "../../components/AdminShell";
import { AdminTable } from "../../components/AdminTable";
import { AdminBadge } from "../../components/AdminBadge";

export default async function ReviewDashboardPage() {
  const rows = await listReviewSummary();

  const statusVariant = (status: string) => {
    switch (status) {
      case "placeholder":
        return "low confidence";
      case "draft":
        return "medium confidence";
      case "reviewed":
        return "high confidence";
      case "published":
        return "state";
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
          <span className="text-slate-900 font-medium">Review Workflow</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Review Workflow</h1>
          <p className="text-slate-600 mt-1">
            Track research and review status for all authority rules.
          </p>
        </div>

        <AdminTable
          columns={[
            { label: "State", key: "state" },
            {
              label: "City",
              key: "city",
              render: (row) => row.city ?? "—",
            },
            { label: "Topic", key: "topicName" },
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
              label: "Reviewer",
              key: "reviewer",
              render: (row) => row.reviewer ?? "—",
            },
          ]}
          rows={rows}
          getRowKey={(row) => `${row.ruleId}-${row.topicName}`}
          actions={(row) => (
            <Link
              href={
                row.city
                  ? `/admin/authority/us/${row.state}/${row.city}/${row.topicName}`
                  : `/admin/authority/us/${row.state}/${row.topicName}`
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              Open Rule
            </Link>
          )}
        />
      </div>
    </AdminShell>
  );
}
