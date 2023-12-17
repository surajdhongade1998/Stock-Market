const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

let apiData = {}; // Variable to store API response data

async function fetchStockPriceList() {
  try {
    const response = await axios.get('https://api.polygon.io/v2/aggs/grouped/locale/us/market/stocks/2023-01-11?adjusted=true&apiKey=7EU3spVPbR9mdePwPsoFTklb0EQ3SKW5');
    console.log("fetch")
    apiData = response.data; // Update the API data
  } catch (error) {
    console.error('Error fetching data:', error.message);
    // Handle the error if needed (e.g., send an alert, retry, etc.)
  }
}

// Call the fetchStockPriceList function initially
fetchStockPriceList();

// Set an interval to refresh the data every 5 seconds
const interval = setInterval(fetchStockPriceList, 5000);

// Define a route to serve the updated data
app.get('/getData', (req, res) => {
  res.json(apiData); // Return the stored API data
});

// Handle graceful shutdown
process.on('SIGINT', () => {
  clearInterval(interval); // Stop the interval on process termination
  process.exit(0);
});

// Start the server
const server = app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
