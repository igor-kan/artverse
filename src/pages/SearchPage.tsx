
import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { artworks, getArtworksByFilter } from "@/data/artworks";
import ArtCard from "@/components/ArtCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, User, Palette } from "lucide-react";

const SearchPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const [results, setResults] = useState(artworks);
  const [searchType, setSearchType] = useState<"all" | "artist" | "movement">("all");

  // Extract unique artists and movements for suggestions
  const artists = Array.from(new Set(artworks.map(art => art.artist)));
  const movements = Array.from(new Set(artworks.map(art => art.movement)));

  const artistMatch = artists.find(artist => 
    artist.toLowerCase().includes(query.toLowerCase())
  );
  
  const movementMatch = movements.find(movement => 
    movement.toLowerCase().includes(query.toLowerCase())
  );

  useEffect(() => {
    if (!query) {
      setResults(artworks);
      return;
    }

    let filteredResults = artworks.filter(artwork => 
      artwork.title.toLowerCase().includes(query.toLowerCase()) ||
      artwork.artist.toLowerCase().includes(query.toLowerCase()) ||
      artwork.movement.toLowerCase().includes(query.toLowerCase()) ||
      artwork.description.toLowerCase().includes(query.toLowerCase()) ||
      artwork.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
    );

    if (searchType === "artist") {
      filteredResults = filteredResults.filter(artwork =>
        artwork.artist.toLowerCase().includes(query.toLowerCase())
      );
    } else if (searchType === "movement") {
      filteredResults = filteredResults.filter(artwork =>
        artwork.movement.toLowerCase().includes(query.toLowerCase())
      );
    }

    setResults(filteredResults);
  }, [query, searchType]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <div className="mb-8">
          <Button variant="ghost" onClick={() => window.history.back()} className="mb-4 group">
            <ArrowLeft className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1" />
            Back
          </Button>
          
          <h1 className="text-4xl font-mono font-bold mb-4">
            Search Results for "{query}"
          </h1>
          
          {(artistMatch || movementMatch) && (
            <div className="flex flex-wrap gap-4 mb-6">
              {artistMatch && (
                <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 min-w-[300px]">
                  <div className="flex items-center mb-3">
                    <User className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-mono font-semibold">Artist</h3>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{artistMatch}</h4>
                  <p className="text-muted-foreground mb-4">
                    Explore all artworks by this renowned artist and discover their unique style and contributions to art history.
                  </p>
                  <Button 
                    onClick={() => setSearchType("artist")}
                    variant={searchType === "artist" ? "default" : "outline"}
                    size="sm"
                  >
                    View Artist's Works
                  </Button>
                </div>
              )}
              
              {movementMatch && (
                <div className="bg-card border border-border/50 rounded-xl p-6 flex-1 min-w-[300px]">
                  <div className="flex items-center mb-3">
                    <Palette className="h-5 w-5 text-primary mr-2" />
                    <h3 className="font-mono font-semibold">Art Movement</h3>
                  </div>
                  <h4 className="text-xl font-bold mb-2">{movementMatch}</h4>
                  <p className="text-muted-foreground mb-4">
                    Discover artworks from this influential movement and understand its impact on the art world.
                  </p>
                  <Button 
                    onClick={() => setSearchType("movement")}
                    variant={searchType === "movement" ? "default" : "outline"}
                    size="sm"
                  >
                    View Movement Works
                  </Button>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-2 mb-6">
            <Button 
              onClick={() => setSearchType("all")}
              variant={searchType === "all" ? "default" : "outline"}
              size="sm"
            >
              All Results ({results.length})
            </Button>
            <Button 
              onClick={() => setSearchType("artist")}
              variant={searchType === "artist" ? "default" : "outline"}
              size="sm"
            >
              Artists Only
            </Button>
            <Button 
              onClick={() => setSearchType("movement")}
              variant={searchType === "movement" ? "default" : "outline"}
              size="sm"
            >
              Movements Only
            </Button>
          </div>
        </div>

        {results.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {results.map((artwork) => (
              <ArtCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="bg-card border border-border/50 rounded-xl p-8 max-w-md mx-auto">
              <h3 className="text-xl font-mono font-semibold mb-2">No Results Found</h3>
              <p className="text-muted-foreground mb-4">
                No artworks found matching "{query}". Try adjusting your search terms.
              </p>
              <Link to="/gallery">
                <Button>Browse Gallery</Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
