import React, { useState, useEffect, useRef } from 'react';
import { 
  Box, 
  IconButton, 
  Slider, 
  Typography, 
  Menu, 
  MenuItem, 
  Tooltip,
  Stack,
  Paper
} from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeOffIcon from '@mui/icons-material/VolumeOff';
import DownloadIcon from '@mui/icons-material/Download';
import SpeedIcon from '@mui/icons-material/Speed';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import ReplayIcon from '@mui/icons-material/Replay';
import Forward30Icon from '@mui/icons-material/Forward30';
import Replay10Icon from '@mui/icons-material/Replay10';
import WaveformVisualizer from './WaveformVisualizer';

const formatTime = (seconds) => {
  if (isNaN(seconds)) return '0:00';
  
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
};

const AudioPlayer = ({ episode }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [wavesurferInstance, setWavesurferInstance] = useState(null);
  const [speedMenuAnchor, setSpeedMenuAnchor] = useState(null);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [bookmarks, setBookmarks] = useState([]);
  const [isBookmarked, setIsBookmarked] = useState(false);
  
  const speedOptions = [0.5, 0.75, 1, 1.25, 1.5, 1.75, 2];
  
  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setMuted(newValue === 0);
    if (wavesurferInstance) {
      wavesurferInstance.setVolume(newValue);
    }
  };
  
  const handleMuteToggle = () => {
    setMuted(!muted);
    if (wavesurferInstance) {
      if (!muted) {
        wavesurferInstance.setVolume(0);
      } else {
        wavesurferInstance.setVolume(volume);
      }
    }
  };
  
  const handleTimeUpdate = () => {
    if (wavesurferInstance) {
      setCurrentTime(wavesurferInstance.getCurrentTime());
    }
  };
  
  const handleSeek = (event, newValue) => {
    if (wavesurferInstance) {
      wavesurferInstance.seekTo(newValue / duration);
      setCurrentTime(newValue);
    }
  };
  
  const handleSpeedMenuOpen = (event) => {
    setSpeedMenuAnchor(event.currentTarget);
  };
  
  const handleSpeedMenuClose = () => {
    setSpeedMenuAnchor(null);
  };
  
  const handleSpeedChange = (speed) => {
    setPlaybackSpeed(speed);
    if (wavesurferInstance) {
      wavesurferInstance.setPlaybackRate(speed);
    }
    handleSpeedMenuClose();
  };
  
  const handleSkipForward = () => {
    if (wavesurferInstance) {
      const newTime = Math.min(wavesurferInstance.getCurrentTime() + 30, duration);
      wavesurferInstance.seekTo(newTime / duration);
    }
  };
  
  const handleSkipBackward = () => {
    if (wavesurferInstance) {
      const newTime = Math.max(wavesurferInstance.getCurrentTime() - 10, 0);
      wavesurferInstance.seekTo(newTime / duration);
    }
  };
  
  const handleBookmark = () => {
    if (wavesurferInstance) {
      const currentTimePosition = wavesurferInstance.getCurrentTime();
      
      // Check if this time is already bookmarked (within 3 seconds)
      const existingBookmarkIndex = bookmarks.findIndex(
        bookmark => Math.abs(bookmark.time - currentTimePosition) < 3
      );
      
      if (existingBookmarkIndex >= 0) {
        // Remove bookmark if it exists
        const newBookmarks = [...bookmarks];
        newBookmarks.splice(existingBookmarkIndex, 1);
        setBookmarks(newBookmarks);
        setIsBookmarked(false);
      } else {
        // Add new bookmark
        const newBookmark = {
          time: currentTimePosition,
          label: `Bookmark at ${formatTime(currentTimePosition)}`
        };
        setBookmarks([...bookmarks, newBookmark]);
        setIsBookmarked(true);
      }
    }
  };
  
  // Check if current position is near a bookmark
  useEffect(() => {
    if (bookmarks.length > 0) {
      const isNearBookmark = bookmarks.some(
        bookmark => Math.abs(bookmark.time - currentTime) < 3
      );
      setIsBookmarked(isNearBookmark);
    }
  }, [currentTime, bookmarks]);
  
  // Set up interval to update current time
  useEffect(() => {
    const interval = setInterval(() => {
      if (wavesurferInstance && isPlaying) {
        handleTimeUpdate();
      }
    }, 500);
    
    return () => clearInterval(interval);
  }, [wavesurferInstance, isPlaying]);
  
  const handleWavesurferReady = (wavesurfer) => {
    setWavesurferInstance(wavesurfer);
    setDuration(wavesurfer.getDuration());
    wavesurfer.setVolume(volume);
  };

  return (
    <Paper 
      elevation={3}
      sx={{
        p: 3,
        borderRadius: 3,
        background: 'linear-gradient(145deg, rgba(40, 20, 70, 0.9) 0%, rgba(20, 10, 35, 0.95) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        mb: 4
      }}
    >
      <Box sx={{ mb: 2 }}>
        <Typography variant="h6" fontWeight={600} color="#fff" gutterBottom>
          {episode?.title || 'Unknown Episode'}
        </Typography>
        {episode?.description && (
          <Typography variant="body2" color="rgba(255, 255, 255, 0.7)" sx={{ mb: 2 }}>
            {episode.description}
          </Typography>
        )}
      </Box>
      
      <WaveformVisualizer 
        audioUrl={episode?.url}
        isPlaying={isPlaying}
        onReady={handleWavesurferReady}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onFinish={() => setIsPlaying(false)}
        height={100}
        waveColor="rgba(0, 255, 198, 0.6)"
        progressColor="rgba(0, 255, 198, 1)"
        cursorColor="#fff"
      />
      
      <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {formatTime(currentTime)}
        </Typography>
        <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">
          {formatTime(duration)}
        </Typography>
      </Box>
      
      <Stack 
        direction="row" 
        spacing={1} 
        alignItems="center" 
        justifyContent="center"
        sx={{ mt: 2 }}
      >
        <Tooltip title="Rewind 10 seconds">
          <IconButton 
            onClick={handleSkipBackward}
            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            <Replay10Icon />
          </IconButton>
        </Tooltip>
        
        <IconButton 
          onClick={handlePlayPause}
          sx={{ 
            color: '#000', 
            bgcolor: 'var(--secondary, #00ffc6)',
            '&:hover': { bgcolor: '#00d6a4' },
            width: 56,
            height: 56
          }}
        >
          {isPlaying ? <PauseIcon fontSize="large" /> : <PlayArrowIcon fontSize="large" />}
        </IconButton>
        
        <Tooltip title="Forward 30 seconds">
          <IconButton 
            onClick={handleSkipForward}
            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            <Forward30Icon />
          </IconButton>
        </Tooltip>
      </Stack>
      
      <Box sx={{ 
        mt: 3, 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: 2
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', minWidth: 150 }}>
          <IconButton 
            onClick={handleMuteToggle}
            size="small"
            sx={{ color: 'rgba(255, 255, 255, 0.8)' }}
          >
            {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
          </IconButton>
          <Slider
            value={muted ? 0 : volume}
            onChange={handleVolumeChange}
            min={0}
            max={1}
            step={0.01}
            sx={{ 
              ml: 1, 
              width: 100,
              color: 'var(--secondary, #00ffc6)',
              '& .MuiSlider-thumb': {
                width: 12,
                height: 12,
                '&:hover, &.Mui-focusVisible': {
                  boxShadow: '0 0 0 8px rgba(0, 255, 198, 0.16)'
                }
              }
            }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Playback speed">
            <IconButton 
              onClick={handleSpeedMenuOpen}
              size="small"
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1,
                fontSize: '0.75rem',
                px: 1
              }}
            >
              <SpeedIcon fontSize="small" sx={{ mr: 0.5 }} />
              {playbackSpeed}x
            </IconButton>
          </Tooltip>
          
          <Menu
            anchorEl={speedMenuAnchor}
            open={Boolean(speedMenuAnchor)}
            onClose={handleSpeedMenuClose}
            PaperProps={{
              sx: {
                bgcolor: 'rgba(40, 20, 70, 0.95)',
                color: '#fff',
                border: '1px solid rgba(255, 255, 255, 0.1)'
              }
            }}
          >
            {speedOptions.map((speed) => (
              <MenuItem 
                key={speed} 
                onClick={() => handleSpeedChange(speed)}
                selected={speed === playbackSpeed}
                sx={{ 
                  fontSize: '0.875rem',
                  '&.Mui-selected': {
                    bgcolor: 'rgba(0, 255, 198, 0.2)'
                  }
                }}
              >
                {speed}x
              </MenuItem>
            ))}
          </Menu>
          
          <Tooltip title={isBookmarked ? "Remove bookmark" : "Add bookmark"}>
            <IconButton 
              onClick={handleBookmark}
              size="small"
              sx={{ 
                color: isBookmarked ? 'var(--secondary, #00ffc6)' : 'rgba(255, 255, 255, 0.8)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 1
              }}
            >
              {isBookmarked ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
            </IconButton>
          </Tooltip>
          
          {episode?.isLocal && (
            <Tooltip title="Download episode">
              <IconButton 
                href={episode.url}
                download
                size="small"
                sx={{ 
                  color: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: 1
                }}
              >
                <DownloadIcon fontSize="small" />
              </IconButton>
            </Tooltip>
          )}
        </Box>
      </Box>
      
      {bookmarks.length > 0 && (
        <Box sx={{ mt: 3 }}>
          <Typography variant="subtitle2" color="rgba(255, 255, 255, 0.9)" gutterBottom>
            Bookmarks
          </Typography>
          <Stack direction="row" spacing={1} flexWrap="wrap">
            {bookmarks.map((bookmark, index) => (
              <Tooltip key={index} title={bookmark.label}>
                <Box
                  onClick={() => wavesurferInstance?.seekTo(bookmark.time / duration)}
                  sx={{
                    bgcolor: 'rgba(0, 255, 198, 0.2)',
                    color: 'var(--secondary, #00ffc6)',
                    px: 1.5,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    '&:hover': {
                      bgcolor: 'rgba(0, 255, 198, 0.3)',
                    }
                  }}
                >
                  <BookmarkIcon fontSize="small" sx={{ mr: 0.5, fontSize: '0.875rem' }} />
                  {formatTime(bookmark.time)}
                </Box>
              </Tooltip>
            ))}
          </Stack>
        </Box>
      )}
    </Paper>
  );
};

export default AudioPlayer;
