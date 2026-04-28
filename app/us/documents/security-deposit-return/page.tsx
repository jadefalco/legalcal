import type { Metadata } from "next";
import SecurityDepositReturnGenerator from "./SecurityDepositReturnGenerator";

export const metadata: Metadata = {
  title: "US Security Deposit Return Generator",
  description: "Generate a security deposit return demand letter for any US state.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { state?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SecurityDepositReturnGenerator initialState={searchParams.state} />
    </main>
  );
}
