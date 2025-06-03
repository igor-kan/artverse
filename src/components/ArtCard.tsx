
import React from "react";
import { Link } from "react-router-dom";
import { Artwork } from "@/data/artworks";
import { CheckSquare, Square } from "lucide-react";

interface ArtCardProps {
  artwork: Artwork;
  className?: string;
  isSelected?: boolean;
  onToggleSelect?: (artworkId: string) => void;
  selectionMode?: boolean;
}

const ArtCard: React.FC<ArtCardProps> = ({ 
  artwork, 
  className = "", 
  isSelected = false,
  onToggleSelect,
  selectionMode = false 
}) => {
  const handleSelectClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (onToggleSelect) {
      onToggleSelect(artwork.id);
    }
  };

  return (
    <div className={`art-card group relative ${className} ${isSelected ? 'ring-2 ring-primary shadow-lg shadow-primary/20' : ''}`}>
      {selectionMode && (
        <button
          onClick={handleSelectClick}
          className="absolute top-3 right-3 z-10 p-2 bg-background/95 backdrop-blur-sm rounded-md hover:bg-background transition-all border border-border/50 shadow-sm"
        >
          {isSelected ? (
            <CheckSquare className="h-4 w-4 text-primary" />
          ) : (
            <Square className="h-4 w-4 text-muted-foreground" />
          )}
        </button>
      )}
      
      <Link to={`/artwork/${artwork.id}`}>
        <div className="art-image-container aspect-[3/4]">
          <img 
            src={artwork.imageUrl} 
            alt={artwork.title} 
            className="art-image" 
            loading="lazy"
          />
        </div>
        <div className="art-card-content">
          <h3 className="font-serif font-bold text-lg line-clamp-1 mb-2 text-foreground">{artwork.title}</h3>
          <p className="text-sm text-muted-foreground mb-1 font-serif font-medium">{artwork.artist}</p>
          <p className="text-xs text-muted-foreground mb-3 font-serif">{artwork.year}</p>
          <p className="text-xs text-muted-foreground mb-4 line-clamp-2 font-serif leading-relaxed">{artwork.description}</p>
          
          {/* Enhanced tag bubbles with better visibility */}
          <div className="flex flex-wrap gap-2">
            {artwork.tags.slice(0, 3).map((tag, index) => (
              <span 
                key={index} 
                className="tag-bubble text-white"
                style={{
                  background: 'linear-gradient(135deg, hsl(var(--accent)) 0%, hsl(var(--primary)) 100%)',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {tag}
              </span>
            ))}
            {artwork.tags.length > 3 && (
              <span className="text-xs text-muted-foreground font-serif bg-muted px-2 py-1 rounded-full border border-border/50 shadow-sm">
                +{artwork.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ArtCard;
