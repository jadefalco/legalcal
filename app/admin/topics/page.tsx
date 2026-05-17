"use client";

import { useState, useEffect, useTransition } from "react";
import Link from "next/link";

interface TopicInfo {
  id: string;
  label: string;
  description?: string;
  createdAt: string;
  status: "active" | "placeholder" | "draft";
  coverage: {
    total: number;
    placeholder: number;
    real: number;
    coveragePercent: number;
  };
}

function statusBadge(status: string): string {
  switch (status) {
    case "active":
      return "bg-green-100 text-green-800 border-green-200";
    case "placeholder":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-slate-100 text-slate-800 border-slate-200";
  }
}

function coverageBar(percent: number): string {
  if (percent >= 80) return "bg-green-500";
  if (percent >= 40) return "bg-amber-500";
  return "bg-red-500";
}

export default function TopicsPage() {
  const [topics, setTopics] = useState<TopicInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [newTopicId, setNewTopicId] = useState("");
  const [newTopicLabel, setNewTopicLabel] = useState("");
  const [newTopicDescription, setNewTopicDescription] = useState("");
  const [isCreating, startCreating] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);

  useEffect(() => {
    fetchTopics();
  }, []);

  function fetchTopics() {
    fetch("/api/topics/list")
      .then((res) => res.json())
      .then((data) => {
        setTopics(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load topics");
        setLoading(false);
      });
  }

  function createTopic() {
    setError(null);
    if (!newTopicId.trim() || !newTopicLabel.trim()) {
      setError("Topic ID and label are required");
      return;
    }

    startCreating(async () => {
      try {
        const res = await fetch("/api/topics/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            topicId: newTopicId,
            label: newTopicLabel,
            description: newTopicDescription,
          }),
        });
        const json = await res.json();
        if (!res.ok) {
          setError(json.error || "Failed to create topic");
        } else {
          setShowModal(false);
          setNewTopicId("");
          setNewTopicLabel("");
          setNewTopicDescription("");
          fetchTopics();
        }
      } catch {
        setError("Network error");
      }
    });
  }

  return (
    <main className="mx-auto max-w-7xl px-6 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Topic Management</h1>
          <p className="mt-2 text-slate-600">
            Create and manage regulatory topics across all 64 jurisdictions.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="rounded-md bg-blue-900 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-blue-800"
        >
          + Create New Topic
        </button>
      </div>

      {/* Stats */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Total Topics</div>
          <div className="mt-1 text-3xl font-bold text-slate-900">
            {topics.length}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Active</div>
          <div className="mt-1 text-3xl font-bold text-green-700">
            {topics.filter((t) => t.status === "active").length}
          </div>
        </div>
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="text-sm text-slate-500">Placeholder Only</div>
          <div className="mt-1 text-3xl font-bold text-amber-700">
            {topics.filter((t) => t.status === "placeholder").length}
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-6 rounded-lg border border-red-200 bg-red-50 p-4">
          <p className="text-sm text-red-700">{error}</p>
        </div>
      )}

      {/* Topics Table */}
      <div className="mt-8 overflow-x-auto rounded-lg border border-slate-200 bg-white">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Topic
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Status
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Coverage
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Placeholders
              </th>
              <th className="px-4 py-3 text-left font-semibold text-slate-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-200">
            {loading ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  Loading topics…
                </td>
              </tr>
            ) : topics.length === 0 ? (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">
                  No topics found. Create your first topic.
                </td>
              </tr>
            ) : (
              topics.map((topic) => (
                <>
                  <tr key={topic.id} className="hover:bg-slate-50">
                    <td className="px-4 py-3">
                      <div className="font-semibold text-slate-900">
                        {topic.label}
                      </div>
                      <div className="text-xs text-slate-500">
                        {topic.id}
                      </div>
                      {topic.description && (
                        <div className="mt-1 text-xs text-slate-400">
                          {topic.description}
                        </div>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${statusBadge(
                          topic.status
                        )}`}
                      >
                        {topic.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <div className="h-2 w-20 rounded-full bg-slate-200">
                          <div
                            className={`h-2 rounded-full ${coverageBar(
                              topic.coverage.coveragePercent
                            )}`}
                            style={{
                              width: `${topic.coverage.coveragePercent}%`,
                            }}
                          />
                        </div>
                        <span className="text-xs text-slate-600">
                          {topic.coverage.coveragePercent}%
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600">
                      {topic.coverage.placeholder} / {topic.coverage.total}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-wrap gap-2">
                        <Link
                          href={`/admin/rules/${topic.id}`}
                          className="text-xs font-medium text-blue-700 hover:underline"
                        >
                          View Rules
                        </Link>
                        <button
                          onClick={() =>
                            setExpandedTopic(
                              expandedTopic === topic.id ? null : topic.id
                            )
                          }
                          className="text-xs font-medium text-slate-600 hover:text-slate-900"
                        >
                          {expandedTopic === topic.id ? "Collapse" : "Expand"}
                        </button>
                      </div>
                    </td>
                  </tr>
                  {expandedTopic === topic.id && (
                    <tr>
                      <td colSpan={5} className="bg-slate-50 px-4 py-4">
                        <div className="text-sm font-semibold text-slate-700 mb-3">
                          Jurisdiction Coverage
                        </div>
                        <JurisdictionChecklist topicId={topic.id} />
                      </td>
                    </tr>
                  )}
                </>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Create New Topic
            </h2>
            <p className="mt-1 text-sm text-slate-600">
              This will scaffold placeholder rules for all 64 jurisdictions.
            </p>

            <div className="mt-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Topic ID
                </label>
                <input
                  value={newTopicId}
                  onChange={(e) =>
                    setNewTopicId(
                      e.target.value.toLowerCase().replace(/\s+/g, "-")
                    )
                  }
                  placeholder="e.g. utilities"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="mt-1 text-xs text-slate-500">
                  Lowercase letters, numbers, and hyphens only.
                </p>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Label
                </label>
                <input
                  value={newTopicLabel}
                  onChange={(e) => setNewTopicLabel(e.target.value)}
                  placeholder="e.g. Utilities and Essential Services"
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">
                  Description (optional)
                </label>
                <textarea
                  value={newTopicDescription}
                  onChange={(e) => setNewTopicDescription(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowModal(false);
                  setError(null);
                }}
                className="rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={createTopic}
                disabled={isCreating}
                className={`rounded-md px-5 py-2 text-sm font-medium text-white transition-colors ${
                  isCreating
                    ? "bg-blue-300 cursor-wait"
                    : "bg-blue-900 hover:bg-blue-800"
                }`}
              >
                {isCreating ? "Creating…" : "Create Topic"}
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

function JurisdictionChecklist({ topicId }: { topicId: string }) {
  const [jurisdictions, setJurisdictions] = useState<
    Array<{
      code: string;
      name: string;
      country: string;
      isPlaceholder: boolean;
      version: string;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/topics/coverage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId }),
    })
      .then((res) => res.json())
      .then(() => {
        // Fetch rule details from the bundle via a separate endpoint
        // For now, we'll use a simplified approach
        fetch(`/api/trends/jurisdiction`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ topic: topicId, jurisdiction: "bc" }),
        }).catch(() => {});
      });

    // Load jurisdictions list from a static source or fetch all
    fetch("/api/topics/list")
      .then((res) => res.json())
      .then((topics: TopicInfo[]) => {
        const topic = topics.find((t) => t.id === topicId);
        if (!topic) {
          setLoading(false);
          return;
        }
        // We need jurisdiction details. For now, show a simplified view.
        setJurisdictions([]);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [topicId]);

  if (loading) {
    return <div className="text-sm text-slate-500">Loading jurisdictions…</div>;
  }

  return (
    <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-8">
      {jurisdictions.map((j) => (
        <div
          key={j.code}
          className={`rounded border px-2 py-1.5 text-xs ${
            j.isPlaceholder
              ? "border-amber-200 bg-amber-50 text-amber-800"
              : "border-green-200 bg-green-50 text-green-800"
          }`}
        >
          <div className="font-medium">{j.code.toUpperCase()}</div>
          <div className="text-[10px] opacity-75">
            {j.isPlaceholder ? "Placeholder" : j.version}
          </div>
        </div>
      ))}
    </div>
  );
}
