const fetch = require('node-fetch');

const SUPABASE_URL = 'https://cbopynuvhcymbumjnvay.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNib3B5bnV2aGN5bWJ1bWpudmF5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM5OTUxNzMsImV4cCI6MjA1OTU3MTE3M30.UZElMkoHugIt984RtYWyfrRuv2rB67opQdCrFVPCfzU';

async function preReleaseTitles() {
  try {
    const response = await fetch(`${SUPABASE_URL}/functions/v1/podcast-prerelease`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ count: 5 })
    });

    const data = await response.json();
    console.log('Pre-release response:', data);
  } catch (error) {
    console.error('Error pre-releasing titles:', error);
  }
}

preReleaseTitles();