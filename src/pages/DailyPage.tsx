
import React from "react";
import { getDailyMasterpiece, getRelatedArtworks } from "@/data/artworks";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { saveAs } from "file-saver";
import { useToast } from "@/components/ui/use-toast";
import ArtCard from "@/components/ArtCard";

const DailyPage: React.FC = () => {
  const dailyMasterpiece = getDailyMasterpiece();
  const relatedArtworks = getRelatedArtworks(dailyMasterpiece);
  const { toast } = useToast();

  const handleDownloadWallpaper = (resolution: string) => {
    const fileName = `${dailyMasterpiece.title.replace(/\s+/g, "_")}_wallpaper_${resolution}.jpg`;

    // In a real app, we'd generate properly formatted wallpapers
    // For this demo, we'll just download the original image
    fetch(dailyMasterpiece.imageUrl)
      .then(response => response.blob())
      .then(blob => {
        saveAs(blob, fileName);
        toast({
          title: "Wallpaper downloaded",
          description: `${resolution} wallpaper saved to your device`,
        });
      })
      .catch(err => {
        toast({
          title: "Download failed",
          description: "There was an error downloading the wallpaper",
          variant: "destructive",
        });
        console.error("Download error:", err);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif font-semibold mb-2">Today's Masterpiece</h1>
      <p className="mb-8 text-muted-foreground">
        A new featured artwork every day to inspire and educate.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 mb-16">
        <div className="lg:col-span-3">
          <div className="relative rounded-lg overflow-hidden border bg-muted/20">
            <img 
              src={dailyMasterpiece.imageUrl} 
              alt={dailyMasterpiece.title}
              className="w-full h-auto" 
            />
          </div>
        </div>

        <div className="lg:col-span-2">
          <h2 className="text-3xl font-serif font-semibold">{dailyMasterpiece.title}</h2>
          <p className="text-xl mt-1 text-muted-foreground mb-4">{dailyMasterpiece.artist}, {dailyMasterpiece.year}</p>
          
          <div className="space-y-4 mb-6">
            <p className="text-lg">{dailyMasterpiece.description}</p>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Source</h3>
              <p>{dailyMasterpiece.source}</p>
            </div>
            
            <div>
              <h3 className="text-sm font-medium text-muted-foreground">Movement</h3>
              <p>{dailyMasterpiece.movement}</p>
            </div>
          </div>
          
          <Button asChild className="w-full">
            <Link to={`/artwork/${dailyMasterpiece.id}`}>View Full Details</Link>
          </Button>
        </div>
      </div>

      {/* Wallpaper Section */}
      <div className="mb-16">
        <h2 className="section-title mb-6">Suggested Wallpapers</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={dailyMasterpiece.imageUrl} 
                alt="Desktop wallpaper" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Desktop - 1920x1080</h3>
              <Button 
                onClick={() => handleDownloadWallpaper("1920x1080")}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-video relative">
              <img 
                src={dailyMasterpiece.imageUrl} 
                alt="Desktop wallpaper 4K" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Desktop - 4K (3840x2160)</h3>
              <Button 
                onClick={() => handleDownloadWallpaper("3840x2160")}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
          
          <Card className="overflow-hidden">
            <div className="aspect-[9/19] relative">
              <img 
                src={dailyMasterpiece.imageUrl} 
                alt="Mobile wallpaper" 
                className="w-full h-full object-cover"
              />
            </div>
            <CardContent className="p-4">
              <h3 className="font-medium mb-2">Mobile - 1080x1920</h3>
              <Button 
                onClick={() => handleDownloadWallpaper("1080x1920")}
                className="w-full"
              >
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Related Artworks */}
      {relatedArtworks.length > 0 && (
        <div>
          <h2 className="section-title mb-6">Related Artworks</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {relatedArtworks.map((artwork) => (
              <ArtCard key={artwork.id} artwork={artwork} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default DailyPage;
