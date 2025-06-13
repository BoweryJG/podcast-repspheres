// Curated list of medical, dental, and healthcare podcast RSS feeds
export const RSS_FEEDS = [
  // Dental Podcasts
  {
    name: 'A Tale of Two Hygienists',
    url: 'https://ataleoftwohygienists.libsyn.com/rss',
    category: 'dental',
    description: 'Dental hygiene insights and industry updates'
  },
  {
    name: 'The Dental Hacks Podcast',
    url: 'https://dentalhacks.libsyn.com/rss',
    category: 'dental',
    description: 'Tips and tricks for modern dental practice'
  },
  {
    name: 'Dentistry Uncensored',
    url: 'https://dentistryuncensored.libsyn.com/rss',
    category: 'dental',
    description: 'Unfiltered conversations about dentistry'
  },
  
  // Medical & Healthcare Podcasts
  {
    name: 'The Peter Attia Drive',
    url: 'https://peterattiamd.com/feed/podcast/',
    category: 'medical',
    description: 'Longevity, health optimization, and medical science'
  },
  {
    name: 'Healthcare IT Today',
    url: 'https://www.healthcareittoday.com/feed/podcast/',
    category: 'healthtech',
    description: 'Technology transforming healthcare'
  },
  {
    name: 'AI in Healthcare by Stanford',
    url: 'https://feeds.soundcloud.com/users/soundcloud:users:280734880/sounds.rss',
    category: 'ai',
    description: 'Stanford Medicine exploring AI applications'
  },
  
  // Mental Health & Wellness
  {
    name: 'On Being',
    url: 'https://feeds.simplecast.com/kwWc0lhf',
    category: 'wellness',
    description: 'Exploring meaning, faith, and ethics in healthcare'
  },
  {
    name: 'The Mental Illness Happy Hour',
    url: 'https://mentalpod.com/feed',
    category: 'mental-health',
    description: 'Honest conversations about mental health'
  },
  
  // Medical Education
  {
    name: 'The Curbsiders Internal Medicine',
    url: 'https://thecurbsiders.libsyn.com/rss',
    category: 'education',
    description: 'Internal medicine pearls for practice'
  },
  {
    name: 'Emergency Medicine Cases',
    url: 'https://emergencymedicinecases.com/feed/podcast/',
    category: 'emergency',
    description: 'EM education for emergency physicians'
  }
];

// Categories for filtering
export const CATEGORIES = [
  { id: 'all', label: 'All Categories', icon: '🎙️' },
  { id: 'dental', label: 'Dental', icon: '🦷' },
  { id: 'medical', label: 'Medical', icon: '⚕️' },
  { id: 'healthtech', label: 'Health Tech', icon: '💻' },
  { id: 'ai', label: 'AI & Innovation', icon: '🤖' },
  { id: 'mental-health', label: 'Mental Health', icon: '🧠' },
  { id: 'wellness', label: 'Wellness', icon: '💚' },
  { id: 'education', label: 'Education', icon: '📚' },
  { id: 'emergency', label: 'Emergency Med', icon: '🚨' }
];

// Search terms for different APIs
export const SEARCH_QUERIES = {
  apple: 'medical dental healthcare podcast AI innovation',
  youtube: 'medical podcast dental health innovation 2024',
  spotify: 'healthcare technology dental medical podcast'
};

// API Configuration (add your keys here)
export const API_CONFIG = {
  youtube: {
    apiKey: process.env.REACT_APP_YOUTUBE_API_KEY || '',
    maxResults: 15
  },
  podcastIndex: {
    apiKey: process.env.REACT_APP_PODCAST_INDEX_KEY || '',
    apiSecret: process.env.REACT_APP_PODCAST_INDEX_SECRET || ''
  },
  spotify: {
    clientId: process.env.REACT_APP_SPOTIFY_CLIENT_ID || '',
    clientSecret: process.env.REACT_APP_SPOTIFY_CLIENT_SECRET || ''
  }
};