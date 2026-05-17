"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const data = [
  { month: "Jan", actual: 12, forecast: null },
  { month: "Feb", actual: 14, forecast: null },
  { month: "Mar", actual: 11, forecast: null },
  { month: "Apr", actual: 18, forecast: null },
  { month: "May", actual: 22, forecast: null },
  { month: "Jun", actual: 19, forecast: null },
  { month: "Jul", actual: 25, forecast: 25 },
  { month: "Aug", actual: null, forecast: 28 },
  { month: "Sep", actual: null, forecast: 32 },
  { month: "Oct", actual: null, forecast: 30 },
  { month: "Nov", actual: null, forecast: 35 },
  { month: "Dec", actual: null, forecast: 38 },
];

export default function TrendForecastPreview() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = 900 - margin.left - margin.right;
    const height = 400 - margin.top - margin.bottom;

    const g = svg
      .attr("viewBox", `0 0 900 400`)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const x = d3
      .scalePoint()
      .domain(data.map((d) => d.month))
      .range([0, width]);

    const y = d3.scaleLinear().domain([0, 45]).range([height, 0]);

    // Gridlines
    g.append("g")
      .attr("transform", `translate(0,${height})`)
      .call(d3.axisBottom(x).tickSize(0).tickPadding(10))
      .selectAll("text")
      .attr("fill", "#64748B")
      .attr("font-size", "12px");

    g.append("g")
      .call(d3.axisLeft(y).ticks(5).tickSize(-width).tickPadding(10))
      .selectAll("text")
      .attr("fill", "#64748B")
      .attr("font-size", "12px");

    g.selectAll(".domain").attr("stroke", "#E2E8F0");
    g.selectAll("line").attr("stroke", "#F1F5F9");

    // Line generators
    const actualLine = d3
      .line<{ month: string; actual: number | null }>()
      .x((d) => x(d.month) ?? 0)
      .y((d) => y(d.actual ?? 0))
      .curve(d3.curveMonotoneX);

    const forecastLine = d3
      .line<{ month: string; forecast: number | null }>()
      .x((d) => x(d.month) ?? 0)
      .y((d) => y(d.forecast ?? 0))
      .curve(d3.curveMonotoneX);

    const actualData = data.filter((d) => d.actual !== null);
    const forecastData = data.filter((d) => d.forecast !== null);

    // Forecast area (subtle)
    const area = d3
      .area<{ month: string; forecast: number | null }>()
      .x((d) => x(d.month) ?? 0)
      .y0(height)
      .y1((d) => y(d.forecast ?? 0))
      .curve(d3.curveMonotoneX);

    g.append("path")
      .datum(forecastData)
      .attr("fill", "#0F2A5F")
      .attr("opacity", 0.06)
      .attr("d", area);

    // Draw forecast line
    const forecastPath = g
      .append("path")
      .datum(forecastData)
      .attr("fill", "none")
      .attr("stroke", "#0F2A5F")
      .attr("stroke-width", 2.5)
      .attr("stroke-dasharray", "6,4")
      .attr("d", forecastLine)
      .attr("opacity", 0);

    forecastPath.transition().duration(1000).delay(400).attr("opacity", 0.7);

    // Draw actual line
    const actualPath = g
      .append("path")
      .datum(actualData)
      .attr("fill", "none")
      .attr("stroke", "#C9A86A")
      .attr("stroke-width", 3)
      .attr("d", actualLine)
      .attr("opacity", 0);

    const totalLength = actualPath.node()?.getTotalLength() ?? 0;
    actualPath
      .attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1200)
      .ease(d3.easeCubicOut)
      .attr("stroke-dashoffset", 0)
      .attr("opacity", 1);

    // Dots for actual
    g.selectAll("circle.actual")
      .data(actualData)
      .enter()
      .append("circle")
      .attr("class", "actual")
      .attr("cx", (d) => x(d.month) ?? 0)
      .attr("cy", (d) => y(d.actual ?? 0))
      .attr("r", 0)
      .attr("fill", "#C9A86A")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(400)
      .delay((_, i) => 800 + i * 100)
      .attr("r", 5);

    // Dots for forecast
    g.selectAll("circle.forecast")
      .data(forecastData)
      .enter()
      .append("circle")
      .attr("class", "forecast")
      .attr("cx", (d) => x(d.month) ?? 0)
      .attr("cy", (d) => y(d.forecast ?? 0))
      .attr("r", 0)
      .attr("fill", "#0F2A5F")
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(400)
      .delay((_, i) => 1200 + i * 100)
      .attr("r", 4);

    // Divider line
    const julX = x("Jul") ?? 0;
    g.append("line")
      .attr("x1", julX)
      .attr("x2", julX)
      .attr("y1", 0)
      .attr("y2", height)
      .attr("stroke", "#E2E8F0")
      .attr("stroke-dasharray", "4,4");

    g.append("text")
      .attr("x", julX - 8)
      .attr("y", -6)
      .attr("text-anchor", "end")
      .attr("fill", "#94A3B8")
      .attr("font-size", "11px")
      .attr("font-weight", 600)
      .text("Forecast →");
  }, []);

  return (
    <section className="bg-slate-50 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Trend Forecasting
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Track regulatory momentum across jurisdictions and forecast
            upcoming changes before they take effect.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
          <svg ref={svgRef} className="h-[420px] w-full" />
          <div className="mt-4 flex flex-wrap items-center justify-center gap-6 text-sm text-slate-600">
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 rounded bg-gold" />
              Actual changes
            </div>
            <div className="flex items-center gap-2">
              <span className="h-1 w-8 rounded bg-brandBlue" style={{ backgroundImage: "repeating-linear-gradient(90deg, #0F2A5F, #0F2A5F 6px, transparent 6px, transparent 10px)" }} />
              Forecast
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
