const States = require("../models/states");

// Controller: Get all States
exports.getAllStates = async () => {
    try {
        const states = await States.findAll()
        return states
    } catch (error) {
        console.error(error);
        return {
            error
        }
    }
};

// Controller: Get details of a state by its id
exports.getStateDetailsById = async (id) => {
    try {
        const state = await States.findByPk(id)
        return state
    } catch (error) {
        console.error(error);
        return {
            error
        }
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

exports.updateState = async (
    stateId,
    state_name,
    state_capital,
    state_population,
    state_special_fact,
    state_image_url
) => {
    try {
        const state = await States.findByPk(stateId);
        if (!state) {
            return { error: 'State not found' };
        }

        const updated = await state.update({
            state_name,
            state_capital,
            state_population,
            state_special_fact,
            state_image_url,
        });

        return updated;
    } catch (error) {
        console.error(error);
        return { error };
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