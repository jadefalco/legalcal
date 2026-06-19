"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import * as d3 from "d3";

// =============================================================================
// HEATMAP PREVIEW — Premium D3 National Regulatory Matrix
// =============================================================================
// Implements design.md Section 8: 64 jurisdictions × N topics, perceptual
// color scale, diagonal stagger entrance, smooth hover, and premium tooltip.
// =============================================================================

// ---------------------------------------------------------------------------
// 1. TYPES & DATA
// ---------------------------------------------------------------------------

interface HeatmapDatum {
  jurisdiction: string;
  country: string;
  topic: string;
  value: number;
}

interface TooltipData {
  x: number;
  y: number;
  jurisdiction: string;
  country: string;
  topic: string;
  value: number;
}

interface JurisdictionInfo {
  code: string;
  country: string;
  name: string;
}

interface TopicInfo {
  key: string;
  abbr: string;
  label: string;
}

// 10 topics for the preview matrix
const TOPICS: TopicInfo[] = [
  { key: "rent-increase", abbr: "Rent+", label: "Rent Increase" },
  { key: "security-deposit", abbr: "Dep", label: "Security Deposit" },
  { key: "lease-termination", abbr: "Term", label: "Lease Termination" },
  { key: "entry-notice", abbr: "Entry", label: "Entry Notice" },
  { key: "eviction-timeline", abbr: "Evict", label: "Eviction Timeline" },
  { key: "repair-obligations", abbr: "Rep", label: "Repair Obligations" },
  { key: "habitability", abbr: "Hab", label: "Habitability" },
  { key: "subletting", abbr: "Sub", label: "Subletting" },
  { key: "pet-policy", abbr: "Pet", label: "Pet Policy" },
  { key: "rent-control", abbr: "Ctrl", label: "Rent Control" },
];

// All 64 jurisdictions (13 Canadian + 51 US)
const JURISDICTIONS: JurisdictionInfo[] = [
  // Canada
  { code: "BC", country: "CA", name: "British Columbia" },
  { code: "AB", country: "CA", name: "Alberta" },
  { code: "SK", country: "CA", name: "Saskatchewan" },
  { code: "MB", country: "CA", name: "Manitoba" },
  { code: "ON", country: "CA", name: "Ontario" },
  { code: "QC", country: "CA", name: "Quebec" },
  { code: "NB", country: "CA", name: "New Brunswick" },
  { code: "NS", country: "CA", name: "Nova Scotia" },
  { code: "PE", country: "CA", name: "Prince Edward Island" },
  { code: "NL", country: "CA", name: "Newfoundland & Labrador" },
  { code: "YT", country: "CA", name: "Yukon" },
  { code: "NT", country: "CA", name: "Northwest Territories" },
  { code: "NU", country: "CA", name: "Nunavut" },
  // US
  { code: "WA", country: "US", name: "Washington" },
  { code: "OR", country: "US", name: "Oregon" },
  { code: "CA", country: "US", name: "California" },
  { code: "NV", country: "US", name: "Nevada" },
  { code: "AZ", country: "US", name: "Arizona" },
  { code: "UT", country: "US", name: "Utah" },
  { code: "ID", country: "US", name: "Idaho" },
  { code: "MT", country: "US", name: "Montana" },
  { code: "WY", country: "US", name: "Wyoming" },
  { code: "CO", country: "US", name: "Colorado" },
  { code: "NM", country: "US", name: "New Mexico" },
  { code: "ND", country: "US", name: "North Dakota" },
  { code: "SD", country: "US", name: "South Dakota" },
  { code: "NE", country: "US", name: "Nebraska" },
  { code: "KS", country: "US", name: "Kansas" },
  { code: "OK", country: "US", name: "Oklahoma" },
  { code: "TX", country: "US", name: "Texas" },
  { code: "MN", country: "US", name: "Minnesota" },
  { code: "IA", country: "US", name: "Iowa" },
  { code: "MO", country: "US", name: "Missouri" },
  { code: "AR", country: "US", name: "Arkansas" },
  { code: "LA", country: "US", name: "Louisiana" },
  { code: "WI", country: "US", name: "Wisconsin" },
  { code: "IL", country: "US", name: "Illinois" },
  { code: "MI", country: "US", name: "Michigan" },
  { code: "IN", country: "US", name: "Indiana" },
  { code: "OH", country: "US", name: "Ohio" },
  { code: "KY", country: "US", name: "Kentucky" },
  { code: "TN", country: "US", name: "Tennessee" },
  { code: "MS", country: "US", name: "Mississippi" },
  { code: "AL", country: "US", name: "Alabama" },
  { code: "GA", country: "US", name: "Georgia" },
  { code: "FL", country: "US", name: "Florida" },
  { code: "SC", country: "US", name: "South Carolina" },
  { code: "NC", country: "US", name: "North Carolina" },
  { code: "VA", country: "US", name: "Virginia" },
  { code: "WV", country: "US", name: "West Virginia" },
  { code: "PA", country: "US", name: "Pennsylvania" },
  { code: "NY", country: "US", name: "New York" },
  { code: "VT", country: "US", name: "Vermont" },
  { code: "NH", country: "US", name: "New Hampshire" },
  { code: "ME", country: "US", name: "Maine" },
  { code: "MA", country: "US", name: "Massachusetts" },
  { code: "RI", country: "US", name: "Rhode Island" },
  { code: "CT", country: "US", name: "Connecticut" },
  { code: "NJ", country: "US", name: "New Jersey" },
  { code: "DE", country: "US", name: "Delaware" },
  { code: "MD", country: "US", name: "Maryland" },
  { code: "DC", country: "US", name: "District of Columbia" },
  { code: "AK", country: "US", name: "Alaska" },
  { code: "HI", country: "US", name: "Hawaii" },
];

/** Deterministic pseudo-random value from string seeds */
function seededRandom(s1: string, s2: string): number {
  let h = 0;
  const str = s1 + s2;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  const x = Math.sin(h * 0.7) * 10000;
  return x - Math.floor(x);
}

/** Generate sample matrix data */
function generateData(): HeatmapDatum[] {
  const cells: HeatmapDatum[] = [];
  for (const j of JURISDICTIONS) {
    for (const t of TOPICS) {
      const base = seededRandom(j.code, t.key);
      // Bias some jurisdictions toward higher intensity for realism
      const bias =
        ["CA", "NY", "BC", "NJ", "OR", "WA", "MA", "DC"].includes(j.code)
          ? 0.25
          : ["TX", "FL", "AZ", "AK", "AL"].includes(j.code)
          ? 0.15
          : 0;
      const value = Math.min(1, Math.max(0, base * 0.8 + bias));
      cells.push({
        jurisdiction: j.code,
        country: j.country,
        topic: t.key,
        value,
      });
    }
  }
  return cells;
}

/** Convert 0–1 score to interpretation text */
function interpretScore(value: number): string {
  if (value >= 0.8) return "High regulatory intensity";
  if (value >= 0.6) return "Elevated compliance burden";
  if (value >= 0.4) return "Moderate regulatory complexity";
  if (value >= 0.2) return "Light regulatory touch";
  return "Minimal regulation";
}

/** Convert 0–1 score to 0–100 integer */
function score100(value: number): number {
  return Math.round(value * 100);
}

// ---------------------------------------------------------------------------
// 2. LAYOUT CONSTANTS
// ---------------------------------------------------------------------------

const MARGIN = { top: 48, right: 16, bottom: 16, left: 56 };
const CELL_RADIUS = 6;
const GAP = 4;

// ---------------------------------------------------------------------------
// 3. COLOR SCALE
// ---------------------------------------------------------------------------

const colorScale = d3
  .scaleLinear<string>()
  .domain([0, 0.5, 1])
  .range(["#4ADE80", "#FACC15", "#F87171"])
  .interpolate(d3.interpolateRgb);

// ---------------------------------------------------------------------------
// 4. MAIN COMPONENT
// ---------------------------------------------------------------------------

export default function HeatmapPreview() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const [data, setData] = useState<HeatmapDatum[]>(generateData);
  const [tooltip, setTooltip] = useState<TooltipData | null>(null);
  const tooltipRef = useRef<HTMLDivElement>(null);

  // Track whether this is the first render (for entrance animation)
  const isFirstRender = useRef(true);

  // -------------------------------------------------------------------------
  // Randomize data (demo)
  // -------------------------------------------------------------------------
  const randomize = useCallback(() => {
    setData(generateData());
  }, []);

  // -------------------------------------------------------------------------
  // D3 Render Effect
  // -------------------------------------------------------------------------
  useEffect(() => {
    const svgEl = svgRef.current;
    const containerEl = containerRef.current;
    if (!svgEl || !containerEl) return;

    const svg = d3.select(svgEl);
    const container = d3.select(containerEl);

    // Compute responsive cell size from container width
    const containerWidth = containerEl.clientWidth;
    const numCols = TOPICS.length;
    const numRows = JURISDICTIONS.length;

    // Target: fit within container with some breathing room
    // cellSize is derived from available width minus margins and gaps
    const availableWidth = Math.max(300, containerWidth) - MARGIN.left - MARGIN.right;
    const cellSize = Math.max(24, Math.min(32, Math.floor((availableWidth - (numCols - 1) * GAP) / numCols)));

    const innerWidth = numCols * cellSize + (numCols - 1) * GAP;
    const innerHeight = numRows * cellSize + (numRows - 1) * GAP;
    const width = innerWidth + MARGIN.left + MARGIN.right;
    const height = innerHeight + MARGIN.top + MARGIN.bottom;

    // Set SVG viewBox for crisp scaling
    svg.attr("viewBox", `0 0 ${width} ${height}`).attr("preserveAspectRatio", "xMidYMin meet");

    // Scales
    const xScale = d3
      .scaleBand<string>()
      .domain(TOPICS.map((t) => t.key))
      .range([MARGIN.left, MARGIN.left + innerWidth])
      .paddingInner(0);

    const yScale = d3
      .scaleBand<string>()
      .domain(JURISDICTIONS.map((j) => j.code))
      .range([MARGIN.top, MARGIN.top + innerHeight])
      .paddingInner(0);

    // Pre-compute lookups
    const jursByCode = new Map(JURISDICTIONS.map((j) => [j.code, j]));
    const topicsByKey = new Map(TOPICS.map((t) => [t.key, t]));

    // -----------------------------------------------------------------------
    // Group structure
    // -----------------------------------------------------------------------
    let g = svg.select<SVGGElement>(".heatmap-root");
    if (g.empty()) {
      g = svg.append("g").attr("class", "heatmap-root");

      // Definitions for filters
      const defs = g.append("defs");

      // Soft glow filter for hover
      const filter = defs
        .append("filter")
        .attr("id", "cell-glow")
        .attr("x", "-50%")
        .attr("y", "-50%")
        .attr("width", "200%")
        .attr("height", "200%");
      filter.append("feGaussianBlur").attr("stdDeviation", "3").attr("result", "blur");
      filter.append("feFlood").attr("flood-color", "rgba(255,255,255,0.25)").attr("result", "color");
      filter.append("feComposite").attr("in", "color").attr("in2", "blur").attr("operator", "in").attr("result", "shadow");
      const merge = filter.append("feMerge");
      merge.append("feMergeNode").attr("in", "shadow");
      merge.append("feMergeNode").attr("in", "SourceGraphic");
    }

    // -----------------------------------------------------------------------
    // Column labels (top)
    // -----------------------------------------------------------------------
    const colLabels = g.selectAll<SVGTextElement, string>(".col-label").data(TOPICS.map((t) => t.key), (d) => d);

    colLabels
      .enter()
      .append("text")
      .attr("class", "col-label")
      .attr("x", (d) => (xScale(d) ?? 0) + cellSize / 2)
      .attr("y", MARGIN.top - 12)
      .attr("text-anchor", "middle")
      .attr("font-family", "Inter, system-ui, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", "#475569")
      .attr("opacity", 0)
      .text((d) => topicsByKey.get(d)?.abbr ?? d)
      .transition()
      .duration(600)
      .delay((_d, i) => i * 20)
      .attr("opacity", 1);

    colLabels.transition().duration(300).attr("x", (d) => (xScale(d) ?? 0) + cellSize / 2);

    // -----------------------------------------------------------------------
    // Row labels (left) with background pill for readability
    // -----------------------------------------------------------------------
    const rowLabelGroups = g
      .selectAll<SVGGElement, string>(".row-label-group")
      .data(JURISDICTIONS.map((j) => j.code), (d) => d);

    const rowLabelEnter = rowLabelGroups
      .enter()
      .append("g")
      .attr("class", "row-label-group")
      .attr("transform", (d) => `translate(0, ${(yScale(d) ?? 0) + cellSize / 2})`)
      .attr("opacity", 0);

    // Background pill for sticky-label readability
    rowLabelEnter
      .append("rect")
      .attr("class", "row-label-bg")
      .attr("x", 4)
      .attr("y", -cellSize / 2 - 1)
      .attr("width", MARGIN.left - 10)
      .attr("height", cellSize + 2)
      .attr("rx", 4)
      .attr("fill", "rgba(248,250,252,0.92)");

    rowLabelEnter
      .append("text")
      .attr("class", "row-label")
      .attr("x", MARGIN.left - 10)
      .attr("y", 0)
      .attr("dy", "0.35em")
      .attr("text-anchor", "end")
      .attr("font-family", "Inter, system-ui, sans-serif")
      .attr("font-size", "11px")
      .attr("font-weight", "600")
      .attr("fill", "#334155")
      .text((d) => d);

    rowLabelEnter
      .transition()
      .duration(600)
      .delay((_d, i) => i * 15)
      .attr("opacity", 1);

    rowLabelGroups
      .transition()
      .duration(300)
      .attr("transform", (d) => `translate(0, ${(yScale(d) ?? 0) + cellSize / 2})`);

    rowLabelGroups
      .select(".row-label-bg")
      .transition()
      .duration(300)
      .attr("y", -cellSize / 2 - 1)
      .attr("height", cellSize + 2);

    // -----------------------------------------------------------------------
    // Data cells — D3 join for efficient enter/update/exit
    // -----------------------------------------------------------------------
    const cells = g.selectAll<SVGRectElement, HeatmapDatum>(".cell").data(data, (d: any) => `${d.jurisdiction}-${d.topic}`);

    // --- ENTER ---
    const cellsEnter = cells
      .enter()
      .append("rect")
      .attr("class", "cell")
      .attr("x", (d) => xScale(d.topic) ?? 0)
      .attr("y", (d) => yScale(d.jurisdiction) ?? 0)
      .attr("width", cellSize)
      .attr("height", cellSize)
      .attr("rx", CELL_RADIUS)
      .attr("ry", CELL_RADIUS)
      .attr("fill", (d) => colorScale(d.value))
      .attr("opacity", 0)
      .attr("transform", (d) => {
        const x = (xScale(d.topic) ?? 0) + cellSize / 2;
        const y = (yScale(d.jurisdiction) ?? 0) + cellSize / 2;
        return `translate(${x}, ${y}) scale(0) translate(${-x}, ${-y})`;
      })
      .style("cursor", "pointer");

    // Entrance animation: diagonal stagger with scale + fade
    cellsEnter
      .transition()
      .duration(isFirstRender.current ? 800 : 500)
      .delay((d) => {
        const row = JURISDICTIONS.findIndex((j) => j.code === d.jurisdiction);
        const col = TOPICS.findIndex((t) => t.key === d.topic);
        return (row + col) * 18; // diagonal wave stagger
      })
      .ease(isFirstRender.current ? d3.easeCubicOut : d3.easeQuadInOut)
      .attr("opacity", 1)
      .attr("transform", "translate(0,0) scale(1)");

    // --- UPDATE ---
    cells
      .transition()
      .duration(500)
      .ease(d3.easeQuadInOut)
      .attr("fill", (d) => colorScale(d.value))
      .attr("x", (d) => xScale(d.topic) ?? 0)
      .attr("y", (d) => yScale(d.jurisdiction) ?? 0)
      .attr("width", cellSize)
      .attr("height", cellSize);

    // --- MERGE (enter + update) for interactions ---
    const allCells = cellsEnter.merge(cells);

    allCells
      .on("mouseenter", function (event, d) {
        const self = d3.select(this);
        const x = (xScale(d.topic) ?? 0) + cellSize / 2;
        const y = (yScale(d.jurisdiction) ?? 0) + cellSize / 2;

        self
          .transition()
          .duration(150)
          .ease(d3.easeCubicOut)
          .attr("transform", `translate(${x}, ${y}) scale(1.08) translate(${-x}, ${-y})`)
          .attr("stroke", "rgba(255,255,255,0.35)")
          .attr("stroke-width", 2.5)
          .attr("filter", "url(#cell-glow)");

        const jur = jursByCode.get(d.jurisdiction);
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          jurisdiction: jur?.name ?? d.jurisdiction,
          country: d.country,
          topic: topicsByKey.get(d.topic)?.label ?? d.topic,
          value: d.value,
        });
      })
      .on("mousemove", function (event, d) {
        const jur = jursByCode.get(d.jurisdiction);
        setTooltip({
          x: event.clientX,
          y: event.clientY,
          jurisdiction: jur?.name ?? d.jurisdiction,
          country: d.country,
          topic: topicsByKey.get(d.topic)?.label ?? d.topic,
          value: d.value,
        });
      })
      .on("mouseleave", function () {
        d3.select(this)
          .transition()
          .duration(200)
          .ease(d3.easeCubicOut)
          .attr("transform", "translate(0,0) scale(1)")
          .attr("stroke", "none")
          .attr("filter", "none");

        setTooltip(null);
      });

    // --- EXIT ---
    cells
      .exit()
      .transition()
      .duration(300)
      .attr("opacity", 0)
      .remove();

    // Mark first render complete
    isFirstRender.current = false;
  }, [data]);

  // -------------------------------------------------------------------------
  // Tooltip position smoothing via CSS transition
  // -------------------------------------------------------------------------
  const tooltipStyle: React.CSSProperties = {
    left: (tooltip?.x ?? 0) + 16,
    top: (tooltip?.y ?? 0) - 12,
    opacity: tooltip ? 1 : 0,
    pointerEvents: "none",
    transition: "opacity 150ms ease, transform 150ms ease",
    transform: tooltip ? "translateY(0)" : "translateY(4px)",
  };

  return (
    <section className="bg-slate-50 py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            National Regulatory Matrix
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Compliance intensity across all 64 jurisdictions and 10 core
            regulatory topics.
          </p>
        </div>

        {/* Controls */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={randomize}
            className="inline-flex items-center rounded-lg border border-slate-300 bg-white px-5 py-2.5 text-sm font-semibold text-slate-700 shadow-sm transition-all hover:bg-slate-50 hover:shadow-md"
          >
            Randomize Data
          </button>
          <div className="flex items-center gap-4 text-xs text-slate-500">
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "#4ADE80" }} />
              Low
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "#FACC15" }} />
              Medium
            </div>
            <div className="flex items-center gap-1.5">
              <span className="inline-block h-3 w-3 rounded-sm" style={{ backgroundColor: "#F87171" }} />
              High
            </div>
          </div>
        </div>

        {/* Heatmap Container */}
        <div
          ref={containerRef}
          className="relative mx-auto mt-12 max-w-5xl overflow-auto rounded-xl border border-slate-200 bg-white shadow-sm"
          style={{ maxHeight: "70vh" }}
        >
          <svg ref={svgRef} className="block w-full" />
        </div>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          ref={tooltipRef}
          className="fixed z-50 rounded-md border border-white/10 px-3 py-2 text-xs shadow-xl"
          style={{
            ...tooltipStyle,
            backgroundColor: "rgba(0,0,0,0.85)",
            backdropFilter: "blur(4px)",
            minWidth: 180,
          }}
        >
          <div className="font-semibold text-white">{tooltip.jurisdiction}</div>
          <div className="mt-0.5 text-slate-300">{tooltip.topic}</div>
          <div className="mt-1.5 flex items-center gap-2">
            <div
              className="h-2 w-2 rounded-full"
              style={{ backgroundColor: colorScale(tooltip.value) }}
            />
            <span className="font-mono font-bold text-white">
              {score100(tooltip.value)}
            </span>
            <span className="text-slate-400">/ 100</span>
          </div>
          <div className="mt-1 text-[11px] text-slate-400">
            {interpretScore(tooltip.value)}
          </div>
        </div>
      )}
    </section>
  );
}
