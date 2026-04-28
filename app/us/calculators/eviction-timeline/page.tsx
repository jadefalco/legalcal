import type { Metadata } from "next";
import EvictionTimelineCalculator from "./EvictionTimelineCalculator";

export const metadata: Metadata = {
  title: "US Eviction Timeline Calculator",
  description: "Calculate eviction timeline for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <EvictionTimelineCalculator initialState={searchParams.state} />
    </main>
  );
}
