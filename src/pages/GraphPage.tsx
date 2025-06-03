
import React, { useState, useEffect } from "react";
import { artworks } from "@/data/artworks";
import ForceGraph from "@/components/ForceGraph";
import { useNavigate } from "react-router-dom";

const GraphPage: React.FC = () => {
  const navigate = useNavigate();
  
  const handleArtworkSelect = (id: string) => {
    navigate(`/artwork/${id}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="section-title" style={{ color: '#B8860B' }}>Art Connections</h1>
      <p className="mb-8 text-muted-foreground max-w-3xl font-serif">
        Explore the interconnections between artworks. Each node represents an artwork, and connections show relationships like same artist, similar themes, or historical periods. Drag nodes to rearrange, click to view details.
      </p>
      
      <div className="bg-muted/20 rounded-lg p-2 md:p-4 mb-8 overflow-hidden border border-border">
        <div className="bg-card rounded-lg shadow-inner flex justify-center items-center h-[600px] border border-border/30">
          <ForceGraph 
            artworks={artworks} 
            onArtworkSelect={handleArtworkSelect}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Art Movements</h3>
          <p className="font-serif text-muted-foreground">Nodes are color-coded by art movement. Similar colors indicate works from the same artistic period.</p>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Navigate the Network</h3>
          <p className="font-serif text-muted-foreground">Drag, zoom, and click on artwork nodes to explore the connections. Click on a work to view its detailed information.</p>
        </div>

        <div className="p-6 border border-border rounded-lg bg-card shadow-sm">
          <h3 className="font-serif text-xl font-semibold mb-2 text-foreground">Discover Connections</h3>
          <p className="font-serif text-muted-foreground">Lines between artworks show connections based on artist, theme, period, or subject matter similarities.</p>
        </div>
      </div>
    </div>
  );
};

export default GraphPage;
