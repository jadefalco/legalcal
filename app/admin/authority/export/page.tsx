import Link from "next/link";
import fs from "fs";
import path from "path";
import { AdminShell } from "../../components/AdminShell";
import { AdminTable } from "../../components/AdminTable";

interface ExportedFile {
  jurisdiction: string;
  topic: string;
  exportedAt: string;
  path: string;
}

function scanExportDir(): ExportedFile[] {
  const exportDir = path.join(process.cwd(), "data", "export");
  if (!fs.existsSync(exportDir)) return [];

  const files: ExportedFile[] = [];

  function walk(dir: string, rel: string) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      const relPath = path.join(rel, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath, relPath);
      } else if (entry.name.endsWith(".json")) {
        const stat = fs.statSync(fullPath);
        const parts = relPath.split(path.sep);
        const topic = entry.name.replace(".json", "");
        const jurisdiction = parts.slice(0, -1).join("/");
        files.push({
          jurisdiction,
          topic,
          exportedAt: stat.mtime.toISOString(),
          path: `/data/export/${relPath.replace(/\\/g, "/")}`,
        });
      }
    }
  }

  walk(exportDir, "");
  return files.sort((a, b) => b.exportedAt.localeCompare(a.exportedAt));
}

export default async function ExportStatusPage() {
  const files = scanExportDir();

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">Export Status</span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Export Authority Data</h1>
          <p className="text-slate-600 mt-1">
            Export the current SQLite authority database back to JSON files.
          </p>
        </div>

        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-3">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Run Export
          </h2>
          <p className="text-sm text-slate-600">
            To export all authority data from the database to JSON:
          </p>
          <code className="block bg-slate-900 text-slate-100 px-4 py-3 rounded-md text-sm font-mono">
            npm run export:authority
          </code>
          <p className="text-xs text-slate-500">
            This writes files to <code>data/export/</code> with full rule, citation, version, and review metadata.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-slate-900 mb-3">
            Exported Files ({files.length})
          </h2>
          {files.length > 0 ? (
            <AdminTable
              columns={[
                { label: "Jurisdiction", key: "jurisdiction" },
                { label: "Topic", key: "topic" },
                { label: "Exported At", key: "exportedAt" },
              ]}
              rows={files}
              getRowKey={(row) => `${row.jurisdiction}-${row.topic}`}
              actions={(row) => (
                <span className="text-xs text-slate-400 font-mono">{row.path}</span>
              )}
            />
          ) : (
            <p className="text-sm text-slate-500">
              No exports found. Run{" "}
              <code className="text-xs bg-slate-100 px-1 py-0.5 rounded">npm run export:authority</code>{" "}
              to generate JSON files.
            </p>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
