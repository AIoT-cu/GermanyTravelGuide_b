const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");

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