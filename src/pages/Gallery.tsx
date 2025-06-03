import React, { useState, useMemo } from "react";
import { artworks, Artwork, getArtworksByFilter } from "@/data/artworks";
import ArtCard from "@/components/ArtCard";
import BatchDownloadToolbar from "@/components/BatchDownloadToolbar";
import ForceGraph from "@/components/ForceGraph";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, X, Download, ChevronDown, Grid, Network } from "lucide-react";
import { useBatchDownload } from "@/hooks/useBatchDownload";
import { useNavigate } from "react-router-dom";

const Gallery: React.FC = () => {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState<"grid" | "graph">("grid");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtists, setSelectedArtists] = useState<string[]>([]);
  const [selectedMovements, setSelectedMovements] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState("title-asc");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectionMode, setSelectionMode] = useState(false);
  const [artistSearch, setArtistSearch] = useState("");
  const [movementSearch, setMovementSearch] = useState("");
  const [tagSearch, setTagSearch] = useState("");

  const {
    selectedArtworks,
    toggleSelection,
    selectAll,
    clearSelection,
    downloadBatch,
    isDownloading,
    selectionCount,
  } = useBatchDownload();

  // Extract unique values for filters
  const artists = useMemo(() => Array.from(new Set(artworks.map(art => art.artist))).sort(), []);
  const movements = useMemo(() => Array.from(new Set(artworks.map(art => art.movement))).sort(), []);
  const allTags = useMemo(() => Array.from(new Set(artworks.flatMap(art => art.tags))).sort(), []);

  // Filter options based on search
  const filteredArtists = artists.filter(artist => 
    artist.toLowerCase().includes(artistSearch.toLowerCase())
  );
  const filteredMovements = movements.filter(movement => 
    movement.toLowerCase().includes(movementSearch.toLowerCase())
  );
  const filteredTags = allTags.filter(tag => 
    tag.toLowerCase().includes(tagSearch.toLowerCase())
  );

  // Apply filters to get filtered artworks
  let filteredArtworks = getArtworksByFilter({
    artist: selectedArtists.length > 0 ? selectedArtists : undefined,
    movement: selectedMovements.length > 0 ? selectedMovements : undefined,
    tags: selectedTags.length > 0 ? selectedTags : undefined,
    searchTerm: searchTerm
  });

  // Enhanced sorting options
  const sortedArtworks = useMemo(() => {
    return [...filteredArtworks].sort((a, b) => {
      switch (sortBy) {
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "artist-asc":
          const lastNameA = a.artist.split(' ').pop() || a.artist;
          const lastNameB = b.artist.split(' ').pop() || b.artist;
          return lastNameA.localeCompare(lastNameB);
        case "artist-desc":
          const lastNameA2 = a.artist.split(' ').pop() || a.artist;
          const lastNameB2 = b.artist.split(' ').pop() || b.artist;
          return lastNameB2.localeCompare(lastNameA2);
        case "country-asc":
          return (a.location || "").localeCompare(b.location || "");
        case "country-desc":
          return (b.location || "").localeCompare(a.location || "");
        case "year-newest":
          return parseInt(b.year) - parseInt(a.year);
        case "year-oldest":
          return parseInt(a.year) - parseInt(b.year);
        default:
          return 0;
      }
    });
  }, [filteredArtworks, sortBy]);

  const handleArtworkSelect = (id: string) => {
    navigate(`/artwork/${id}`);
  };

  const clearFilters = () => {
    setSelectedArtists([]);
    setSelectedMovements([]);
    setSelectedTags([]);
    setSearchTerm("");
    setArtistSearch("");
    setMovementSearch("");
    setTagSearch("");
  };

  const toggleArtist = (artist: string) => {
    if (artist === "all") {
      setSelectedArtists([]);
    } else {
      setSelectedArtists(prev => 
        prev.includes(artist) 
          ? prev.filter(a => a !== artist)
          : [...prev, artist]
      );
    }
  };

  const toggleMovement = (movement: string) => {
    if (movement === "all") {
      setSelectedMovements([]);
    } else {
      setSelectedMovements(prev => 
        prev.includes(movement) 
          ? prev.filter(m => m !== movement)
          : [...prev, movement]
      );
    }
  };

  const addTag = (tag: string) => {
    if (!selectedTags.includes(tag)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setTagSearch("");
  };

  const removeTag = (tag: string) => {
    setSelectedTags(selectedTags.filter(t => t !== tag));
  };

  const handleSelectAll = () => {
    selectAll(sortedArtworks.map(art => art.id));
  };

  const handleDownloadImages = () => {
    downloadBatch(sortedArtworks, false);
  };

  const handleDownloadWithMetadata = () => {
    downloadBatch(sortedArtworks, true);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-6 py-8">
        <h1 className="text-5xl font-bold mb-8 text-foreground">Gallery</h1>

        {/* Search & Filter Controls */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center justify-between">
            <div className="relative w-full lg:w-96">
              <Input
                type="text"
                placeholder="Search artworks, artists, movements..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 bg-muted/50 border-border/50 rounded-full focus:ring-2 focus:ring-primary/50 text-lg"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6" 
                  onClick={() => setSearchTerm("")}
                >
                  <X className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            <div className="flex gap-3 w-full lg:w-auto">
              {/* View Mode Toggle */}
              <div className="flex bg-muted rounded-full p-1">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-full"
                >
                  <Grid className="mr-2 h-4 w-4" />
                  Grid
                </Button>
                <Button
                  variant={viewMode === "graph" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("graph")}
                  className="rounded-full"
                >
                  <Network className="mr-2 h-4 w-4" />
                  Graph
                </Button>
              </div>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-full lg:w-[200px] bg-muted/50 border-border/50 rounded-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="title-asc">Title A-Z</SelectItem>
                  <SelectItem value="title-desc">Title Z-A</SelectItem>
                  <SelectItem value="artist-asc">Artist A-Z</SelectItem>
                  <SelectItem value="artist-desc">Artist Z-A</SelectItem>
                  <SelectItem value="country-asc">Country A-Z</SelectItem>
                  <SelectItem value="country-desc">Country Z-A</SelectItem>
                  <SelectItem value="year-newest">Newest First</SelectItem>
                  <SelectItem value="year-oldest">Oldest First</SelectItem>
                </SelectContent>
              </Select>

              <Button 
                variant="outline" 
                onClick={() => setIsFilterOpen(!isFilterOpen)}
                className="w-full lg:w-auto bg-muted/50 border-border/50 rounded-full hover:bg-muted"
              >
                <Filter className="mr-2 h-4 w-4" />
                Filters {(selectedArtists.length + selectedMovements.length + selectedTags.length) > 0 ? 
                  `(${selectedArtists.length + selectedMovements.length + selectedTags.length})` : ""}
                <ChevronDown className="ml-2 h-4 w-4" />
              </Button>

              {viewMode === "grid" && (
                <Button 
                  variant={selectionMode ? "default" : "outline"}
                  onClick={() => {
                    setSelectionMode(!selectionMode);
                    if (selectionMode) {
                      clearSelection();
                    }
                  }}
                  className="w-full lg:w-auto rounded-full"
                >
                  <Download className="mr-2 h-4 w-4" />
                  {selectionMode ? "Exit Selection" : "Batch Download"}
                </Button>
              )}
            </div>
          </div>
          
          {/* Enhanced Filter Panel */}
          {isFilterOpen && (
            <div className="mt-6 p-6 bg-card border border-border/50 rounded-xl shadow-lg animate-fade-in">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Artists Filter */}
                <div>
                  <h3 className="font-bold mb-4 text-foreground text-xl">Artists</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Search artists..."
                      value={artistSearch}
                      onChange={(e) => setArtistSearch(e.target.value)}
                      className="bg-muted/50 border-border/50 rounded-full"
                    />
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      <label className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedArtists.length === 0}
                          onChange={() => toggleArtist("all")}
                          className="mr-3 rounded"
                        />
                        <span className="font-medium">All Artists</span>
                      </label>
                      {filteredArtists.map(artist => (
                        <label key={artist} className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedArtists.includes(artist)}
                            onChange={() => toggleArtist(artist)}
                            className="mr-3 rounded"
                          />
                          <span>{artist}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Movements Filter */}
                <div>
                  <h3 className="font-bold mb-4 text-foreground text-xl">Art Movements</h3>
                  <div className="space-y-3">
                    <Input
                      placeholder="Search movements..."
                      value={movementSearch}
                      onChange={(e) => setMovementSearch(e.target.value)}
                      className="bg-muted/50 border-border/50 rounded-full"
                    />
                    <div className="max-h-48 overflow-y-auto space-y-2">
                      <label className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={selectedMovements.length === 0}
                          onChange={() => toggleMovement("all")}
                          className="mr-3 rounded"
                        />
                        <span className="font-medium">All Movements</span>
                      </label>
                      {filteredMovements.map(movement => (
                        <label key={movement} className="flex items-center p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
                          <input
                            type="checkbox"
                            checked={selectedMovements.includes(movement)}
                            onChange={() => toggleMovement(movement)}
                            className="mr-3 rounded"
                          />
                          <span>{movement}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>
                
                {/* Tags Filter */}
                <div>
                  <h3 className="font-bold mb-4 text-foreground text-xl">Tags</h3>
                  <div className="space-y-3">
                    <div className="relative">
                      <Input
                        placeholder="Search and add tags..."
                        value={tagSearch}
                        onChange={(e) => setTagSearch(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && tagSearch.trim()) {
                            const matchingTag = filteredTags.find(tag => 
                              tag.toLowerCase() === tagSearch.toLowerCase()
                            );
                            if (matchingTag) {
                              addTag(matchingTag);
                            }
                          } else if (e.key === 'Tab' && filteredTags.length > 0) {
                            e.preventDefault();
                            setTagSearch(filteredTags[0]);
                          }
                        }}
                        className="bg-muted/50 border-border/50 rounded-full"
                      />
                    </div>
                    
                    {/* Selected Tags */}
                    {selectedTags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {selectedTags.map(tag => (
                          <span
                            key={tag}
                            className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/20 text-primary border border-primary/30"
                          >
                            {tag}
                            <button
                              onClick={() => removeTag(tag)}
                              className="ml-2 hover:text-destructive"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </span>
                        ))}
                      </div>
                    )}
                    
                    {/* Tag Suggestions */}
                    {tagSearch && filteredTags.length > 0 && (
                      <div className="max-h-32 overflow-y-auto space-y-1">
                        {filteredTags.slice(0, 10).map(tag => (
                          <button
                            key={tag}
                            onClick={() => addTag(tag)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-muted/50 text-sm transition-colors"
                          >
                            {tag}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {(selectedArtists.length > 0 || selectedMovements.length > 0 || selectedTags.length > 0) && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                    className="w-full lg:w-auto"
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Content Display */}
        <div>
          {viewMode === "graph" ? (
            // Graph View
            <div className="bg-muted/20 rounded-xl p-4 mb-8 overflow-hidden border border-border">
              <div className="bg-card rounded-xl shadow-inner flex justify-center items-center h-[700px] border border-border/30">
                <ForceGraph 
                  artworks={sortedArtworks} 
                  onArtworkSelect={handleArtworkSelect}
                />
              </div>
              <div className="mt-4 text-center">
                <p className="text-muted-foreground text-lg">
                  Interactive network showing {sortedArtworks.length} artworks. 
                  Drag nodes to explore connections, click to view details.
                </p>
              </div>
            </div>
          ) : (
            // Grid View
            sortedArtworks.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {sortedArtworks.map((artwork) => (
                  <ArtCard 
                    key={artwork.id} 
                    artwork={artwork}
                    selectionMode={selectionMode}
                    isSelected={selectedArtworks.has(artwork.id)}
                    onToggleSelect={toggleSelection}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-card border border-border/50 rounded-xl p-8 max-w-md mx-auto">
                  <h3 className="text-2xl font-bold mb-2">No Artworks Found</h3>
                  <p className="text-muted-foreground mb-4 text-lg">
                    No artworks found matching your current filters and search criteria.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={clearFilters}
                  >
                    Clear All Filters
                  </Button>
                </div>
              </div>
            )
          )}
        </div>

        {/* Batch Download Toolbar */}
        {viewMode === "grid" && (
          <BatchDownloadToolbar
            selectedCount={selectionCount}
            totalCount={sortedArtworks.length}
            onSelectAll={handleSelectAll}
            onClearSelection={clearSelection}
            onDownloadImages={handleDownloadImages}
            onDownloadWithMetadata={handleDownloadWithMetadata}
            isDownloading={isDownloading}
          />
        )}
      </div>
    </div>
  );
};

export default Gallery;
