'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Profiles', 'UserId', {
      type: Sequelize.DataTypes.INTEGER,
      references: {
        model: {
          tableName: 'Users'
        },
        key: 'id'
      },
    })
  },

   down (queryInterface, Sequelize) {
    queryInterface.removeColumn('Profiles', 'UserId', {})
  }
};
