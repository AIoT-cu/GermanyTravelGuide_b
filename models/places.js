const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");
const Categories = require('./categories');
const States = require('./states');

/**
 * @swagger
 * components:
 *   schemas:
 *     Places:
 *       type: object
 *       required:
 *         - place_name
 *         - state_name
 *         - place_description
 *         - place_location
 *         - place_image_url
 *       properties:
 *         place_name:
 *           type: string
 *           description: El nombre del lugar.
 *         state_name:
 *           type: string
 *           description: El nombre del estado al que pertenece el lugar.
 *         place_description:
 *           type: string
 *           description: Una descripción del lugar.
 *         place_location:
 *           type: string
 *           description: La ubicación del lugar.
 *         place_image_url:
 *           type: string
 *           description: La URL de la imagen del lugar.
 *       example:
 *         place_name: Castillo de Neuschwanstein
 *         state_name: Baviera
 *         place_description: Un famoso castillo del siglo XIX en las colinas de Baviera.
 *         place_location: Schwangau, Baviera, Alemania
 *         place_image_url: https://example.com/neuschwanstein.jpg
 */

const Places = sequelize.define(
    "places",
    {
        // Model attributes are defined here
        place_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        state_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        place_description: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        place_location: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Not Available"
        },
        place_image_url: {
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

// Establish the one-to-many relationship with States
States.hasMany(Places, {
    foreignKey: 'stateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});
Places.belongsTo(States, {
    foreignKey: 'stateId',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

// Establish many-to-many relationship with Categories
Places.belongsToMany(Categories, {
    through: "PlaceCategories",
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE'
});

module.exports = Places;