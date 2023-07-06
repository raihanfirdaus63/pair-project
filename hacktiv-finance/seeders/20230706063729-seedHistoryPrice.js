'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./historyprice.json','utf-8')).map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
      return queryInterface.bulkInsert('HistoryPrices', data, {})
  },

  down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('HistoryPrices', null, {})
  }
};
