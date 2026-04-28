"use client";

import Image from "next/image";
import { useStateTheme } from "./StateThemeProvider";

interface StateHeaderProps {
  title: string;
  description: string;
}

export default function StateHeader({ title, description }: StateHeaderProps) {
  const { accent, seal, name } = useStateTheme();

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-navy">{title}</h1>

        {seal && (
          <Image
            src={seal}
            alt={`${name} state seal`}
            width={60}
            height={60}
            className="opacity-20"
          />
        )}
      </div>

      <p className="text-gray-700 text-base mt-2">{description}</p>

      <div
        className="h-1 w-20 rounded-full mt-4"
        style={{ backgroundColor: accent }}
      />
    </div>
  );
}