'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'portfolio', Sequelize.STRING)
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Profiles', 'portfolio', {})
  }
};
