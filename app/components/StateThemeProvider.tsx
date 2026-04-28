"use client";

import { createContext, useContext, ReactNode } from "react";

interface StateTheme {
  accent: string;
  seal?: string;
  name: string;
  slug: string;
}

const StateThemeContext = createContext<StateTheme>({
  accent: "#00205B",
  seal: "",
  name: "",
  slug: "",
});

export function StateThemeProvider({ state, children }: { state: StateTheme; children: ReactNode }) {
  return (
    <StateThemeContext.Provider value={state}>
      {children}
    </StateThemeContext.Provider>
  );
}

export function useStateTheme() {
  return useContext(StateThemeContext);
}