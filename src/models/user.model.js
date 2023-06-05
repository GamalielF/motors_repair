const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');

const User = db.define('users', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isLongEnough: function (val) {
        if (val.length < 8) {
          throw new Error('La contraseña debe tener al menos 8 caracteres.');
        }
      },
      containsNumber: function (val) {
        if (!/\d/.test(val)) {
          // regular expression to test if string contains a number
          throw new Error('La contraseña debe contener al menos un número.');
        }
      },
    },
  },
  role: {
    type: DataTypes.ENUM('client', 'employee'),
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    defaultValue: 'available',
    allowNull: false,
  },
});

module.exports = User;
