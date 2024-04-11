/* eslint-disable space-before-function-paren */
/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable semi */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'color', {
      type: Sequelize.STRING(7),
      allowNull: false,
      unique: false
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.changeColumn('users', 'color', {
      type: Sequelize.STRING(7),
      allowNull: false,
      unique: true
  });
},
}
