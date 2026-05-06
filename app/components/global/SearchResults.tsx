"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

interface Props {
  query: string;
  close: () => void;
}

export default function SearchResults({ query, close }: Props) {
  const [states, setStates] = useState<any[]>([]);
  const [calculators, setCalculators] = useState<any[]>([]);

  // Load states + calculators from API route
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/search");
      const data = await res.json();
      setStates(data.states);
      setCalculators(data.calculators);
    };
    fetchData();
  }, []);

  const q = query.toLowerCase();

  const filteredStates = states.filter((s) =>
    s.name.toLowerCase().includes(q)
  );

  const filteredCalcs = calculators.filter((c) =>
    c.name.toLowerCase().includes(q)
  );

  return (
    <div className="absolute left-0 mt-2 w-80 bg-white border rounded-lg shadow-lg z-50 p-3 space-y-4">

      {/* States */}
      {filteredStates.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2">States</h4>
          <div className="space-y-1">
            {filteredStates.map((s) => (
              <Link
                key={s.code}
                href={`/us/states/${s.code}`}
                onClick={close}
                className="block px-2 py-1 rounded hover:bg-slate-100 text-sm"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* Calculators */}
      {filteredCalcs.length > 0 && (
        <div>
          <h4 className="text-xs font-semibold text-slate-500 mb-2">
            Calculators
          </h4>
          <div className="space-y-1">
            {filteredCalcs.map((c) => (
              <Link
                key={c.slug}
                href={c.url}
                onClick={close}
                className="block px-2 py-1 rounded hover:bg-slate-100 text-sm"
              >
                {c.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* No results */}
      {filteredStates.length === 0 && filteredCalcs.length === 0 && (
        <div className="text-center text-sm text-slate-500 py-4">
          <MagnifyingGlassIcon className="w-6 h-6 mx-auto mb-1 text-slate-400" />
          No results found
        </div>
      )}
    </div>
  );
}