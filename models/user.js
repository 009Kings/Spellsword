'use strict';
var bcrypt = require("bcrypt");

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: 'Please enter a valid e-mail address'
        }
      }
    },
    password: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args:[8, 20],
          msg: 'You password must be between 8 and 20 characters long'
        }
      },
    },
    admin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avatar_img: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: 'Must be a valid Url'
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function(pendingUser){
        if(pendingUser){
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
    models.user.hasMany(models.spellbook);
  };
  user.prototype.validPassword = function(typedPassword){
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};