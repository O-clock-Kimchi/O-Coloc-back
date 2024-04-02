/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');

class Task extends Model {}

Task.init({
    tasks_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    created_at: {
        type: DataTypes.DATE(6),
        defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    is_predefined: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    is_done: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    },
    frequency: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    due_date: {
        type: DataTypes.DATE,
        allowNull: false
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: 'users',
            key: 'user_id'
        }
    }
}, {
    sequelize,
    modelName: 'Tasks',
    tableName: 'tasks',
    timestamps: true
});

module.exports = Task;
