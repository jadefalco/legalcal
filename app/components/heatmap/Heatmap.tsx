"use client";

import { useState, useCallback } from "react";
import CanadaMap from "./CanadaMap";
import USMap from "./USMap";

interface HeatmapResult {
  jurisdiction: string;
  country: "CA" | "US";
  overallRisk: "low" | "medium" | "high";
  structuralRisk: "low" | "medium" | "high";
  proceduralRisk: "low" | "medium" | "high";
  documentationRisk: "low" | "medium" | "high";
  isPlaceholder: boolean;
  name: string;
}

interface HeatmapProps {
  data: HeatmapResult[];
}

interface TooltipState {
  visible: boolean;
  x: number;
  y: number;
  item: HeatmapResult | null;
}

function riskBadgeClass(level: "low" | "medium" | "high"): string {
  switch (level) {
    case "high":
      return "bg-red-100 text-red-800 border-red-200";
    case "medium":
      return "bg-amber-100 text-amber-800 border-amber-200";
    default:
      return "bg-green-100 text-green-800 border-green-200";
  }
}

export default function Heatmap({ data }: HeatmapProps) {
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    x: 0,
    y: 0,
    item: null,
  });
  const [selectedItem, setSelectedItem] = useState<HeatmapResult | null>(null);

  const handleHover = useCallback((item: HeatmapResult, x: number, y: number) => {
    setTooltip({ visible: true, x, y, item });
  }, []);

  const handleLeave = useCallback(() => {
    setTooltip((prev) => ({ ...prev, visible: false }));
  }, []);

  const handleClick = useCallback((item: HeatmapResult) => {
    setSelectedItem(item);
  }, []);

  const caData = data.filter((d) => d.country === "CA");
  const usData = data.filter((d) => d.country === "US");

  return (
    <div className="space-y-10">
      {/* Canada Heatmap */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">Canada</h3>
        <div className="flex justify-center">
          <CanadaMap
            data={caData}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
          />
        </div>
      </div>

      {/* US Heatmap */}
      <div>
        <h3 className="text-lg font-bold text-slate-900 mb-4">United States</h3>
        <div className="flex justify-center">
          <USMap
            data={usData}
            onHover={handleHover}
            onLeave={handleLeave}
            onClick={handleClick}
          />
        </div>
      </div>

      {/* Tooltip */}
      {tooltip.visible && tooltip.item && (
        <div
          className="fixed z-50 rounded-lg border border-slate-200 bg-white p-3 shadow-lg pointer-events-none"
          style={{
            left: tooltip.x + 12,
            top: tooltip.y - 12,
            maxWidth: 280,
          }}
        >
          <div className="font-semibold text-slate-900">
            {tooltip.item.name} ({tooltip.item.jurisdiction.toUpperCase()})
          </div>
          <div className="mt-2 flex flex-wrap gap-1">
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${riskBadgeClass(
                tooltip.item.overallRisk
              )}`}
            >
              Overall: {tooltip.item.overallRisk}
            </span>
          </div>
          <div className="mt-1 flex flex-wrap gap-1">
            <span className="text-xs text-slate-500">S: {tooltip.item.structuralRisk}</span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-500">P: {tooltip.item.proceduralRisk}</span>
            <span className="text-xs text-slate-500">·</span>
            <span className="text-xs text-slate-500">D: {tooltip.item.documentationRisk}</span>
          </div>
          {tooltip.item.isPlaceholder && (
            <div className="mt-1 text-xs text-slate-400">Placeholder / No data</div>
          )}
        </div>
      )}

      {/* Selected Jurisdiction Detail */}
      {selectedItem && (
        <div className="rounded-lg border border-slate-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <h4 className="text-base font-bold text-slate-900">
              {selectedItem.name} ({selectedItem.jurisdiction.toUpperCase()})
            </h4>
            <button
              onClick={() => setSelectedItem(null)}
              className="text-sm text-slate-500 hover:text-slate-800"
            >
              Close
            </button>
          </div>
          <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: "Structural", value: selectedItem.structuralRisk },
              { label: "Procedural", value: selectedItem.proceduralRisk },
              { label: "Documentation", value: selectedItem.documentationRisk },
              { label: "Overall", value: selectedItem.overallRisk },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border p-3 text-center">
                <div className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                  {item.label}
                </div>
                <div
                  className={`mt-2 inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${riskBadgeClass(
                    item.value
                  )}`}
                >
                  {item.value}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
