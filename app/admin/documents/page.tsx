import Link from "next/link";
import { listDocumentTemplates, getDocumentStats } from "@/lib/authority/db";
import { AdminShell } from "../components/AdminShell";
import { AdminTable } from "../components/AdminTable";
import { AdminBadge } from "../components/AdminBadge";

export default async function DocumentsAdminPage() {
  const templates = await listDocumentTemplates();
  const stats = await getDocumentStats();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Documents</span>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Document Templates</h1>
          <p className="text-slate-600 mt-1">
            Manage legal document templates and view generation analytics.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-900">{templates.length}</div>
            <div className="text-sm text-slate-500 mt-1">Templates</div>
          </div>
          <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm">
            <div className="text-3xl font-bold text-slate-900">{stats.totalGenerated}</div>
            <div className="text-sm text-slate-500 mt-1">Documents Generated</div>
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">All Templates</h2>
          {templates.length > 0 ? (
            <AdminTable
              columns={[
                { label: "Name", key: "name" },
                { label: "Slug", key: "slug" },
                {
                  label: "Category",
                  key: "category",
                  render: (row) => row.category ?? "—",
                },
                {
                  label: "Scopes",
                  key: "jurisdictionScopes",
                  render: (row) =>
                    row.jurisdictionScopes.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {row.jurisdictionScopes.map((s: string) => (
                          <AdminBadge key={s} variant="default">
                            {s}
                          </AdminBadge>
                        ))}
                      </div>
                    ) : (
                      <span className="text-slate-400">All</span>
                    ),
                },
              ]}
              rows={templates}
              getRowKey={(row) => row.id}
              actions={(row) => (
                <Link
                  href={`/admin/documents/${row.id}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  Edit
                </Link>
              )}
            />
          ) : (
            <p className="text-sm text-slate-500">No templates yet.</p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
