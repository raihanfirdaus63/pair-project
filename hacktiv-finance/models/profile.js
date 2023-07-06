'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Profile.belongsTo(models.User)
      Profile.hasOne(models.Order)
      Profile.belongsToMany(models.Product, {through: models.Order})
    }
  }
  Profile.init({
    name: DataTypes.STRING,
    birthOfDate: DataTypes.DATE,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    payment: DataTypes.STRING,
    portfolio: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};