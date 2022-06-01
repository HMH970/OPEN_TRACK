"use strict";
module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define(
    "Review",
    {
      userId: DataTypes.INTEGER,
      trackId: DataTypes.INTEGER,
      review: DataTypes.STRING,
    },
    {}
  );
  Review.associate = function (models) {
    // associations can be defined here
    Review.belongsTo(models.Track, { foreignKey: "trackId" });
    Review.belongsTo(models.User, { foreignKey: "userId" });
  };
  return Review;
};
