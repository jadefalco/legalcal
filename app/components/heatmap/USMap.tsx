"use client";

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

interface USMapProps {
  data: HeatmapResult[];
  onHover: (item: HeatmapResult, x: number, y: number) => void;
  onLeave: () => void;
  onClick: (item: HeatmapResult) => void;
}

const CELL_W = 50;
const CELL_H = 38;
const GAP = 3;

// (col, row) grid positions for each state/DC
const POSITIONS: Record<string, [number, number]> = {
  wa: [0, 0],
  or: [1, 0],
  ca: [2, 0],
  nv: [3, 0],
  id: [4, 0],
  mt: [5, 0],
  wy: [6, 0],
  ut: [7, 0],
  co: [8, 0],
  az: [9, 0],
  nm: [0, 1],
  ak: [1, 1],
  hi: [2, 1],
  nd: [3, 1],
  sd: [4, 1],
  ne: [5, 1],
  ks: [6, 1],
  ok: [7, 1],
  tx: [8, 1],
  mn: [9, 1],
  ia: [0, 2],
  mo: [1, 2],
  ar: [2, 2],
  la: [3, 2],
  wi: [4, 2],
  il: [5, 2],
  in: [6, 2],
  oh: [7, 2],
  mi: [8, 2],
  ky: [9, 2],
  tn: [0, 3],
  ms: [1, 3],
  al: [2, 3],
  pa: [3, 3],
  ny: [4, 3],
  vt: [5, 3],
  nh: [6, 3],
  me: [7, 3],
  ma: [8, 3],
  ri: [9, 3],
  ct: [0, 4],
  nj: [1, 4],
  de: [2, 4],
  md: [3, 4],
  wv: [4, 4],
  va: [5, 4],
  nc: [6, 4],
  sc: [7, 4],
  ga: [8, 4],
  fl: [9, 4],
  dc: [0, 5],
};

const NAMES: Record<string, string> = {
  wa: "WA", or: "OR", ca: "CA", nv: "NV", id: "ID", mt: "MT", wy: "WY", ut: "UT", co: "CO", az: "AZ",
  nm: "NM", ak: "AK", hi: "HI", nd: "ND", sd: "SD", ne: "NE", ks: "KS", ok: "OK", tx: "TX", mn: "MN",
  ia: "IA", mo: "MO", ar: "AR", la: "LA", wi: "WI", il: "IL", in: "IN", oh: "OH", mi: "MI", ky: "KY",
  tn: "TN", ms: "MS", al: "AL", pa: "PA", ny: "NY", vt: "VT", nh: "NH", me: "ME", ma: "MA", ri: "RI",
  ct: "CT", nj: "NJ", de: "DE", md: "MD", wv: "WV", va: "VA", nc: "NC", sc: "SC", ga: "GA", fl: "FL",
  dc: "DC",
};

function riskColor(risk: "low" | "medium" | "high", isPlaceholder: boolean): string {
  if (isPlaceholder) return "#e2e8f0";
  switch (risk) {
    case "high":
      return "#fca5a5";
    case "medium":
      return "#fcd34d";
    default:
      return "#86efac";
  }
}

function riskStroke(risk: "low" | "medium" | "high", isPlaceholder: boolean): string {
  if (isPlaceholder) return "#cbd5e1";
  switch (risk) {
    case "high":
      return "#ef4444";
    case "medium":
      return "#f59e0b";
    default:
      return "#22c55e";
  }
}

export default function USMap({ data, onHover, onLeave, onClick }: USMapProps) {
  const dataMap = new Map(data.map((d) => [d.jurisdiction.toLowerCase(), d]));

  const jurisdictions = Object.keys(POSITIONS);
  const maxCol = Math.max(...jurisdictions.map((k) => POSITIONS[k][0]));
  const maxRow = Math.max(...jurisdictions.map((k) => POSITIONS[k][1]));

  const width = (maxCol + 1) * CELL_W + maxCol * GAP;
  const height = (maxRow + 1) * CELL_H + maxRow * GAP;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto max-w-3xl"
      role="img"
      aria-label="United States risk heatmap"
    >
      {jurisdictions.map((code) => {
        const [col, row] = POSITIONS[code];
        const item = dataMap.get(code);
        const x = col * (CELL_W + GAP);
        const y = row * (CELL_H + GAP);
        const fill = item ? riskColor(item.overallRisk, item.isPlaceholder) : "#f1f5f9";
        const stroke = item ? riskStroke(item.overallRisk, item.isPlaceholder) : "#cbd5e1";

        return (
          <g
            key={code}
            onMouseEnter={(e) => {
              if (item) onHover(item, e.clientX, e.clientY);
            }}
            onMouseMove={(e) => {
              if (item) onHover(item, e.clientX, e.clientY);
            }}
            onMouseLeave={onLeave}
            onClick={() => {
              if (item) onClick(item);
            }}
            style={{ cursor: item ? "pointer" : "default" }}
          >
            <rect
              x={x}
              y={y}
              width={CELL_W}
              height={CELL_H}
              rx={4}
              fill={fill}
              stroke={stroke}
              strokeWidth={2}
            />
            <text
              x={x + CELL_W / 2}
              y={y + CELL_H / 2 + 1}
              textAnchor="middle"
              dominantBaseline="middle"
              fontSize={11}
              fontWeight={600}
              fill={item?.isPlaceholder ? "#64748b" : "#1e293b"}
            >
              {NAMES[code]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
