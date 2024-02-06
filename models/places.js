const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");

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
        timestamps: false,
    }
);

module.exports = Places;