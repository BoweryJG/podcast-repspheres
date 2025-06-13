// RSS Feed Parser Utility
// In production, you'd use a backend service or CORS proxy

export const parseRSSFeed = async (feedUrl) => {
  try {
    // For production, use a CORS proxy or backend endpoint
    const CORS_PROXY = 'https://api.allorigins.win/get?url=';
    
    const response = await fetch(CORS_PROXY + encodeURIComponent(feedUrl));
    const data = await response.json();
    const parser = new DOMParser();
    const xml = parser.parseFromString(data.contents, 'text/xml');
    
    const items = xml.querySelectorAll('item');
    const episodes = [];
    
    items.forEach((item, index) => {
      if (index < 10) { // Limit to 10 most recent
        const episode = {
          id: `rss-${Date.now()}-${index}`,
          title: item.querySelector('title')?.textContent || '',
          description: item.querySelector('description')?.textContent || '',
          author: item.querySelector('author')?.textContent || 
                  item.querySelector('itunes\\:author')?.textContent || '',
          pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()),
          audioUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
          duration: parseDuration(item.querySelector('itunes\\:duration')?.textContent),
          image: item.querySelector('itunes\\:image')?.getAttribute('href') ||
                 xml.querySelector('channel > image > url')?.textContent,
          source: 'rss',
          isLive: false
        };
        
        // Check if episode is "live" (published within last 24 hours)
        const hoursSincePublish = (Date.now() - episode.pubDate) / (1000 * 60 * 60);
        if (hoursSincePublish < 24) {
          episode.isLive = true;
        }
        
        episodes.push(episode);
      }
    });
    
    return episodes;
  } catch (error) {
    console.error('Error parsing RSS feed:', error);
    return [];
  }
};

// Parse duration from various formats (HH:MM:SS or seconds)
const parseDuration = (durationStr) => {
  if (!durationStr) return null;
  
  // If it's already in seconds
  if (!isNaN(durationStr)) {
    return parseInt(durationStr);
  }
  
  // Parse HH:MM:SS or MM:SS format
  const parts = durationStr.split(':').map(Number);
  if (parts.length === 3) {
    return parts[0] * 3600 + parts[1] * 60 + parts[2];
  } else if (parts.length === 2) {
    return parts[0] * 60 + parts[1];
  }
  
  return null;
};

// Fetch Apple Podcasts with proper error handling
export const fetchApplePodcastsData = async (searchTerm = 'medical dental ai health') => {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(searchTerm)}&entity=podcast&limit=15&country=us`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch Apple Podcasts');
    }
    
    const data = await response.json();
    return data.results || [];
  } catch (error) {
    console.error('Apple Podcasts API error:', error);
    return [];
  }
};

// YouTube Data API helper (requires API key)
export const fetchYouTubeVideos = async (apiKey, searchQuery = 'medical podcast dental health') => {
  if (!apiKey) {
    console.warn('YouTube API key not provided');
    return [];
  }
  
  try {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(searchQuery)}&type=video&videoDuration=long&maxResults=10&key=${apiKey}`;
    const response = await fetch(url);
    
    if (!response.ok) {
      throw new Error('Failed to fetch YouTube videos');
    }
    
    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error('YouTube API error:', error);
    return [];
  }
};