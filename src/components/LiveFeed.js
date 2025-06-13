import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  CardActionArea,
  Chip,
  Skeleton,
  Button,
  Divider,
  Stack,
  IconButton,
  Tooltip
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import axios from 'axios';

// Mock data for development - in production, this would come from the Listen Notes API
const MOCK_LIVE_FEEDS = [
  {
    id: 'live-1',
    title: 'Modern Dental Techniques Live',
    publisher: 'Dental Innovations Network',
    thumbnail: 'https://via.placeholder.com/300x300?text=Dental+Podcast',
    listenUrl: '#',
    isLive: true,
    category: 'Dental',
    listeners: 245
  },
  {
    id: 'live-2',
    title: 'Aesthetics Today: Live Q&A Session',
    publisher: 'Beauty & Health Channel',
    thumbnail: 'https://via.placeholder.com/300x300?text=Aesthetics+Podcast',
    listenUrl: '#',
    isLive: true,
    category: 'Aesthetics',
    listeners: 189
  },
  {
    id: 'live-3',
    title: 'Dental Practice Management Roundtable',
    publisher: 'Healthcare Business Insights',
    thumbnail: 'https://via.placeholder.com/300x300?text=Practice+Management',
    listenUrl: '#',
    isLive: true,
    category: 'Business',
    listeners: 132
  }
];

const MOCK_TRENDING = [
  {
    id: 'trend-1',
    title: 'The Future of Cosmetic Dentistry',
    publisher: 'Dental Visionaries',
    thumbnail: 'https://via.placeholder.com/300x300?text=Cosmetic+Dentistry',
    listenUrl: '#',
    category: 'Dental',
    listens: 12453,
    duration: 3540 // in seconds
  },
  {
    id: 'trend-2',
    title: 'Patient Experience Revolution',
    publisher: 'Healthcare Excellence',
    thumbnail: 'https://via.placeholder.com/300x300?text=Patient+Experience',
    listenUrl: '#',
    category: 'Patient Care',
    listens: 9872,
    duration: 2760 // in seconds
  },
  {
    id: 'trend-3',
    title: 'Advanced Aesthetic Procedures',
    publisher: 'Medical Aesthetics Journal',
    thumbnail: 'https://via.placeholder.com/300x300?text=Aesthetic+Procedures',
    listenUrl: '#',
    category: 'Aesthetics',
    listens: 8541,
    duration: 4200 // in seconds
  },
  {
    id: 'trend-4',
    title: 'Digital Dentistry Innovations',
    publisher: 'Tech in Dentistry',
    thumbnail: 'https://via.placeholder.com/300x300?text=Digital+Dentistry',
    listenUrl: '#',
    category: 'Technology',
    listens: 7632,
    duration: 3120 // in seconds
  }
];

const MOCK_UPCOMING = [
  {
    id: 'upcoming-1',
    title: 'Live Patient Case: Full Mouth Rehabilitation',
    publisher: 'Clinical Excellence Series',
    scheduledFor: new Date(Date.now() + 86400000), // tomorrow
    thumbnail: 'https://via.placeholder.com/300x300?text=Case+Study',
    category: 'Clinical'
  },
  {
    id: 'upcoming-2',
    title: 'Aesthetics Industry Trends 2025',
    publisher: 'Beauty Business Forecast',
    scheduledFor: new Date(Date.now() + 172800000), // day after tomorrow
    thumbnail: 'https://via.placeholder.com/300x300?text=Industry+Trends',
    category: 'Business'
  }
];

// Format duration from seconds to MM:SS or HH:MM:SS
const formatDuration = (seconds) => {
  if (isNaN(seconds)) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
  }
  
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

// Format listener count with K suffix for thousands
const formatListeners = (count) => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

// Format date to relative time (e.g., "Tomorrow at 3 PM")
const formatScheduledTime = (date) => {
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(tomorrow.getDate() + 1);
  
  const dayAfterTomorrow = new Date(now);
  dayAfterTomorrow.setDate(dayAfterTomorrow.getDate() + 2);
  
  const isToday = date.getDate() === now.getDate() && 
                  date.getMonth() === now.getMonth() && 
                  date.getFullYear() === now.getFullYear();
                  
  const isTomorrow = date.getDate() === tomorrow.getDate() && 
                     date.getMonth() === tomorrow.getMonth() && 
                     date.getFullYear() === tomorrow.getFullYear();
                     
  const isDayAfterTomorrow = date.getDate() === dayAfterTomorrow.getDate() && 
                            date.getMonth() === dayAfterTomorrow.getMonth() && 
                            date.getFullYear() === dayAfterTomorrow.getFullYear();
  
  const timeString = date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  
  if (isToday) {
    return `Today at ${timeString}`;
  } else if (isTomorrow) {
    return `Tomorrow at ${timeString}`;
  } else if (isDayAfterTomorrow) {
    return `Day after tomorrow at ${timeString}`;
  } else {
    return `${date.toLocaleDateString()} at ${timeString}`;
  }
};

const LiveFeed = ({ onSelectEpisode }) => {
  const [liveFeeds, setLiveFeeds] = useState([]);
  const [trendingEpisodes, setTrendingEpisodes] = useState([]);
  const [upcomingStreams, setUpcomingStreams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // In a real implementation, this would fetch from the Listen Notes API
  useEffect(() => {
    let isMounted = true;
    
    const fetchPodcasts = async () => {
      try {
        setLoading(true);
        
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // In production, replace with actual API calls
        // const response = await axios.get('https://listen-api.listennotes.com/api/v2/search', {
        //   headers: { 'X-ListenAPI-Key': 'YOUR_API_KEY' },
        //   params: { q: 'dental OR aesthetics', type: 'episode', sort_by_date: 1 }
        // });
        
        if (isMounted) {
          setLiveFeeds(MOCK_LIVE_FEEDS);
          setTrendingEpisodes(MOCK_TRENDING);
          setUpcomingStreams(MOCK_UPCOMING);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error fetching podcasts:', err);
          setError('Failed to load podcast feeds. Please try again later.');
          setLoading(false);
        }
      }
    };
    
    fetchPodcasts();
    
    return () => {
      isMounted = false;
    };
  }, []);
  
  const handleSelectEpisode = (episode) => {
    if (onSelectEpisode) {
      onSelectEpisode(episode);
    }
  };
  
  return (
    <Box sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight={700} gutterBottom align="center" color="#fff">
        Live & Trending Audio
      </Typography>
      
      {error && (
        <Paper 
          elevation={0}
          sx={{ 
            p: 3, 
            mb: 4, 
            bgcolor: 'rgba(255, 0, 0, 0.1)', 
            color: '#fff',
            border: '1px solid rgba(255, 0, 0, 0.3)',
            borderRadius: 2
          }}
        >
          <Typography>{error}</Typography>
        </Paper>
      )}
      
      {/* Live Now Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <LiveTvIcon sx={{ color: '#ff4081', mr: 1 }} />
          <Typography variant="h5" fontWeight={600} color="#fff">
            Live Now
          </Typography>
        </Box>
        
        <Grid container spacing={3}>
          {loading ? (
            // Loading skeletons
            Array.from(new Array(3)).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} key={`skeleton-live-${index}`}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(40, 20, 70, 0.7)' }}>
                  <Skeleton variant="rectangular" height={140} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="text" height={30} sx={{ mt: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="rectangular" width={80} height={32} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Skeleton variant="circular" width={40} height={40} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : liveFeeds.length > 0 ? (
            liveFeeds.map((feed) => (
              <Grid item xs={12} sm={6} md={4} key={feed.id}>
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(40, 20, 70, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(0, 255, 198, 0.3)'
                    }
                  }}
                >
                  <CardActionArea onClick={() => handleSelectEpisode(feed)}>
                    <Box sx={{ position: 'relative' }}>
                      <CardMedia
                        component="img"
                        height={160}
                        image={feed.thumbnail}
                        alt={feed.title}
                      />
                      <Box 
                        sx={{ 
                          position: 'absolute', 
                          top: 10, 
                          right: 10,
                          bgcolor: '#ff4081',
                          color: '#fff',
                          px: 1,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          fontWeight: 'bold',
                          display: 'flex',
                          alignItems: 'center',
                          gap: 0.5
                        }}
                      >
                        <Box 
                          component="span" 
                          sx={{ 
                            width: 8, 
                            height: 8, 
                            borderRadius: '50%', 
                            bgcolor: '#fff',
                            animation: 'pulse 1.5s infinite'
                          }}
                        />
                        LIVE
                      </Box>
                    </Box>
                    <CardContent>
                      <Typography variant="h6" component="div" color="#fff" noWrap>
                        {feed.title}
                      </Typography>
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                        {feed.publisher}
                      </Typography>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mt: 1 }}>
                        <Chip 
                          label={`${formatListeners(feed.listeners)} listening`} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255, 64, 129, 0.2)', 
                            color: '#ff4081',
                            fontWeight: 500
                          }}
                        />
                        <Tooltip title="Listen Now">
                          <IconButton 
                            sx={{ 
                              bgcolor: 'var(--secondary, #00ffc6)',
                              color: '#000',
                              '&:hover': {
                                bgcolor: '#00d6a4'
                              }
                            }}
                          >
                            <PlayArrowIcon />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  bgcolor: 'rgba(40, 20, 70, 0.7)',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                <Typography>No live streams available at the moment.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      
      {/* Trending Section */}
      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <TrendingUpIcon sx={{ color: 'var(--secondary, #00ffc6)', mr: 1 }} />
          <Typography variant="h5" fontWeight={600} color="#fff">
            Trending in Dental & Aesthetics
          </Typography>
        </Box>
        
        <Grid container spacing={2}>
          {loading ? (
            // Loading skeletons
            Array.from(new Array(4)).map((_, index) => (
              <Grid item xs={12} sm={6} md={3} key={`skeleton-trend-${index}`}>
                <Paper sx={{ p: 2, bgcolor: 'rgba(40, 20, 70, 0.7)' }}>
                  <Skeleton variant="rectangular" height={120} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="text" height={24} sx={{ mt: 2, bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Skeleton variant="text" height={20} width="60%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                    <Skeleton variant="text" width={60} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Skeleton variant="text" width={40} height={20} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  </Box>
                </Paper>
              </Grid>
            ))
          ) : trendingEpisodes.length > 0 ? (
            trendingEpisodes.map((episode) => (
              <Grid item xs={12} sm={6} md={3} key={episode.id}>
                <Card 
                  sx={{ 
                    bgcolor: 'rgba(40, 20, 70, 0.7)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.2)',
                      border: '1px solid rgba(0, 255, 198, 0.3)'
                    }
                  }}
                >
                  <CardActionArea 
                    onClick={() => handleSelectEpisode(episode)}
                    sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                  >
                    <CardMedia
                      component="img"
                      height={140}
                      image={episode.thumbnail}
                      alt={episode.title}
                    />
                    <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                      <Typography variant="subtitle1" component="div" color="#fff" gutterBottom noWrap>
                        {episode.title}
                      </Typography>
                      <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" noWrap>
                        {episode.publisher}
                      </Typography>
                      <Box sx={{ mt: 'auto', pt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Chip 
                          label={episode.category} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(0, 255, 198, 0.2)', 
                            color: 'var(--secondary, #00ffc6)',
                            fontWeight: 500
                          }}
                        />
                        <Typography variant="caption" color="rgba(255, 255, 255, 0.6)">
                          {formatDuration(episode.duration)}
                        </Typography>
                      </Box>
                    </CardContent>
                  </CardActionArea>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Paper 
                sx={{ 
                  p: 3, 
                  textAlign: 'center', 
                  bgcolor: 'rgba(40, 20, 70, 0.7)',
                  color: 'rgba(255, 255, 255, 0.7)'
                }}
              >
                <Typography>No trending episodes available.</Typography>
              </Paper>
            </Grid>
          )}
        </Grid>
      </Box>
      
      {/* Upcoming Streams Section */}
      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
          <NewReleasesIcon sx={{ color: '#f5b700', mr: 1 }} />
          <Typography variant="h5" fontWeight={600} color="#fff">
            Upcoming Live Streams
          </Typography>
        </Box>
        
        {loading ? (
          <Paper sx={{ p: 3, bgcolor: 'rgba(40, 20, 70, 0.7)' }}>
            {Array.from(new Array(2)).map((_, index) => (
              <Box key={`skeleton-upcoming-${index}`} sx={{ mb: index === 0 ? 3 : 0 }}>
                <Box sx={{ display: 'flex', gap: 2 }}>
                  <Skeleton variant="rectangular" width={100} height={100} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Skeleton variant="text" height={28} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Skeleton variant="text" height={20} width="40%" sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                      <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                      <Skeleton variant="rectangular" width={100} height={36} sx={{ bgcolor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Box>
                  </Box>
                </Box>
                {index === 0 && <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />}
              </Box>
            ))}
          </Paper>
        ) : upcomingStreams.length > 0 ? (
          <Paper 
            sx={{ 
              p: 3, 
              bgcolor: 'rgba(40, 20, 70, 0.7)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: 2
            }}
          >
            {upcomingStreams.map((stream, index) => (
              <React.Fragment key={stream.id}>
                <Box sx={{ display: 'flex', gap: 3 }}>
                  <Box 
                    sx={{ 
                      width: 120, 
                      height: 120, 
                      borderRadius: 2, 
                      overflow: 'hidden',
                      flexShrink: 0
                    }}
                  >
                    <img 
                      src={stream.thumbnail} 
                      alt={stream.title} 
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                    />
                  </Box>
                  <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" color="#fff">
                      {stream.title}
                    </Typography>
                    <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" gutterBottom>
                      {stream.publisher}
                    </Typography>
                    <Box 
                      sx={{ 
                        display: 'flex', 
                        justifyContent: 'space-between', 
                        alignItems: 'center',
                        mt: 2,
                        flexWrap: 'wrap',
                        gap: 1
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Chip 
                          label={stream.category} 
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(245, 183, 0, 0.2)', 
                            color: '#f5b700',
                            fontWeight: 500
                          }}
                        />
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            color: '#f5b700',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5
                          }}
                        >
                          <LiveTvIcon fontSize="small" />
                          {formatScheduledTime(stream.scheduledFor)}
                        </Typography>
                      </Box>
                      <Button 
                        variant="outlined"
                        size="small"
                        sx={{ 
                          borderColor: '#f5b700',
                          color: '#f5b700',
                          '&:hover': {
                            borderColor: '#f5b700',
                            bgcolor: 'rgba(245, 183, 0, 0.1)'
                          }
                        }}
                      >
                        Set Reminder
                      </Button>
                    </Box>
                  </Box>
                </Box>
                {index < upcomingStreams.length - 1 && (
                  <Divider sx={{ my: 3, borderColor: 'rgba(255, 255, 255, 0.1)' }} />
                )}
              </React.Fragment>
            ))}
          </Paper>
        ) : (
          <Paper 
            sx={{ 
              p: 3, 
              textAlign: 'center', 
              bgcolor: 'rgba(40, 20, 70, 0.7)',
              color: 'rgba(255, 255, 255, 0.7)'
            }}
          >
            <Typography>No upcoming streams scheduled.</Typography>
          </Paper>
        )}
      </Box>
    </Box>
  );
};

export default LiveFeed;
