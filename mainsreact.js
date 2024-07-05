// server.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors());
// Serve static files from the build folder
app.use(express.static(path.join(__dirname, 'build')));

// Route all requests to React's index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server for react is running on port ${PORT}`);
});
