"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";

import { getTheme } from "@/app/theme";
import { LCCard } from "@/app/components/lc/LCCard";
import { LCSection } from "@/app/components/lc/LCSection";
import { LCButton } from "@/app/components/lc/LCButton";

import {
  DocumentCheckIcon,
  ExclamationTriangleIcon,
  ShieldCheckIcon,
} from "@heroicons/react/24/outline";

const theme = getTheme("ca", "bc");

function SuccessPageInner() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [sessionData, setSessionData] = useState<Record<string, unknown> | null>(
    null
  );
  const [pdfBase64, setPdfBase64] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lawyerReviewLoading, setLawyerReviewLoading] = useState(false);
  const [lawyerReviewSuccess, setLawyerReviewSuccess] = useState(false);

  useEffect(() => {
    if (!token) {
      setError("Missing session token.");
      setLoading(false);
      return;
    }

    async function load() {
      try {
        const sessionRes = await fetch(
          `/api/checkout/bc-notice-tenant/session?token=${token}`
        );
        const sessionJson = await sessionRes.json();
        if (!sessionRes.ok || !sessionJson.data) {
          setError(sessionJson.error || "Session not found.");
          setLoading(false);
          return;
        }
        setSessionData(sessionJson.data);

        const pdfRes = await fetch(
          `/api/generate/bc-notice-tenant?token=${token}`
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
        a.download = "bc-tenant-notice-to-end-tenancy.pdf";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          setPdfBase64(reader.result as string);
          setLoading(false);
        };
      } catch (err) {
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    }

    load();
  }, [token]);

  async function handleLawyerReview() {
    if (!sessionData || !pdfBase64) return;
    setLawyerReviewLoading(true);
    setLawyerReviewSuccess(false);

    try {
      const res = await fetch("/api/lawyer-review", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...sessionData,
          pdfBase64,
        }),
      });

      const json = await res.json();
      if (!res.ok) {
        setError(json.error || "Failed to request lawyer review.");
        setLawyerReviewLoading(false);
        return;
      }

      setLawyerReviewSuccess(true);
      setLawyerReviewLoading(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unknown error");
      setLawyerReviewLoading(false);
    }
  }

  if (loading) {
    return (
      <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-slate-700" />
        </div>
      </main>
    );
  }

  if (error && !sessionData) {
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
          description="Your BC Tenant Notice to End Tenancy has been generated and downloaded."
          icon={DocumentCheckIcon}
          theme={theme}
        />

        {error && (
          <div className="flex items-center gap-2 text-red-700 bg-red-50 border border-red-200 rounded-lg px-4 py-3 text-sm">
            <ExclamationTriangleIcon className="w-5 h-5 shrink-0" />
            {error}
          </div>
        )}

        <LCCard theme={theme} className="space-y-6">
          <div className="flex items-center gap-2">
            <ShieldCheckIcon
              className="w-6 h-6"
              style={{ color: theme.colors.primary }}
            />
            <h2 className="text-lg font-semibold text-slate-800">
              Have a BC landlord‑tenant lawyer review this notice for $49.
            </h2>
          </div>
          <p className="text-sm text-slate-700 leading-relaxed">
            A lawyer can confirm your reason is valid, your dates are correct,
            and your notice complies with BC tenancy law.
          </p>

          {lawyerReviewSuccess ? (
            <div className="flex items-center gap-2 text-green-700 bg-green-50 border border-green-200 rounded-lg px-4 py-3 text-sm">
              <ShieldCheckIcon className="w-5 h-5 shrink-0" />
              Lawyer review request submitted successfully.
            </div>
          ) : (
            <LCButton
              variant="primary"
              theme={theme}
              onClick={handleLawyerReview}
              disabled={lawyerReviewLoading || !pdfBase64}
            >
              {lawyerReviewLoading
                ? "Submitting..."
                : "Request Lawyer Review — $49 CAD"}
            </LCButton>
          )}
        </LCCard>
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
