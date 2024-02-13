'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('States', [{
      "state_name": "state_name",
      "state_capital": "state_capital",
      "state_population": 77,
      "state_special_fact": "state_special_fact",
      "state_image_url": "state_image_url"
    },
    {
      "state_name": "state_name2",
      "state_capital": "state_capital2",
      "state_population": 772,
      "state_special_fact": "state_special_fact2",
      "state_image_url": "state_image_url2"
    }], {});

    await queryInterface.bulkInsert('Places', [
      {
        "id": 1,
        "place_name": "Neuschwanstein Castle",
        "state_name": "Bavaria",
        "place_description": "One of the most famous castles in Germany.",
        "place_location": "Hohenschwangau",
        "place_image_url": "url1",
        "place_tag": "History"
      },
      {
        "id": 2,
        "place_name": "Brandenburg Gate",
        "state_name": "Berlin",
        "place_description": "Iconic symbol of the city of Berlin.",
        "place_location": "Pariser Platz",
        "place_image_url": "url2",
        "place_tag": "Architecture"
      },
      {
        "id": 3,
        "place_name": "Black Forest",
        "state_name": "Baden-Wurttemberg",
        "place_description": "Wooded region with picturesque villages.",
        "place_location": "Freiburg",
        "place_image_url": "url3",
        "place_tag": "Nature"
      },
      {
        "id": 4,
        "place_name": "Cologne Cathedral",
        "state_name": "North Rhine-Westphalia",
        "place_description": "Impressive Gothic cathedral.",
        "place_location": "Cologne",
        "place_image_url": "url4",
        "place_tag": "Art"
      }
    ], {});
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
