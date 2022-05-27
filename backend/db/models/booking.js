'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Booking extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Booking.belongsTo(models.User, {foreignKey: "userId"})
      Booking.belongsTo(models.Track, {foreignKey: "trackId"})
    }
  }
  Booking.init({
    trackId: DataTypes.INTEGER,
    userId1: DataTypes.INTEGER,
    userId2: DataTypes.INTEGER,
    date: DataTypes.DATE,
    startTime: DataTypes.DATE,
    endTime: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Booking',
  });
  return Booking;
};
