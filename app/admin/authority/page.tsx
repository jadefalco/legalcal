import Link from "next/link";
import { listJurisdictions } from "@/lib/authority/db";
import { AdminShell } from "../components/AdminShell";
import { AdminTable } from "../components/AdminTable";
import { AdminBadge } from "../components/AdminBadge";

export default async function AuthorityIndexPage() {
  const jurisdictions = await listJurisdictions();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">
            Admin
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Authority Data</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Authority Data</h1>
          <p className="text-slate-600 mt-1">
            All jurisdictions and their authoritative legal rules.
          </p>
        </div>

        <AdminTable
          columns={[
            { label: "Country", key: "country" },
            { label: "State", key: "state" },
            {
              label: "City",
              key: "city",
              render: (row) => row.city ?? "—",
            },
            {
              label: "Type",
              key: "city",
              render: (row) =>
                row.city ? (
                  <AdminBadge variant="city">City Override</AdminBadge>
                ) : (
                  <AdminBadge variant="state">State</AdminBadge>
                ),
            },
          ]}
          rows={jurisdictions}
          getRowKey={(row) => row.id}
          actions={(row) => (
            <Link
              href={
                row.city
                  ? `/admin/authority/${row.country}/${row.state}/${row.city}`
                  : `/admin/authority/${row.country}/${row.state}`
              }
              className="text-sm font-medium text-blue-600 hover:text-blue-500"
            >
              View Rules
            </Link>
          )}
        />
      </div>
    </AdminShell>
  );
}
