import USCalculatorClient from "./CalculatorClient";

export default function Page() {
  return (
    <USCalculatorClient
      theme={{}}
      title="CALCULATOR_NAME"
      description="CALCULATOR_DESCRIPTION"
      sections={CALCULATOR_SECTIONS}
    />
  );
}