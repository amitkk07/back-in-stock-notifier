const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Subscription = sequelize.define('Subscription', {
  isNotified: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  notifiedAt: {
    type: DataTypes.DATE,
    allowNull: true
  }
});

module.exports = Subscription;
