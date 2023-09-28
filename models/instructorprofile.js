'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class InstructorProfile extends Model {
    get fullName() {
      return this.firstName + " " + this.lastName
    }

    convertDate(date = this.dateOfBirth) {
      const year = date?.getFullYear()
      const month = date?.getMonth().toString().padStart(2, "0")
      const day = date?.getDate().toString().padStart(2, "0")

      return `${year}-${month}-${day}`
    }

    static associate(models) {
      InstructorProfile.belongsTo(models.Instructor, {
        as: "User",
        onDelete:"CASCADE",
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