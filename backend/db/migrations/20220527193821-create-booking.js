'use strict';

module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Bookings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      trackId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Tracks"}
      },
      userId1: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      userId2: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {model: "Users"}
      },
      date: {
        allowNull: false,
        type: Sequelize.DATE
      },
      startTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      endTime: {
        allowNull: false,
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn("now")
      }
    });
  },
   down:(queryInterface, Sequelize) => {
    return queryInterface.dropTable('Bookings');
  }
};
