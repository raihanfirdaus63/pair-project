'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class HistoryPrice extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      HistoryPrice.belongsTo(models.Product)
    }
  }
  HistoryPrice.init({
    price: DataTypes.INTEGER,
    date: DataTypes.DATE,
    ProductId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'HistoryPrice',
  });
  return HistoryPrice;
};