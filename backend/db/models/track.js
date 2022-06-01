"use strict";
module.exports = (sequelize, DataTypes) => {
  const Track = sequelize.define(
    "Track",
    {
      userId: DataTypes.INTEGER,
      address: DataTypes.STRING,
      city: DataTypes.STRING,
      state: DataTypes.STRING,
      country: DataTypes.STRING,
      price: DataTypes.DECIMAL,
      phone: DataTypes.STRING,
      web: DataTypes.STRING,
    },
    {}
  );
  Track.associate = function (models) {
    // associations can be defined here
    Track.hasMany(models.Booking, { foreignKey: "trackId", onDelete: "CASCADE", hooks: true });
    Track.belongsTo(models.User, { foreignKey: "userId" });
    Track.hasMany(models.Image, { foreignKey: "trackId", onDelete: "CASCADE", hooks: true });
    Track.hasMany(models.Review, { foreignKey: "trackId", onDelete: "CASCADE", hooks: true });
  };
  return Track;
};
