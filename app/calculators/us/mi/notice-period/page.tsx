import USCalculatorClient from "./CalculatorClient";
import { getTheme } from "@/app/theme";

export default function Page() {
  return (
    <USCalculatorClient
      theme={getTheme("us", "mi")}
      title="Notice Period"
      description="Calculate notice period requirements for residential and employment terminations."
      sections={[{"title":"What is a Notice Period?","content":"A notice period is the required time a landlord or employer must give before ending a tenancy or employment."},{"title":"Why Notice Periods Matter","content":"They protect tenants and employees by ensuring they have time to prepare for major life changes."}]}
    />
  );
}