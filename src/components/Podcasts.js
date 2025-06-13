import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  Paper,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Chip,
  IconButton,
  Collapse,
  Fade,
  Zoom
} from '@mui/material';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import DownloadIcon from '@mui/icons-material/Download';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import AudioPlayer from './AudioPlayer';

// Format duration from seconds to readable format
const formatDuration = (seconds) => {
  if (!seconds || isNaN(seconds)) return '00:00';
  
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  
  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }
  
  return `${minutes}m ${remainingSeconds}s`;
};

// Format date to readable format
const formatDate = (dateString) => {
  if (!dateString) return 'Recently';
  
  const date = new Date(dateString);
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 0) return 'Today';
  if (diffDays === 1) return 'Yesterday';
  if (diffDays < 7) return `${diffDays} days ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
  
  return date.toLocaleDateString();
};

export default function Podcasts({ episodes = [] }) {
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [expandedEpisode, setExpandedEpisode] = useState(null);

  const handleSelectEpisode = (episode) => {
    setSelectedEpisode(episode);
    // Scroll to audio player
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleExpandEpisode = (episodeId) => {
    setExpandedEpisode(expandedEpisode === episodeId ? null : episodeId);
  };

  // Enhanced mock episodes with more metadata
  const enhancedEpisodes = episodes.map((ep, index) => ({
    ...ep,
    duration: ep.duration || Math.floor(Math.random() * 3600) + 1800, // 30-90 minutes
    publishedDate: ep.publishedDate || new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000), // Random date within last 30 days
    category: ep.category || ['Dental Innovation', 'Practice Management', 'Patient Care', 'Aesthetics'][index % 4],
    thumbnail: ep.thumbnail || `https://via.placeholder.com/300x300?text=Episode+${index + 1}`,
    listens: ep.listens || Math.floor(Math.random() * 10000) + 1000
  }));

  return (
    <Box sx={{ py: 6, background: 'linear-gradient(180deg, rgba(20, 10, 35, 0.95) 0%, rgba(40, 20, 70, 0.9) 100%)', color: '#fff' }}>
      {/* Audio Player Section */}
      {selectedEpisode && (
        <Container maxWidth="lg" sx={{ mb: 6 }}>
          <Fade in={true} timeout={1000}>
            <Box>
              <AudioPlayer episode={selectedEpisode} />
            </Box>
          </Fade>
        </Container>
      )}

      {/* Episodes Header */}
      <Container maxWidth="lg" sx={{ textAlign: 'center', mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2 }}>
          <PodcastsIcon sx={{ fontSize: 60, color: 'var(--secondary, #00ffc6)', mr: 2 }} />
          <Typography variant="h3" fontWeight={700} sx={{ 
            background: 'linear-gradient(45deg, #fff 30%, var(--secondary, #00ffc6) 90%)',
            backgroundClip: 'text',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>
            Latest Episodes
          </Typography>
        </Box>
        <Typography variant="h6" sx={{ color: 'rgba(255, 255, 255, 0.7)', maxWidth: 600, mx: 'auto' }}>
          Dive into expert conversations about dental innovation, practice growth, and patient care excellence
        </Typography>
      </Container>

      {/* Episodes Grid */}
      <Container maxWidth="lg">
        {enhancedEpisodes.length === 0 ? (
          <Paper sx={{ 
            p: 6, 
            textAlign: 'center', 
            background: 'rgba(40, 20, 70, 0.7)',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <Typography variant="h6" color="rgba(255, 255, 255, 0.7)">
              No episodes available yet. Check back soon!
            </Typography>
          </Paper>
        ) : (
          <Grid container spacing={4}>
            {enhancedEpisodes.map((ep, index) => (
              <Grid item xs={12} md={6} lg={4} key={ep.id}>
                <Zoom in={true} timeout={500 + index * 100}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      background: 'rgba(40, 20, 70, 0.7)',
                      border: '1px solid rgba(255, 255, 255, 0.1)',
                      borderRadius: 3,
                      overflow: 'hidden',
                      transition: 'all 0.3s ease',
                      cursor: 'pointer',
                      '&:hover': {
                        transform: 'translateY(-8px)',
                        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
                        border: '1px solid rgba(0, 255, 198, 0.3)',
                        '& .episode-thumbnail': {
                          transform: 'scale(1.05)'
                        }
                      }
                    }}
                  >
                    <CardActionArea 
                      onClick={() => handleSelectEpisode(ep)}
                      sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
                    >
                      {/* Thumbnail */}
                      <Box sx={{ position: 'relative', overflow: 'hidden' }}>
                        <CardMedia
                          component="img"
                          height={200}
                          image={ep.thumbnail}
                          alt={ep.title}
                          className="episode-thumbnail"
                          sx={{ 
                            transition: 'transform 0.3s ease',
                            filter: 'brightness(0.9)'
                          }}
                        />
                        {/* Play overlay */}
                        <Box sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          right: 0,
                          bottom: 0,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          background: 'rgba(0, 0, 0, 0.4)',
                          opacity: 0,
                          transition: 'opacity 0.3s ease',
                          '&:hover': {
                            opacity: 1
                          }
                        }}>
                          <IconButton sx={{ 
                            bgcolor: 'var(--secondary, #00ffc6)',
                            color: '#000',
                            width: 70,
                            height: 70,
                            '&:hover': {
                              bgcolor: '#00d6a4',
                              transform: 'scale(1.1)'
                            }
                          }}>
                            <PlayArrowIcon sx={{ fontSize: 40 }} />
                          </IconButton>
                        </Box>
                        {/* Episode number badge */}
                        <Box sx={{
                          position: 'absolute',
                          top: 10,
                          left: 10,
                          bgcolor: 'rgba(0, 0, 0, 0.8)',
                          color: 'var(--secondary, #00ffc6)',
                          px: 1.5,
                          py: 0.5,
                          borderRadius: 1,
                          fontSize: '0.875rem',
                          fontWeight: 'bold'
                        }}>
                          EP {index + 1}
                        </Box>
                        {ep.isLocal && (
                          <Box sx={{
                            position: 'absolute',
                            top: 10,
                            right: 10,
                            bgcolor: 'var(--secondary, #00ffc6)',
                            color: '#000',
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 1,
                            fontSize: '0.75rem',
                            fontWeight: 'bold'
                          }}>
                            LOCAL
                          </Box>
                        )}
                      </Box>

                      {/* Content */}
                      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6" fontWeight={600} color="#fff" gutterBottom noWrap>
                          {ep.title}
                        </Typography>
                        
                        {/* Author */}
                        {ep.author && (
                          <Typography variant="body2" color="rgba(255, 255, 255, 0.6)" sx={{ mb: 1 }}>
                            by {ep.author}
                          </Typography>
                        )}
                        
                        {/* Category chip */}
                        <Chip 
                          label={ep.category} 
                          size="small"
                          sx={{ 
                            alignSelf: 'flex-start',
                            mb: 2,
                            bgcolor: 'rgba(0, 255, 198, 0.2)', 
                            color: 'var(--secondary, #00ffc6)',
                            fontWeight: 500,
                            fontSize: '0.75rem'
                          }}
                        />
                        
                        {/* Description */}
                        <Typography 
                          variant="body2" 
                          color="rgba(255, 255, 255, 0.7)" 
                          sx={{ 
                            mb: 2,
                            display: '-webkit-box',
                            WebkitLineClamp: expandedEpisode === ep.id ? 'none' : 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden'
                          }}
                        >
                          {ep.description || 'Join us for an insightful discussion on the latest trends and innovations in dental and aesthetic practices.'}
                        </Typography>
                        
                        {/* Expand/Collapse button */}
                        {ep.description && ep.description.length > 100 && (
                          <IconButton 
                            size="small"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleExpandEpisode(ep.id);
                            }}
                            sx={{ 
                              alignSelf: 'flex-start',
                              color: 'var(--secondary, #00ffc6)',
                              p: 0.5,
                              mb: 1
                            }}
                          >
                            {expandedEpisode === ep.id ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                          </IconButton>
                        )}
                        
                        {/* Metadata */}
                        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <AccessTimeIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' }} />
                            <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                              {formatDuration(ep.duration)}
                            </Typography>
                          </Box>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <CalendarTodayIcon sx={{ fontSize: 16, color: 'rgba(255, 255, 255, 0.5)' }} />
                            <Typography variant="caption" color="rgba(255, 255, 255, 0.5)">
                              {formatDate(ep.publishedDate)}
                            </Typography>
                          </Box>
                        </Box>
                      </CardContent>
                    </CardActionArea>
                    
                    {/* Action buttons */}
                    <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        startIcon={<PlayArrowIcon />}
                        onClick={() => handleSelectEpisode(ep)}
                        sx={{
                          bgcolor: 'var(--secondary, #00ffc6)',
                          color: '#000',
                          fontWeight: 600,
                          '&:hover': {
                            bgcolor: '#00d6a4'
                          }
                        }}
                      >
                        Play Now
                      </Button>
                      {ep.isLocal && (
                        <IconButton
                          href={ep.url}
                          download
                          sx={{
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            color: 'rgba(255, 255, 255, 0.8)',
                            '&:hover': {
                              border: '1px solid var(--secondary, #00ffc6)',
                              color: 'var(--secondary, #00ffc6)'
                            }
                          }}
                        >
                          <DownloadIcon />
                        </IconButton>
                      )}
                    </Box>
                  </Card>
                </Zoom>
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
}
