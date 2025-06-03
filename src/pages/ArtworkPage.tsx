
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { artworks } from "@/data/artworks";
import ArtworkDetail from "@/components/ArtworkDetail";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const ArtworkPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  // Find the artwork by ID
  const artwork = artworks.find(art => art.id === id);
  
  // Simulate loading state for better UX
  useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 300);
    return () => clearTimeout(timer);
  }, [id]);

  // If artwork not found, show error message
  if (!artwork && !isLoading) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Artwork Not Found</h2>
        <p className="text-muted-foreground mb-8">
          The artwork you are looking for might have been removed or doesn't exist.
        </p>
        <Button onClick={() => navigate("/gallery")}>
          Return to Gallery
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="border-b bg-muted/30">
        <div className="container mx-auto px-4 py-4">
          <Button variant="ghost" onClick={() => navigate(-1)} className="group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="container mx-auto px-4 py-16 text-center">
          <p>Loading artwork...</p>
        </div>
      ) : artwork && (
        <ArtworkDetail artwork={artwork} />
      )}
    </div>
  );
};

export default ArtworkPage;
