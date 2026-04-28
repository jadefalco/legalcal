import type { Metadata } from "next";
import EvictionNoticeGenerator from "./EvictionNoticeGenerator";

export const metadata: Metadata = {
  title: "Canada Eviction Notice Generator",
  description: "Generate a jurisdiction-specific eviction notice letter for any Canadian province.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <EvictionNoticeGenerator initialProvince={searchParams.province} />
    </main>
  );
}
