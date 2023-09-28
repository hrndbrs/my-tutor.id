'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up (queryInterface, Sequelize) {
    return queryInterface.addColumn("Instructors", "course", {
      allowNull: false,
      type : Sequelize.STRING,
    })
  },

  down (queryInterface, Sequelize) {
    return queryInterface.removeColumn("Instructors", "course")
  }
};
