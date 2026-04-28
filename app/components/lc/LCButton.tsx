"use client";

import type { ButtonHTMLAttributes } from "react";
import type { LCButtonProps } from "./types";

export const LCButton = ({
  children,
  variant = "primary",
  className = "",
  theme,
  ...props
}: LCButtonProps & ButtonHTMLAttributes<HTMLButtonElement>) => {
  const primaryColor = theme?.colors?.primary;

  const base =
    "inline-flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg transition focus:outline-none focus:ring-2 focus:ring-offset-1";

  const variants: Record<string, string> = {
    primary: "text-white hover:opacity-90",
    secondary: "bg-slate-900 text-white hover:bg-black",
    ghost: "bg-white text-slate-800 border hover:bg-slate-100",
  };

  const style: React.CSSProperties & Record<string, string> = {};
  if (variant === "primary" && primaryColor) {
    style.backgroundColor = primaryColor;
    style.borderColor = primaryColor;
    style.borderWidth = "1px";
    style.borderStyle = "solid";
    style["--tw-ring-color"] = primaryColor;
  } else if (variant === "primary") {
    style.backgroundColor = "#2563EB";
  }

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      style={style}
      {...props}
    >
      {children}
    </button>
  );
};
