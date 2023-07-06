'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    userName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    hooks :{
      beforeCreate(instance, option){
        var salt = bcrypt.genSaltSync(10);
        var hash = bcrypt.hashSync(instance.password, salt);
        instance.password = hash
      },
      afterCreate(instance, options) {
        console.log('User Successfully created');
      },

    },
    sequelize,
    modelName: 'User',
  });
  return User;
};