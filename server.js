const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();
const port = 3001;

// Middleware to parse JSON request body
app.use(express.json());

app.use(cors());
// Using routes defined in routes.js
app.use('/', routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
