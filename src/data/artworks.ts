export interface Artwork {
  id: string;
  title: string;
  artist: string;
  year: string;
  source: string;
  description: string;
  imageUrl: string;
  tags: string[];
  movement: string;
  location: string;
  dimensions?: string;
  medium?: string;
  connections?: string[]; // IDs of related artworks
}

export const artworks: Artwork[] = [
  {
    id: "1",
    title: "The Starry Night",
    artist: "Vincent van Gogh",
    year: "1889",
    source: "Museum of Modern Art",
    description: "A swirling night sky over a village, painted during Van Gogh's stay at the asylum of Saint-Paul-de-Mausole in Saint-Rémy-de-Provence.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ea/Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg/1280px-Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg",
    tags: ["night", "stars", "landscape", "swirling", "emotional", "expressionist"],
    movement: "Post-Impressionism",
    location: "Saint-Rémy-de-Provence, France",
    dimensions: "73.7 cm × 92.1 cm",
    medium: "Oil on canvas",
    connections: ["2", "3", "19"]
  },
  {
    id: "2",
    title: "The Great Wave off Kanagawa",
    artist: "Katsushika Hokusai",
    year: "1831",
    source: "Metropolitan Museum of Art",
    description: "The most famous work from Hokusai's series 'Thirty-six Views of Mount Fuji', depicting a large wave threatening boats.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/The_Great_Wave_off_Kanagawa.jpg/1280px-The_Great_Wave_off_Kanagawa.jpg",
    tags: ["wave", "japanese", "mount fuji", "water", "nature", "power", "boats", "woodblock"],
    movement: "Ukiyo-e",
    location: "Japan",
    dimensions: "25.7 cm × 37.9 cm",
    medium: "Woodblock print",
    connections: ["1", "15", "20"]
  },
  {
    id: "3",
    title: "Girl with a Pearl Earring",
    artist: "Johannes Vermeer",
    year: "1665",
    source: "Mauritshuis",
    description: "A portrait of a girl wearing an exotic dress and a large pearl earring, often called the 'Mona Lisa of the North'.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg",
    tags: ["portrait", "baroque", "pearl", "mysterious", "dutch", "beauty", "earring"],
    movement: "Dutch Golden Age",
    location: "Delft, Netherlands",
    dimensions: "44.5 cm × 39 cm",
    medium: "Oil on canvas",
    connections: ["1", "4", "21"]
  },
  {
    id: "4",
    title: "The Persistence of Memory",
    artist: "Salvador Dalí",
    year: "1931",
    source: "Museum of Modern Art",
    description: "Surrealist masterpiece featuring melting clocks in a dreamlike landscape, exploring themes of time and memory.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/The_Persistence_of_Memory.jpg/1200px-The_Persistence_of_Memory.jpg",
    tags: ["surrealism", "time", "clocks", "melting", "dreams", "memory", "landscape", "subconscious"],
    movement: "Surrealism",
    location: "Catalonia, Spain",
    dimensions: "24 cm × 33 cm",
    medium: "Oil on canvas",
    connections: ["3", "5", "22"]
  },
  {
    id: "5",
    title: "The Scream",
    artist: "Edvard Munch",
    year: "1893",
    source: "National Gallery of Norway",
    description: "An expressionist icon depicting an agonized figure against a landscape with an orange sky, representing anxiety and existential angst.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg/800px-Edvard_Munch%2C_1893%2C_The_Scream%2C_oil%2C_tempera_and_pastel_on_cardboard%2C_91_x_73_cm%2C_National_Gallery_of_Norway.jpg",
    tags: ["expressionism", "anxiety", "scream", "orange sky", "emotion", "psychological", "iconic", "existential"],
    movement: "Expressionism",
    location: "Oslo, Norway",
    dimensions: "91 cm × 73.5 cm",
    medium: "Oil, tempera, and pastel on cardboard",
    connections: ["4", "6", "23"]
  },
  {
    id: "6",
    title: "American Gothic",
    artist: "Grant Wood",
    year: "1930",
    source: "Art Institute of Chicago",
    description: "Iconic painting depicting a farmer standing beside his daughter in front of their home, representing rural American values.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/cc/Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg/800px-Grant_Wood_-_American_Gothic_-_Google_Art_Project.jpg",
    tags: ["american", "rural", "gothic", "farmer", "pitchfork", "midwest", "austere", "regionalism"],
    movement: "American Regionalism",
    location: "Iowa, United States",
    dimensions: "78 cm × 65.3 cm",
    medium: "Oil on beaverboard",
    connections: ["5", "7", "24"]
  },
  {
    id: "7",
    title: "Guernica",
    artist: "Pablo Picasso",
    year: "1937",
    source: "Museo Reina Sofía",
    description: "Powerful anti-war painting depicting the horrors of the bombing of Guernica during the Spanish Civil War.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6f/Mural_del_Gernika.jpg/1200px-Mural_del_Gernika.jpg",
    tags: ["war", "bombing", "cubism", "black and white", "protest", "violence", "bull", "horse"],
    movement: "Cubism",
    location: "Spain",
    dimensions: "349.3 cm × 776.6 cm",
    medium: "Oil on canvas",
    connections: ["6", "8", "25"]
  },
  {
    id: "8",
    title: "Water Lilies",
    artist: "Claude Monet",
    year: "1919",
    source: "Musée de l'Orangerie",
    description: "Part of Monet's famous series depicting the water lily pond in his garden at Giverny, showcasing Impressionist light techniques.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/aa/Claude_Monet_-_Water_Lilies_-_1919%2C_Metropolitan_Museum_of_Art.jpg/1200px-Claude_Monet_-_Water_Lilies_-_1919%2C_Metropolitan_Museum_of_Art.jpg",
    tags: ["impressionism", "flowers", "water", "garden", "reflections", "nature", "serenity", "light"],
    movement: "Impressionism",
    location: "Giverny, France",
    dimensions: "100 cm × 300 cm",
    medium: "Oil on canvas",
    connections: ["7", "9", "26"]
  },
  {
    id: "9",
    title: "The Birth of Venus",
    artist: "Sandro Botticelli",
    year: "1485",
    source: "Uffizi Gallery",
    description: "Renaissance masterpiece depicting the goddess Venus arriving at the shore after her birth from the sea.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg/1200px-Sandro_Botticelli_-_La_nascita_di_Venere_-_Google_Art_Project_-_edited.jpg",
    tags: ["mythology", "venus", "goddess", "birth", "beauty", "shell", "renaissance", "nudity"],
    movement: "Italian Renaissance",
    location: "Florence, Italy",
    dimensions: "172.5 cm × 278.9 cm",
    medium: "Tempera on canvas",
    connections: ["8", "10", "27"]
  },
  {
    id: "10",
    title: "Liberty Leading the People",
    artist: "Eugène Delacroix",
    year: "1830",
    source: "Louvre Museum",
    description: "Romantic painting commemorating the July Revolution of 1830, featuring the allegorical figure of Liberty leading the people.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a7/Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg/1200px-Eug%C3%A8ne_Delacroix_-_La_libert%C3%A9_guidant_le_peuple.jpg",
    tags: ["revolution", "liberty", "france", "flag", "romantic", "allegorical", "uprising", "patriotic"],
    movement: "Romanticism",
    location: "France",
    dimensions: "260 cm × 325 cm",
    medium: "Oil on canvas",
    connections: ["9", "11", "28"]
  },
  {
    id: "11",
    title: "The Kiss",
    artist: "Gustav Klimt",
    year: "1908",
    source: "Österreichische Galerie Belvedere",
    description: "Golden masterpiece depicting a couple embracing, representing the height of Klimt's 'Golden Period' and Art Nouveau style.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg/800px-The_Kiss_-_Gustav_Klimt_-_Google_Cultural_Institute.jpg",
    tags: ["love", "gold", "kiss", "embrace", "patterns", "art nouveau", "romance", "golden"],
    movement: "Art Nouveau",
    location: "Vienna, Austria",
    dimensions: "180 cm × 180 cm",
    medium: "Oil and gold leaf on canvas",
    connections: ["10", "12", "29"]
  },
  {
    id: "12",
    title: "Las Meninas",
    artist: "Diego Velázquez",
    year: "1656",
    source: "Museo del Prado",
    description: "Complex composition showing the Infanta Margarita Teresa surrounded by her entourage, with the artist himself painting.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/31/Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg/800px-Las_Meninas%2C_by_Diego_Vel%C3%A1zquez%2C_from_Prado_in_Google_Earth.jpg",
    tags: ["baroque", "royal", "court", "perspective", "mirror", "complex", "spanish", "masterpiece"],
    movement: "Spanish Baroque",
    location: "Madrid, Spain",
    dimensions: "318 cm × 276 cm",
    medium: "Oil on canvas",
    connections: ["11", "13", "30"]
  },
  {
    id: "13",
    title: "The Night Watch",
    artist: "Rembrandt van Rijn",
    year: "1642",
    source: "Rijksmuseum",
    description: "Large group portrait of a militia company, famous for its effective use of light and shadow and dynamic composition.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5a/The_Night_Watch_-_HD.jpg/1200px-The_Night_Watch_-_HD.jpg",
    tags: ["baroque", "group portrait", "military", "chiaroscuro", "dutch", "guards", "drama", "light"],
    movement: "Dutch Golden Age",
    location: "Amsterdam, Netherlands",
    dimensions: "363 cm × 437 cm",
    medium: "Oil on canvas",
    connections: ["12", "14", "3"]
  },
  {
    id: "14",
    title: "A Sunday on La Grande Jatte",
    artist: "Georges Seurat",
    year: "1886",
    source: "Art Institute of Chicago",
    description: "Pioneering pointillist work depicting Parisians relaxing in a riverside park, created using tiny dots of color.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg/1200px-A_Sunday_on_La_Grande_Jatte%2C_Georges_Seurat%2C_1884.jpg",
    tags: ["pointillism", "park", "sunday", "leisure", "dots", "color theory", "modern", "scientific"],
    movement: "Neo-Impressionism",
    location: "Paris, France",
    dimensions: "207.5 cm × 308.1 cm",
    medium: "Oil on canvas",
    connections: ["13", "15", "8"]
  },
  {
    id: "15",
    title: "The Creation of Adam",
    artist: "Michelangelo",
    year: "1512",
    source: "Sistine Chapel",
    description: "Fresco from the Sistine Chapel ceiling depicting the biblical creation of Adam, one of the most famous images in art history.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Creaci%C3%B3n_de_Ad%C3%A1m.jpg/1200px-Creaci%C3%B3n_de_Ad%C3%A1m.jpg",
    tags: ["religious", "biblical", "fresco", "renaissance", "creation", "god", "adam", "ceiling"],
    movement: "High Renaissance",
    location: "Vatican City",
    dimensions: "280 cm × 570 cm",
    medium: "Fresco",
    connections: ["14", "2", "9"]
  },
  {
    id: "16",
    title: "The Mona Lisa",
    artist: "Leonardo da Vinci",
    year: "1503",
    source: "Louvre Museum",
    description: "The world's most famous portrait, showcasing Leonardo's mastery of sfumato and psychological depth.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg/800px-Mona_Lisa%2C_by_Leonardo_da_Vinci%2C_from_C2RMF_retouched.jpg",
    tags: ["portrait", "renaissance", "enigmatic", "smile", "sfumato", "masterpiece", "iconic"],
    movement: "High Renaissance",
    location: "Florence, Italy",
    dimensions: "77 cm × 53 cm",
    medium: "Oil on poplar panel",
    connections: ["15", "9", "3"]
  },
  {
    id: "17",
    title: "The Last Supper",
    artist: "Leonardo da Vinci",
    year: "1498",
    source: "Santa Maria delle Grazie",
    description: "Depicting the biblical scene of Jesus announcing his betrayal, showcasing perfect perspective and emotional drama.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/%C3%9Altima_Cena_-_Da_Vinci_5.jpg/1200px-%C3%9Altima_Cena_-_Da_Vinci_5.jpg",
    tags: ["religious", "biblical", "betrayal", "perspective", "drama", "disciples", "fresco"],
    movement: "High Renaissance",
    location: "Milan, Italy",
    dimensions: "460 cm × 880 cm",
    medium: "Tempera and oil on gesso",
    connections: ["16", "15", "12"]
  },
  {
    id: "18",
    title: "The School of Athens",
    artist: "Raphael",
    year: "1511",
    source: "Vatican Museums",
    description: "Fresco depicting the greatest philosophers and mathematicians of antiquity in an idealized architectural setting.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg/1200px-%22The_School_of_Athens%22_by_Raffaello_Sanzio_da_Urbino.jpg",
    tags: ["philosophy", "mathematics", "classical", "architecture", "perspective", "knowledge", "renaissance"],
    movement: "High Renaissance",
    location: "Vatican City",
    dimensions: "500 cm × 770 cm",
    medium: "Fresco",
    connections: ["17", "15", "16"]
  },
  {
    id: "19",
    title: "Café Terrace at Night",
    artist: "Vincent van Gogh",
    year: "1888",
    source: "Kröller-Müller Museum",
    description: "Van Gogh's first painting featuring his characteristic swirling night sky and vibrant color contrasts.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/2/21/Vincent_Willem_van_Gogh_015.jpg/800px-Vincent_Willem_van_Gogh_015.jpg",
    tags: ["night", "café", "stars", "vibrant", "street scene", "yellow", "blue", "impressionist"],
    movement: "Post-Impressionism",
    location: "Arles, France",
    dimensions: "80.7 cm × 65.3 cm",
    medium: "Oil on canvas",
    connections: ["1", "20", "8"]
  },
  {
    id: "20",
    title: "The Bedroom",
    artist: "Vincent van Gogh",
    year: "1889",
    source: "Van Gogh Museum",
    description: "One of three versions of Van Gogh's bedroom in Arles, showcasing his unique perspective and bold color choices.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg/1200px-Vincent_van_Gogh_-_De_slaapkamer_-_Google_Art_Project.jpg",
    tags: ["interior", "bedroom", "perspective", "simple", "personal", "yellow", "blue", "intimate"],
    movement: "Post-Impressionism",
    location: "Arles, France",
    dimensions: "72 cm × 90 cm",
    medium: "Oil on canvas",
    connections: ["19", "1", "2"]
  },
  {
    id: "21",
    title: "View of Delft",
    artist: "Johannes Vermeer",
    year: "1661",
    source: "Mauritshuis",
    description: "Vermeer's masterful cityscape capturing the light and atmosphere of his hometown with exquisite detail.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a2/Vermeer-view-of-delft.jpg/1200px-Vermeer-view-of-delft.jpg",
    tags: ["cityscape", "light", "atmosphere", "dutch", "baroque", "detailed", "reflections", "clouds"],
    movement: "Dutch Golden Age",
    location: "Delft, Netherlands",
    dimensions: "96.5 cm × 115.7 cm",
    medium: "Oil on canvas",
    connections: ["3", "13", "22"]
  },
  {
    id: "22",
    title: "The Garden of Earthly Delights",
    artist: "Hieronymus Bosch",
    year: "1515",
    source: "Museo del Prado",
    description: "Triptych depicting paradise, earth, and hell with fantastical creatures and surreal imagery.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/9/96/The_Garden_of_earthly_delights.jpg/1200px-The_Garden_of_earthly_delights.jpg",
    tags: ["triptych", "paradise", "hell", "fantastical", "surreal", "religious", "medieval", "symbolic"],
    movement: "Northern Renaissance",
    location: "Netherlands",
    dimensions: "220 cm × 389 cm",
    medium: "Oil on oak panel",
    connections: ["4", "21", "23"]
  },
  {
    id: "23",
    title: "The Son of Man",
    artist: "René Magritte",
    year: "1964",
    source: "Private Collection",
    description: "Surrealist self-portrait of a man in a bowler hat with an apple obscuring his face.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/e/e8/Magritte_TheSonOfMan.jpg/800px-Magritte_TheSonOfMan.jpg",
    tags: ["surrealism", "self-portrait", "apple", "bowler hat", "identity", "hidden", "mysterious"],
    movement: "Surrealism",
    location: "Belgium",
    dimensions: "116 cm × 89 cm",
    medium: "Oil on canvas",
    connections: ["22", "4", "5"]
  },
  {
    id: "24",
    title: "Christina's World",
    artist: "Andrew Wyeth",
    year: "1948",
    source: "Museum of Modern Art",
    description: "Realistic painting of a woman in a field looking toward a farmhouse, embodying American regionalism.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/a/a2/Christinasworld.jpg/1200px-Christinasworld.jpg",
    tags: ["realism", "farm", "woman", "field", "isolation", "american", "landscape", "rural"],
    movement: "American Regionalism",
    location: "Maine, United States",
    dimensions: "81.9 cm × 121.3 cm",
    medium: "Tempera on gessoed masonite",
    connections: ["6", "25", "26"]
  },
  {
    id: "25",
    title: "Les Demoiselles d'Avignon",
    artist: "Pablo Picasso",
    year: "1907",
    source: "Museum of Modern Art",
    description: "Revolutionary painting that marked the beginning of Cubism, depicting five nude women in a radical new style.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/thumb/4/4c/Les_Demoiselles_d%27Avignon.jpg/800px-Les_Demoiselles_d%27Avignon.jpg",
    tags: ["cubism", "revolutionary", "nude", "geometric", "modern", "breakthrough", "abstract"],
    movement: "Cubism",
    location: "Barcelona, Spain",
    dimensions: "243.9 cm × 233.7 cm",
    medium: "Oil on canvas",
    connections: ["7", "24", "26"]
  },
  {
    id: "26",
    title: "Impression, Sunrise",
    artist: "Claude Monet",
    year: "1872",
    source: "Musée Marmottan Monet",
    description: "The painting that gave Impressionism its name, capturing the fleeting effects of light on water.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/Monet_-_Impression%2C_Sunrise.jpg/1200px-Monet_-_Impression%2C_Sunrise.jpg",
    tags: ["impressionism", "sunrise", "harbor", "light", "fleeting", "revolutionary", "atmospheric"],
    movement: "Impressionism",
    location: "Le Havre, France",
    dimensions: "48 cm × 63 cm",
    medium: "Oil on canvas",
    connections: ["8", "25", "27"]
  },
  {
    id: "27",
    title: "Primavera",
    artist: "Sandro Botticelli",
    year: "1482",
    source: "Uffizi Gallery",
    description: "Allegorical painting celebrating spring with mythological figures in a garden setting.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3c/Botticelli-primavera.jpg/1200px-Botticelli-primavera.jpg",
    tags: ["allegory", "spring", "mythology", "garden", "renaissance", "venus", "dancers", "flowers"],
    movement: "Italian Renaissance",
    location: "Florence, Italy",
    dimensions: "202 cm × 314 cm",
    medium: "Tempera on wood",
    connections: ["9", "26", "28"]
  },
  {
    id: "28",
    title: "Napoleon Crossing the Alps",
    artist: "Jacques-Louis David",
    year: "1801",
    source: "Château de Malmaison",
    description: "Heroic portrait of Napoleon Bonaparte during his crossing of the Alps, exemplifying Neoclassical grandeur.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg/800px-David_-_Napoleon_crossing_the_Alps_-_Malmaison2.jpg",
    tags: ["napoleon", "heroic", "alps", "horse", "military", "neoclassical", "propaganda", "dramatic"],
    movement: "Neoclassicism",
    location: "France",
    dimensions: "261 cm × 221 cm",
    medium: "Oil on canvas",
    connections: ["10", "27", "29"]
  },
  {
    id: "29",
    title: "The Arnolfini Portrait",
    artist: "Jan van Eyck",
    year: "1434",
    source: "National Gallery",
    description: "Revolutionary portrait showcasing the wealth and status of a merchant couple with unprecedented detail.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Van_Eyck_-_Arnolfini_Portrait.jpg/800px-Van_Eyck_-_Arnolfini_Portrait.jpg",
    tags: ["portrait", "flemish", "merchant", "wealth", "detail", "symbolism", "renaissance", "oil painting"],
    movement: "Northern Renaissance",
    location: "Bruges, Belgium",
    dimensions: "82.2 cm × 60 cm",
    medium: "Oil on oak panel",
    connections: ["11", "28", "30"]
  },
  {
    id: "30",
    title: "The Anatomy Lesson of Dr. Nicolaes Tulp",
    artist: "Rembrandt van Rijn",
    year: "1632",
    source: "Mauritshuis",
    description: "Group portrait of Amsterdam surgeons observing an anatomy lesson, showcasing Rembrandt's mastery of light.",
    imageUrl: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg/1200px-Rembrandt_-_The_Anatomy_Lesson_of_Dr_Nicolaes_Tulp.jpg",
    tags: ["anatomy", "medical", "group portrait", "education", "baroque", "chiaroscuro", "dutch", "scientific"],
    movement: "Dutch Golden Age",
    location: "Amsterdam, Netherlands",
    dimensions: "169.5 cm × 216.5 cm",
    medium: "Oil on canvas",
    connections: ["12", "29", "13"]
  }
];

export const getDailyMasterpiece = (): Artwork => {
  const today = new Date();
  const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
  return artworks[dayOfYear % artworks.length];
};

export const getRelatedArtworks = (artwork: Artwork): Artwork[] => {
  if (!artwork.connections) return [];
  return artwork.connections.map(id => 
    artworks.find(art => art.id === id)
  ).filter(Boolean) as Artwork[];
};

export const getArtworksByFilter = (
  filter: {
    artist?: string | string[];
    year?: string;
    movement?: string | string[];
    tags?: string[];
    searchTerm?: string;
  }
): Artwork[] => {
  return artworks.filter(art => {
    if (filter.artist) {
      const artists = Array.isArray(filter.artist) ? filter.artist : [filter.artist];
      if (!artists.includes(art.artist)) return false;
    }
    if (filter.year && art.year !== filter.year) return false;
    if (filter.movement) {
      const movements = Array.isArray(filter.movement) ? filter.movement : [filter.movement];
      if (!movements.includes(art.movement)) return false;
    }
    if (filter.tags && filter.tags.length > 0) {
      if (!filter.tags.some(tag => art.tags.includes(tag))) return false;
    }
    if (filter.searchTerm) {
      const term = filter.searchTerm.toLowerCase();
      return (
        art.title.toLowerCase().includes(term) ||
        art.artist.toLowerCase().includes(term) ||
        art.description.toLowerCase().includes(term) ||
        art.movement.toLowerCase().includes(term) ||
        art.tags.some(tag => tag.toLowerCase().includes(term))
      );
    }
    return true;
  });
};
