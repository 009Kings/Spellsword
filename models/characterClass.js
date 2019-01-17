'use strict';
module.exports = (sequelize, DataTypes) => {
  const characterClass = sequelize.define('characterClass', {
    name: {
      type: DataTypes.STRING
    },
    spellcasting: {
      type: DataTypes.BOOLEAN
    },
    api_reference: {
      type: DataTypes.STRING
    }
  }, {});
  characterClass.associate = function(models) {
    // associations can be defined here
    models.characterClass.hasMany(models.spellbook);
  };
  return characterClass;
};