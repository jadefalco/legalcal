"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface HeatmapCell {
  jurisdiction: string;
  country: string;
  value: number;
}

const sampleData: HeatmapCell[] = [
  // Canada
  { jurisdiction: "BC", country: "CA", value: 1.0 },
  { jurisdiction: "AB", country: "CA", value: 0.2 },
  { jurisdiction: "SK", country: "CA", value: 0.2 },
  { jurisdiction: "MB", country: "CA", value: 0.2 },
  { jurisdiction: "ON", country: "CA", value: 0.3 },
  { jurisdiction: "QC", country: "CA", value: 0.3 },
  { jurisdiction: "NB", country: "CA", value: 0.2 },
  { jurisdiction: "NS", country: "CA", value: 0.2 },
  { jurisdiction: "PE", country: "CA", value: 0.2 },
  { jurisdiction: "NL", country: "CA", value: 0.2 },
  { jurisdiction: "YT", country: "CA", value: 0.2 },
  { jurisdiction: "NT", country: "CA", value: 0.2 },
  { jurisdiction: "NU", country: "CA", value: 0.2 },
  // US
  { jurisdiction: "WA", country: "US", value: 0.5 },
  { jurisdiction: "OR", country: "US", value: 0.5 },
  { jurisdiction: "CA", country: "US", value: 1.0 },
  { jurisdiction: "NV", country: "US", value: 0.5 },
  { jurisdiction: "AZ", country: "US", value: 0.8 },
  { jurisdiction: "UT", country: "US", value: 0.4 },
  { jurisdiction: "ID", country: "US", value: 0.4 },
  { jurisdiction: "MT", country: "US", value: 0.2 },
  { jurisdiction: "WY", country: "US", value: 0.2 },
  { jurisdiction: "CO", country: "US", value: 0.5 },
  { jurisdiction: "NM", country: "US", value: 0.5 },
  { jurisdiction: "ND", country: "US", value: 0.2 },
  { jurisdiction: "SD", country: "US", value: 0.2 },
  { jurisdiction: "NE", country: "US", value: 0.2 },
  { jurisdiction: "KS", country: "US", value: 0.2 },
  { jurisdiction: "OK", country: "US", value: 0.5 },
  { jurisdiction: "TX", country: "US", value: 0.8 },
  { jurisdiction: "MN", country: "US", value: 0.3 },
  { jurisdiction: "IA", country: "US", value: 0.2 },
  { jurisdiction: "MO", country: "US", value: 0.5 },
  { jurisdiction: "AR", country: "US", value: 0.3 },
  { jurisdiction: "LA", country: "US", value: 0.5 },
  { jurisdiction: "WI", country: "US", value: 0.3 },
  { jurisdiction: "IL", country: "US", value: 0.5 },
  { jurisdiction: "MI", country: "US", value: 0.5 },
  { jurisdiction: "IN", country: "US", value: 0.5 },
  { jurisdiction: "OH", country: "US", value: 0.5 },
  { jurisdiction: "KY", country: "US", value: 0.5 },
  { jurisdiction: "TN", country: "US", value: 0.5 },
  { jurisdiction: "MS", country: "US", value: 0.3 },
  { jurisdiction: "AL", country: "US", value: 0.8 },
  { jurisdiction: "GA", country: "US", value: 0.5 },
  { jurisdiction: "FL", country: "US", value: 0.8 },
  { jurisdiction: "SC", country: "US", value: 0.5 },
  { jurisdiction: "NC", country: "US", value: 0.5 },
  { jurisdiction: "VA", country: "US", value: 0.5 },
  { jurisdiction: "WV", country: "US", value: 0.3 },
  { jurisdiction: "PA", country: "US", value: 0.5 },
  { jurisdiction: "NY", country: "US", value: 1.0 },
  { jurisdiction: "VT", country: "US", value: 0.3 },
  { jurisdiction: "NH", country: "US", value: 0.3 },
  { jurisdiction: "ME", country: "US", value: 0.3 },
  { jurisdiction: "MA", country: "US", value: 0.5 },
  { jurisdiction: "RI", country: "US", value: 0.5 },
  { jurisdiction: "CT", country: "US", value: 0.5 },
  { jurisdiction: "NJ", country: "US", value: 0.8 },
  { jurisdiction: "DE", country: "US", value: 0.5 },
  { jurisdiction: "MD", country: "US", value: 0.5 },
  { jurisdiction: "DC", country: "US", value: 0.5 },
  { jurisdiction: "AK", country: "US", value: 0.8 },
  { jurisdiction: "HI", country: "US", value: 0.5 },
];

export default function HeatmapPreview() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{
    x: number;
    y: number;
    jurisdiction: string;
    country: string;
    value: number;
  } | null>(null);

  useEffect(() => {
    const svg = d3.select(svgRef.current);
    if (svg.empty()) return;

    svg.selectAll("*").remove();

    const container = svg.node()?.parentElement;
    const width = container ? container.clientWidth : 800;
    const cellSize = Math.max(28, Math.floor((width - 48) / 13));
    const gap = 4;

    const caData = sampleData.filter((d) => d.country === "CA");
    const usData = sampleData.filter((d) => d.country === "US");

    const colorScale = d3
      .scaleLinear<string>()
      .domain([0, 0.5, 1])
      .range(["#4ADE80", "#FACC15", "#F87171"]);

    function drawGroup(data: HeatmapCell[], startY: number, cols: number) {
      const group = svg.append("g").attr("transform", `translate(24, ${startY})`);

      group
        .selectAll("rect")
        .data(data)
        .join("rect")
        .attr("x", (_d, i) => (i % cols) * (cellSize + gap))
        .attr("y", (_d, i) => Math.floor(i / cols) * (cellSize + gap))
        .attr("width", cellSize)
        .attr("height", cellSize)
        .attr("rx", 6)
        .attr("ry", 6)
        .attr("fill", (d) => colorScale(d.value))
        .attr("opacity", 0)
        .on("mouseenter", function (event, d) {
          d3.select(this).attr("stroke", "#0A1A2F").attr("stroke-width", 2);
          setTooltip({
            x: event.clientX,
            y: event.clientY,
            jurisdiction: d.jurisdiction,
            country: d.country,
            value: d.value,
          });
        })
        .on("mousemove", function (event, d) {
          setTooltip({
            x: event.clientX,
            y: event.clientY,
            jurisdiction: d.jurisdiction,
            country: d.country,
            value: d.value,
          });
        })
        .on("mouseleave", function () {
          d3.select(this).attr("stroke", "none");
          setTooltip(null);
        })
        .transition()
        .duration(800)
        .delay((_d, i) => i * 30)
        .attr("opacity", 1);

      group
        .selectAll("text")
        .data(data)
        .join("text")
        .attr("x", (_d, i) => (i % cols) * (cellSize + gap) + cellSize / 2)
        .attr("y", (_d, i) => Math.floor(i / cols) * (cellSize + gap) + cellSize / 2)
        .attr("text-anchor", "middle")
        .attr("dominant-baseline", "central")
        .attr("font-size", 10)
        .attr("font-weight", 600)
        .attr("fill", (d) => (d.value > 0.6 ? "#fff" : "#0A1A2F"))
        .attr("pointer-events", "none")
        .text((d) => d.jurisdiction)
        .attr("opacity", 0)
        .transition()
        .duration(800)
        .delay((_d, i) => i * 30 + 200)
        .attr("opacity", 1);
    }

    const caHeight = Math.ceil(caData.length / 13) * (cellSize + gap);
    drawGroup(caData, 40, 13);
    drawGroup(usData, 40 + caHeight + 32, 10);

    const totalHeight =
      40 + caHeight + 32 + Math.ceil(usData.length / 10) * (cellSize + gap) + 24;
    svg.attr("height", totalHeight);
  }, []);

  return (
    <section className="bg-slate-50 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            National Heatmap
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See compliance risk at a glance across every province, territory,
            and state.
          </p>
        </div>

        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
          <svg ref={svgRef} width="100%" className="overflow-visible" />
        </div>

        <div className="mx-auto mt-8 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-[#4ADE80]" />
            Low Risk
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-[#FACC15]" />
            Medium Risk
          </div>
          <div className="flex items-center gap-2">
            <span className="inline-block h-3 w-3 rounded bg-[#F87171]" />
            High Risk
          </div>
        </div>

        <div className="mt-10 text-center">
          <a
            href="/admin/heatmap"
            className="inline-flex items-center rounded-lg bg-brandBlue px-6 py-3 text-sm font-semibold text-white shadow-md shadow-brandBlue/20 transition-all hover:bg-brandBlue-light hover:shadow-lg hover:shadow-brandBlue/25"
          >
            View Full Heatmap
          </a>
        </div>
      </div>

      {tooltip && (
        <div
          className="pointer-events-none fixed z-50 rounded-lg border border-slate-200 bg-white px-3 py-2 shadow-lg"
          style={{ left: tooltip.x + 12, top: tooltip.y - 48 }}
        >
          <div className="text-xs font-semibold text-slate-900">
            {tooltip.jurisdiction}
            <span className="ml-1 text-slate-500">({tooltip.country})</span>
          </div>
          <div className="mt-1 text-xs text-slate-600">
            Risk:{" "}
            <span
              className="font-semibold"
              style={{
                color:
                  tooltip.value > 0.6
                    ? "#F87171"
                    : tooltip.value > 0.3
                    ? "#FACC15"
                    : "#4ADE80",
              }}
            >
              {tooltip.value > 0.6 ? "High" : tooltip.value > 0.3 ? "Medium" : "Low"}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}
