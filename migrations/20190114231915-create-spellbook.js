'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('spellbooks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      level: {
        type: Sequelize.INTEGER
      },
      user: {
        type: Sequelize.INTEGER
      },
      known_spells: {
        type: Sequelize.INTEGER
      },
      cantrips_known: {
        type: Sequelize.INTEGER
      },
      level_1_slots: {
        type: Sequelize.INTEGER
      },
      level_2_slots: {
        type: Sequelize.INTEGER
      },
      level_3_slots: {
        type: Sequelize.INTEGER
      },
      level_4_slots: {
        type: Sequelize.INTEGER
      },
      level_5_slots: {
        type: Sequelize.INTEGER
      },
      level_6_slots: {
        type: Sequelize.INTEGER
      },
      level_7_slots: {
        type: Sequelize.INTEGER
      },
      level_8_slots: {
        type: Sequelize.INTEGER
      },
      level_9_slots: {
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
    return queryInterface.dropTable('spellbooks');
  }
};