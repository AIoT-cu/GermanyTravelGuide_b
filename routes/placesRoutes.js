const express = require('express');
const router = express.Router();

// Import the controller
const placesController = require('../controllers/placesController');
// const placesCategoriesController = require('../controllers/placesCategoriesController');


// Define routes using the controllers
router.get('/places', placesController.getAllPlaces);
router.get('/places/:id', placesController.getPlaceDetailsById);
router.post('/places/create', async (req, res) => {
    const place_name = req.body.place_name;
    const state_name = req.body.state_name;
    const place_description = req.body.place_description;
    const place_location = req.body.place_location;
    const place_image_url = req.body.place_image_url;
    const stateId = req.body.stateId;

    const place = await placesController.createPlace(
        place_name,
        state_name,
        place_description,
        place_location,
        place_image_url,
        stateId)
    
    if(place.error){
        res.status(500).json({message: place.error});
    }else{
        res.json(place);
    }
});

router.delete('/places/:id', async (req, res) => {
    const placeID = req.params.id;

    const deleted = await placesController.deletePlace(placeID)
    
    if(deleted.error){
        res.status(500).json({message: deleted.error});
    }else if(deleted === 0){
        res.status(500).json({message: `Place with id ${placeID} does not exist`});
    }{
        res.json({placeID, deleted});
    }
});

// Define routes for creating and removing relations between places and categories
// router.post('/places-categories/create', placesCategoriesController.createRelation);
// router.delete('/places-categories/remove', placesCategoriesController.removeRelation);

module.exports = router;