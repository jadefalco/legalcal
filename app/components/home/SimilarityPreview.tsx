"use client";

import { useEffect, useRef } from "react";
import * as d3 from "d3";

const clusters = [
  { name: "Tenant‑Friendly", states: ["CA", "NY", "OR", "WA", "VT", "MA", "NJ", "MD", "MN", "CT", "DC"], color: "#4ADE80", x: 200, y: 200 },
  { name: "Balanced", states: ["TX", "FL", "IL", "CO", "AZ", "NV", "NC", "VA", "GA", "PA", "OH", "MI", "WI", "MO", "IN", "TN", "SC", "AL", "LA", "KY", "OK", "KS", "IA", "NE", "NM", "UT", "ID", "MT", "WY", "ND", "SD", "WV", "AR", "MS", "AK", "HI", "DE", "RI", "NH", "ME"], color: "#FACC15", x: 500, y: 250 },
  { name: "Landlord‑Friendly", states: ["IN", "SD", "ND", "WV", "WY"], color: "#F87171", x: 800, y: 200 },
  { name: "Canada", states: ["BC", "AB", "ON", "QC", "MB", "SK", "NS", "NB", "NL", "PE"], color: "#3B82F6", x: 500, y: 450 },
];

export default function SimilarityPreview() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;
    const svg = d3.select(svgRef.current);
    svg.selectAll("*").remove();

    const width = 1000;
    const height = 600;
    svg.attr("viewBox", `0 0 ${width} ${height}`);

    // Generate nodes from clusters
    const nodes: { id: string; cluster: string; color: string; x: number; y: number; r: number }[] = [];
    clusters.forEach((c) => {
      c.states.forEach((s, i) => {
        const angle = (i / c.states.length) * 2 * Math.PI;
        const dist = 30 + Math.random() * 80;
        nodes.push({
          id: s,
          cluster: c.name,
          color: c.color,
          x: c.x + Math.cos(angle) * dist + (Math.random() - 0.5) * 20,
          y: c.y + Math.sin(angle) * dist + (Math.random() - 0.5) * 20,
          r: 16 + Math.random() * 8,
        });
      });
    });

    // Links between same-cluster nodes
    const links: { source: typeof nodes[0]; target: typeof nodes[0] }[] = [];
    clusters.forEach((c) => {
      const clusterNodes = nodes.filter((n) => n.cluster === c.name);
      for (let i = 0; i < clusterNodes.length; i++) {
        for (let j = i + 1; j < clusterNodes.length; j++) {
          if (Math.random() < 0.15) {
            links.push({ source: clusterNodes[i], target: clusterNodes[j] });
          }
        }
      }
    });

    // Draw links
    svg
      .selectAll("line.link")
      .data(links)
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", (d) => d.source.x)
      .attr("y1", (d) => d.source.y)
      .attr("x2", (d) => d.target.x)
      .attr("y2", (d) => d.target.y)
      .attr("stroke", "#94A3B8")
      .attr("stroke-width", 0.8)
      .attr("opacity", 0);

    // Animate links in
    svg
      .selectAll("line.link")
      .transition()
      .duration(800)
      .delay((_, i) => i * 5)
      .attr("opacity", 0.35);

    // Draw nodes
    const node = svg
      .selectAll("g.node")
      .data(nodes)
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", (d) => `translate(${d.x},${d.y})`)
      .style("cursor", "pointer");

    node
      .append("circle")
      .attr("r", 0)
      .attr("fill", (d) => d.color)
      .attr("opacity", 0.85)
      .attr("stroke", "#fff")
      .attr("stroke-width", 2)
      .transition()
      .duration(600)
      .delay((_, i) => 100 + i * 12)
      .attr("r", (d) => d.r);

    node
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", ".35em")
      .attr("fill", "#fff")
      .attr("font-size", "10px")
      .attr("font-weight", 700)
      .attr("pointer-events", "none")
      .attr("opacity", 0)
      .transition()
      .duration(400)
      .delay((_, i) => 400 + i * 12)
      .attr("opacity", 1);

    // Cluster labels
    clusters.forEach((c, i) => {
      svg
        .append("text")
        .attr("x", c.x)
        .attr("y", c.y - 100)
        .attr("text-anchor", "middle")
        .attr("fill", c.color)
        .attr("font-size", "16px")
        .attr("font-weight", 700)
        .text(c.name)
        .attr("opacity", 0)
        .transition()
        .duration(600)
        .delay(800 + i * 150)
        .attr("opacity", 1);
    });

    // Tooltip
    const tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "d3-tooltip")
      .style("position", "absolute")
      .style("background", "#0A1A2F")
      .style("color", "#fff")
      .style("padding", "8px 12px")
      .style("border-radius", "6px")
      .style("font-size", "12px")
      .style("pointer-events", "none")
      .style("opacity", 0)
      .style("transition", "opacity 0.2s")
      .style("z-index", 50);

    node
      .on("mouseover", function (event, d) {
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r + 6);
        tooltip
          .style("opacity", 1)
          .html(`<strong>${d.id}</strong><br/><span style="color:${d.color}">●</span> ${d.cluster}`);
      })
      .on("mousemove", function (event) {
        tooltip.style("left", event.pageX + 12 + "px").style("top", event.pageY - 12 + "px");
      })
      .on("mouseout", function (event, d) {
        d3.select(this).select("circle").transition().duration(200).attr("r", d.r);
        tooltip.style("opacity", 0);
      });

    return () => {
      tooltip.remove();
    };
  }, []);

  return (
    <section className="bg-white py-32 md:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2
            className="font-serif text-4xl font-bold tracking-tight text-navy md:text-5xl"
            style={{ letterSpacing: "-0.01em" }}
          >
            Similarity Clustering
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            See which jurisdictions share regulatory DNA — grouped by tenant
            protections, balance, and landlord prerogatives.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-xl border border-slate-200 bg-slate-50 shadow-sm">
          <svg ref={svgRef} className="h-[500px] w-full" />
        </div>
        <div className="mx-auto mt-8 flex flex-wrap justify-center gap-6 text-sm text-slate-600">
          {clusters.map((c) => (
            <div key={c.name} className="flex items-center gap-2">
              <span className="h-3 w-3 rounded-full" style={{ backgroundColor: c.color }} />
              {c.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
