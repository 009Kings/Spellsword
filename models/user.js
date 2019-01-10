'use strict';
var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'That is not a valid email address'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [6, 32],
          msg: 'Your password must be between 6 and 32 characters in length'
        }
      }
    },
    username: DataTypes.STRING,
    dob: DataTypes.DATE,
    bio: DataTypes.TEXT,
    admin: DataTypes.BOOLEAN,
    img: {
      type: DataTypes.TEXT,
      validate: {
        isUrl: {
          msg: 'That is not a valid url :(' 
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: function (pendingUser) {
        if(pendingUser){
          // Create Hash
          var hash = bcrypt.hashSync(pendingUser.password, 12);
          pendingUser.password = hash;
        }
      }
    }
  });
  user.associate = function(models) {
    // associations can be defined here
  };
  user.prototype.validPassword = function (typedPassword) {
    return bcrypt.compareSync(typedPassword, this.password);
  }
  return user;
};