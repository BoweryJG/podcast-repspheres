# Backend API Endpoints for Live Podcast Feeds

Your frontend now calls these endpoints on your backend: `https://osbackend-zl1h.onrender.com`

## Required Endpoints

### 1. RSS Feed Parser - `POST /api/feeds/rss`

**Request Body:**
```json
{
  "feedUrl": "https://example.com/podcast.rss",
  "feedName": "Podcast Name",
  "category": "medical",
  "maxEpisodes": 3
}
```

**Response:**
```json
[
  {
    "id": "unique-episode-id",
    "title": "Episode Title",
    "author": "Host Name",
    "description": "Episode description",
    "pubDate": "2024-06-13T10:00:00Z",
    "audioUrl": "https://example.com/episode.mp3",
    "duration": 1800,
    "image": "https://example.com/thumbnail.jpg",
    "isLive": true
  }
]
```

### 2. Apple Podcasts - `POST /api/feeds/apple`

**Request Body:**
```json
{
  "searchTerm": "medical dental healthcare podcast AI innovation",
  "limit": 15
}
```

**Response:**
```json
[
  {
    "id": "podcast-id",
    "title": "Podcast Title",
    "author": "Author Name",
    "description": "Description",
    "image": "https://artwork.url",
    "sourceUrl": "https://podcasts.apple.com/...",
    "genre": "Health & Fitness",
    "episodeCount": 150,
    "rating": 4.5
  }
]
```

### 3. Trending Feeds - `POST /api/feeds/trending`

**Request Body:**
```json
{
  "categories": ["medical", "dental", "healthcare", "ai"],
  "limit": 10
}
```

**Response:**
```json
[
  {
    "id": "trending-id",
    "title": "Trending Episode",
    "author": "Author",
    "description": "Description",
    "image": "https://image.url",
    "audioUrl": "https://audio.url",
    "downloads": 15420,
    "pubDate": "2024-06-13T10:00:00Z"
  }
]
```

## Implementation Notes

### RSS Parser Logic:
1. Fetch RSS feed XML
2. Parse with XML parser
3. Extract episodes (title, description, enclosure URL, pubDate)
4. Mark episodes as "live" if published within 24 hours
5. Return max 3 episodes per feed

### Apple Podcasts:
1. Use iTunes Search API: `https://itunes.apple.com/search`
2. Parameters: `term`, `entity=podcast`, `limit`
3. Transform response to match expected format

### Trending:
1. Can aggregate from multiple sources
2. Rank by recent downloads/popularity
3. Filter by medical/healthcare categories

### Error Handling:
- Return empty array `[]` on errors
- Add CORS headers for frontend access
- Cache responses for 30 minutes to reduce API calls

### Test URLs:
You can test with these real RSS feeds:
- https://ataleoftwohygienists.libsyn.com/rss
- https://dentalhacks.libsyn.com/rss
- https://peterattiamd.com/feed/podcast/

Once you implement these endpoints, the frontend will automatically start using real data instead of fallbacks!