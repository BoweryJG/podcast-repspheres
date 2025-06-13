// Netlify Function to fetch RSS feeds server-side
const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  // Enable CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  };

  // Handle preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  try {
    const { feedUrl } = JSON.parse(event.body || '{}');
    
    if (!feedUrl) {
      return {
        statusCode: 400,
        headers,
        body: JSON.stringify({ error: 'Feed URL is required' }),
      };
    }

    // Fetch the RSS feed
    const response = await fetch(feedUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; PodcastAggregator/1.0)',
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch feed: ${response.statusText}`);
    }

    const feedContent = await response.text();

    return {
      statusCode: 200,
      headers: {
        ...headers,
        'Content-Type': 'application/xml',
      },
      body: feedContent,
    };
  } catch (error) {
    console.error('RSS fetch error:', error);
    
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch RSS feed',
        details: error.message 
      }),
    };
  }
};