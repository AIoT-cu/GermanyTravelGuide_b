const envImport = require("dotenv").config();
const cors = require('cors');
const express = require('express');
const app = express();

// Configure CORS
app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    // credentials: true,
    // allowedHeaders: ["Authorization", "Content-Type"],
    // exposedHeaders: ["Content-Length"],
  })
);

// Check if occurs any error when getting env variables
if (envImport.error) {
  throw new Error(`Environment Variables - Import Error | ${envImport.error}`);
}

// Use process.env.PORT with a default value
const port = process.env.PORT;

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