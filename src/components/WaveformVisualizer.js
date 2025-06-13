import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import WaveSurfer from 'wavesurfer.js';

const WaveformVisualizer = ({ 
  audioUrl, 
  isPlaying, 
  onReady, 
  onPlay, 
  onPause, 
  onFinish, 
  height = 80,
  waveColor = 'rgba(0, 255, 198, 0.6)',
  progressColor = 'rgba(0, 255, 198, 1)',
  cursorColor = '#fff',
  barWidth = 2,
  barGap = 1,
  responsive = true,
  normalize = true
}) => {
  const waveformRef = useRef(null);
  const wavesurfer = useRef(null);
  const [duration, setDuration] = useState(0);

  // Initialize WaveSurfer
  useEffect(() => {
    if (waveformRef.current && !wavesurfer.current) {
      wavesurfer.current = WaveSurfer.create({
        container: waveformRef.current,
        waveColor,
        progressColor,
        cursorColor,
        barWidth,
        barGap,
        responsive,
        normalize,
        height
      });

      wavesurfer.current.on('ready', () => {
        setDuration(wavesurfer.current.getDuration());
        if (onReady) onReady(wavesurfer.current);
      });

      wavesurfer.current.on('play', () => {
        if (onPlay) onPlay();
      });

      wavesurfer.current.on('pause', () => {
        if (onPause) onPause();
      });

      wavesurfer.current.on('finish', () => {
        if (onFinish) onFinish();
      });

      return () => {
        if (wavesurfer.current) {
          wavesurfer.current.destroy();
          wavesurfer.current = null;
        }
      };
    }
  }, [waveformRef, waveColor, progressColor, cursorColor, barWidth, barGap, responsive, normalize, height, onReady, onPlay, onPause, onFinish]);

  // Load audio when URL changes
  useEffect(() => {
    if (wavesurfer.current && audioUrl) {
      wavesurfer.current.load(audioUrl);
    }
  }, [audioUrl]);

  // Control playback
  useEffect(() => {
    if (wavesurfer.current) {
      if (isPlaying) {
        wavesurfer.current.play();
      } else {
        wavesurfer.current.pause();
      }
    }
  }, [isPlaying]);

  return (
    <Box 
      ref={waveformRef} 
      sx={{ 
        width: '100%', 
        borderRadius: 2,
        background: 'rgba(20, 10, 35, 0.4)',
        padding: '10px',
        '&:hover': {
          background: 'rgba(30, 15, 50, 0.5)',
        }
      }}
    />
  );
};

export default WaveformVisualizer;
