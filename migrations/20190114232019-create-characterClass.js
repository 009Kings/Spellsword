'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('characterClasses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      casting_type: {
        allowNull: false,
        type: Sequelize.STRING
      },
      spell_change: {
        allowNull: false,
        type: Sequelize.STRING
      },
      spell_recharge: {
        allowNull: false,
        type: Sequelize.STRING
      },
      spell_url:{
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('characterClasses');
  }
};