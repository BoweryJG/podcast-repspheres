import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Chip,
  IconButton,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel
} from '@mui/material';
import LaunchIcon from '@mui/icons-material/Launch';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RefreshIcon from '@mui/icons-material/Refresh';
import AddIcon from '@mui/icons-material/Add';
import supabase from './supabase';

export default function AdminDashboard() {
  const [episodes, setEpisodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newEpisodeDialog, setNewEpisodeDialog] = useState(false);
  const [newEpisode, setNewEpisode] = useState({
    title: '',
    description: '',
    author: ''
  });

  // Fetch all episodes
  const fetchEpisodes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('podcasts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setEpisodes(data || []);
    } catch (error) {
      console.error('Error fetching episodes:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEpisodes();
  }, []);

  // Pre-release episodes
  const preReleaseTitles = async (count = 5) => {
    try {
      const response = await fetch(`https://cbopynuvhcymbumjnvay.supabase.co/functions/v1/podcast-prerelease`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ count })
      });

      if (response.ok) {
        alert('Titles pre-released successfully!');
        fetchEpisodes();
      }
    } catch (error) {
      console.error('Error pre-releasing titles:', error);
      alert('Failed to pre-release titles');
    }
  };

  // Select winner for production
  const selectWinner = async () => {
    try {
      const response = await fetch(`https://cbopynuvhcymbumjnvay.supabase.co/functions/v1/podcast-prerelease/produce`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        alert(`Selected winner: ${data.winner?.title || 'Unknown'}`);
        fetchEpisodes();
      }
    } catch (error) {
      console.error('Error selecting winner:', error);
      alert('Failed to select winner');
    }
  };

  // Create new episode
  const createEpisode = async () => {
    try {
      const { error } = await supabase
        .from('podcasts')
        .insert([{
          ...newEpisode,
          status: 'draft'
        }]);
      
      if (error) throw error;
      
      setNewEpisodeDialog(false);
      setNewEpisode({ title: '', description: '', author: '' });
      fetchEpisodes();
    } catch (error) {
      console.error('Error creating episode:', error);
      alert('Failed to create episode');
    }
  };

  // Update episode status
  const updateEpisodeStatus = async (id, newStatus) => {
    try {
      const { error } = await supabase
        .from('podcasts')
        .update({ status: newStatus })
        .eq('id', id);
      
      if (error) throw error;
      fetchEpisodes();
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'draft': return 'default';
      case 'pre_released': return 'warning';
      case 'in_production': return 'info';
      case 'published': return 'success';
      default: return 'default';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold">
          Podcast Admin Dashboard
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="outlined"
            startIcon={<RefreshIcon />}
            onClick={fetchEpisodes}
          >
            Refresh
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setNewEpisodeDialog(true)}
          >
            New Episode
          </Button>
        </Box>
      </Box>

      {/* Quick Actions */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Pre-Release Management
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  onClick={() => preReleaseTitles(3)}
                  size="small"
                >
                  Pre-Release 3 Titles
                </Button>
                <Button
                  variant="contained"
                  startIcon={<LaunchIcon />}
                  onClick={() => preReleaseTitles(5)}
                  size="small"
                >
                  Pre-Release 5 Titles
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Production Queue
              </Typography>
              <Button
                variant="contained"
                color="success"
                startIcon={<CheckCircleIcon />}
                onClick={selectWinner}
                sx={{ mt: 2 }}
              >
                Select Winner for Production
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Episodes Table */}
      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="center">Engagement</TableCell>
                <TableCell align="center">Views</TableCell>
                <TableCell align="center">Comments</TableCell>
                <TableCell align="center">Shares</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={7} align="center">
                    <LinearProgress />
                  </TableCell>
                </TableRow>
              ) : (
                episodes.map((episode) => (
                  <TableRow key={episode.id}>
                    <TableCell>
                      <Typography variant="body2" fontWeight="500">
                        {episode.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={episode.status || 'draft'}
                        color={getStatusColor(episode.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="center">
                      {episode.engagement_score || 0}
                    </TableCell>
                    <TableCell align="center">
                      {episode.view_count || 0}
                    </TableCell>
                    <TableCell align="center">
                      {episode.comment_count || 0}
                    </TableCell>
                    <TableCell align="center">
                      {episode.share_count || 0}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={episode.status || 'draft'}
                        onChange={(e) => updateEpisodeStatus(episode.id, e.target.value)}
                        size="small"
                      >
                        <MenuItem value="draft">Draft</MenuItem>
                        <MenuItem value="pre_released">Pre-Released</MenuItem>
                        <MenuItem value="in_production">In Production</MenuItem>
                        <MenuItem value="published">Published</MenuItem>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* New Episode Dialog */}
      <Dialog open={newEpisodeDialog} onClose={() => setNewEpisodeDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Create New Episode</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
            <TextField
              label="Title"
              fullWidth
              value={newEpisode.title}
              onChange={(e) => setNewEpisode({ ...newEpisode, title: e.target.value })}
            />
            <TextField
              label="Description"
              fullWidth
              multiline
              rows={3}
              value={newEpisode.description}
              onChange={(e) => setNewEpisode({ ...newEpisode, description: e.target.value })}
            />
            <TextField
              label="Author"
              fullWidth
              value={newEpisode.author}
              onChange={(e) => setNewEpisode({ ...newEpisode, author: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setNewEpisodeDialog(false)}>Cancel</Button>
          <Button onClick={createEpisode} variant="contained">Create</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}