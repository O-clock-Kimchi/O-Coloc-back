/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('colocs', {
            coloc_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            name: {
                type: Sequelize.TEXT,
                allowNull: false
            },
            groupe_code_valid: {
                type: Sequelize.TEXT,
                unique: true
            },
            date_creation: {
                type: Sequelize.DATE,
                allowNull: false
            },
            lien_coloc: {
                type: Sequelize.TEXT,
                allowNull: false,
                unique: true
            }
        });
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('colocs');
    }
};
