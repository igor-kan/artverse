
import { useState } from "react";
import { Artwork } from "@/data/artworks";
import { saveAs } from "file-saver";
import JSZip from "jszip";
import { useToast } from "@/hooks/use-toast";

export const useBatchDownload = () => {
  const [selectedArtworks, setSelectedArtworks] = useState<Set<string>>(new Set());
  const [isDownloading, setIsDownloading] = useState(false);
  const { toast } = useToast();

  const toggleSelection = (artworkId: string) => {
    setSelectedArtworks(prev => {
      const newSet = new Set(prev);
      if (newSet.has(artworkId)) {
        newSet.delete(artworkId);
      } else {
        newSet.add(artworkId);
      }
      return newSet;
    });
  };

  const selectAll = (artworkIds: string[]) => {
    setSelectedArtworks(new Set(artworkIds));
  };

  const clearSelection = () => {
    setSelectedArtworks(new Set());
  };

  const downloadBatch = async (artworks: Artwork[], includeMetadata: boolean = false) => {
    if (selectedArtworks.size === 0) {
      toast({
        title: "No artworks selected",
        description: "Please select artworks to download",
        variant: "destructive",
      });
      return;
    }

    setIsDownloading(true);
    const zip = new JSZip();
    
    try {
      const selectedArtworkList = artworks.filter(art => selectedArtworks.has(art.id));
      
      for (const artwork of selectedArtworkList) {
        try {
          // Download image
          const response = await fetch(artwork.imageUrl);
          const blob = await response.blob();
          const fileName = `${artwork.title.replace(/[^a-zA-Z0-9]/g, "_")}_${artwork.year}_${artwork.artist.replace(/[^a-zA-Z0-9]/g, "_")}.jpg`;
          zip.file(fileName, blob);

          // Add metadata if requested
          if (includeMetadata) {
            const metadata = `
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
            
            const metadataFileName = `${artwork.title.replace(/[^a-zA-Z0-9]/g, "_")}_info.txt`;
            zip.file(metadataFileName, metadata);
          }
        } catch (error) {
          console.error(`Failed to download artwork ${artwork.id}:`, error);
        }
      }

      const zipBlob = await zip.generateAsync({ type: "blob" });
      const zipFileName = `nuvva_artworks_${new Date().toISOString().split('T')[0]}.zip`;
      saveAs(zipBlob, zipFileName);

      toast({
        title: "Download complete",
        description: `${selectedArtworks.size} artworks downloaded successfully`,
      });

      clearSelection();
    } catch (error) {
      console.error("Batch download failed:", error);
      toast({
        title: "Download failed",
        description: "There was an error creating the download package",
        variant: "destructive",
      });
    } finally {
      setIsDownloading(false);
    }
  };

  return {
    selectedArtworks,
    toggleSelection,
    selectAll,
    clearSelection,
    downloadBatch,
    isDownloading,
    selectionCount: selectedArtworks.size,
  };
};
