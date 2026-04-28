import type { Metadata } from "next";
import SmallClaimsEligibilityCalculator from "./SmallClaimsEligibilityCalculator";

export const metadata: Metadata = {
  title: "US Small Claims Eligibility Calculator",
  description: "Calculate small claims eligibility for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SmallClaimsEligibilityCalculator initialState={searchParams.state} />
    </main>
  );
}
