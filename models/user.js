'use strict';
const { hashSync, genSaltSync } = require("bcryptjs")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.UserProfile, {
        as: "Profile",
        foreignKey: 'UserId', 
        sourceKey: 'roleId',  
      })
      User.belongsToMany(models.Instructor, { as : "Student", through: "Booking"})
    }
  }
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Email is required"
        },
        notEmpty: {
          msg: "Email field cannot be empty"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Password is required"
        },
        notEmpty: {
          msg: "Password field cannot be empty"
        },
        len: {
          args : [6, 50],
          msg: "Password should have at least 6 characters"
        }
      }
    },
    roleId : DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  
  User.addHook("beforeValidate", user => {
    user.email = user.email?.toLowerCase()
    return user
  })

  User.addHook("beforeCreate", user => {
    const salt = genSaltSync(10)
    user.password = hashSync(user.password, salt)
    return user
  })

  return User;
};