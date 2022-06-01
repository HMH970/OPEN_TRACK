"use strict";
module.exports = (sequelize, DataTypes) => {
  const Image = sequelize.define(
    "Image",
    {
      trackId: DataTypes.INTEGER,
      url: DataTypes.STRING,
    },
    {}
  );
  Image.associate = function (models) {
    // associations can be defined here
    Image.belongsTo(models.Track, { foreignKey: "trackId" });
  };
  return Image;
};
