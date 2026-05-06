import Link from "next/link";
import { notFound } from "next/navigation";
import { getAlertById } from "@/lib/authority/db";
import { AdminShell } from "../../../components/AdminShell";
import { AdminCodeBlock } from "../../../components/AdminCodeBlock";
import { AcknowledgeButton } from "./AcknowledgeButton";

interface AlertDetailPageProps {
  params: { alertId: string };
}

export default async function AlertDetailPage({ params }: AlertDetailPageProps) {
  const alertId = parseInt(params.alertId, 10);
  if (isNaN(alertId)) notFound();

  const alert = await getAlertById(alertId);
  if (!alert) notFound();

  const location = alert.city
    ? `${alert.city}, ${alert.state}`
    : alert.state;

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority/alerts" className="hover:text-slate-900">Alerts</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Alert #{alert.id}</span>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Statute Change Detected</h1>
          <p className="text-slate-600 mt-1">
            {alert.topicName} — {location}
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="space-y-2">
            <div className="text-sm">
              <span className="text-slate-500">Statute:</span>{" "}
              <span className="font-medium text-slate-900">{alert.statute}</span>
            </div>
            <div className="text-sm">
              <span className="text-slate-500">URL:</span>{" "}
              <a
                href={alert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-blue-600 hover:text-blue-500"
              >
                {alert.url}
              </a>
            </div>
            <div className="text-sm">
              <span className="text-slate-500">Detected:</span>{" "}
              <span className="font-medium text-slate-900">{alert.detectedAt}</span>
            </div>
          </div>

          <div className="space-y-2">
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Diff
            </h2>
            <AdminCodeBlock code={alert.diffText} language="diff" />
          </div>

          <div className="flex gap-3 pt-2">
            <AcknowledgeButton alertId={alert.id} />
            <Link
              href={`/admin/authority/us/${alert.state.toLowerCase()}${alert.city ? `/${alert.city.toLowerCase()}` : ""}/${alert.topicName}`}
              className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
            >
              Open Rule
            </Link>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
