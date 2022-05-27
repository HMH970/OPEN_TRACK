'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Track extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Track.hasMany(models.Review, { foreignKey: "trackId", onDelete:"CASCADE"})
      Track.hasMany(models.Image, { foreignKey: "trackId", onDelete: "CASCADE"})
      Track.hasMany(models.Booking, { foreignKey: "trackId", onDelete: "CASCADE"})
      Track.belongsTo(models.User, {foreignKey: "userId"})
    }
  }
  Track.init({
    userId: DataTypes.INTEGER,
    address: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    country: DataTypes.STRING,
    price: DataTypes.DECIMAL,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Track',
  });
  return Track;
};
