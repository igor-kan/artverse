
import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import { Artwork } from "@/data/artworks";
import { useNavigate } from "react-router-dom";

interface Node extends d3.SimulationNodeDatum {
  id: string;
  name: string;
  image: string;
  group: number;
  isCenter: boolean;
}

interface Link extends d3.SimulationLinkDatum<Node> {
  source: string | Node;
  target: string | Node;
  value: number;
}

interface LocalForceGraphProps {
  centerArtwork: Artwork;
  relatedArtworks: Artwork[];
}

const LocalForceGraph: React.FC<LocalForceGraphProps> = ({ centerArtwork, relatedArtworks }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    if (!svgRef.current) return;
    
    // Clear previous graph
    d3.select(svgRef.current).selectAll("*").remove();
    
    const width = svgRef.current.clientWidth;
    const height = svgRef.current.clientHeight || 400;
    
    // Create nodes from center artwork and related artworks
    const nodes: Node[] = [
      {
        id: centerArtwork.id,
        name: centerArtwork.title,
        image: centerArtwork.imageUrl,
        group: 0, // Center artwork gets group 0
        isCenter: true,
        x: width / 2,
        y: height / 2,
      },
      ...relatedArtworks.map((artwork, index) => ({
        id: artwork.id,
        name: artwork.title,
        image: artwork.imageUrl,
        group: index + 1,
        isCenter: false,
        x: undefined,
        y: undefined,
      }))
    ];
    
    // Create links from center to all related artworks
    const links: Link[] = relatedArtworks.map(artwork => ({
      source: centerArtwork.id,
      target: artwork.id,
      value: 1
    }));
    
    // Create SVG
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height]);
    
    // Create a color scale
    const color = d3.scaleOrdinal([
      "#3b82f6", // blue for center
      "#ef4444", "#f97316", "#eab308", "#22c55e", 
      "#06b6d4", "#8b5cf6", "#ec4899", "#f43f5e"
    ]);
    
    // Create forces
    const simulation = d3.forceSimulation<Node, Link>(nodes)
      .force("link", d3.forceLink<Node, Link>(links).id(d => d.id).distance(120))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(35));
    
    // Create links
    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "#64748b")
      .attr("stroke-opacity", 0.6)
      .attr("stroke-width", 2);
    
    // Create nodes
    const node = svg.append("g")
      .selectAll("g")
      .data(nodes)
      .join("g")
      .attr("cursor", "pointer")
      .on("click", (event, d) => {
        if (!d.isCenter) {
          navigate(`/artwork/${d.id}`);
        }
      })
      .call(d3.drag<SVGGElement, Node>()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any
      );
    
    // Add circles
    node.append("circle")
      .attr("r", d => d.isCenter ? 30 : 25)
      .attr("fill", d => color(d.group.toString()))
      .attr("stroke", "#fff")
      .attr("stroke-width", d => d.isCenter ? 3 : 2);
    
    // Add image thumbnails
    node.append("clipPath")
      .attr("id", d => `local-clip-${d.id}`)
      .append("circle")
      .attr("r", d => d.isCenter ? 28 : 23);
    
    node.append("image")
      .attr("xlink:href", d => d.image)
      .attr("x", d => d.isCenter ? -28 : -23)
      .attr("y", d => d.isCenter ? -28 : -23)
      .attr("width", d => d.isCenter ? 56 : 46)
      .attr("height", d => d.isCenter ? 56 : 46)
      .attr("clip-path", d => `url(#local-clip-${d.id})`)
      .attr("preserveAspectRatio", "xMidYMid slice");
    
    // Add labels
    node.append("text")
      .text(d => d.name.length > 20 ? d.name.substring(0, 20) + "..." : d.name)
      .attr("text-anchor", "middle")
      .attr("dy", d => d.isCenter ? 45 : 40)
      .attr("font-size", d => d.isCenter ? "14px" : "12px")
      .attr("font-weight", d => d.isCenter ? "bold" : "normal")
      .attr("fill", "hsl(var(--foreground))")
      .style("pointer-events", "none");
    
    // Add tooltip
    node.append("title")
      .text(d => `${d.name}${d.isCenter ? " (Current)" : " (Click to view)"}`);
    
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
  }, [centerArtwork, relatedArtworks, navigate]);
  
  return (
    <div className="w-full h-full min-h-[400px] bg-muted/10 rounded-lg overflow-hidden">
      <svg ref={svgRef} className="w-full h-full" />
    </div>
  );
};

export default LocalForceGraph;
