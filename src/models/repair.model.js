const { DataTypes } = require('sequelize');
const { db } = require('./../database/config');
const User = require('./user.model');
const moment = require('moment'); // Importa la biblioteca de moment

const Repair = db.define('repairs', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
    get() {
      const rawValue = this.getDataValue('date');
      return moment(rawValue).format('YYYY-MM-DD'); // Formatea la fecha en el formato que prefieras
    },
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users',
      key: 'id',
    },
  },
});

Repair.belongsTo(User, { foreignKey: 'userId' });

module.exports = Repair;
