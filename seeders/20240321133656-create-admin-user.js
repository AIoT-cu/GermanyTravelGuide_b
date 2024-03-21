'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  async up (queryInterface, Sequelize) {
    const hashedPassword = bcrypt.hashSync('adminPassword', 10);

    await queryInterface.bulkInsert('Users', [{
      username: 'admin',
      email: 'admin@example.com',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', { username: 'admin' }, {});
  }
};