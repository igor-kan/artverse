
import React, { useState, useMemo } from "react";
import { artworks, getArtworksByFilter } from "@/data/artworks";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Download, Monitor, Smartphone, Search, Filter } from "lucide-react";
import { saveAs } from "file-saver";
import { useToast } from "@/components/ui/use-toast";

interface WallpaperDesktopAppProps {
  onClose?: () => void;
}

const WallpaperDesktopApp: React.FC<WallpaperDesktopAppProps> = ({ onClose }) => {
  const [selectedArtist, setSelectedArtist] = useState<string>("");
  const [selectedMovement, setSelectedMovement] = useState<string>("");
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [resolution, setResolution] = useState("1920x1080");
  const { toast } = useToast();

  const artists = useMemo(() => Array.from(new Set(artworks.map(art => art.artist))).sort(), []);
  const movements = useMemo(() => Array.from(new Set(artworks.map(art => art.movement))).sort(), []);
  const allTags = useMemo(() => Array.from(new Set(artworks.flatMap(art => art.tags))).sort(), []);

  const filteredArtworks = getArtworksByFilter({
    artist: selectedArtist ? [selectedArtist] : undefined,
    movement: selectedMovement ? [selectedMovement] : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    searchTerm: searchTerm
  });

  const resolutionOptions = [
    { value: "1920x1080", label: "1920×1080 (Full HD)" },
    { value: "2560x1440", label: "2560×1440 (2K)" },
    { value: "3840x2160", label: "3840×2160 (4K)" },
    { value: "1366x768", label: "1366×768 (HD)" },
    { value: "1440x900", label: "1440×900" },
    { value: "1080x1920", label: "1080×1920 (Mobile)" },
  ];

  const handleDownloadWallpaper = async (artwork: typeof artworks[0]) => {
    try {
      const response = await fetch(artwork.imageUrl);
      const blob = await response.blob();
      const fileName = `Nuvva_Wallpaper_${artwork.title.replace(/\s+/g, "_")}_${resolution}.jpg`;
      
      saveAs(blob, fileName);
      
      toast({
        title: "Wallpaper Downloaded",
        description: `${artwork.title} saved as ${resolution} wallpaper`,
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "There was an error downloading the wallpaper",
        variant: "destructive",
      });
    }
  };

  const handleBatchDownload = async () => {
    if (filteredArtworks.length === 0) {
      toast({
        title: "No artworks to download",
        description: "Please adjust your filters to see available artworks",
        variant: "destructive",
      });
      return;
    }

    toast({
      title: "Batch download started",
      description: `Downloading ${filteredArtworks.length} wallpapers...`,
    });

    for (const artwork of filteredArtworks.slice(0, 10)) { // Limit to 10 for demo
      await handleDownloadWallpaper(artwork);
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-foreground">Nuvva Wallpaper Studio</h1>
            <p className="text-xl text-muted-foreground mt-2">
              Transform your desktop with masterpiece wallpapers
            </p>
          </div>
          {onClose && (
            <Button variant="outline" onClick={onClose}>
              Back to Gallery
            </Button>
          )}
        </div>

        {/* Filters */}
        <div className="bg-card border border-border rounded-xl p-6 mb-8 shadow-lg">
          <h2 className="text-2xl font-semibold mb-6 flex items-center">
            <Filter className="mr-2 h-6 w-6" />
            Filter Collection
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Search */}
            <div>
              <label className="block text-lg font-medium mb-2">Search</label>
              <div className="relative">
                <Input
                  placeholder="Search artworks..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              </div>
            </div>

            {/* Artist */}
            <div>
              <label className="block text-lg font-medium mb-2">Artist</label>
              <Select value={selectedArtist} onValueChange={setSelectedArtist}>
                <SelectTrigger>
                  <SelectValue placeholder="All Artists" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Artists</SelectItem>
                  {artists.map(artist => (
                    <SelectItem key={artist} value={artist}>{artist}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Movement */}
            <div>
              <label className="block text-lg font-medium mb-2">Movement</label>
              <Select value={selectedMovement} onValueChange={setSelectedMovement}>
                <SelectTrigger>
                  <SelectValue placeholder="All Movements" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Movements</SelectItem>
                  {movements.map(movement => (
                    <SelectItem key={movement} value={movement}>{movement}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Resolution */}
            <div>
              <label className="block text-lg font-medium mb-2">Resolution</label>
              <Select value={resolution} onValueChange={setResolution}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {resolutionOptions.map(option => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Tags */}
          <div className="mt-6">
            <label className="block text-lg font-medium mb-2">Tags</label>
            <div className="flex flex-wrap gap-2 mb-4">
              {allTags.slice(0, 20).map(tag => (
                <button
                  key={tag}
                  onClick={() => selectedTags.includes(tag) ? removeTag(tag) : addTag(tag)}
                  className={`px-3 py-1 rounded-full text-sm transition-all ${
                    selectedTags.includes(tag)
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-muted text-muted-foreground hover:bg-muted/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Batch Actions */}
          <div className="flex gap-4 mt-6">
            <Button onClick={handleBatchDownload} size="lg">
              <Download className="mr-2 h-5 w-5" />
              Download All ({filteredArtworks.length})
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                setSelectedArtist("");
                setSelectedMovement("");
                setSelectedTags([]);
                setSearchTerm("");
              }}
            >
              Clear Filters
            </Button>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredArtworks.map((artwork) => (
            <div key={artwork.id} className="bg-card border border-border rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
              <div className="aspect-video overflow-hidden">
                <img 
                  src={artwork.imageUrl} 
                  alt={artwork.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg truncate">{artwork.title}</h3>
                <p className="text-muted-foreground text-base">{artwork.artist}</p>
                <p className="text-muted-foreground text-sm">{artwork.year}</p>
                <Button 
                  className="w-full mt-4"
                  onClick={() => handleDownloadWallpaper(artwork)}
                >
                  <Download className="mr-2 h-4 w-4" />
                  Download as {resolution}
                </Button>
              </div>
            </div>
          ))}
        </div>

        {filteredArtworks.length === 0 && (
          <div className="text-center py-16">
            <div className="bg-card border border-border rounded-xl p-8 max-w-md mx-auto">
              <Monitor className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-bold mb-2">No wallpapers found</h3>
              <p className="text-muted-foreground text-lg">
                Try adjusting your filters to see available artworks.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WallpaperDesktopApp;
