import Link from "next/link";
import { notFound } from "next/navigation";
import { listJurisdictions, listRulesForJurisdiction } from "@/lib/authority/db";
import { usStates } from "@/app/config/usStates";
import { AdminShell } from "../../../components/AdminShell";
import { AdminTable } from "../../../components/AdminTable";
import { AdminBadge } from "../../../components/AdminBadge";

interface StatePageProps {
  params: { country: string; state: string };
}

export default async function StatePage({ params }: StatePageProps) {
  const { country, state } = params;
  const stateCode = state.toLowerCase();
  const stateInfo = usStates[stateCode as keyof typeof usStates];
  if (!stateInfo) notFound();

  // Find state-level jurisdiction
  const allJurisdictions = await listJurisdictions();
  const stateJurisdiction = allJurisdictions.find(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === stateCode &&
      !j.city
  );

  const cityJurisdictions = allJurisdictions.filter(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === stateCode &&
      !!j.city
  );

  const rules = stateJurisdiction
    ? await listRulesForJurisdiction(stateJurisdiction.id)
    : [];

  // Pre-fetch city rule counts
  const cityRuleCounts = await Promise.all(
    cityJurisdictions.map(async (j) => {
      const cityRules = await listRulesForJurisdiction(j.id);
      return { ...j, count: cityRules.length };
    })
  );

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">
            Admin
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">
            Authority
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">
            {stateInfo.name}
          </span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {stateInfo.name} — Authority Overview
          </h1>
          <div className="flex gap-2 mt-2">
            <AdminBadge variant="state">{country.toUpperCase()}</AdminBadge>
            <AdminBadge variant="state">{stateInfo.name}</AdminBadge>
          </div>
        </div>

        {/* Topics table */}
        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">Topics</h2>
          {rules.length > 0 ? (
            <AdminTable
              columns={[
                { label: "Topic", key: "topicName" },
                { label: "Version", key: "version" },
                { label: "Effective Date", key: "effectiveDate" },
                {
                  label: "Supersedes",
                  key: "supersedes",
                  render: (row) => row.supersedes ?? "—",
                },
              ]}
              rows={rules}
              getRowKey={(row) => row.id}
              actions={(row) => (
                <Link
                  href={`/admin/authority/${country}/${state}/${row.topicName}`}
                  className="text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View Rule
                </Link>
              )}
            />
          ) : (
            <p className="text-slate-500 text-sm">No rules found for this state.</p>
          )}
        </div>

        {/* City overrides */}
        {cityRuleCounts.length > 0 && (
          <div>
            <h2 className="text-lg font-semibold text-slate-900 mb-3">
              City Overrides
            </h2>
            <div className="rounded-lg border border-slate-200 bg-white shadow-sm overflow-x-auto">
              <table className="min-w-full text-sm">
                <thead className="bg-slate-100 text-slate-700">
                  <tr>
                    <th className="px-4 py-3 text-left font-semibold">City</th>
                    <th className="px-4 py-3 text-left font-semibold">Topics Overridden</th>
                    <th className="px-4 py-3 text-left font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {cityRuleCounts.map((j) => (
                    <tr key={j.id} className="hover:bg-slate-50">
                      <td className="px-4 py-3 capitalize">
                        {j.city!.replace(/-/g, " ")}
                      </td>
                      <td className="px-4 py-3">{j.count}</td>
                      <td className="px-4 py-3">
                        <Link
                          href={`/admin/authority/${country}/${state}/${j.city}`}
                          className="text-sm font-medium text-blue-600 hover:text-blue-500"
                        >
                          View Rules
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
