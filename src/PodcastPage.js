import React, { useEffect, useState } from 'react';
import { Box, Typography, Container, Tabs, Tab, Paper } from '@mui/material';
import NavBar from './components/NavBar';
import StarryBackground from './components/StarryBackground';
import OrbContextProvider from './components/OrbContextProvider';
import Podcasts from './components/Podcasts';
import PodcastHero from './components/PodcastHero';
import LiveFeed from './components/LiveFeed';
import Footer from './components/Footer';
import ThemeToggle from './components/ThemeToggle';
import { AuthProvider } from './contexts/AuthContext';
import supabase from './supabase';
import PodcastsIcon from '@mui/icons-material/Podcasts';
import LiveTvIcon from '@mui/icons-material/LiveTv';

const SUPABASE_URL = process.env.REACT_APP_SUPABASE_URL;
const SUPABASE_KEY = process.env.REACT_APP_SUPABASE_KEY;

// Function to format podcast title from filename
const formatPodcastTitle = (filename) => {
  // Remove file extension
  let title = filename.replace(/\.[^/.]+$/, "");
  // Replace underscores and hyphens with spaces
  title = title.replace(/[_-]/g, " ");
  // Capitalize first letter of each word
  title = title.split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
  
  return title;
};

// Function to generate a description based on the title
const generateDescription = (title) => {
  return `An in-depth discussion about ${title}.`;
};

export default function PodcastPage() {
  const [episodes, setEpisodes] = useState([]);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  useEffect(() => {
    const fetchEpisodes = async () => {
      // Local podcast files - this would ideally be fetched from the server
      // For now, we'll hardcode the Venus AI podcast and any future podcasts would be added here
      const localEpisodes = [
        {
          id: 'local-1',
          title: 'Venus AI ~ Evolution Products & Market Position',
          description: 'An in-depth discussion about Venus AI\'s evolution, product strategy, and market positioning.',
          url: process.env.PUBLIC_URL + '/podcasts/Venus Ai ~ Evolution Products & Market Position.mp3',
          isLocal: true
        }
        // To add more podcasts, simply copy the MP3 file to the public/podcasts directory
        // and add a new entry here with a unique id, title, description, and url
        // Example:
        // {
        //   id: 'local-2',
        //   title: 'New Podcast Title',
        //   description: 'Description of the new podcast',
        //   url: process.env.PUBLIC_URL + '/podcasts/filename.mp3',
        //   isLocal: true
        // }
      ];
      
      // Set local episodes immediately
      setEpisodes(localEpisodes);
      
      // Try to fetch from Supabase
      try {
        const { data, error } = await supabase.from('podcasts').select('*');
        if (error) throw error;
        if (data && data.length > 0) {
          // Combine local episodes with remote episodes
          setEpisodes([...localEpisodes, ...data]);
        }
      } catch (err) {
        console.error('Failed to fetch podcasts from Supabase client', err);
        
        // Try the alternative method with fetch API
        if (SUPABASE_URL && SUPABASE_KEY) {
          try {
            const res = await fetch(`${SUPABASE_URL}/rest/v1/podcasts?select=*`, {
              headers: {
                apikey: SUPABASE_KEY,
                Authorization: `Bearer ${SUPABASE_KEY}`,
              },
            });
            if (res.ok) {
              const data = await res.json();
              if (data && data.length > 0) {
                // Combine local episodes with remote episodes
                setEpisodes([...localEpisodes, ...data]);
              }
            }
          } catch (fetchErr) {
            console.error('Failed to fetch podcasts with fetch API', fetchErr);
            // Keep the local episodes if both methods fail
          }
        } else {
          console.log('Using local podcast episodes (Supabase URL or Key is missing)');
        }
      }
    };

    fetchEpisodes();
  }, []);

  return (
    <OrbContextProvider>
      <AuthProvider>
        <StarryBackground />
        <NavBar />
        <PodcastHero />
        
        {/* Tabs Section */}
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Paper 
            elevation={0}
            sx={{ 
              bgcolor: 'rgba(40, 20, 70, 0.7)',
              borderRadius: 3,
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}
          >
            <Tabs 
              value={activeTab} 
              onChange={handleTabChange}
              variant="fullWidth"
              sx={{
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                '& .MuiTab-root': {
                  color: 'rgba(255, 255, 255, 0.7)',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  py: 2,
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'var(--secondary, #00ffc6)',
                    bgcolor: 'rgba(0, 255, 198, 0.05)'
                  }
                },
                '& .Mui-selected': {
                  color: 'var(--secondary, #00ffc6) !important',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: 0,
                    left: 0,
                    right: 0,
                    height: 3,
                    bgcolor: 'var(--secondary, #00ffc6)',
                    borderRadius: '3px 3px 0 0'
                  }
                },
                '& .MuiTabs-indicator': {
                  display: 'none'
                }
              }}
            >
              <Tab 
                icon={<PodcastsIcon sx={{ mb: 0.5 }} />} 
                label="Episodes" 
                iconPosition="start"
              />
              <Tab 
                icon={<LiveTvIcon sx={{ mb: 0.5 }} />} 
                label="Live & Trending" 
                iconPosition="start"
              />
            </Tabs>
          </Paper>
        </Container>
        
        {/* Content based on active tab */}
        <Box id="episodes" sx={{ minHeight: '60vh' }}>
          {activeTab === 0 && <Podcasts episodes={episodes} />}
          {activeTab === 1 && (
            <Container maxWidth="lg">
              <LiveFeed />
            </Container>
          )}
        </Box>
        
        <Footer />
        <ThemeToggle />
      </AuthProvider>
    </OrbContextProvider>
  );
}
