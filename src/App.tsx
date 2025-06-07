import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom";

// Theme Provider
import { ThemeProvider } from "./components/ThemeProvider";

// Pages
import Index from "./pages/Index";
import Gallery from "./pages/Gallery";
import ArtworkPage from "./pages/ArtworkPage";
import GraphPage from "./pages/GraphPage";
import DailyPage from "./pages/DailyPage";
import SearchPage from "./pages/SearchPage";
import NotFound from "./pages/NotFound";

// Components
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import WallpaperApp from "./components/WallpaperApp";
import WallpaperDesktopApp from "./components/WallpaperDesktopApp";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="dark" storageKey="nuvva-ui-theme">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <HashRouter>
          <div className="flex flex-col min-h-screen bg-background transition-colors duration-300">
            <Routes>
              <Route path="/wallpaper-app" element={<WallpaperApp />} />
              <Route path="/wallpaper-desktop" element={<WallpaperDesktopApp />} />
              <Route path="*" element={
                <>
                  <Navbar />
                  <main className="flex-grow">
                    <Routes>
                      <Route path="/" element={<Index />} />
                      <Route path="/gallery" element={<Gallery />} />
                      <Route path="/artwork/:id" element={<ArtworkPage />} />
                      <Route path="/graph" element={<GraphPage />} />
                      <Route path="/daily" element={<DailyPage />} />
                      <Route path="/search" element={<SearchPage />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </main>
                  <Footer />
                </>
              } />
            </Routes>
          </div>
        </HashRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
