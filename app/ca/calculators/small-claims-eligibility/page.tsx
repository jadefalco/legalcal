import type { Metadata } from "next";
import SmallClaimsEligibilityCalculator from "./SmallClaimsEligibilityCalculator";

export const metadata: Metadata = {
  title: "Canada Small Claims Eligibility Calculator",
  description: "Calculate small claims eligibility for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SmallClaimsEligibilityCalculator initialProvince={searchParams.province} />
    </main>
  );
}
