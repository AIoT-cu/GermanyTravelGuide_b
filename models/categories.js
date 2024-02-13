const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");

const Categories = sequelize.define(
    "categories",
    {
        // Model attributes are defined here
        category_name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        category_description: {
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

module.exports = Categories;