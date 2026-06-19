"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { getTheme } from "@/app/theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";

import {
  DocumentCheckIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "ab");

function SuccessPageInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setError("Missing session token.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const pdfRes = await fetch(
          `/api/generate/ab-notice-to-enter?token=${token}`
        );
        if (!pdfRes.ok) {
          const pdfJson = await pdfRes.json().catch(() => ({}));
          setError(pdfJson.error || "Failed to generate PDF.");
          setLoading(false);
          return;
        }

        const blob = await pdfRes.blob();

        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "ab-notice-to-enter.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }

    load();
  }, [token]);

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-700" />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
        <LCCard theme={theme} className="space-y-4">
          <div className="flex items-center gap-2 text-red-700">
            <ExclamationTriangleIcon className="w-6 h-6" />
            <h2 className="text-lg font-semibold">Error</h2>
          </div>
          <p className="text-sm text-slate-700">{error}</p>
        </LCCard>
      </main>
    );
  }

  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <div className="space-y-8">
        <LCSection
          title="Payment Successful"
          description="Your Alberta Notice to Enter has been generated and downloaded."
          icon={DocumentCheckIcon}
          theme={theme}
        />
      </div>
    </main>
  );
}

export default function SuccessPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-700" />
          </div>
        </main>
      }
    >
      <SuccessPageInner />
    </Suspense>
  );
}
