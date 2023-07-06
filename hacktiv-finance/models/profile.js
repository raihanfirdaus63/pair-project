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
      Profile.hasMany(models.Order)
      Profile.belongsToMany(models.Product, {through: models.Order})
    }
    get formatDate(){
      return new Date(this.birthOfDate).toISOString().split('T')[0]
    }
  }
  Profile.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter name'
        },
        notEmpty: {
          msg: 'Please enter name'
        }
      }
    },
    birthOfDate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter birthOfDate'
        },
        notEmpty: {
          msg: 'Please enter birthOfDate'
        },
        // isBefore: {
        //   args:[['2006-01-01']],
        //   msg: 'You must born before 2006 !'
        // }
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter address'
        },
        notEmpty: {
          msg: 'Please enter address'
        }
      }
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please enter phone number'
        },
        notEmpty: {
          msg: 'Please enter phone number'
        },
        isNumeric: {
          msg: 'Phone number must be number'
        }
      }
    },
    balance: DataTypes.INTEGER,
    payment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Please select avalible payment method'
        },
        notEmpty: {
          msg: 'Please select avalible payment method'
        }
      }
    },
    portfolio: DataTypes.STRING,
    UserId: DataTypes.INTEGER
  }, {
    // hooks: {
    //   beforeCreate (instance){
    //     const summary = instance.UserId + instance.id
    //     instance.UserId = summary
    //   }
    // },
    sequelize,
    modelName: 'Profile',
  });
  return Profile;
};