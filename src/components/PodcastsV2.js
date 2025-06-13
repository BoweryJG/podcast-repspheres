import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Container, 
  Button, 
  IconButton,
  Chip,
  Card,
  Stack,
  useTheme,
  useMediaQuery,
  Fab,
  Badge,
  Skeleton,
  SwipeableDrawer,
  List,
  ListItem,
  ListItemText,
  Divider,
  Avatar,
  LinearProgress
} from '@mui/material';
import { motion, AnimatePresence } from 'framer-motion';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ShareIcon from '@mui/icons-material/Share';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import ConstructionIcon from '@mui/icons-material/Construction';
import HeadphonesIcon from '@mui/icons-material/Headphones';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AudioPlayer from './AudioPlayer';
import supabase from '../supabase';

const formatDuration = (seconds) => {
  if (!seconds) return '00:00';
  const mins = Math.floor(seconds / 60);
  return `${mins} min`;
};

const getUserId = () => {
  let userId = localStorage.getItem('podcast_user_id');
  if (!userId) {
    userId = 'user_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('podcast_user_id', userId);
  }
  return userId;
};

export default function PodcastsV2({ episodes = [] }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [votedEpisodes, setVotedEpisodes] = useState([]);
  const [playerDrawer, setPlayerDrawer] = useState(false);
  const [activeSection, setActiveSection] = useState('vote'); // 'vote', 'production', 'listen'

  useEffect(() => {
    const voted = JSON.parse(localStorage.getItem('voted_podcasts') || '[]');
    setVotedEpisodes(voted);
  }, []);

  // Categorize episodes
  const preReleaseEpisodes = episodes.filter(ep => ep.status === 'pre_released')
    .sort((a, b) => (b.engagement_score || 0) - (a.engagement_score || 0))
    .slice(0, 3);
  
  const inProductionEpisode = episodes.find(ep => ep.status === 'in_production');
  const publishedEpisodes = episodes.filter(ep => !ep.status || ep.status === 'published');

  const trackEngagement = async (episodeId, type) => {
    try {
      await fetch(`https://cbopynuvhcymbumjnvay.supabase.co/functions/v1/engage`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          podcast_id: episodeId,
          type: type,
          user_id: getUserId()
        })
      });
    } catch (error) {
      console.error('Error tracking engagement:', error);
    }
  };

  const voteForEpisode = async (episode) => {
    if (votedEpisodes.includes(episode.id)) return;
    
    await trackEngagement(episode.id, 'comment');
    
    const newVoted = [...votedEpisodes, episode.id];
    setVotedEpisodes(newVoted);
    localStorage.setItem('voted_podcasts', JSON.stringify(newVoted));
    
    // Haptic feedback on mobile
    if (window.navigator.vibrate) {
      window.navigator.vibrate(50);
    }
  };

  const playEpisode = (episode) => {
    setSelectedEpisode(episode);
    if (isMobile) {
      setPlayerDrawer(true);
    }
  };

  // Section Navigation
  const SectionNav = () => (
    <Box sx={{ 
      display: 'flex', 
      gap: 1, 
      mb: 3,
      overflowX: 'auto',
      pb: 1,
      '&::-webkit-scrollbar': { display: 'none' }
    }}>
      {[
        { id: 'vote', label: 'Vote Now', icon: <NewReleasesIcon />, count: preReleaseEpisodes.length },
        { id: 'production', label: 'In Production', icon: <ConstructionIcon />, count: inProductionEpisode ? 1 : 0 },
        { id: 'listen', label: 'Listen', icon: <HeadphonesIcon />, count: publishedEpisodes.length }
      ].map(section => (
        <Chip
          key={section.id}
          label={
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              {section.icon}
              <span>{section.label}</span>
              <Badge badgeContent={section.count} color="secondary" />
            </Box>
          }
          onClick={() => setActiveSection(section.id)}
          sx={{
            px: 2,
            py: 3,
            fontSize: '0.9rem',
            backgroundColor: activeSection === section.id ? 'rgba(0, 255, 198, 0.2)' : 'rgba(255,255,255,0.1)',
            color: activeSection === section.id ? 'var(--secondary, #00ffc6)' : '#fff',
            border: activeSection === section.id ? '1px solid var(--secondary, #00ffc6)' : '1px solid transparent',
            fontWeight: activeSection === section.id ? 600 : 400,
            '&:hover': {
              backgroundColor: activeSection === section.id ? 'rgba(0, 255, 198, 0.3)' : 'rgba(255,255,255,0.2)',
              borderColor: 'var(--secondary, #00ffc6)'
            }
          }}
        />
      ))}
    </Box>
  );

  // Vote Section - Mobile Optimized Cards
  const VoteSection = () => (
    <AnimatePresence mode="wait">
      {preReleaseEpisodes.length > 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <Typography variant="h5" fontWeight="bold" sx={{ mb: 1 }}>
            Your Voice Matters
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            Vote for the episode you want us to produce next
          </Typography>
          
          <Stack spacing={2}>
            {preReleaseEpisodes.map((episode, index) => (
              <motion.div
                key={episode.id}
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    p: 3,
                    background: 'linear-gradient(135deg, rgba(0,255,198,0.1) 0%, rgba(40,20,70,0.8) 100%)',
                    border: '1px solid rgba(0,255,198,0.2)',
                    position: 'relative',
                    overflow: 'hidden'
                  }}
                >
                  {/* Ranking Badge */}
                  <Chip
                    label={`#${index + 1}`}
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 10,
                      right: 10,
                      backgroundColor: index === 0 ? 'rgba(255, 215, 0, 0.9)' : 'rgba(255,255,255,0.2)',
                      color: index === 0 ? 'rgba(0,0,0,0.9)' : '#fff',
                      fontWeight: 'bold',
                      border: index === 0 ? '1px solid #FFD700' : '1px solid rgba(255,255,255,0.3)'
                    }}
                  />
                  
                  <Typography variant="h6" fontWeight="600" sx={{ mb: 1, pr: 4 }}>
                    {episode.title}
                  </Typography>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {episode.description || 'An exciting exploration into the future of healthcare'}
                  </Typography>
                  
                  {/* Engagement Score */}
                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                      <Typography variant="caption" color="text.secondary">
                        Engagement Score
                      </Typography>
                      <Typography variant="caption" fontWeight="bold">
                        {episode.engagement_score || 0}
                      </Typography>
                    </Box>
                    <LinearProgress 
                      variant="determinate" 
                      value={Math.min(100, (episode.engagement_score || 0) / 5)} 
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        backgroundColor: 'rgba(255,255,255,0.1)',
                        '& .MuiLinearProgress-bar': {
                          backgroundColor: 'var(--secondary, #00ffc6)',
                          borderRadius: 4
                        }
                      }}
                    />
                  </Box>
                  
                  {/* Action Buttons */}
                  <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                    <Button
                      variant="contained"
                      fullWidth
                      size="large"
                      startIcon={votedEpisodes.includes(episode.id) ? <ThumbUpIcon /> : <TrendingUpIcon />}
                      onClick={() => voteForEpisode(episode)}
                      disabled={votedEpisodes.includes(episode.id)}
                      sx={{
                        backgroundColor: votedEpisodes.includes(episode.id) 
                          ? 'rgba(255,255,255,0.1)' 
                          : 'rgba(0, 255, 198, 0.9)',
                        color: votedEpisodes.includes(episode.id) ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.9)',
                        fontWeight: 'bold',
                        py: 1.5,
                        border: votedEpisodes.includes(episode.id) 
                          ? '1px solid rgba(255,255,255,0.2)' 
                          : '1px solid var(--secondary, #00ffc6)',
                        '&:hover': {
                          backgroundColor: votedEpisodes.includes(episode.id) 
                            ? 'rgba(255,255,255,0.15)' 
                            : 'var(--secondary, #00ffc6)',
                          color: votedEpisodes.includes(episode.id) ? '#fff' : '#000'
                        }
                      }}
                    >
                      {votedEpisodes.includes(episode.id) ? 'Voted ✓' : 'Vote for This'}
                    </Button>
                    
                    <IconButton
                      onClick={() => trackEngagement(episode.id, 'share')}
                      sx={{
                        border: '1px solid rgba(255,255,255,0.2)',
                        color: 'var(--secondary, #00ffc6)'
                      }}
                    >
                      <ShareIcon />
                    </IconButton>
                  </Box>
                </Card>
              </motion.div>
            ))}
          </Stack>
        </motion.div>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No episodes available for voting right now
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Check back Monday for new titles!
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );

  // Production Section
  const ProductionSection = () => (
    <AnimatePresence mode="wait">
      {inProductionEpisode ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
        >
          <Card
            sx={{
              p: 4,
              background: 'linear-gradient(135deg, rgba(255,215,0,0.1) 0%, rgba(40,20,70,0.9) 100%)',
              border: '2px solid #FFD700',
              textAlign: 'center'
            }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              style={{ display: 'inline-block' }}
            >
              <ConstructionIcon sx={{ fontSize: 60, color: '#FFD700', mb: 2 }} />
            </motion.div>
            
            <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
              Now in Production!
            </Typography>
            
            <Typography variant="h6" sx={{ mb: 3, color: 'var(--secondary, #00ffc6)' }}>
              "{inProductionEpisode.title}"
            </Typography>
            
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Thanks to your votes! This episode is being produced and will be available Friday.
            </Typography>
            
            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 3 }}>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  {inProductionEpisode.engagement_score || 0}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Total Votes
                </Typography>
              </Box>
              <Box>
                <Typography variant="h4" fontWeight="bold">
                  Friday
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  Release Date
                </Typography>
              </Box>
            </Box>
            
            <Button
              variant="outlined"
              startIcon={<ShareIcon />}
              sx={{ borderColor: '#FFD700', color: '#FFD700' }}
            >
              Share the Excitement
            </Button>
          </Card>
        </motion.div>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography variant="h6" color="text.secondary">
            No episode in production yet
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
            Vote for episodes to see them here!
          </Typography>
        </Box>
      )}
    </AnimatePresence>
  );

  // Listen Section
  const ListenSection = () => (
    <Stack spacing={2}>
      {publishedEpisodes.map((episode, index) => (
        <motion.div
          key={episode.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.05 }}
        >
          <Card
            sx={{
              display: 'flex',
              alignItems: 'center',
              p: 2,
              gap: 2,
              backgroundColor: 'rgba(40,20,70,0.7)',
              border: '1px solid rgba(255,255,255,0.1)',
              cursor: 'pointer',
              '&:hover': {
                backgroundColor: 'rgba(40,20,70,0.9)',
                borderColor: 'var(--secondary, #00ffc6)'
              }
            }}
            onClick={() => playEpisode(episode)}
          >
            <Avatar
              sx={{
                width: 60,
                height: 60,
                backgroundColor: 'rgba(0, 255, 198, 0.2)',
                color: 'var(--secondary, #00ffc6)',
                border: '2px solid var(--secondary, #00ffc6)'
              }}
            >
              <PlayArrowIcon sx={{ fontSize: 30 }} />
            </Avatar>
            
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <Typography variant="subtitle1" fontWeight="600" noWrap>
                {episode.title}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
                <Typography variant="caption" color="text.secondary">
                  {formatDuration(episode.duration)}
                </Typography>
                {episode.author && (
                  <>
                    <Typography variant="caption" color="text.secondary">•</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {episode.author}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
            
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                trackEngagement(episode.id, 'share');
              }}
            >
              <ShareIcon />
            </IconButton>
          </Card>
        </motion.div>
      ))}
    </Stack>
  );

  return (
    <Box sx={{ 
      pb: selectedEpisode && !isMobile ? 15 : 2,
      pt: 4,
      px: isMobile ? 2 : 4,
      background: 'linear-gradient(180deg, rgba(20, 10, 35, 0.95) 0%, rgba(40, 20, 70, 0.9) 100%)',
      minHeight: '60vh'
    }}>
      <Container maxWidth="md">

        {/* Section Navigation */}
        <SectionNav />

        {/* Content Sections */}
        <AnimatePresence mode="wait">
          {activeSection === 'vote' && <VoteSection key="vote" />}
          {activeSection === 'production' && <ProductionSection key="production" />}
          {activeSection === 'listen' && <ListenSection key="listen" />}
        </AnimatePresence>
      </Container>

      {/* Desktop Audio Player */}
      {selectedEpisode && !isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid rgba(255,255,255,0.1)',
            p: 2
          }}
        >
          <Container maxWidth="lg">
            <AudioPlayer episode={selectedEpisode} />
          </Container>
        </Box>
      )}

      {/* Mobile Audio Player Drawer */}
      <SwipeableDrawer
        anchor="bottom"
        open={playerDrawer}
        onClose={() => setPlayerDrawer(false)}
        onOpen={() => setPlayerDrawer(true)}
        sx={{
          '& .MuiDrawer-paper': {
            backgroundColor: 'rgba(10,10,10,0.95)',
            backdropFilter: 'blur(20px)',
            borderRadius: '20px 20px 0 0',
            p: 2
          }
        }}
      >
        {selectedEpisode && <AudioPlayer episode={selectedEpisode} />}
      </SwipeableDrawer>
    </Box>
  );
}