const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse JSON
app.use(express.json());

// Import the routes
const placesRoutes = require('./routes/placesRoutes');

// Associate the routes with the app
app.use('/', placesRoutes);

// Start the server
app.listen(port, () => {
  console.log(`The application is listening at http://localhost:${port}`);
});