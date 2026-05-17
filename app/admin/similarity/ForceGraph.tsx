"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface Node {
  id: string;
  name: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  cluster: number;
}

interface Edge {
  source: string;
  target: string;
  weight: number;
}

interface ForceGraphProps {
  matrix: Array<{
    jurisdiction: string;
    name: string;
    similarities: Array<{ jurisdiction: string; score: number }>;
  }>;
  clusters: Array<{ clusterId: number; members: string[] }> | null;
  width?: number;
  height?: number;
}

const CLUSTER_COLORS = [
  "#ef4444", // red
  "#3b82f6", // blue
  "#22c55e", // green
  "#f59e0b", // amber
  "#a855f7", // purple
  "#ec4899", // pink
  "#06b6d4", // cyan
  "#84cc16", // lime
];

function runSimulation(
  nodes: Node[],
  edges: Edge[],
  width: number,
  height: number,
  iterations = 100
) {
  const centerX = width / 2;
  const centerY = height / 2;
  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  for (let iter = 0; iter < iterations; iter++) {
    // Repulsion
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const a = nodes[i];
        const b = nodes[j];
        let dx = a.x - b.x;
        let dy = a.y - b.y;
        let dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 1) dist = 1;
        const force = 2000 / (dist * dist);
        const fx = (dx / dist) * force;
        const fy = (dy / dist) * force;
        a.vx += fx;
        a.vy += fy;
        b.vx -= fx;
        b.vy -= fy;
      }
    }

    // Attraction along edges
    for (const edge of edges) {
      const a = nodeMap.get(edge.source);
      const b = nodeMap.get(edge.target);
      if (!a || !b) continue;
      let dx = b.x - a.x;
      let dy = b.y - a.y;
      let dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 1) dist = 1;
      const force = 0.02 * edge.weight * dist;
      const fx = (dx / dist) * force;
      const fy = (dy / dist) * force;
      a.vx += fx;
      a.vy += fy;
      b.vx -= fx;
      b.vy -= fy;
    }

    // Center gravity
    for (const node of nodes) {
      const dx = centerX - node.x;
      const dy = centerY - node.y;
      node.vx += dx * 0.001;
      node.vy += dy * 0.001;
    }

    // Apply velocity with damping
    for (const node of nodes) {
      node.vx *= 0.5;
      node.vy *= 0.5;
      node.x += node.vx;
      node.y += node.vy;

      // Boundary constraint
      const padding = 20;
      node.x = Math.max(padding, Math.min(width - padding, node.x));
      node.y = Math.max(padding, Math.min(height - padding, node.y));
    }
  }
}

export default function ForceGraph({ matrix, clusters, width = 700, height = 500 }: ForceGraphProps) {
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; text: string } | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const initialized = useRef(false);

  const initSimulation = useCallback(() => {
    if (!matrix.length) return;

    const nodeList: Node[] = matrix.map((m, i) => {
      const angle = (i / matrix.length) * 2 * Math.PI;
      const cluster = clusters?.find((c) => c.members.includes(m.jurisdiction))?.clusterId ?? -1;
      return {
        id: m.jurisdiction,
        name: m.name,
        x: width / 2 + Math.cos(angle) * 150,
        y: height / 2 + Math.sin(angle) * 150,
        vx: 0,
        vy: 0,
        cluster,
      };
    });

    const edgeList: Edge[] = [];
    for (const row of matrix) {
      for (const sim of row.similarities) {
        if (sim.score > 0.75) {
          // Avoid duplicates
          const existing = edgeList.find(
            (e) =>
              (e.source === row.jurisdiction && e.target === sim.jurisdiction) ||
              (e.source === sim.jurisdiction && e.target === row.jurisdiction)
          );
          if (!existing) {
            edgeList.push({
              source: row.jurisdiction,
              target: sim.jurisdiction,
              weight: sim.score,
            });
          }
        }
      }
    }

    runSimulation(nodeList, edgeList, width, height, 120);
    setNodes(nodeList);
    setEdges(edgeList);
    initialized.current = true;
  }, [matrix, clusters, width, height]);

  useEffect(() => {
    if (!initialized.current && matrix.length > 0) {
      initSimulation();
    }
  }, [matrix, clusters, initSimulation]);

  const handleNodeMouseEnter = (node: Node, e: React.MouseEvent) => {
    setHoveredNode(node.id);
    const sims = matrix.find((m) => m.jurisdiction === node.id)?.similarities ?? [];
    const topSims = sims.slice(0, 3);
    const text = `${node.name}\nTop similarities:\n${topSims.map((s) => `- ${s.jurisdiction.toUpperCase()}: ${(s.score * 100).toFixed(0)}%`).join("\n")}`;
    setTooltip({ x: e.clientX + 12, y: e.clientY - 12, text });
  };

  const handleNodeMouseMove = (e: React.MouseEvent) => {
    if (tooltip) {
      setTooltip({ ...tooltip, x: e.clientX + 12, y: e.clientY - 12 });
    }
  };

  const handleNodeMouseLeave = () => {
    setHoveredNode(null);
    setTooltip(null);
  };

  const nodeMap = new Map(nodes.map((n) => [n.id, n]));

  return (
    <div className="relative">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${width} ${height}`}
        className="w-full h-auto border border-slate-200 rounded-lg bg-slate-50"
      >
        {/* Edges */}
        {edges.map((edge, i) => {
          const a = nodeMap.get(edge.source);
          const b = nodeMap.get(edge.target);
          if (!a || !b) return null;
          const isHighlighted =
            hoveredNode === edge.source || hoveredNode === edge.target;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke={isHighlighted ? "#94a3b8" : "#cbd5e1"}
              strokeWidth={isHighlighted ? 2 : 1}
              strokeOpacity={edge.weight}
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((node) => {
          const isHovered = hoveredNode === node.id;
          const color =
            node.cluster >= 0
              ? CLUSTER_COLORS[node.cluster % CLUSTER_COLORS.length]
              : "#94a3b8";
          return (
            <g
              key={node.id}
              onMouseEnter={(e) => handleNodeMouseEnter(node, e)}
              onMouseMove={handleNodeMouseMove}
              onMouseLeave={handleNodeMouseLeave}
              style={{ cursor: "pointer" }}
            >
              <circle
                cx={node.x}
                cy={node.y}
                r={isHovered ? 10 : 7}
                fill={color}
                stroke={isHovered ? "#1e293b" : "#ffffff"}
                strokeWidth={isHovered ? 2 : 1.5}
                opacity={0.85}
              />
              <text
                x={node.x}
                y={node.y + 18}
                textAnchor="middle"
                fontSize={9}
                fontWeight={500}
                fill="#334155"
              >
                {node.id.toUpperCase()}
              </text>
            </g>
          );
        })}
      </svg>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 rounded-lg border border-slate-200 bg-white p-3 shadow-lg pointer-events-none whitespace-pre text-xs"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.text}
        </div>
      )}
    </div>
  );
}
