"use client";

import { useState } from "react";
import Link from "next/link";
import { defaultTheme } from "@/app/theme";
import StateSectionHeader from "@/app/components/lc/StateSectionHeader";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCButton } from "@/app/components/lc/LCButton";
import { KeyIcon, DocumentDuplicateIcon } from "@heroicons/react/24/outline";

export default function DeveloperSignupPage() {
  const theme = defaultTheme;
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [intendedUse, setIntendedUse] = useState("");
  const [tier, setTier] = useState("free");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<{
    success: boolean;
    key?: string;
    message?: string;
    error?: string;
  } | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch("/api/developers/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, intendedUse, tier }),
      });
      const json = await res.json();
      setResult(json);
    } catch (err) {
      setResult({
        success: false,
        error: err instanceof Error ? err.message : "Unknown error",
      });
    } finally {
      setLoading(false);
    }
  }

  function copyKey() {
    if (result?.key) {
      navigator.clipboard.writeText(result.key);
    }
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <section className="bg-gradient-to-b from-blue-50 to-white py-16 md:py-20">
        <div className="max-w-2xl mx-auto px-4 text-center space-y-6">
          <StateSectionHeader
            title="Get Your API Key"
            description="Create a free account to access the LegalCals API. Upgrade anytime as you scale."
            icon={KeyIcon}
            theme={theme}
          />
        </div>
      </section>

      <section className="max-w-2xl mx-auto px-4 py-12">
        {result?.success && result.key ? (
          <LCCard theme={theme} className="space-y-6">
            <div className="text-center space-y-2">
              <h2 className="text-xl font-bold text-slate-900">Your API Key is Ready</h2>
              <p className="text-sm text-slate-600">{result.message}</p>
            </div>
            <div className="bg-slate-900 text-slate-100 rounded-lg p-4 flex items-center justify-between gap-4">
              <code className="text-sm font-mono break-all">{result.key}</code>
              <button
                onClick={copyKey}
                className="shrink-0 text-slate-400 hover:text-white transition-colors"
                title="Copy to clipboard"
              >
                <DocumentDuplicateIcon className="w-5 h-5" />
              </button>
            </div>
            <div className="flex justify-center gap-4">
              <Link href="/developers">
                <LCButton variant="ghost" theme={theme}>
                  Back to Developer Portal
                </LCButton>
              </Link>
              <Link href="/developers">
                <LCButton variant="primary" theme={theme}>
                  View Documentation
                </LCButton>
              </Link>
            </div>
          </LCCard>
        ) : (
          <LCCard theme={theme}>
            <form onSubmit={handleSubmit} className="space-y-6">
              {result?.error && (
                <div className="rounded-md bg-red-50 border border-red-200 p-3 text-sm text-red-800">
                  {result.error}
                </div>
              )}
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">
                    Intended Use
                  </label>
                  <textarea
                    value={intendedUse}
                    onChange={(e) => setIntendedUse(e.target.value)}
                    rows={3}
                    placeholder="Describe what you're building..."
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tier</label>
                  <select
                    value={tier}
                    onChange={(e) => setTier(e.target.value)}
                    className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:ring-blue-500"
                  >
                    <option value="free">Free — 1,000 req/mo</option>
                    <option value="pro">Pro — 100,000 req/mo</option>
                    <option value="enterprise">Enterprise — 1,000,000 req/mo</option>
                  </select>
                </div>
              </div>
              <LCButton
                type="submit"
                variant="primary"
                theme={theme}
                className="w-full justify-center"
                disabled={loading}
              >
                {loading ? "Generating..." : "Generate API Key"}
              </LCButton>
            </form>
          </LCCard>
        )}
      </section>
    </div>
  );
}
