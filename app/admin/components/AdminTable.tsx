import { ReactNode } from "react";

interface Column<T> {
  label: string;
  key: keyof T | string;
  render?: (row: T) => ReactNode;
}

interface AdminTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  getRowKey: (row: T) => string | number;
  actions?: (row: T) => ReactNode;
}

export function AdminTable<T>({
  columns,
  rows,
  getRowKey,
  actions,
}: AdminTableProps<T>) {
  return (
    <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="bg-slate-100 text-slate-700">
          <tr>
            {columns.map((col) => (
              <th
                key={String(col.key)}
                className="px-4 py-3 text-left font-semibold"
              >
                {col.label}
              </th>
            ))}
            {actions && (
              <th className="px-4 py-3 text-left font-semibold">Actions</th>
            )}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200">
          {rows.map((row) => (
            <tr key={getRowKey(row)} className="hover:bg-slate-50">
              {columns.map((col) => (
                <td key={String(col.key)} className="px-4 py-3">
                  {col.render
                    ? col.render(row)
                    : String((row as any)[col.key] ?? "—")}
                </td>
              ))}
              {actions && <td className="px-4 py-3">{actions(row)}</td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
