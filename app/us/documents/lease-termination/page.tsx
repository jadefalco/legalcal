import type { Metadata } from "next";
import LeaseTerminationGenerator from "./LeaseTerminationGenerator";

export const metadata: Metadata = {
  title: "US Lease Termination Generator",
  description: "Generate a lease termination notice letter for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <LeaseTerminationGenerator initialState={searchParams.state} />
    </main>
  );
}
