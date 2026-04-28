import type { Metadata } from "next";
import EvictionNoticeGenerator from "./EvictionNoticeGenerator";

export const metadata: Metadata = {
  title: "US Eviction Notice Generator",
  description:
    "Generate a jurisdiction-specific eviction notice letter for any US state. Select the state, reason, and fill in tenant and landlord details to create a legally structured notice.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <EvictionNoticeGenerator initialState={searchParams.state} />
    </main>
  );
}
