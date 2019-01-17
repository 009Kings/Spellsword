'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellbook = sequelize.define('spellbook', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      references: 'user',
      referencesKey: 'id'
    },
    characterClassId: {
      type: DataTypes.INTEGER,
      references: 'characterClass',
      referencesKey: 'id'
    },
    known_spells: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    cantrips_known: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_1_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_2_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_3_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_4_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_5_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_6_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_7_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_8_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    level_9_slots: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  spellbook.associate = function(models) {
    // associations can be defined here
    models.spellbook.belongsTo(models.user);
    models.spellbook.belongsTo(models.characterClass);
  };
  return spellbook;
};