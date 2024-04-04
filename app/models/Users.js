/* eslint-disable indent */
/* eslint-disable comma-dangle */
/* eslint-disable linebreak-style */
// models/User.js
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../data/database');

class Users extends Model {}

Users.init({
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
        // unique: true
    },
    current_coloc_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        references: {
        model: 'colocs',
        key: 'coloc_id'
        },
        allowNull: true
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true
    },
    resetPasswordExpires: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize, // L'instance Sequelize que vous avez créée
    modelName: 'Users', // Le nom du modèle
    tableName: 'users', // Le nom de la table dans la base de données
    timestamps: false, // Indique si les colonnes createdAt et updatedAt doivent être créées automatiquement
    underscored: true, // Utilisation de la convention snake_case pour les noms de colonnes
});

module.exports = Users;
