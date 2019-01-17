'use strict';
module.exports = (sequelize, DataTypes) => {
  const characterclass = sequelize.define('characterclass', {
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
  characterclass.associate = function(models) {
    // associations can be defined here
    models.characterclass.hasMany(models.spellbook);
    models.characterclass.belongsToMany(models.spell, { through: 'spellCharacterclass' })
  };
  return characterclass;
};