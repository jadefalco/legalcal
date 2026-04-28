import type { Metadata } from "next";
import EvictionTimelineCalculator from "./EvictionTimelineCalculator";

export const metadata: Metadata = {
  title: "Canada Eviction Timeline Calculator",
  description: "Calculate eviction timeline for any Canadian province or territory.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <EvictionTimelineCalculator initialProvince={searchParams.province} />
    </main>
  );
}
