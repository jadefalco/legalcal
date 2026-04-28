import type { Metadata } from "next";
import SecurityDepositReturnGenerator from "./SecurityDepositReturnGenerator";

export const metadata: Metadata = {
  title: "Canada Security Deposit Return Generator",
  description: "Generate a security deposit return demand letter for any Canadian province.",
};

export default function Page({
  searchParams,
}: {
  searchParams: { province?: string };
}) {
  return (
    <main className="min-h-screen px-4 py-10 max-w-4xl mx-auto">
      <SecurityDepositReturnGenerator initialProvince={searchParams.province} />
    </main>
  );
}
