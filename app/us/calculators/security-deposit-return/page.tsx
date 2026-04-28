import type { Metadata } from "next";
import SecurityDepositReturnCalculator from "./SecurityDepositReturnCalculator";

export const metadata: Metadata = {
  title: "US Security Deposit Return Calculator",
  description: "Calculate security deposit return for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SecurityDepositReturnCalculator initialState={searchParams.state} />
    </main>
  );
}
