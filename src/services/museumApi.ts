
import { Artwork } from "@/data/artworks";

// The Met Museum API integration
export class MetMuseumAPI {
  private baseUrl = "https://collectionapi.metmuseum.org/public/collection/v1";

  async searchArtworks(query: string, limit: number = 20): Promise<Artwork[]> {
    try {
      const searchResponse = await fetch(`${this.baseUrl}/search?q=${encodeURIComponent(query)}&hasImages=true`);
      const searchData = await searchResponse.json();
      
      if (!searchData.objectIDs) return [];
      
      const objectIds = searchData.objectIDs.slice(0, limit);
      const artworks: Artwork[] = [];
      
      for (const id of objectIds) {
        try {
          const objectResponse = await fetch(`${this.baseUrl}/objects/${id}`);
          const objectData = await objectResponse.json();
          
          if (objectData.primaryImage && objectData.isPublicDomain) {
            const artwork: Artwork = {
              id: `met-${objectData.objectID}`,
              title: objectData.title || "Untitled",
              artist: objectData.artistDisplayName || "Unknown Artist",
              year: objectData.objectDate || "Unknown",
              source: "The Metropolitan Museum of Art",
              description: this.generateDescription(objectData),
              imageUrl: objectData.primaryImage,
              tags: this.generateTags(objectData),
              movement: objectData.period || objectData.dynasty || "Unknown",
              location: objectData.city || objectData.country || "Unknown",
              dimensions: objectData.dimensions || undefined,
              medium: objectData.medium || undefined,
            };
            artworks.push(artwork);
          }
        } catch (error) {
          console.error(`Failed to fetch object ${id}:`, error);
        }
      }
      
      return artworks;
    } catch (error) {
      console.error("Met Museum API search failed:", error);
      return [];
    }
  }

  private generateDescription(objectData: any): string {
    const parts = [];
    
    if (objectData.title) parts.push(`"${objectData.title}"`);
    if (objectData.artistDisplayName) parts.push(`by ${objectData.artistDisplayName}`);
    if (objectData.objectDate) parts.push(`from ${objectData.objectDate}`);
    if (objectData.department) parts.push(`in the ${objectData.department} collection`);
    if (objectData.culture) parts.push(`representing ${objectData.culture} culture`);
    
    return parts.join(" ") + ".";
  }

  private generateTags(objectData: any): string[] {
    const tags = [];
    
    if (objectData.medium) tags.push(objectData.medium.toLowerCase());
    if (objectData.department) tags.push(objectData.department.toLowerCase());
    if (objectData.culture) tags.push(objectData.culture.toLowerCase());
    if (objectData.period) tags.push(objectData.period.toLowerCase());
    if (objectData.classification) tags.push(objectData.classification.toLowerCase());
    
    return [...new Set(tags)].slice(0, 5);
  }
}

// Rijksmuseum API integration
export class RijksmuseumAPI {
  private baseUrl = "https://www.rijksmuseum.nl/api/en/collection";
  private apiKey = "0fiuZFh4"; // Public API key for demo purposes

  async searchArtworks(query: string, limit: number = 20): Promise<Artwork[]> {
    try {
      const response = await fetch(
        `${this.baseUrl}?key=${this.apiKey}&q=${encodeURIComponent(query)}&imgonly=true&ps=${limit}&type=painting`
      );
      const data = await response.json();
      
      if (!data.artObjects) return [];
      
      return data.artObjects.map((obj: any): Artwork => ({
        id: `rijks-${obj.objectNumber}`,
        title: obj.title || "Untitled",
        artist: obj.principalOrFirstMaker || "Unknown Artist",
        year: obj.dating?.presentingDate || "Unknown",
        source: "Rijksmuseum",
        description: obj.longTitle || obj.title || "A masterpiece from the Rijksmuseum collection.",
        imageUrl: obj.webImage?.url || obj.headerImage?.url,
        tags: this.generateTags(obj),
        movement: obj.dating?.period?.[0] || "Dutch Art",
        location: "Amsterdam, Netherlands",
        dimensions: undefined,
        medium: obj.physicalMedium || undefined,
      }));
    } catch (error) {
      console.error("Rijksmuseum API search failed:", error);
      return [];
    }
  }

  private generateTags(obj: any): string[] {
    const tags = [];
    
    if (obj.physicalMedium) tags.push(obj.physicalMedium.toLowerCase());
    if (obj.technique) tags.push(...obj.technique.map((t: string) => t.toLowerCase()));
    if (obj.objectTypes) tags.push(...obj.objectTypes.map((t: string) => t.toLowerCase()));
    
    return [...new Set(tags)].slice(0, 5);
  }
}

// Factory for museum APIs
export const museumAPIs = {
  met: new MetMuseumAPI(),
  rijks: new RijksmuseumAPI(),
};

export type MuseumSource = keyof typeof museumAPIs;
