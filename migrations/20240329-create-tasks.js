/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */

// Active le mode strict de JavaScript, améliorant la sécurité et la performance.
// Enables JavaScript's strict mode, enhancing security and performance.

module.exports = {
    // Fonction asynchrone pour la création de la table lors de la migration vers le haut.
    // Asynchronous function to create the table when migrating up.
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('tasks', {
            // Définition de la colonne ID des tâches, clé primaire auto-incrémentée et obligatoire.
            // Defines the task ID column, an auto-incrementing primary key and mandatory.
            tasks_id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },
            // Colonne de description, de type texte, pouvant être nulle.
            // Description column, text type, which can be null.
            description: {
                type: Sequelize.TEXT,
                allowNull: true
            },
            // Date de création, non nulle, avec horodatage par défaut à la date et heure actuelle.
            // Creation date, not null, with a default timestamp of the current date and time.
            created_at: {
                type: Sequelize.DATE(6),
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },
            // Booléen définissant si la tâche est prédéfinie, non nulle.
            // Boolean indicating if the task is predefined, not null.
            is_predefined: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            // Booléen indiquant si la tâche est terminée, non nulle.
            // Boolean indicating if the task is completed, not null.
            is_done: {
                type: Sequelize.BOOLEAN,
                allowNull: false
            },
            // Fréquence de la tâche, non nulle, définie par un intervalle.
            // Task frequency, not null, defined by an interval.
            frequency: {
                type: Sequelize.INTEGER,
                allowNull: false
            },
            // Date d'échéance de la tâche, non nulle.
            // Task due date, not null.
            due_date: {
                type: Sequelize.DATE,
                allowNull: false
            },
            // Clé étrangère reliant `tasks` à `users`, avec mise à jour en cascade et suppression définie à NULL.
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

    // Fonction asynchrone pour supprimer la table lors de la migration vers le bas.
    // Asynchronous function to drop the table when migrating down.
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('tasks');
    }
};
