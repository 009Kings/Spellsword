'use strict';
module.exports = (sequelize, DataTypes) => {
  const characterClass = sequelize.define('characterClass', {
    name: {
      type: DataTypes.STRING
    },
    casting_type: {
      type: DataTypes.STRING
    },
    spell_change: {
      type: DataTypes.STRING
    },
    spell_recharge: {
      type: DataTypes.STRING
    },
    class_url: {
      type: DataTypes.STRING
    }
  }, {});
  characterClass.associate = function(models) {
    // associations can be defined here
  };
  return characterClass;
};