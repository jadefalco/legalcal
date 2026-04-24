"use client";

export default function CACalculatorClient() {
  return (
    <div className="space-y-6">
      <section className="border rounded p-4 bg-gray-50">
        <h2 className="text-xl font-semibold mb-2">
          Final Paycheck Deadline — Ontario
        </h2>
        <p className="text-gray-700">Calculate final paycheck deadlines and accrued vacation payouts.</p>
      </section>

      <section className="border rounded p-4 bg-white">
        <p className="text-sm text-gray-500">
          This calculator provides general information only and does not
          constitute legal advice. Consult a lawyer for advice specific to your
          situation.
        </p>
      </section>
    </div>
  );
}
