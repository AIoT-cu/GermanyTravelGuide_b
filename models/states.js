const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");

/**
 * @swagger
 * components:
 *   schemas:
 *     States:
 *       type: object
 *       required:
 *         - state_name
 *         - state_capital
 *         - state_population
 *         - state_special_fact
 *         - state_image_url
 *       properties:
 *         state_name:
 *           type: string
 *           description: El nombre del estado.
 *         state_capital:
 *           type: string
 *           description: La capital del estado.
 *         state_population:
 *           type: integer
 *           description: La población del estado.
 *         state_special_fact:
 *           type: string
 *           description: Un hecho especial sobre el estado.
 *         state_image_url:
 *           type: string
 *           description: La URL de la imagen del estado.
 *       example:
 *         state_name: Berlin
 *         state_capital: Berlin
 *         state_population: 3645000
 *         state_special_fact: Es conocido por su arte y vida nocturna.
 *         state_image_url: https://example.com/berlin.jpg
 */

const States = sequelize.define(
    "States",
    {
        // Model attributes are defined here
        state_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_capital: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_population: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        state_special_fact: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_image_url: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
    {
        // Other model options go here
        timestamps: true,
        paranoid: true,
    }
);

module.exports = States;