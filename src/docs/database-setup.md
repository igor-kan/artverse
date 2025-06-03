
# Nuvva Database Setup Guide

## Database Schema Design

### 1. PostgreSQL Schema

```sql
-- Artists table
CREATE TABLE artists (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    birth_year INTEGER,
    death_year INTEGER,
    nationality VARCHAR(100),
    biography TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Art movements table
CREATE TABLE art_movements (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    description TEXT,
    start_year INTEGER,
    end_year INTEGER,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Museums/Sources table
CREATE TABLE museums (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    api_endpoint VARCHAR(500),
    api_key_required BOOLEAN DEFAULT FALSE,
    location VARCHAR(255),
    website VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Artworks table
CREATE TABLE artworks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    artist_id INTEGER REFERENCES artists(id),
    movement_id INTEGER REFERENCES art_movements(id),
    museum_id INTEGER REFERENCES museums(id),
    year_created INTEGER,
    description TEXT,
    dimensions VARCHAR(255),
    medium VARCHAR(255),
    location_created VARCHAR(255),
    image_url VARCHAR(1000),
    high_res_url VARCHAR(1000),
    thumbnail_url VARCHAR(1000),
    public_domain BOOLEAN DEFAULT TRUE,
    external_id VARCHAR(255), -- ID from source museum API
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tags table
CREATE TABLE tags (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Junction table for artwork tags
CREATE TABLE artwork_tags (
    artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    tag_id INTEGER REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (artwork_id, tag_id)
);

-- Artwork connections (related artworks)
CREATE TABLE artwork_connections (
    artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    connected_artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    connection_type VARCHAR(100), -- 'similar_style', 'same_artist', 'same_movement', etc.
    PRIMARY KEY (artwork_id, connected_artwork_id)
);

-- User favorites (for future user system)
CREATE TABLE user_favorites (
    id SERIAL PRIMARY KEY,
    user_id INTEGER, -- Will reference users table when implemented
    artwork_id INTEGER REFERENCES artworks(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Download tracking
CREATE TABLE downloads (
    id SERIAL PRIMARY KEY,
    artwork_id INTEGER REFERENCES artworks(id),
    download_type VARCHAR(50), -- 'image', 'metadata', 'wallpaper'
    resolution VARCHAR(50),
    downloaded_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    ip_address INET
);
```

### 2. Indexes for Performance

```sql
-- Essential indexes
CREATE INDEX idx_artworks_artist ON artworks(artist_id);
CREATE INDEX idx_artworks_movement ON artworks(movement_id);
CREATE INDEX idx_artworks_year ON artworks(year_created);
CREATE INDEX idx_artworks_title ON artworks(title);
CREATE INDEX idx_artwork_tags_artwork ON artwork_tags(artwork_id);
CREATE INDEX idx_artwork_tags_tag ON artwork_tags(tag_id);

-- Full-text search indexes
CREATE INDEX idx_artworks_title_search ON artworks USING gin(to_tsvector('english', title));
CREATE INDEX idx_artworks_description_search ON artworks USING gin(to_tsvector('english', description));
CREATE INDEX idx_artists_name_search ON artists USING gin(to_tsvector('english', name));
```

## Data Population Strategy

### 1. Museum API Integration

#### The Met Museum API
```javascript
const fetchMetArtworks = async () => {
    const response = await fetch('https://collectionapi.metmuseum.org/public/collection/v1/objects');
    const data = await response.json();
    
    for (const objectId of data.objectIDs.slice(0, 1000)) {
        const artwork = await fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objectId}`);
        const artworkData = await artwork.json();
        
        if (artworkData.isPublicDomain && artworkData.primaryImage) {
            await insertArtwork(artworkData);
        }
    }
};
```

#### Rijksmuseum API
```javascript
const fetchRijksmuseumArt = async () => {
    const apiKey = process.env.RIJKSMUSEUM_API_KEY;
    const response = await fetch(`https://www.rijksmuseum.nl/api/en/collection?key=${apiKey}&format=json&q=*&imgonly=True&p=1&ps=100`);
    const data = await response.json();
    
    for (const artwork of data.artObjects) {
        if (artwork.webImage && artwork.webImage.url) {
            await insertArtwork(transformRijksmuseumData(artwork));
        }
    }
};
```

#### National Gallery of Art API
```javascript
const fetchNGAArt = async () => {
    const response = await fetch('https://api.nga.gov/art?limit=100&offset=0');
    const data = await response.json();
    
    for (const artwork of data.data) {
        if (artwork.images && artwork.images.length > 0) {
            await insertArtwork(transformNGAData(artwork));
        }
    }
};
```

### 2. Data Transformation Pipeline

```javascript
const insertArtwork = async (rawData) => {
    const client = await pool.connect();
    
    try {
        await client.query('BEGIN');
        
        // Insert or get artist
        const artist = await upsertArtist(rawData.artist, client);
        
        // Insert or get movement
        const movement = await upsertMovement(rawData.movement, client);
        
        // Insert artwork
        const artworkResult = await client.query(`
            INSERT INTO artworks (title, artist_id, movement_id, year_created, description, image_url)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `, [rawData.title, artist.id, movement.id, rawData.year, rawData.description, rawData.imageUrl]);
        
        // Insert tags
        await insertTags(artworkResult.rows[0].id, rawData.tags, client);
        
        await client.query('COMMIT');
    } catch (error) {
        await client.query('ROLLBACK');
        console.error('Error inserting artwork:', error);
    } finally {
        client.release();
    }
};
```

### 3. Scalability Considerations

#### Caching Strategy
- Use Redis for frequently accessed data
- Cache search results for common queries
- Store processed image URLs for different resolutions

#### Image Storage
- Use AWS S3 or Cloudinary for image hosting
- Generate multiple resolutions automatically
- Implement lazy loading for gallery views

#### Database Optimization
- Partition large tables by year or museum
- Use read replicas for search queries
- Implement connection pooling

### 4. Maintenance Scripts

#### Daily Sync Script
```bash
#!/bin/bash
# daily-sync.sh
node scripts/sync-met-museum.js
node scripts/sync-rijksmuseum.js
node scripts/sync-nga.js
node scripts/generate-connections.js
node scripts/optimize-images.js
```

#### Data Quality Checks
```sql
-- Check for artworks without images
SELECT COUNT(*) FROM artworks WHERE image_url IS NULL;

-- Check for duplicate artworks
SELECT title, artist_id, COUNT(*) 
FROM artworks 
GROUP BY title, artist_id 
HAVING COUNT(*) > 1;

-- Check orphaned records
SELECT COUNT(*) FROM artworks WHERE artist_id NOT IN (SELECT id FROM artists);
```

## Environment Setup

### Required Environment Variables
```env
DATABASE_URL=postgresql://username:password@localhost:5432/nuvva
REDIS_URL=redis://localhost:6379
RIJKSMUSEUM_API_KEY=your_api_key
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
S3_BUCKET_NAME=nuvva-artworks
```

### Docker Setup
```yaml
version: '3.8'
services:
  postgres:
    image: postgres:15
    environment:
      POSTGRES_DB: nuvva
      POSTGRES_USER: nuvva
      POSTGRES_PASSWORD: password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
      
  redis:
    image: redis:7
    ports:
      - "6379:6379"
      
volumes:
  postgres_data:
```

This database setup provides a solid foundation for scaling Nuvva to handle millions of artworks while maintaining fast search and retrieval capabilities.
