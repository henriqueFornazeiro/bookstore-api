'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    queryInterface.addColumn('books', 'country_code', {type: Sequelize.STRING, after: "stock"});
  },

  async down (queryInterface, Sequelize) {
    queryInterface.removeColumn('books', 'country_code', Sequelize.STRING);
  }
};
