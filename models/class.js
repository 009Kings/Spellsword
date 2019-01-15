'use strict';
module.exports = (sequelize, DataTypes) => {
  const characterClass = sequelize.define('characterClass', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    casting_type: {
      allowNull: false,
      type: DataTypes.STRING
    },
    spell_change: {
      allowNull: false,
      type: DataTypes.STRING
    },
    spell_recharge: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {});
  characterClass.associate = function(models) {
    // associations can be defined here
  };
  return characterClass;
};