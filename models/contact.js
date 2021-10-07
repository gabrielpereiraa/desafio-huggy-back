'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Contact.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5,200]
      }
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10,200]
      }
    },
    phone: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [10,15]
      }
    },
    cell: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        len: [10,15]
      }
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0,200]
      }
    },
    city: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5,100]
      }
    },
    district: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [5,100]
      }
    },
    state: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [2,2]
      }
    },
    profileImg: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [0, 500]
      }
    }
  }, {
    sequelize,
    modelName: 'Contact',
    tableName: 'contacts'
  });
  return Contact;
};