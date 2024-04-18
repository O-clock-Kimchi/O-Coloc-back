/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */

// Active le mode strict de JavaScript, améliorant la sécurité et la performance.
// Enables JavaScript's strict mode, enhancing security and performance.

module.exports = {
    
    // Asynchronous function to create the table when migrating up.
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            
            // Defines the task ID column, an auto-incrementing primary key and mandatory.
            tasks_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            
            // Description column, text type, which can be null.
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            
            // Creation date, not null, with a default timestamp of the current date and time.
            created_at: {
                type: Sequelize.DATE(6),
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            
            // Boolean indicating if the task is predefined, not null.
            is_predefined: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            
            // Boolean indicating if the task is completed, not null.
            is_done: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
           
            // Task frequency, not null, defined by an interval.
            frequency: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            
            // Task due date, not null.
            due_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            
            // Foreign key linking `tasks` to `users`, with cascade updates and deletion set to NULL.
            user_id: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'user_id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'SET NULL'
            }
        });
    },
    
    // Asynchronous function to drop the table when migrating down.
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    }
};
