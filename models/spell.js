'use strict';
module.exports = (sequelize, DataTypes) => {
  const spell = sequelize.define('spell', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    higher_level: DataTypes.TEXT,
    page: DataTypes.TEXT,
    range: {
      type: DataTypes.STRING,
      allowNull: false
    },
    components: {
      type: DataTypes.STRING,
      allowNull: false
    },
    material: DataTypes.TEXT,
    ritual: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    duration: {
      type: DataTypes.STRING,
      allowNull: false
    },
    concentration: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    casting_time: {
      type: DataTypes.STRING,
      allowNull: false
    },
    level: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    schoolId: {
      type: DataTypes.INTEGER,
      references: 'schools',
      referencesKey: 'id'
    }
  }, {});
  spell.associate = function(models) {
    // associations can be defined here
    models.spell.belongsTo(models.school);
    models.spell.belongsToMany(models.characterclass, { through: 'spellCharacterclass' });
    models.spell.belongsToMany(models.spellbook, { through: 'spellSpellbook' });
  };
  return spell;
};