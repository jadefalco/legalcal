import { usStates } from "@/app/config/usStates";

export async function GET() {
  const states = Object.entries(usStates).map(([code, state]) => ({
    code: state.slug,
    name: state.name,
  }));

  // Hardcode calculators for now (expand later)
  const calculators = [
    {
      name: "Notice Period Calculator",
      slug: "notice-period",
      url: "/calculators",
    },
    {
      name: "Eviction Timeline Calculator",
      slug: "eviction-timeline",
      url: "/eviction-timeline",
    },
  ];

  return Response.json({ states, calculators });
}
