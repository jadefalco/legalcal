"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { AdminShell } from "../components/AdminShell";
import { AdminTable } from "../components/AdminTable";
import { AdminBadge } from "../components/AdminBadge";

interface ApiKey {
  id: number;
  key: string;
  ownerName: string;
  ownerEmail: string;
  tier: string;
  active: boolean;
  lastUsedAt: string | null;
}

export default function ApiKeysPage() {
  const [keys, setKeys] = useState<ApiKey[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [newKey, setNewKey] = useState<string | null>(null);

  const [ownerName, setOwnerName] = useState("");
  const [ownerEmail, setOwnerEmail] = useState("");
  const [tier, setTier] = useState("free");

  async function fetchKeys() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/authority/api-keys/list");
      const json = await res.json();
      if (json.success) setKeys(json.keys);
    } catch {
      setMessage({ type: "error", text: "Failed to load API keys" });
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchKeys();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setMessage(null);
    setNewKey(null);
    try {
      const res = await fetch("/api/admin/authority/api-keys/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ownerName, ownerEmail, tier }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to create key" });
        return;
      }
      setNewKey(json.key);
      setOwnerName("");
      setOwnerEmail("");
      setTier("free");
      await fetchKeys();
    } catch (err) {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  async function toggleActive(keyId: number, current: boolean) {
    try {
      const res = await fetch("/api/admin/authority/api-keys/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: keyId, active: !current }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to update" });
        return;
      }
      setKeys((prev) =>
        prev.map((k) => (k.id === keyId ? { ...k, active: !current } : k))
      );
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  async function handleRegenerate(keyId: number) {
    if (!confirm("Regenerate this API key? The old key will stop working immediately.")) return;
    try {
      const res = await fetch("/api/admin/authority/api-keys/regenerate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: keyId }),
      });
      const json = await res.json();
      if (!json.success) {
        setMessage({ type: "error", text: json.error || "Failed to regenerate" });
        return;
      }
      setNewKey(json.key);
      await fetchKeys();
    } catch {
      setMessage({ type: "error", text: "Network error" });
    }
  }

  function maskKey(key: string): string {
    if (key.length <= 12) return key;
    return `${key.slice(0, 8)}...${key.slice(-4)}`;
  }

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">API Keys</span>
        </>
      }
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">API Key Management</h1>
            <p className="text-slate-600 mt-1">Create and manage developer API keys.</p>
          </div>
          <button
            onClick={() => setShowForm((v) => !v)}
            className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
          >
            {showForm ? "Cancel" : "Create API Key"}
          </button>
        </div>

        {message && (
          <div
            className={`rounded-md p-4 text-sm border ${
              message.type === "success"
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : "bg-red-50 text-red-800 border-red-200"
            }`}
          >
            {message.text}
          </div>
        )}

        {newKey && (
          <div className="rounded-md bg-blue-50 border border-blue-200 p-4 text-sm text-blue-800">
            <p className="font-semibold">New API Key Generated</p>
            <code className="block mt-1 font-mono text-blue-900 bg-blue-100 px-2 py-1 rounded">{newKey}</code>
            <p className="mt-1 text-xs">Copy this now — it will not be shown again.</p>
          </div>
        )}

        {showForm && (
          <form
            onSubmit={handleCreate}
            className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-4"
          >
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Create New API Key
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Owner Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Owner Email</label>
                <input
                  type="email"
                  value={ownerEmail}
                  onChange={(e) => setOwnerEmail(e.target.value)}
                  required
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Tier</label>
                <select
                  value={tier}
                  onChange={(e) => setTier(e.target.value)}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  <option value="free">Free</option>
                  <option value="pro">Pro</option>
                  <option value="enterprise">Enterprise</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="inline-flex items-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-500 transition-colors"
            >
              Generate Key
            </button>
          </form>
        )}

        {loading ? (
          <p className="text-sm text-slate-500">Loading...</p>
        ) : (
          <AdminTable
            columns={[
              { label: "Owner", key: "ownerName" },
              { label: "Email", key: "ownerEmail" },
              {
                label: "Tier",
                key: "tier",
                render: (row: ApiKey) => (
                  <AdminBadge
                    variant={
                      row.tier === "enterprise"
                        ? "state"
                        : row.tier === "pro"
                        ? "high confidence"
                        : "default"
                    }
                  >
                    {row.tier}
                  </AdminBadge>
                ),
              },
              {
                label: "Active",
                key: "active",
                render: (row: ApiKey) => (row.active ? "Yes" : "No"),
              },
              { label: "Last Used", key: "lastUsedAt", render: (row: ApiKey) => row.lastUsedAt ?? "—" },
              {
                label: "Key",
                key: "key",
                render: (row: ApiKey) => <code className="text-xs font-mono">{maskKey(row.key)}</code>,
              },
            ]}
            rows={keys}
            getRowKey={(row: ApiKey) => row.id}
            actions={(row: ApiKey) => (
              <div className="flex gap-2">
                <button
                  onClick={() => toggleActive(row.id, row.active)}
                  className={`text-xs font-medium px-2 py-1 rounded ${
                    row.active
                      ? "bg-red-50 text-red-700 hover:bg-red-100"
                      : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                  }`}
                >
                  {row.active ? "Deactivate" : "Activate"}
                </button>
                <button
                  onClick={() => handleRegenerate(row.id)}
                  className="text-xs font-medium px-2 py-1 rounded bg-slate-100 text-slate-700 hover:bg-slate-200"
                >
                  Regenerate
                </button>
              </div>
            )}
          />
        )}
      </div>
    </AdminShell>
  );
}
