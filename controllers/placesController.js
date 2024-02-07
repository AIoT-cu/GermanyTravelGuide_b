const placesData = require('../data/places.json');
const Places = require("../models/places");

// Controller: Get all places
exports.getAllPlaces = (req, res) => {
    res.json({ places: placesData });
};

// Controller: Get details of a place by its id
exports.getPlaceDetailsById = (req, res) => {
    const placeId = parseInt(req.params.id);
    const place = placesData.find(p => p.id === placeId);

    if (place) {
        res.json({ place });
    } else {
        res.status(404).json({ message: 'Place not found' });
    }
};

exports.createPlace = async (
    place_name,
    state_name,
    place_description,
    place_location,
    place_image_url,
) => {
  try {
    const place = await Places.create({
        place_name,
        state_name,
        place_description,
        place_location,
        place_image_url,
    });
    return place;
  } catch (error) {
    console.error(error);
    return {
        error
    }
  }
};