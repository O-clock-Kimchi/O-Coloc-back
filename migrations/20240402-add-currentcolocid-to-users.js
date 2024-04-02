/* eslint-disable comma-dangle */
/* eslint-disable indent */
/* eslint-disable eol-last */
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('users', 'current_coloc_id', {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: 'colocs',
        key: 'coloc_id'
      },
      onUpdate: 'CASCADE',
      onDelete: 'SET NULL'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('users', 'current_coloc_id');
  }
};