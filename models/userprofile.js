'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserProfile extends Model {
    
    convertDate(date = this.dateOfBirth) {
      const year = date?.getFullYear()
      const month = date?.getMonth().toString().padStart(2, "0")
      const day = date?.getDate().toString().padStart(2, "0")

      return `${year}-${month}-${day}`
    }

    get fullName() {
      return this.firstName + " " + this.lastName
    }

    static associate(models) {
      UserProfile.belongsTo(models.User, {
        as: "User",
        onDelete:"CASCADE",
        foreignKey: 'UserId', 
        targetKey: 'roleId',  
      })
    }
  }
  UserProfile.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    gender: DataTypes.STRING,
    dateOfBirth: DataTypes.DATE,
    education: DataTypes.STRING,
    description: DataTypes.TEXT,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserProfile',
  });
  return UserProfile;
};