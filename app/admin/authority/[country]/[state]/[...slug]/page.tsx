import Link from "next/link";
import { notFound } from "next/navigation";
import {
  listJurisdictions,
  listTopics,
  listRulesForJurisdiction,
  getRuleWithCitations,
  getReview,
  getActiveAlertsForRule,
} from "@/lib/authority/db";
import { AddToQueueButton } from "../../../components/AddToQueueButton";
import { usStates } from "@/app/config/usStates";
import { AdminShell } from "../../../../components/AdminShell";
import { AdminTable } from "../../../../components/AdminTable";
import { AdminBadge } from "../../../../components/AdminBadge";
import { AdminCodeBlock } from "../../../../components/AdminCodeBlock";
import { RuleEditor } from "../../../components/RuleEditor";

interface SlugPageProps {
  params: { country: string; state: string; slug: string[] };
}

export default async function SlugPage({ params }: SlugPageProps) {
  const { country, state, slug } = params;
  const stateCode = state.toLowerCase();
  const stateInfo = usStates[stateCode as keyof typeof usStates];
  if (!stateInfo) notFound();

  if (slug.length === 1) {
    // Could be city or topic
    const segment = slug[0];
    const allJurisdictions = await listJurisdictions();
    const allTopics = await listTopics();

    const isCity = allJurisdictions.some(
      (j) =>
        j.country.toLowerCase() === country.toLowerCase() &&
        j.state.toLowerCase() === stateCode &&
        j.city?.toLowerCase() === segment.toLowerCase()
    );
    const isTopic = allTopics.some(
      (t) => t.name.toLowerCase() === segment.toLowerCase()
    );

    if (isCity) {
      return <CityPageContent country={country} state={state} stateInfo={stateInfo} city={segment} />;
    }
    if (isTopic) {
      return <TopicPageContent country={country} state={state} stateInfo={stateInfo} topic={segment} />;
    }
    notFound();
  }

  if (slug.length === 2) {
    const [city, topic] = slug;
    return (
      <CityTopicPageContent
        country={country}
        state={state}
        stateInfo={stateInfo}
        city={city}
        topic={topic}
      />
    );
  }

  notFound();
}

// ── City Page Content ──

async function CityPageContent({
  country,
  state,
  stateInfo,
  city,
}: {
  country: string;
  state: string;
  stateInfo: { name: string };
  city: string;
}) {
  const allJurisdictions = await listJurisdictions();
  const cityJurisdiction = allJurisdictions.find(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === state.toLowerCase() &&
      j.city?.toLowerCase() === city.toLowerCase()
  );

  if (!cityJurisdiction) notFound();

  const rules = await listRulesForJurisdiction(cityJurisdiction.id);

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href={`/admin/authority/${country}/${state}`} className="hover:text-slate-900">
            {stateInfo.name}
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium capitalize">
            {city.replace(/-/g, " ")}
          </span>
        </>
      }
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 capitalize">
            {city.replace(/-/g, " ")}, {stateInfo.name} — Overrides
          </h1>
          <div className="flex gap-2 mt-2">
            <AdminBadge variant="city">City Override</AdminBadge>
          </div>
        </div>

        {rules.length > 0 ? (
          <AdminTable
            columns={[
              { label: "Topic", key: "topicName" },
              { label: "Version", key: "version" },
              { label: "Effective Date", key: "effectiveDate" },
              {
                label: "Supersedes",
                key: "supersedes",
                render: (row) => row.supersedes ?? "—",
              },
            ]}
            rows={rules}
            getRowKey={(row) => row.id}
            actions={(row) => (
              <Link
                href={`/admin/authority/${country}/${state}/${city}/${row.topicName}`}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                View Rule
              </Link>
            )}
          />
        ) : (
          <p className="text-slate-500 text-sm">No overridden topics for this city.</p>
        )}
      </div>
    </AdminShell>
  );
}

// ── Topic Page Content ──

async function TopicPageContent({
  country,
  state,
  stateInfo,
  topic,
}: {
  country: string;
  state: string;
  stateInfo: { name: string };
  topic: string;
}) {
  const allJurisdictions = await listJurisdictions();
  const stateJurisdiction = allJurisdictions.find(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === state.toLowerCase() &&
      !j.city
  );

  if (!stateJurisdiction) notFound();

  const result = await getRuleWithCitations(stateJurisdiction.id, topic);
  if (!result) notFound();

  const { rule, citations } = result;
  const review = await getReview(rule.id);
  const alerts = await getActiveAlertsForRule(rule.id);
  const lastUpdated = citations.length
    ? citations.reduce((max, c) => (c.lastUpdated > max ? c.lastUpdated : max), citations[0].lastUpdated)
    : null;

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href={`/admin/authority/${country}/${state}`} className="hover:text-slate-900">
            {stateInfo.name}
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{topic}</span>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {topic} — {stateInfo.name}
          </h1>
        </div>

        {/* Version info */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-2">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Version Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Version:</span>{" "}
              <span className="font-medium text-slate-900">{rule.version}</span>
            </div>
            <div>
              <span className="text-slate-500">Effective Date:</span>{" "}
              <span className="font-medium text-slate-900">{rule.effectiveDate}</span>
            </div>
            <div>
              <span className="text-slate-500">Supersedes:</span>{" "}
              <span className="font-medium text-slate-900">{rule.supersedes ?? "—"}</span>
            </div>
          </div>
        </div>

        {/* Statute change alerts */}
        {alerts.length > 0 && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <span className="font-semibold">Statute changes detected. Review required.</span>{" "}
            <Link href="/admin/authority/alerts" className="underline hover:text-red-900">
              View alerts
            </Link>
          </div>
        )}

        <div className="flex gap-2">
          <AddToQueueButton jurisdictionId={rule.jurisdictionId} topicId={rule.topicId} />
        </div>

        {/* Safety warnings */}
        {citations.length === 0 && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <span className="font-semibold">No citations attached.</span> This rule is not legally grounded.
          </div>
        )}
        {lastUpdated && (
          <div className="text-sm text-slate-500">
            Last updated: {lastUpdated} · {citations.length} citation
            {citations.length === 1 ? "" : "s"}
          </div>
        )}

        {/* Rule editor */}
        <RuleEditor
          ruleId={rule.id}
          initialDataJson={rule.dataJson}
          initialVersion={rule.version}
          initialEffectiveDate={rule.effectiveDate}
          citations={citations}
          initialReview={review ?? undefined}
        />
      </div>
    </AdminShell>
  );
}

// ── City Topic Page Content ──

async function CityTopicPageContent({
  country,
  state,
  stateInfo,
  city,
  topic,
}: {
  country: string;
  state: string;
  stateInfo: { name: string };
  city: string;
  topic: string;
}) {
  const allJurisdictions = await listJurisdictions();
  const cityJurisdiction = allJurisdictions.find(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === state.toLowerCase() &&
      j.city?.toLowerCase() === city.toLowerCase()
  );
  const stateJurisdiction = allJurisdictions.find(
    (j) =>
      j.country.toLowerCase() === country.toLowerCase() &&
      j.state.toLowerCase() === state.toLowerCase() &&
      !j.city
  );

  if (!cityJurisdiction) notFound();

  const cityResult = await getRuleWithCitations(cityJurisdiction.id, topic);
  if (!cityResult) notFound();

  const stateResult = stateJurisdiction
    ? await getRuleWithCitations(stateJurisdiction.id, topic)
    : null;

  const { rule, citations } = cityResult;
  const review = await getReview(rule.id);
  const alerts = await getActiveAlertsForRule(rule.id);
  const lastUpdated = citations.length
    ? citations.reduce((max, c) => (c.lastUpdated > max ? c.lastUpdated : max), citations[0].lastUpdated)
    : null;

  return (
    <AdminShell
      breadcrumb={
        <>
          <Link href="/admin" className="hover:text-slate-900">Admin</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href="/admin/authority" className="hover:text-slate-900">Authority</Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href={`/admin/authority/${country}/${state}`} className="hover:text-slate-900">
            {stateInfo.name}
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <Link href={`/admin/authority/${country}/${state}/${city}`} className="hover:text-slate-900 capitalize">
            {city.replace(/-/g, " ")}
          </Link>
          <span className="mx-2 text-slate-400">/</span>
          <span className="text-slate-900 font-medium">{topic}</span>
        </>
      }
    >
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {topic} — {city.replace(/-/g, " ")}, {stateInfo.name}{" "}
            <span className="text-slate-500 font-normal">(Override)</span>
          </h1>
          <div className="mt-2 rounded-md bg-orange-50 border border-orange-200 p-3 text-sm text-orange-800">
            This rule overrides the state-level rule for this topic.
          </div>
        </div>

        {/* Version info */}
        <div className="bg-white rounded-lg border border-slate-200 p-5 shadow-sm space-y-2">
          <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
            Version Info
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-slate-500">Version:</span>{" "}
              <span className="font-medium text-slate-900">{rule.version}</span>
            </div>
            <div>
              <span className="text-slate-500">Effective Date:</span>{" "}
              <span className="font-medium text-slate-900">{rule.effectiveDate}</span>
            </div>
            <div>
              <span className="text-slate-500">Supersedes:</span>{" "}
              <span className="font-medium text-slate-900">{rule.supersedes ?? "—"}</span>
            </div>
          </div>
        </div>

        {/* Statute change alerts */}
        {alerts.length > 0 && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <span className="font-semibold">Statute changes detected. Review required.</span>{" "}
            <Link href="/admin/authority/alerts" className="underline hover:text-red-900">
              View alerts
            </Link>
          </div>
        )}

        <div className="flex gap-2">
          <AddToQueueButton jurisdictionId={rule.jurisdictionId} topicId={rule.topicId} />
        </div>

        {/* Safety warnings */}
        {citations.length === 0 && (
          <div className="rounded-md bg-red-50 border border-red-200 p-4 text-sm text-red-800">
            <span className="font-semibold">No citations attached.</span> This rule is not legally grounded.
          </div>
        )}
        {lastUpdated && (
          <div className="text-sm text-slate-500">
            Last updated: {lastUpdated} · {citations.length} citation
            {citations.length === 1 ? "" : "s"}
          </div>
        )}

        {/* Rule editor */}
        <RuleEditor
          ruleId={rule.id}
          initialDataJson={rule.dataJson}
          initialVersion={rule.version}
          initialEffectiveDate={rule.effectiveDate}
          citations={citations}
          initialReview={review ?? undefined}
        />

        {/* Base state rule comparison */}
        {stateResult && (
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-slate-900">
              Base State Rule
            </h2>
            <p className="text-sm text-slate-500">
              Read-only view of the state-level rule this override replaces.
            </p>
            <AdminCodeBlock code={stateResult.rule.dataJson} />
          </div>
        )}
      </div>
    </AdminShell>
  );
}
