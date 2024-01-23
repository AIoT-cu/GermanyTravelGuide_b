const express = require('express');
const router = express.Router();

// Import the controller
const placesController = require('../controllers/placesController');

// Define routes using the controllers
router.get('/places', placesController.getAllPlaces);
router.get('/places/:id', placesController.getPlaceDetailsById);

module.exports = router;