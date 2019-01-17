'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellCharacterClass = sequelize.define('spellCharacterClass', {
    spellId: DataTypes.INTEGER,
    characterClassId: DataTypes.INTEGER
  }, {});
  spellCharacterClass.associate = function(models) {
    // associations can be defined here
  };
  return spellCharacterClass;
};