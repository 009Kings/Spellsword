'use strict';
module.exports = (sequelize, DataTypes) => {
  const class = sequelize.define('class', {
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
  class.associate = function(models) {
    // associations can be defined here
  };
  return class;
};