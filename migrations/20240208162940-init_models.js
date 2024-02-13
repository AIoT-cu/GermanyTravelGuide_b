'use strict';

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */

    await queryInterface.createTable(
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
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
