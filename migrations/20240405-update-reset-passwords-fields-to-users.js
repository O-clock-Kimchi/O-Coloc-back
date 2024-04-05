/* eslint-disable no-unused-vars */
/* eslint-disable comma-dangle */
/* eslint-disable eol-last */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Renommer la colonne resetPasswordExpires en reset_password_expires
    await queryInterface.renameColumn('users', 'resetPasswordExpires', 'reset_password_expires');
    await queryInterface.renameColumn('users', 'resetPasswordToken', 'reset_password_token');
  },

  down: async (queryInterface, Sequelize) => {
    // Revenir en arrière en renommant resetPasswordExpires en reset_password_expires
    await queryInterface.renameColumn('users', 'resetPasswordExpires', 'reset_password_expires');
    await queryInterface.renameColumn('users', 'resetPasswordToken', 'reset_password_token');
  }
};