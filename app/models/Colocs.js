/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
// models/Coloc.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');

class Coloc extends Model {}

Coloc.init({
    coloc_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    groupe_code_valid: {
        type: DataTypes.TEXT,
        unique: true
    },
    date_creation: {
        type: DataTypes.DATE,
        defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
    },
    lien_coloc: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
        model: 'users',
        key: 'user_id'
        },
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Colocs',
    tableName: 'colocs',
    timestamps: false
});

module.exports = Coloc;
