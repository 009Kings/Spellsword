'use strict';
module.exports = (sequelize, DataTypes) => {
  const school = sequelize.define('school', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    desc: {
      type: DataTypes.TEXT,
      allowNull: false
    }
  }, {});
  school.associate = function(models) {
    // associations can be defined here
    models.school.hasMany(model.spell);
  };
  return school;
};