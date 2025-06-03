
import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="bg-card/60 backdrop-blur-sm border-t-2 border-border/50 mt-20 shadow-lg">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h2 className="text-2xl font-bold mb-4 text-foreground font-mono">Nuvva</h2>
            <p className="text-muted-foreground max-w-sm leading-relaxed font-mono">
              Explore high-definition public domain artworks from the world's greatest museums and collections.
            </p>
          </div>
          
          <div className="filter-section">
            <h3 className="font-bold mb-4 text-foreground font-mono">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/graph" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono">
                  Art Connections
                </Link>
              </li>
              <li>
                <Link to="/daily" className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono">
                  Daily Masterpiece
                </Link>
              </li>
            </ul>
          </div>
          
          <div className="filter-section">
            <h3 className="font-bold mb-4 text-foreground font-mono">Museum Sources</h3>
            <ul className="space-y-3">
              <li>
                <a 
                  href="https://www.metmuseum.org/about-the-met/policies-and-documents/open-access"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  The Met Open Access
                </a>
              </li>
              <li>
                <a 
                  href="https://data.rijksmuseum.nl/object-metadata/api/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  Rijksmuseum API
                </a>
              </li>
              <li>
                <a 
                  href="https://www.nga.gov/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  National Gallery of Art
                </a>
              </li>
              <li>
                <a 
                  href="https://www.nationalgallery.org.uk/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  National Gallery London
                </a>
              </li>
              <li>
                <a 
                  href="https://www.museodelprado.es/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  Museo del Prado
                </a>
              </li>
              <li>
                <a 
                  href="https://www.getty.edu/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-primary transition-colors duration-300 font-mono text-sm"
                >
                  Getty Museum
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t-2 border-border/50 text-sm text-muted-foreground flex flex-col md:flex-row justify-between items-center font-mono">
          <p>&copy; {new Date().getFullYear()} Nuvva. All artworks belong to the public domain.</p>
          <div className="mt-4 md:mt-0 flex items-center space-x-4">
            <span className="bg-gradient-to-r from-primary/40 to-accent/40 px-4 py-2 rounded-full text-xs font-medium border border-primary/30">
              Open Source Art
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
