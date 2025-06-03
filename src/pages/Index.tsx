
import React from "react";
import { Link } from "react-router-dom";
import { getDailyMasterpiece, artworks } from "@/data/artworks";
import { Button } from "@/components/ui/button";
import ArtCard from "@/components/ArtCard";
import { Sparkles, Download, Eye } from "lucide-react";

const Index: React.FC = () => {
  const dailyMasterpiece = getDailyMasterpiece();
  const featuredArtworks = artworks.slice(0, 6);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={dailyMasterpiece.imageUrl}
            alt="Featured Artwork"
            className="w-full h-full object-cover opacity-20"
            style={{ objectPosition: "center 30%" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-background/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background/60" />
        </div>
        
        <div className="container relative z-10 mx-auto px-6">
          <div className="max-w-4xl">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <Sparkles className="h-4 w-4 text-primary mr-2" />
              <span className="text-sm font-mono text-primary">Public Domain Art Collection</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-mono font-bold leading-tight mb-6">
              <span className="bg-gradient-to-r from-foreground via-primary to-accent bg-clip-text text-transparent">
                Discover timeless
              </span>
              <br />
              <span className="text-foreground">masterpieces</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl leading-relaxed mb-10">
              Explore high-definition artworks from the world's greatest museums. 
              Download, share, and celebrate art that belongs to humanity.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-8 py-6 text-lg font-medium">
                <Link to="/gallery">
                  <Eye className="mr-2 h-5 w-5" />
                  Explore Gallery
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="border-2 border-primary/30 bg-background/50 backdrop-blur-sm rounded-full px-8 py-6 text-lg font-medium hover:bg-primary/10">
                <Link to={`/artwork/${dailyMasterpiece.id}`}>
                  <Sparkles className="mr-2 h-5 w-5" />
                  Today's Masterpiece
                </Link>
              </Button>
            </div>
            
            <div className="mt-12 flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span>Free Downloads</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-accent rounded-full mr-2"></div>
                <span>High Definition</span>
              </div>
              <div className="flex items-center">
                <div className="w-2 h-2 bg-primary rounded-full mr-2"></div>
                <span>Public Domain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="section-title">Featured Collection</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Curated masterpieces from renowned artists and movements
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
            {featuredArtworks.map((artwork, index) => (
              <div key={artwork.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
                <ArtCard artwork={artwork} />
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <Button asChild size="lg" variant="outline" className="rounded-full px-8 py-6 text-lg border-2 border-primary/30 hover:bg-primary/10">
              <Link to="/gallery">
                <Download className="mr-2 h-5 w-5" />
                View Complete Gallery
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Art Connections Highlight */}
      <section className="py-20 md:py-32 bg-card border-y border-border/50">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6">
                <span className="text-sm font-mono text-accent">Interactive Experience</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-mono font-bold mb-6">
                Discover Connected
                <br />
                <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  Masterpieces
                </span>
              </h2>
              
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                Explore art through our interactive graph visualization. Uncover connections 
                between artworks based on artists, movements, themes, and historical context.
              </p>
              
              <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
                <Link to="/graph">
                  Explore Connections
                </Link>
              </Button>
            </div>
            
            <div className="relative">
              <div className="bg-gradient-to-br from-primary/20 to-accent/20 rounded-2xl p-8 border border-primary/20">
                <img 
                  src="/placeholder.svg" 
                  alt="Art Connections Graph" 
                  className="w-full h-auto rounded-xl opacity-80"
                />
                <div className="absolute inset-4 bg-gradient-to-br from-primary/10 to-transparent rounded-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Daily Masterpiece */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative order-2 lg:order-1">
              <div className="relative group">
                <img 
                  src={dailyMasterpiece.imageUrl} 
                  alt={dailyMasterpiece.title} 
                  className="rounded-2xl shadow-2xl w-full h-auto transition-transform duration-500 group-hover:scale-[1.02]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="bg-background/90 backdrop-blur-sm rounded-xl p-4 border border-border/50">
                    <p className="text-sm text-muted-foreground">Today's Featured</p>
                    <p className="font-mono font-semibold">{dailyMasterpiece.title}</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="order-1 lg:order-2">
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
                <Sparkles className="h-4 w-4 text-primary mr-2" />
                <span className="text-sm font-mono text-primary">Daily Featured</span>
              </div>
              
              <h2 className="text-2xl font-mono mb-2 text-accent">Today's Masterpiece</h2>
              <h3 className="text-4xl md:text-5xl font-mono font-bold mb-4">
                {dailyMasterpiece.title}
              </h3>
              <p className="text-xl mb-4 text-muted-foreground">
                {dailyMasterpiece.artist}, {dailyMasterpiece.year}
              </p>
              <p className="text-lg mb-8 leading-relaxed text-muted-foreground">
                {dailyMasterpiece.description}
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild size="lg" className="rounded-full px-8 py-6 text-lg">
                  <Link to={`/artwork/${dailyMasterpiece.id}`}>
                    <Eye className="mr-2 h-5 w-5" />
                    View Details
                  </Link>
                </Button>
                <Button asChild variant="outline" size="lg" className="rounded-full px-8 py-6 text-lg border-2 border-primary/30 hover:bg-primary/10">
                  <Link to="/daily">
                    <Download className="mr-2 h-5 w-5" />
                    Download HD
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
