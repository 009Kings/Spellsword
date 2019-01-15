'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spells', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      desc: {
        type: Sequelize.TEXT
      },
      higher_level: {
        type: Sequelize.TEXT
      },
      page: {
        type: Sequelize.TEXT
      },
      range: {
        type: Sequelize.STRING
      },
      components: {
        type: Sequelize.STRING
      },
      material: {
        type: Sequelize.STRING
      },
      ritual: {
        type: Sequelize.BOOLEAN
      },
      duration: {
        type: Sequelize.STRING
      },
      concentration: {
        type: Sequelize.BOOLEAN
      },
      casting_time: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      schoolId: {
        type: Sequelize.INTEGER
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
    return queryInterface.dropTable('spells');
  }
};