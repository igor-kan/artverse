
import React, { useState } from "react";
import { Artwork, getRelatedArtworks } from "@/data/artworks";
import { Button } from "@/components/ui/button";
import { Download, ZoomIn, ZoomOut, X } from "lucide-react";
import { saveAs } from "file-saver";
import { useToast } from "@/components/ui/use-toast";
import ArtCard from "./ArtCard";
import LocalForceGraph from "./LocalForceGraph";

interface ArtworkDetailProps {
  artwork: Artwork;
}

const ArtworkDetail: React.FC<ArtworkDetailProps> = ({ artwork }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const { toast } = useToast();
  const relatedArtworks = getRelatedArtworks(artwork);

  const handleDownloadImage = () => {
    const fileName = `${artwork.title.replace(/\s+/g, "_")}_${artwork.year}_${artwork.artist.replace(/\s+/g, "_")}.jpg`;
    
    fetch(artwork.imageUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, fileName);
        toast({
          title: "Download started",
          description: `${fileName} is being downloaded`,
        });
      })
      .catch(err => {
        toast({
          title: "Download failed",
          description: "There was an error downloading the image",
          variant: "destructive",
        });
        console.error("Download error:", err);
      });
  };

  const handleDownloadMetadata = () => {
    const fileName = `${artwork.title.replace(/\s+/g, "_")}_info.txt`;
    const text = `
Title: ${artwork.title}
Artist: ${artwork.artist}
Year: ${artwork.year}
Source: ${artwork.source}
Movement: ${artwork.movement}
Location: ${artwork.location}
${artwork.dimensions ? `Dimensions: ${artwork.dimensions}` : ''}
${artwork.medium ? `Medium: ${artwork.medium}` : ''}

Description:
${artwork.description}

Tags: ${artwork.tags.join(', ')}
    `.trim();
    
    const blob = new Blob([text], { type: "text/plain;charset=utf-8" });
    saveAs(blob, fileName);
    toast({
      title: "Info downloaded",
      description: `Information about ${artwork.title} saved as text`,
    });
  };

  const handleDownloadHTML = () => {
    const fileName = `${artwork.title.replace(/\s+/g, "_")}_embed.html`;
    const html = `
<!DOCTYPE html>
<html>
<head>
    <title>${artwork.title} by ${artwork.artist}</title>
    <meta charset="UTF-8">
    <style>
        .artwork-container {
            max-width: 800px;
            margin: 0 auto;
            font-family: 'Georgia', serif;
            color: #333;
        }
        .artwork-image {
            width: 100%;
            height: auto;
            border-radius: 4px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }
        .artwork-info {
            margin-top: 1rem;
        }
        .artwork-title {
            font-size: 1.5rem;
            font-weight: bold;
            margin-bottom: 0.5rem;
        }
        .artwork-meta {
            font-style: italic;
            color: #666;
        }
        .artwork-description {
            margin-top: 1rem;
            line-height: 1.6;
        }
    </style>
</head>
<body>
    <div class="artwork-container">
        <img src="${artwork.imageUrl}" alt="${artwork.title}" class="artwork-image">
        <div class="artwork-info">
            <div class="artwork-title">${artwork.title}</div>
            <div class="artwork-meta">${artwork.artist}, ${artwork.year} | ${artwork.source}</div>
            <p class="artwork-description">${artwork.description}</p>
        </div>
    </div>
</body>
</html>
    `.trim();
    
    const blob = new Blob([html], { type: "text/html;charset=utf-8" });
    saveAs(blob, fileName);
    toast({
      title: "HTML embed downloaded",
      description: `Embeddable HTML for ${artwork.title} saved`,
    });
  };

  return (
    <>
      {/* Fullscreen zoom overlay */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black z-50 overflow-hidden flex items-center justify-center">
          <div 
            className="absolute inset-0 flex items-center justify-center cursor-move"
            style={{ overflow: "auto" }}
          >
            <img 
              src={artwork.imageUrl} 
              alt={artwork.title} 
              className="max-w-none"
              style={{ 
                transform: `scale(${zoomLevel})`,
                transition: "transform 0.3s ease"
              }}
            />
          </div>
          <div className="absolute top-4 right-4 flex gap-2">
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.5, 3))}
            >
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.5, 0.5))}
            >
              <ZoomOut className="h-4 w-4" />
            </Button>
            <Button 
              variant="secondary" 
              size="icon" 
              onClick={() => {
                setIsZoomed(false);
                setZoomLevel(1);
              }}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      )}

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Artwork Image */}
          <div className="lg:col-span-3 flex flex-col gap-4">
            <div className="relative rounded-xl overflow-hidden border bg-muted/20">
              <img 
                src={artwork.imageUrl} 
                alt={artwork.title} 
                className="w-full h-auto object-contain"
              />
              <Button 
                className="absolute bottom-4 right-4" 
                variant="secondary" 
                size="sm"
                onClick={() => setIsZoomed(true)}
              >
                <ZoomIn className="mr-2 h-4 w-4" />
                View Fullscreen
              </Button>
            </div>
            
            {/* Download Options */}
            <div className="flex flex-wrap gap-3">
              <Button variant="secondary" onClick={handleDownloadImage}>
                <Download className="mr-2 h-4 w-4" />
                Download Image
              </Button>
              <Button variant="outline" onClick={handleDownloadMetadata}>
                <Download className="mr-2 h-4 w-4" />
                Download Info (TXT)
              </Button>
              <Button variant="outline" onClick={handleDownloadHTML}>
                <Download className="mr-2 h-4 w-4" />
                Download HTML Embed
              </Button>
            </div>
          </div>

          {/* Artwork Information */}
          <div className="lg:col-span-2">
            <h1 className="text-4xl font-serif font-semibold">{artwork.title}</h1>
            <p className="text-2xl mt-1 text-muted-foreground">{artwork.artist}, {artwork.year}</p>
            
            <div className="mt-6 space-y-4">
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Source</h3>
                <p className="text-lg">{artwork.source}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Movement</h3>
                <p className="text-lg">{artwork.movement}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Location</h3>
                <p className="text-lg">{artwork.location}</p>
              </div>
              
              {artwork.dimensions && (
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">Dimensions</h3>
                  <p className="text-lg">{artwork.dimensions}</p>
                </div>
              )}
              
              {artwork.medium && (
                <div>
                  <h3 className="text-lg font-medium text-muted-foreground">Medium</h3>
                  <p className="text-lg">{artwork.medium}</p>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Description</h3>
                <p className="text-lg leading-relaxed mt-1">{artwork.description}</p>
              </div>
              
              <div>
                <h3 className="text-lg font-medium text-muted-foreground">Tags</h3>
                <div className="flex flex-wrap gap-2 mt-2">
                  {artwork.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="bg-secondary px-4 py-2 rounded-full text-lg"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Local Connection Graph */}
        {relatedArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title">Connection Network</h2>
            <div className="bg-muted/20 rounded-xl p-4 mb-8 overflow-hidden border border-border">
              <div className="bg-card rounded-xl shadow-inner flex justify-center items-center h-[400px] border border-border/30">
                <LocalForceGraph 
                  centerArtwork={artwork}
                  relatedArtworks={relatedArtworks}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-lg">
                  This artwork's connections to other works by theme, artist, movement, and historical period.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Related Artworks Grid */}
        {relatedArtworks.length > 0 && (
          <div className="mt-16">
            <h2 className="section-title">Related Artworks</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {relatedArtworks.map((related) => (
                <ArtCard key={related.id} artwork={related} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default ArtworkDetail;
