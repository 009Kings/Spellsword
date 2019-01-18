'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellCharacterclass = sequelize.define('spellCharacterclass', {
    spellId: DataTypes.INTEGER,
    characterclassId: DataTypes.INTEGER,
  }, {});
  spellCharacterclass.associate = function(models) {
    // associations can be defined here
  };
  return spellCharacterclass;
};