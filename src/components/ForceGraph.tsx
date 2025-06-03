
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Artwork } from "@/data/artworks";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  image: string;
  group: number;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

interface ForceGraphProps {
  artworks: Artwork[];
  onArtworkSelect: (id: string) => void;
}

const ForceGraph: React.FC<ForceGraphProps> = ({ artworks, onArtworkSelect }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  
  useEffect(() => {
    if (!svgRef.current || !artworks.length) return;
    
    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight || 500;
    
    // Create nodes from artworks
    const nodes: Node[] = artworks.map(artwork => ({
      id: artwork.id,
      name: artwork.title,
      image: artwork.imageUrl,
      group: parseInt(artwork.id) % 5 + 1, // Assign a group based on ID for coloring
      x: undefined,
      y: undefined,
      vx: undefined,
      vy: undefined,
      fx: undefined,
      fy: undefined,
      index: undefined
    }));
    
    // Create links between artworks
    const links: Link[] = [];
    artworks.forEach(artwork => {
      if (artwork.connections) {
        artwork.connections.forEach(targetId => {
          links.push({
            source: artwork.id,
            target: targetId,
            value: 1
          });
        });
      }
    });
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    
    // Create a color scale for node groups
    const color = d3.scaleOrdinal(d3.schemeCategory10);
    
    // Create forces
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-500))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.1))
      .force("y", d3.forceY(height / 2).strength(0.1));
    
    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 1.5);
    
    // Create nodes with circles for now (we'll add images later)
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        onArtworkSelect(d.id);
      })
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any
      );
    
    // Add circles
    node.append("circle")
      .attr("r", 20)
      .attr("fill", d => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5);
    
    // Add image thumbnails
    node.append("clipPath")
      .attr("id", d => `clip-${d.id}`)
      .append("circle")
      .attr("r", 18);
    
    node.append("image")
      .attr("xlink:href", d => d.image)
      .attr("x", -18)
      .attr("y", -18)
      .attr("width", 36)
      .attr("height", 36)
      .attr("clip-path", d => `url(#clip-${d.id})`)
      .attr("preserveAspectRatio", "xMidYMid slice");
    
    // Add artwork title tooltip
    node.append("title")
      .text(d => d.name);
    
    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", d => (d.source as Node).x!)
        .attr("y1", d => (d.source as Node).y!)
        .attr("x2", d => (d.target as Node).x!)
        .attr("y2", d => (d.target as Node).y!);
      
      node.attr("transform", d => `translate(${d.x},${d.y})`);
    });
    
    // Drag functions
    function dragstarted(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      d.fx = d.x;
      d.fy = d.y;
    }
    
    function dragged(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      d.fx = event.x;
      d.fy = event.y;
    }
    
    function dragended(event: d3.D3DragEvent<SVGGElement, Node, Node>, d: Node) {
      if (!event.active) simulation.alphaTarget(0);
      d.fx = null;
      d.fy = null;
    }
    
    return () => {
      simulation.stop();
    };
  }, [artworks, onArtworkSelect]);
  
  return (
    <div className="w-full h-full min-h-[500px] bg-muted/10 rounded-lg border overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default ForceGraph;
