
import React from "react";
import { Button } from "@/components/ui/button";
import { Download, X, CheckSquare, Square } from "lucide-react";
import { Artwork } from "@/data/artworks";

interface BatchDownloadToolbarProps {
  selectedCount: number;
  totalCount: number;
  onSelectAll: () => void;
  onClearSelection: () => void;
  onDownloadImages: () => void;
  onDownloadWithMetadata: () => void;
  isDownloading: boolean;
}

const BatchDownloadToolbar: React.FC<BatchDownloadToolbarProps> = ({
  selectedCount,
  totalCount,
  onSelectAll,
  onClearSelection,
  onDownloadImages,
  onDownloadWithMetadata,
  isDownloading,
}) => {
  if (selectedCount === 0) return null;

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 bg-background border rounded-lg shadow-lg p-4 mx-auto max-w-4xl">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="text-sm font-medium">
            {selectedCount} of {totalCount} artworks selected
          </span>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={selectedCount === totalCount ? onClearSelection : onSelectAll}
            >
              {selectedCount === totalCount ? (
                <>
                  <Square className="mr-2 h-4 w-4" />
                  Deselect All
                </>
              ) : (
                <>
                  <CheckSquare className="mr-2 h-4 w-4" />
                  Select All
                </>
              )}
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClearSelection}
            >
              <X className="mr-2 h-4 w-4" />
              Clear
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            onClick={onDownloadImages}
            disabled={isDownloading}
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? "Downloading..." : "Download Images"}
          </Button>
          
          <Button
            variant="outline"
            onClick={onDownloadWithMetadata}
            disabled={isDownloading}
            size="sm"
          >
            <Download className="mr-2 h-4 w-4" />
            {isDownloading ? "Downloading..." : "Images + Metadata"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BatchDownloadToolbar;
