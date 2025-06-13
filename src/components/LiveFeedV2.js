import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Container,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Chip,
  Grid,
  Tabs,
  Tab,
  Button,
  CircularProgress,
  Avatar,
  Stack,
  Tooltip,
  Alert,
  Skeleton
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import RssFeedIcon from '@mui/icons-material/RssFeed';
import AppleIcon from '@mui/icons-material/Apple';
import YouTubeIcon from '@mui/icons-material/YouTube';
import RefreshIcon from '@mui/icons-material/Refresh';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { motion, AnimatePresence } from 'framer-motion';
import { RSS_FEEDS, SEARCH_QUERIES } from '../config/podcastFeeds';
import { parseRSSFeed, fetchApplePodcastsData } from '../utils/feedParser';

// Helper functions
const formatDuration = (seconds) => {
  if (!seconds) return '0:00';
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes} min`;
};

const timeAgo = (date) => {
  const seconds = Math.floor((new Date() - new Date(date)) / 1000);
  if (seconds < 60) return 'Just now';
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
};

// Source Icons
const SourceIcon = ({ source }) => {
  switch (source) {
    case 'rss': return <RssFeedIcon />;
    case 'apple': return <AppleIcon />;
    case 'youtube': return <YouTubeIcon />;
    case 'spotify': return <img src="https://cdn.jsdelivr.net/npm/simple-icons@v9/icons/spotify.svg" alt="Spotify" style={{ width: 24, height: 24, filter: 'invert(1)' }} />;
    case 'podcast-index': return <HeadphonesIcon />;
    default: return <HeadphonesIcon />;
  }
};

export default function LiveFeedV2({ onPlayEpisode }) {
  const [activeTab, setActiveTab] = useState(0);
  const [feeds, setFeeds] = useState({
    trending: [],
    live: [],
    rss: [],
    apple: [],
    youtube: []
  });
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState(null);

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Fetch Apple Podcasts
  const fetchApplePodcasts = async () => {
    try {
      const results = await fetchApplePodcastsData(SEARCH_QUERIES.apple);
      
      return results.map(podcast => ({
        id: podcast.trackId,
        title: podcast.trackName,
        author: podcast.artistName,
        description: podcast.description || podcast.summary,
        image: podcast.artworkUrl600,
        source: 'apple',
        sourceUrl: podcast.trackViewUrl,
        genre: podcast.primaryGenreName,
        episodeCount: podcast.trackCount,
        rating: podcast.averageUserRating,
        releaseDate: podcast.releaseDate
      }));
    } catch (error) {
      console.error('Error fetching Apple podcasts:', error);
      return [];
    }
  };

  // Fetch RSS Feeds
  const fetchRSSFeeds = async () => {
    const allEpisodes = [];
    
    // Filter feeds by category if needed
    const feedsToFetch = selectedCategory === 'all' 
      ? RSS_FEEDS 
      : RSS_FEEDS.filter(feed => feed.category === selectedCategory);
    
    // Fetch multiple RSS feeds in parallel
    const feedPromises = feedsToFetch.slice(0, 5).map(async (feed) => {
      try {
        // Use Netlify function in production, direct fetch in development
        if (process.env.NODE_ENV === 'production') {
          const response = await fetch('/.netlify/functions/fetch-rss', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ feedUrl: feed.url })
          });
          
          if (response.ok) {
            const xmlText = await response.text();
            const parser = new DOMParser();
            const xml = parser.parseFromString(xmlText, 'text/xml');
            
            // Parse episodes from XML
            const items = xml.querySelectorAll('item');
            const episodes = Array.from(items).slice(0, 3).map((item, index) => ({
              id: `rss-${feed.name}-${index}`,
              title: item.querySelector('title')?.textContent || '',
              author: item.querySelector('author')?.textContent || feed.name,
              description: item.querySelector('description')?.textContent?.replace(/<[^>]*>/g, '') || '',
              pubDate: new Date(item.querySelector('pubDate')?.textContent || Date.now()),
              audioUrl: item.querySelector('enclosure')?.getAttribute('url') || '',
              duration: null,
              source: 'rss',
              feedName: feed.name,
              category: feed.category,
              isLive: false
            }));
            
            // Mark recent episodes as "live"
            episodes.forEach(ep => {
              const hoursSincePublish = (Date.now() - ep.pubDate) / (1000 * 60 * 60);
              if (hoursSincePublish < 24) {
                ep.isLive = true;
              }
            });
            
            return episodes;
          }
        } else {
          // For development, return mock data instead of failing
          return [
            {
              id: `mock-${feed.name}-1`,
              title: `Latest from ${feed.name}`,
              author: feed.name,
              description: `Recent episode from ${feed.description}`,
              pubDate: new Date(Date.now() - Math.random() * 24 * 60 * 60 * 1000),
              audioUrl: null,
              duration: 1800 + Math.random() * 1200,
              source: 'rss',
              feedName: feed.name,
              category: feed.category,
              isLive: Math.random() > 0.7
            }
          ];
        }
      } catch (error) {
        console.error(`Error fetching ${feed.name}:`, error);
        return [];
      }
    });
    
    const results = await Promise.all(feedPromises);
    return results.flat();
  };

  // Fetch Podcast Index trending
  const fetchPodcastIndex = async () => {
    try {
      // Podcast Index requires API key and secret
      // For demo, using mock data
      const mockTrending = [
        {
          id: 'pi-1',
          title: 'The Future of Telemedicine Post-COVID',
          author: 'Healthcare Horizons',
          description: 'Expert panel discusses permanent changes in healthcare delivery',
          image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=300',
          source: 'podcast-index',
          audioUrl: 'https://example.com/trending1.mp3',
          trendingRank: 1,
          downloads: 15420
        },
        {
          id: 'pi-2',
          title: 'Robotics in Surgery: Year in Review',
          author: 'MedTech Weekly',
          description: 'Breakthrough robotic procedures that saved lives in 2024',
          image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=300',
          source: 'podcast-index',
          audioUrl: 'https://example.com/trending2.mp3',
          trendingRank: 2,
          downloads: 12350
        }
      ];
      
      return mockTrending;
    } catch (error) {
      console.error('Error fetching Podcast Index:', error);
      return [];
    }
  };

  // Fetch YouTube medical podcasts
  const fetchYouTubePodcasts = async () => {
    // YouTube API would require API key
    // Mock data for demonstration
    const mockYouTube = [
      {
        id: 'yt-1',
        title: 'Doctor Mike Podcast: AI in Emergency Medicine',
        author: 'Doctor Mike',
        description: 'Can AI help in emergency room decision making?',
        thumbnail: 'https://i.ytimg.com/vi/example1/maxresdefault.jpg',
        source: 'youtube',
        videoId: 'dQw4w9WgXcQ', // Example ID
        views: 245000,
        publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000)
      }
    ];
    
    return mockYouTube;
  };

  // Fetch all feeds
  const fetchAllFeeds = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const [apple, rss, trending, youtube] = await Promise.all([
        fetchApplePodcasts().catch(err => {
          console.error('Apple podcasts error:', err);
          return [];
        }),
        fetchRSSFeeds().catch(err => {
          console.error('RSS feeds error:', err);
          return [];
        }),
        fetchPodcastIndex().catch(err => {
          console.error('Podcast index error:', err);
          return [];
        }),
        fetchYouTubePodcasts().catch(err => {
          console.error('YouTube error:', err);
          return [];
        })
      ]);
      
      // Separate live episodes (< 24 hours old) with better filtering
      const validRssEpisodes = (rss || []).filter(ep => ep && typeof ep === 'object');
      const liveEpisodes = validRssEpisodes.filter(ep => {
        try {
          if (!ep.pubDate) return false;
          const pubDate = new Date(ep.pubDate);
          const now = new Date();
          return !isNaN(pubDate.getTime()) && (now - pubDate) < 24 * 60 * 60 * 1000;
        } catch (error) {
          console.error('Error filtering live episode:', error);
          return false;
        }
      });
      
      setFeeds({
        trending: trending || [],
        live: liveEpisodes || [],
        rss: validRssEpisodes || [],
        apple: apple || [],
        youtube: youtube || []
      });
      
      setError(null);
    } catch (err) {
      setError('Failed to load some feeds. Please try again.');
      console.error('Feed error:', err);
      
      // Set empty feeds to prevent crashes
      setFeeds({
        trending: [],
        live: [],
        rss: [],
        apple: [],
        youtube: []
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchAllFeeds();
    // Refresh every 30 minutes
    const interval = setInterval(fetchAllFeeds, 30 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    fetchAllFeeds();
  };

  // Tab panels
  const TabPanel = ({ children, value, index }) => (
    <div hidden={value !== index} style={{ paddingTop: 24 }}>
      {value === index && children}
    </div>
  );

  // Episode Card Component
  const EpisodeCard = ({ episode }) => {
    const isPlayable = episode.audioUrl || episode.source === 'rss';
    
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card
          sx={{
            display: 'flex',
            mb: 2,
            backgroundColor: 'rgba(40, 20, 70, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            '&:hover': {
              borderColor: 'var(--secondary, #00ffc6)',
              backgroundColor: 'rgba(40, 20, 70, 0.9)'
            }
          }}
        >
          {/* Thumbnail */}
          {(episode.image || episode.thumbnail) && (
            <CardMedia
              component="img"
              sx={{ width: 120, height: 120 }}
              image={episode.image || episode.thumbnail}
              alt={episode.title}
            />
          )}
          
          <Box sx={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <CardContent sx={{ flex: '1 0 auto' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                {/* Source Badge */}
                <Chip
                  icon={<SourceIcon source={episode.source} />}
                  label={episode.source.toUpperCase()}
                  size="small"
                  sx={{
                    backgroundColor: 'rgba(0, 255, 198, 0.2)',
                    color: 'var(--secondary, #00ffc6)',
                    '& .MuiChip-icon': { color: 'inherit' }
                  }}
                />
                
                {/* Live indicator */}
                {episode.isLive && (
                  <Chip
                    icon={<FiberManualRecordIcon sx={{ fontSize: 12 }} />}
                    label="LIVE"
                    size="small"
                    color="error"
                    sx={{ animation: 'pulse 2s infinite' }}
                  />
                )}
                
                {/* Trending rank */}
                {episode.trendingRank && (
                  <Chip
                    icon={<TrendingUpIcon />}
                    label={`#${episode.trendingRank}`}
                    size="small"
                    sx={{
                      backgroundColor: '#FFD700',
                      color: '#000'
                    }}
                  />
                )}
              </Box>
              
              <Typography variant="h6" component="div" noWrap>
                {episode.title}
              </Typography>
              
              <Typography variant="body2" color="text.secondary" noWrap>
                {episode.author || episode.feedName}
              </Typography>
              
              <Typography
                variant="body2"
                color="text.secondary"
                sx={{
                  mt: 1,
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}
              >
                {episode.description}
              </Typography>
              
              {/* Metadata */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 1 }}>
                {episode.pubDate && (
                  <Typography variant="caption" color="text.secondary">
                    <AccessTimeIcon sx={{ fontSize: 14, mr: 0.5, verticalAlign: 'middle' }} />
                    {timeAgo(episode.pubDate)}
                  </Typography>
                )}
                {episode.duration && (
                  <Typography variant="caption" color="text.secondary">
                    {formatDuration(episode.duration)}
                  </Typography>
                )}
                {episode.downloads && (
                  <Typography variant="caption" color="text.secondary">
                    {episode.downloads.toLocaleString()} downloads
                  </Typography>
                )}
                {episode.views && (
                  <Typography variant="caption" color="text.secondary">
                    {episode.views.toLocaleString()} views
                  </Typography>
                )}
              </Box>
            </CardContent>
            
            {/* Actions */}
            <Box sx={{ display: 'flex', alignItems: 'center', px: 2, pb: 2 }}>
              {isPlayable ? (
                <Button
                  startIcon={<PlayArrowIcon />}
                  variant="contained"
                  size="small"
                  onClick={() => onPlayEpisode?.(episode)}
                  sx={{
                    backgroundColor: 'var(--secondary, #00ffc6)',
                    color: '#000',
                    '&:hover': {
                      backgroundColor: '#00d6a9'
                    }
                  }}
                >
                  Play
                </Button>
              ) : (
                <Button
                  startIcon={<OpenInNewIcon />}
                  variant="outlined"
                  size="small"
                  href={episode.sourceUrl || '#'}
                  target="_blank"
                  sx={{
                    borderColor: 'var(--secondary, #00ffc6)',
                    color: 'var(--secondary, #00ffc6)'
                  }}
                >
                  Listen on {episode.source}
                </Button>
              )}
            </Box>
          </Box>
        </Card>
      </motion.div>
    );
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" fontWeight="bold">
          Live & Trending
        </Typography>
        <IconButton
          onClick={handleRefresh}
          disabled={refreshing}
          sx={{
            border: '1px solid rgba(255, 255, 255, 0.2)',
            '&:hover': {
              borderColor: 'var(--secondary, #00ffc6)'
            }
          }}
        >
          <RefreshIcon sx={{ animation: refreshing ? 'spin 1s linear infinite' : 'none' }} />
        </IconButton>
      </Box>
      
      {error && (
        <Alert severity="warning" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}
      
      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(e, v) => setActiveTab(v)}
        variant="scrollable"
        scrollButtons="auto"
        sx={{
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
          mb: 3,
          '& .MuiTab-root': {
            color: 'rgba(255, 255, 255, 0.7)',
            '&.Mui-selected': {
              color: 'var(--secondary, #00ffc6)'
            }
          },
          '& .MuiTabs-indicator': {
            backgroundColor: 'var(--secondary, #00ffc6)'
          }
        }}
      >
        <Tab label={`All (${Object.values(feeds).flat().length})`} />
        <Tab 
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <FiberManualRecordIcon sx={{ fontSize: 12, color: '#ff0000' }} />
              Live ({feeds.live.length})
            </Box>
          }
        />
        <Tab label={`Trending (${feeds.trending.length})`} icon={<TrendingUpIcon />} iconPosition="start" />
        <Tab label={`RSS (${feeds.rss.length})`} icon={<RssFeedIcon />} iconPosition="start" />
        <Tab label={`Apple (${feeds.apple.length})`} icon={<AppleIcon />} iconPosition="start" />
        <Tab label={`YouTube (${feeds.youtube.length})`} icon={<YouTubeIcon />} iconPosition="start" />
      </Tabs>
      
      {/* Content */}
      {loading ? (
        <Stack spacing={2}>
          {[1, 2, 3].map(i => (
            <Skeleton key={i} variant="rectangular" height={120} sx={{ borderRadius: 1 }} />
          ))}
        </Stack>
      ) : (
        <AnimatePresence mode="wait">
          {/* All Episodes */}
          <TabPanel value={activeTab} index={0}>
            {Object.values(feeds).flat().map(episode => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </TabPanel>
          
          {/* Live Episodes */}
          <TabPanel value={activeTab} index={1}>
            {feeds.live.length > 0 ? (
              feeds.live.map(episode => (
                <EpisodeCard key={episode.id} episode={episode} />
              ))
            ) : (
              <Typography color="text.secondary" textAlign="center" py={4}>
                No live episodes at the moment. Check back soon!
              </Typography>
            )}
          </TabPanel>
          
          {/* Trending */}
          <TabPanel value={activeTab} index={2}>
            {feeds.trending.map(episode => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </TabPanel>
          
          {/* RSS Feeds */}
          <TabPanel value={activeTab} index={3}>
            {feeds.rss.map(episode => (
              <EpisodeCard key={episode.id} episode={episode} />
            ))}
          </TabPanel>
          
          {/* Apple Podcasts */}
          <TabPanel value={activeTab} index={4}>
            {feeds.apple.map(podcast => (
              <EpisodeCard key={podcast.id} episode={podcast} />
            ))}
          </TabPanel>
          
          {/* YouTube */}
          <TabPanel value={activeTab} index={5}>
            {feeds.youtube.map(video => (
              <EpisodeCard key={video.id} episode={video} />
            ))}
          </TabPanel>
        </AnimatePresence>
      )}
      
      {/* CSS for animations */}
      <style jsx global>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </Container>
  );
}