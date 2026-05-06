"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AcknowledgeButton({ alertId }: { alertId: number }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAcknowledge() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/authority/alerts/acknowledge", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ alertId }),
      });
      const json = await res.json();
      if (!json.success) {
        alert(json.error || "Failed to acknowledge alert");
        return;
      }
      router.push("/admin/authority/alerts");
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAcknowledge}
      disabled={loading}
      className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {loading ? "Acknowledging..." : "Acknowledge Alert"}
    </button>
  );
}
