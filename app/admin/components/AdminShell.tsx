import Link from "next/link";
import { ReactNode } from "react";

export function AdminShell({
  children,
  breadcrumb,
}: {
  children: ReactNode;
  breadcrumb?: ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-100 flex flex-col">
        <div className="px-6 py-5 border-b border-slate-700">
          <Link href="/admin" className="text-lg font-bold tracking-tight">
            LegalCals Authority Admin
          </Link>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-1">
          <NavLink href="/admin">Dashboard</NavLink>
          <NavLink href="/admin/authority">Authority Data</NavLink>
          <NavLink href="/admin/authority/alerts">Statute Alerts</NavLink>
          <NavLink href="/admin/authority/research">Research Assistant</NavLink>
          <NavLink href="/admin/authority/research/queue">Research Queue</NavLink>
          <NavLink href="/admin/authority/import">Bulk Importer</NavLink>
          <NavLink href="/admin/authority/review">Review Workflow</NavLink>
          <NavLink href="/admin/authority/export">Export Authority Data</NavLink>
          <NavLink href="/admin/api-keys">API Keys</NavLink>
          <NavLink href="/admin/api-usage">API Usage</NavLink>
          <NavLink href="/admin/widgets">Widget Analytics</NavLink>
          <NavLink href="/admin/documents">Documents</NavLink>
        </nav>
        <div className="px-4 py-4 border-t border-slate-700 text-xs text-slate-400">
          Internal tool — edits affect live calculators
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 flex flex-col">
        <header className="bg-amber-50 border-b border-amber-200 px-6 py-3">
          <p className="text-sm text-amber-800">
            <span className="font-semibold">Warning:</span> Authority Admin is an internal tool.
            Changes here affect live calculator behavior. Make sure all edits are backed by real legal sources.
          </p>
        </header>

        {breadcrumb && (
          <div className="bg-white border-b border-slate-200 px-6 py-3 text-sm text-slate-600">
            {breadcrumb}
          </div>
        )}

        <div className="flex-1 p-6">{children}</div>
      </main>
    </div>
  );
}

function NavLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <Link
      href={href}
      className="block px-3 py-2 rounded-md text-sm font-medium text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
    >
      {children}
    </Link>
  );
}
