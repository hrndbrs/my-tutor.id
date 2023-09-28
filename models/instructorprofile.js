'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstructorProfile extends Model {
    static associate(models) {
      InstructorProfile.belongsTo(models.Instructor, {
        foreignKey: 'InstructorId', 
        targetKey: 'roleId',  
      })
    }
  }
  InstructorProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    education: DataTypes.STRING,
    description: DataTypes.TEXT,
    occupation: DataTypes.STRING,
    InstructorId: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InstructorProfile',
  });
  return InstructorProfile;
};