'use strict';
const fs = require('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    let data = JSON.parse(fs.readFileSync('./product.json','utf-8')).map(el=>{
      el.createdAt = new Date()
      el.updatedAt = new Date()
      return el
     })
      return queryInterface.bulkInsert('Products', data, {})
  },

  down (queryInterface, Sequelize) {

    return queryInterface.bulkDelete('Products', null, {})
  }
};
