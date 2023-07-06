'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Product.hasMany(models.HistoryPrice)
      Product.hasMany(models.Order)
      Product.belongsToMany(models.Profile, {through: models.Order})
    }
  }
  Product.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    risk: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imageUrl: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};