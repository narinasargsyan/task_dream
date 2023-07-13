'use strict';

const DataTypes = require("sequelize");
module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('Orders', {
        id: {
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
          type: DataTypes.INTEGER,
        },
        companyName: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        customerAddress: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        orderedItem: {
          type: DataTypes.STRING,
          allowNull: true,
        },
        canceled: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: true,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: DataTypes.NOW,
        },
      });

  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('Orders');
  }
};
