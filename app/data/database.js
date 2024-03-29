const test = console.log("je veux pouvoir commit");
console.log(test);
/* eslint-disable linebreak-style */
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('nom_de_la_base_de_donnees', 'utilisateur', 'mot_de_passe', {
  host: 'localhost',
  dialect: 'postgres',
  logging: false,
  // eslint-disable-next-line eol-last
});
