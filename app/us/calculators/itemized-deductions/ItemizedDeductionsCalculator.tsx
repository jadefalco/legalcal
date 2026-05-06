export default function PlaceholderCalculator({ initialState }: { initialState?: string }) {
  return (
    <div className="prose mx-auto py-10">
      <h1>Calculator Coming Soon</h1>
      <p>This calculator is not yet implemented for {initialState?.toUpperCase()}.</p>
    </div>
  );
}