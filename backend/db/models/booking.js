"use strict";
module.exports = (sequelize, DataTypes) => {
  const Booking = sequelize.define(
    "Booking",
    {
      trackId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      date: DataTypes.DATE,
      startTime : DataTypes.DATE,
      endTime: DataTypes.DATE
    },
    {}
  );
  Booking.associate = function (models) {
    // associations can be defined here
    Booking.belongsTo(models.User, { foreignKey: "userId" });
    Booking.belongsTo(models.Track, { foreignKey: "trackId" });
  };
  return Booking;
};
