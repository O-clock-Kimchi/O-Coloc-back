/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');

class User extends Model {}

User.init({
    user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    firstname: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    email: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    color: {
        type: DataTypes.STRING(7),
        allowNull: false,
        unique: true
    }
}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users',
    timestamps: false
});

module.exports = User;
