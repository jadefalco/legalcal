"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function AddToQueueButton({
  jurisdictionId,
  topicId,
}: {
  jurisdictionId: number;
  topicId: number;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleAdd() {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/authority/research/queue/add", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jurisdictionId, topicId }),
      });
      const json = await res.json();
      if (!json.success) {
        alert(json.error || "Failed to add to queue");
        return;
      }
      router.refresh();
    } catch (err) {
      alert(err instanceof Error ? err.message : "Unknown error");
    } finally {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleAdd}
      disabled={loading}
      className="inline-flex items-center rounded-md bg-amber-50 px-3 py-1.5 text-sm font-medium text-amber-700 hover:bg-amber-100 transition-colors disabled:opacity-50"
    >
      {loading ? "Adding..." : "Add to Research Queue"}
    </button>
  );
}
