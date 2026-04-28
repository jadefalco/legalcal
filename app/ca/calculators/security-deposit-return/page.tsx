import type { Metadata } from "next";
import SecurityDepositReturnCalculator from "./SecurityDepositReturnCalculator";

export const metadata: Metadata = {
  title: "Canada Security Deposit Return Calculator",
  description: "Calculate security deposit return for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SecurityDepositReturnCalculator initialProvince={searchParams.province} />
    </main>
  );
}
