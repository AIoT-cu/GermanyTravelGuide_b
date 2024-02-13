const States = require("../models/states");

// Controller: Get all States
exports.getAllStates = (req, res) => {
    res.json({ States: StatesData });
};

// Controller: Get details of a state by its id
exports.getStateDetailsById = (req, res) => {
    const stateId = parseInt(req.params.id);
    const state = StatesData.find(p => p.id === stateId);

    if (state) {
        res.json({ state });
    } else {
        res.status(404).json({ message: 'State not found' });
    }
};

exports.createState = async (
    state_name,
    state_capital,
    state_population,
    state_special_fact,
    state_image_url,
) => {
    try {
        const state = await States.create({
            state_name,
            state_capital,
            state_population,
            state_special_fact,
            state_image_url,
        });
        return state;
    } catch (error) {
        console.error(error);
        return {
            error
        }
    }
};

exports.deleteState = async (
    stateId
) => {
    try {
        const deleted = await States.destroy({
            where: {
                id: parseInt(stateId)
            }
        });
        // const deleted = await States.destroy(stateId);
        return deleted;
    } catch (error) {
        console.error(error);
        return {
            error
        }
    }
};