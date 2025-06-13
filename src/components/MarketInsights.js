import React from 'react';
import { Box, Typography, Container } from '@mui/material';

export default function MarketInsights() {
  return (
    <Box sx={{ py: 6, background: '#0B0B20', color: '#fff' }}>
      <Container maxWidth="md">
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Market Insights
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Stay ahead with curated market intelligence, trends, and actionable data for elite sales teams.
        </Typography>
      </Container>
    </Box>
  );
}
