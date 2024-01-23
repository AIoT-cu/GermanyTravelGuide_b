const placesData = require('../data/places.json');

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