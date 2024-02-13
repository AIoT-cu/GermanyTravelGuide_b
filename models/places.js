const { DataTypes } = require("sequelize");
const sequelize = require("../helpers/sequelize");
const Categories = require('./categories');
const States = require('./states');

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