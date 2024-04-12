/* eslint-disable comma-dangle */
/* eslint-disable indent */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'is_predefined', {
      type: Sequelize.BOOLEAN,
      allowNull: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tasks', 'is_predefined', {
      type: Sequelize.BOOLEAN,
      allowNull: false
    });
  }
};
