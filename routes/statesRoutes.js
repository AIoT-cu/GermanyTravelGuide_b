const express = require('express');
const router = express.Router();

// Import the controller
const statesController = require('../controllers/statesController');

// Define routes using the controllers
router.get('/states', statesController.getAllStates);
router.get('/states/:id', statesController.getStateDetailsById);
router.post('/states/create', async (req, res) => {
    const state_name = req.body.state_name;
    const state_capital = req.body.state_capital;
    const state_population = req.body.state_population;
    const state_special_fact = req.body.state_special_fact;
    const state_image_url = req.body.state_image_url;

    const state = await statesController.createState(
        state_name,
        state_capital,
        state_population,
        state_special_fact,
        state_image_url)

    if (state.error) {
        res.status(500).json({ message: state.error });
    } else {
        res.json(state);
    }
});

router.delete('/states/:id', async (req, res) => {
    const stateID = req.params.id;

    const deleted = await statesController.deleteState(stateID)

    if (deleted.error) {
        res.status(500).json({ message: deleted.error });
    } else if (deleted === 0) {
        res.status(500).json({ message: `State with id ${stateID} does not exist` });
    } {
        res.json({ stateID, deleted });
    }
});

module.exports = router;