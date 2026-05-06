"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import SearchResults from "./SearchResults";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);

  // Close search panel on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  return (
    <div className="relative">
      {/* Search Input */}
      <div className="flex items-center bg-slate-100 rounded-md px-3 py-2">
        <MagnifyingGlassIcon className="w-5 h-5 text-slate-500" />
        <input
          type="text"
          placeholder="Search states or calculators..."
          className="bg-transparent ml-2 outline-none text-sm w-48"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setOpen(true);
          }}
        />
        {query && (
          <XMarkIcon
            className="w-5 h-5 text-slate-400 cursor-pointer"
            onClick={() => {
              setQuery("");
              setOpen(false);
            }}
          />
        )}
      </div>

      {/* Results Panel */}
      {open && query.length > 0 && (
        <SearchResults query={query} close={() => setOpen(false)} />
      )}
    </div>
  );
}