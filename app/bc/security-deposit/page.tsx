import { getRuleFromBundle } from "@/lib/authority/bundle";
import JurisdictionLayout from "@/components/JurisdictionLayout";
import RuleFreshnessBanner from "@/components/RuleFreshnessBanner";

function SecurityDepositCalculator() {
  return (
    <div className="rounded-lg border border-slate-200 bg-slate-50 p-8 text-center">
      <p className="text-slate-500">Calculator coming soon.</p>
    </div>
  );
}

export default function BCSecurityDepositPage() {
  const rule = getRuleFromBundle("bc", "security-deposit");

  return (
    <JurisdictionLayout code="CA-BC">
      <h1 className="text-3xl font-bold text-slate-900">
        BC Security Deposit Calculator
      </h1>
      <RuleFreshnessBanner topic="security-deposit" jurisdiction="bc" />
      <p className="mt-4 text-lg text-slate-700">
        Calculate the maximum allowable security deposit and return deadline
        for residential tenancies in British Columbia based on current RTB rules.
      </p>

      {rule && (
        <section className="mt-6 rounded-lg border border-slate-200 bg-white p-4">
          <h2 className="text-sm font-semibold uppercase tracking-wide text-slate-500">
            Rule Metadata
          </h2>
          <dl className="mt-2 grid grid-cols-2 gap-4">
            <div>
              <dt className="text-xs text-slate-500">Version</dt>
              <dd className="font-medium text-slate-900">
                {rule.version.version}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Citations</dt>
              <dd className="font-medium text-slate-900">
                {rule.citations.length}
              </dd>
            </div>
          </dl>
        </section>
      )}

      <section className="mt-8">
        <SecurityDepositCalculator />
      </section>
    </JurisdictionLayout>
  );
}
