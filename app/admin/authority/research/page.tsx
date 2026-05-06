import { Suspense } from "react";
import Link from "next/link";
import { AdminShell } from "../../components/AdminShell";
import { ResearchAssistantClient } from "./ResearchAssistantClient";

export default function ResearchAssistantPage() {
  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Research Assistant</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Research Assistant</h1>
          <p className="text-slate-600 mt-1">
            Paste statute text to extract rule fields, citations, and compare against existing rules.
          </p>
        </div>
        <Suspense fallback={<div className="text-sm text-slate-500">Loading...</div>}>
          <ResearchAssistantClient />
        </Suspense>
      </div>
    </AdminShell>
  );
}
