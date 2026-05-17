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

interface CanadaMapProps {
  data: HeatmapResult[];
  onHover: (item: HeatmapResult, x: number, y: number) => void;
  onLeave: () => void;
  onClick: (item: HeatmapResult) => void;
}

const CELL_W = 58;
const CELL_H = 44;
const GAP = 4;

// (col, row) grid positions for each province/territory
const POSITIONS: Record<string, [number, number]> = {
  yt: [1, 0],
  nt: [2, 0],
  nu: [3, 0],
  bc: [0, 1],
  ab: [1, 1],
  sk: [2, 1],
  mb: [3, 1],
  on: [4, 1],
  qc: [5, 1],
  nb: [3, 2],
  ns: [4, 2],
  pe: [5, 2],
  nl: [5, 3],
};

const NAMES: Record<string, string> = {
  yt: "YT",
  nt: "NT",
  nu: "NU",
  bc: "BC",
  ab: "AB",
  sk: "SK",
  mb: "MB",
  on: "ON",
  qc: "QC",
  nb: "NB",
  ns: "NS",
  pe: "PE",
  nl: "NL",
};

function riskColor(risk: "low" | "medium" | "high", isPlaceholder: boolean): string {
  if (isPlaceholder) return "#e2e8f0"; // slate-200
  switch (risk) {
    case "high":
      return "#fca5a5"; // red-300
    case "medium":
      return "#fcd34d"; // amber-300
    default:
      return "#86efac"; // green-300
  }
}

function riskStroke(risk: "low" | "medium" | "high", isPlaceholder: boolean): string {
  if (isPlaceholder) return "#cbd5e1"; // slate-300
  switch (risk) {
    case "high":
      return "#ef4444"; // red-500
    case "medium":
      return "#f59e0b"; // amber-500
    default:
      return "#22c55e"; // green-500
  }
}

export default function CanadaMap({ data, onHover, onLeave, onClick }: CanadaMapProps) {
  const dataMap = new Map(data.map((d) => [d.jurisdiction.toLowerCase(), d]));

  const jurisdictions = Object.keys(POSITIONS);
  const maxCol = Math.max(...jurisdictions.map((k) => POSITIONS[k][0]));
  const maxRow = Math.max(...jurisdictions.map((k) => POSITIONS[k][1]));

  const width = (maxCol + 1) * CELL_W + maxCol * GAP;
  const height = (maxRow + 1) * CELL_H + maxRow * GAP;

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      className="w-full h-auto max-w-lg"
      role="img"
      aria-label="Canada risk heatmap"
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
              fontSize={13}
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
