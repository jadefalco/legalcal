import type { Metadata } from "next";
import EvictionNoticeCalculator from "./EvictionNoticeCalculator";

export const metadata: Metadata = {
  title: "US Eviction Notice Calculator",
  description:
    "Calculate the legal eviction notice deadline for any US state. Select the state, reason, and notice date to get the exact deadline.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <EvictionNoticeCalculator initialState={searchParams.state} />
    </main>
  );
}
