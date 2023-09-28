'use strict';
const { hashSync, genSaltSync } = require("bcryptjs")

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Instructor extends Model {
    static associate(models) {
      Instructor.hasOne(models.InstructorProfile, {
        foreignKey: 'UserId', 
        sourceKey: 'roleId',  
      })
      Instructor.belongsToMany(models.User, { as : "Instructor", through: "Booking"})
    }
  }
  Instructor.init({
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
    course: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull:{
          msg: "Course is required"
        },
        notEmpty: {
          msg: "You must describe the course you want to tutor"
        }
      }
    },
    roleId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Instructor',
  });

  Instructor.addHook("beforeValidate", instructor => {
    instructor.email = instructor.email?.toLowerCase()
    return instructor
  })

  Instructor.addHook("beforeCreate", instructor => {
    const salt = genSaltSync(10)
    instructor.password = hashSync(instructor.password, salt)
    return instructor
  })

  return Instructor;
};