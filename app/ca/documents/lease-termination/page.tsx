import type { Metadata } from "next";
import LeaseTerminationGenerator from "./LeaseTerminationGenerator";

export const metadata: Metadata = {
  title: "Canada Lease Termination Generator",
  description: "Generate a lease termination notice letter for any Canadian province.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <LeaseTerminationGenerator initialProvince={searchParams.province} />
    </main>
  );
}
