'use strict';
module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Reviews', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Users"}
      },
      trackId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: { model: "Tracks"}
      },
      review: {
        allowNull: false,
        type: Sequelize.STRING(255)
      },
      rating: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now"),
      }
    });
  },
   down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Reviews');
  }
};
