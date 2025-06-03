
import React, { useState, useEffect } from "react";
import { artworks, getArtworksByFilter } from "@/data/artworks";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Download, Monitor, Smartphone, Tablet, Settings, Shuffle, X, Home } from "lucide-react";
import { saveAs } from "file-saver";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const WallpaperApp: React.FC = () => {
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedMovements, setSelectedMovements] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [artistSearch, setArtistSearch] = useState("");
  const [movementSearch, setMovementSearch] = useState("");
  const [autoWallpaper, setAutoWallpaper] = useState(false);
  const { toast } = useToast();

  const artists = Array.from(new Set(artworks.map(art => art.artist))).sort();
  const movements = Array.from(new Set(artworks.map(art => art.movement))).sort();
  const allTags = Array.from(new Set(artworks.flatMap(art => art.tags))).sort();

  const filteredArtists = artists.filter(artist => 
    artist.toLowerCase().includes(artistSearch.toLowerCase())
  );
  
  const filteredMovements = movements.filter(movement => 
    movement.toLowerCase().includes(movementSearch.toLowerCase())
  );

  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(tagInput.toLowerCase())
  );

  const filteredArtworks = getArtworksByFilter({
    artist: selectedArtists.length > 0 ? selectedArtists : undefined,
    movement: selectedMovements.length > 0 ? selectedMovements : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
  });

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagInput("");
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const toggleArtist = (artist: string) => {
    if (selectedArtists.includes(artist)) {
      setSelectedArtists(selectedArtists.filter(a => a !== artist));
    } else {
      setSelectedArtists([...selectedArtists, artist]);
    }
  };

  const toggleMovement = (movement: string) => {
    if (selectedMovements.includes(movement)) {
      setSelectedMovements(selectedMovements.filter(m => m !== movement));
    } else {
      setSelectedMovements([...selectedMovements, movement]);
    }
  };

  const downloadWallpaper = async (artwork: any, resolution: string) => {
    try {
      const response = await fetch(artwork.imageUrl);
      const blob = await response.blob();
      const fileName = `${artwork.title.replace(/[^a-zA-Z0-9]/g, "_")}_${resolution}.jpg`;
      saveAs(blob, fileName);
      
      toast({
        title: "Wallpaper downloaded",
        description: `${artwork.title} (${resolution}) saved to your device`,
      });
    } catch (error) {
      toast({
        title: "Download failed",
        description: "There was an error downloading the wallpaper",
        variant: "destructive",
      });
    }
  };

  const getRandomWallpaper = () => {
    const availableArtworks = filteredArtworks.length > 0 ? filteredArtworks : artworks;
    const randomIndex = Math.floor(Math.random() * availableArtworks.length);
    return availableArtworks[randomIndex];
  };

  const downloadBatch = async (count: number, resolution: string) => {
    const artworksList = filteredArtworks.length > 0 ? filteredArtworks : artworks;
    const selectedArtworks = artworksList.slice(0, count);
    
    for (const artwork of selectedArtworks) {
      await downloadWallpaper(artwork, resolution);
      await new Promise(resolve => setTimeout(resolve, 500)); // Delay between downloads
    }
  };

  const clearAllFilters = () => {
    setSelectedArtists([]);
    setSelectedMovements([]);
    setSelectedTags([]);
    setArtistSearch("");
    setMovementSearch("");
    setTagInput("");
  };

  // Auto wallpaper feature (for desktop app)
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (autoWallpaper) {
      interval = setInterval(() => {
        const artwork = getRandomWallpaper();
        downloadWallpaper(artwork, "1920x1080");
      }, 24 * 60 * 60 * 1000); // Every 24 hours
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [autoWallpaper, filteredArtworks]);

  return (
    <div className="min-h-screen bg-background">
      {/* Desktop App Header */}
      <div className="bg-card border-b border-border p-4 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-primary transition-colors">
            <Home className="h-5 w-5" />
            <span className="font-mono font-bold">Back to Nuvva</span>
          </Link>
          <Separator orientation="vertical" className="h-6" />
          <h1 className="text-xl font-mono font-bold">Desktop Wallpaper App</h1>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="font-mono"
          >
            Clear Filters
          </Button>
        </div>
      </div>

      <div className="container mx-auto p-6 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">Filters</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Artists Filter */}
                <div>
                  <label className="text-sm font-mono font-medium mb-2 block">Artists</label>
                  <Input
                    placeholder="Search artists..."
                    value={artistSearch}
                    onChange={(e) => setArtistSearch(e.target.value)}
                    className="mb-2 font-mono"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {filteredArtists.slice(0, 10).map(artist => (
                      <div
                        key={artist}
                        onClick={() => toggleArtist(artist)}
                        className={`cursor-pointer p-2 rounded text-sm font-mono transition-colors ${
                          selectedArtists.includes(artist)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {artist}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Movements Filter */}
                <div>
                  <label className="text-sm font-mono font-medium mb-2 block">Art Movements</label>
                  <Input
                    placeholder="Search movements..."
                    value={movementSearch}
                    onChange={(e) => setMovementSearch(e.target.value)}
                    className="mb-2 font-mono"
                  />
                  <div className="max-h-32 overflow-y-auto space-y-1">
                    {filteredMovements.slice(0, 10).map(movement => (
                      <div
                        key={movement}
                        onClick={() => toggleMovement(movement)}
                        className={`cursor-pointer p-2 rounded text-sm font-mono transition-colors ${
                          selectedMovements.includes(movement)
                            ? 'bg-primary text-primary-foreground'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {movement}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tags Filter */}
                <div>
                  <label className="text-sm font-mono font-medium mb-2 block">Tags</label>
                  <Input
                    placeholder="Search tags..."
                    value={tagInput}
                    onChange={(e) => setTagInput(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && tagInput.trim()) {
                        const matchingTag = allTags.find(tag => 
                          tag.toLowerCase() === tagInput.toLowerCase()
                        );
                        if (matchingTag) {
                          addTag(matchingTag);
                        }
                      }
                    }}
                    className="mb-2 font-mono"
                  />
                  {tagInput && (
                    <div className="mb-2 flex flex-wrap gap-1">
                      {filteredTags.slice(0, 5).map(tag => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="cursor-pointer hover:bg-primary hover:text-primary-foreground font-mono"
                          onClick={() => addTag(tag)}
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>

                {/* Selected Filters Display */}
                {(selectedArtists.length > 0 || selectedMovements.length > 0 || selectedTags.length > 0) && (
                  <div>
                    <label className="text-sm font-mono font-medium mb-2 block">Active Filters</label>
                    <div className="space-y-2">
                      {selectedArtists.map(artist => (
                        <Badge key={artist} variant="default" className="mr-1 mb-1 font-mono">
                          {artist}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleArtist(artist)} />
                        </Badge>
                      ))}
                      {selectedMovements.map(movement => (
                        <Badge key={movement} variant="secondary" className="mr-1 mb-1 font-mono">
                          {movement}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => toggleMovement(movement)} />
                        </Badge>
                      ))}
                      {selectedTags.map(tag => (
                        <Badge key={tag} variant="outline" className="mr-1 mb-1 font-mono">
                          {tag}
                          <X className="h-3 w-3 ml-1 cursor-pointer" onClick={() => removeTag(tag)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Collection Info */}
                <div className="bg-muted/50 p-3 rounded-lg">
                  <p className="text-sm font-mono">
                    <strong>{filteredArtworks.length}</strong> artworks available
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="font-mono text-lg">Quick Downloads</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={() => {
                    const artwork = getRandomWallpaper();
                    downloadWallpaper(artwork, "1920x1080");
                  }}
                  className="w-full flex items-center gap-2 font-mono"
                >
                  <Shuffle className="h-4 w-4" />
                  Random 1080p
                </Button>
                
                <Button 
                  onClick={() => {
                    const artwork = getRandomWallpaper();
                    downloadWallpaper(artwork, "3840x2160");
                  }}
                  variant="outline"
                  className="w-full flex items-center gap-2 font-mono"
                >
                  <Monitor className="h-4 w-4" />
                  Random 4K
                </Button>

                <Button 
                  onClick={() => downloadBatch(5, "1920x1080")}
                  variant="secondary"
                  className="w-full flex items-center gap-2 font-mono"
                >
                  <Download className="h-4 w-4" />
                  Download 5 Random
                </Button>

                <div className="flex items-center space-x-2 pt-2">
                  <input
                    type="checkbox"
                    id="auto-wallpaper"
                    checked={autoWallpaper}
                    onChange={(e) => setAutoWallpaper(e.target.checked)}
                    className="rounded"
                  />
                  <label htmlFor="auto-wallpaper" className="text-sm font-mono">
                    Daily auto-download
                  </label>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
              {filteredArtworks.slice(0, 12).map((artwork) => (
                <Card key={artwork.id} className="overflow-hidden group hover:shadow-lg transition-all">
                  <div className="aspect-video relative">
                    <img 
                      src={artwork.imageUrl} 
                      alt={artwork.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-mono font-medium text-sm line-clamp-1 mb-1">{artwork.title}</h3>
                    <p className="font-mono text-xs text-muted-foreground mb-2">{artwork.artist}</p>
                    <p className="font-mono text-xs text-muted-foreground mb-3">{artwork.movement}</p>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => downloadWallpaper(artwork, "1920x1080")}
                        className="flex-1 font-mono"
                      >
                        <Download className="h-3 w-3 mr-1" />
                        1080p
                      </Button>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => downloadWallpaper(artwork, "3840x2160")}
                        className="flex-1 font-mono"
                      >
                        4K
                      </Button>
                      <Button 
                        size="sm" 
                        variant="ghost"
                        onClick={() => downloadWallpaper(artwork, "1080x1920")}
                        className="px-2 font-mono"
                      >
                        <Smartphone className="h-3 w-3" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {filteredArtworks.length === 0 && (
              <Card className="p-8 text-center">
                <p className="font-mono text-muted-foreground">
                  No artworks match your current filters. Try adjusting your selection.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WallpaperApp;
