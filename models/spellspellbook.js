'use strict';
module.exports = (sequelize, DataTypes) => {
  const spellSpellbook = sequelize.define('spellSpellbook', {
    spellId: DataTypes.INTEGER,
    spellbookId: DataTypes.INTEGER,
    exceptionAdd: DataTypes.BOOLEAN
  }, {});
  spellSpellbook.associate = function(models) {
    // associations can be defined here
  };
  return spellSpellbook;
};