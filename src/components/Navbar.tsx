
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import ThemeToggle from "./ThemeToggle";

interface NavbarProps {
  onSearch?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ onSearch }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-xl border-b-2 border-border/50 shadow-lg">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold font-mono text-foreground hover:text-primary transition-colors">
            Nuvva
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <Link to="/" className="navbar-item">
              Home
            </Link>
            <Link to="/gallery" className="navbar-item">
              Gallery
            </Link>
            <Link to="/graph" className="navbar-item">
              Connections
            </Link>
            <Link to="/daily" className="navbar-item">
              Daily
            </Link>
          </nav>

          {/* Enhanced Search Bar */}
          <div className="hidden md:flex items-center gap-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center">
              <div className="relative group">
                <Input
                  type="text"
                  placeholder="Search artists, movements, artworks..."
                  className="w-[300px] lg:w-[400px] pl-12 pr-4 py-3 bg-muted/50 border-2 border-border/50 rounded-full focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-300 font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
              </div>
            </form>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden pt-6 pb-4 animate-fade-in border-t border-border/50 mt-4">
            <form onSubmit={handleSearchSubmit} className="relative flex items-center mb-6">
              <div className="relative group w-full">
                <Input
                  type="text"
                  placeholder="Search artists, movements, artworks..."
                  className="w-full pl-12 pr-4 py-3 bg-muted/50 border-2 border-border/50 rounded-full focus:ring-2 focus:ring-primary/50 font-mono"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </form>
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="navbar-item py-3 px-4 rounded-xl hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/gallery" 
                className="navbar-item py-3 px-4 rounded-xl hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link 
                to="/graph" 
                className="navbar-item py-3 px-4 rounded-xl hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Connections
              </Link>
              <Link 
                to="/daily" 
                className="navbar-item py-3 px-4 rounded-xl hover:bg-muted/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Daily
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
