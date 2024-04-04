const { Sequelize } = require('sequelize');
require('dotenv').config();
// Configuration de Sequelize avec les informations de connexion à la base de données
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    // Ajoutez d'autres options si nécessaire
  }
);

// Test de la connexion à la base de données
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  } finally {
    // Assurez-vous de fermer la connexion après le test
    await sequelize.close();
  }
}

console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Appel de la fonction pour tester la connexion à la base de données
testDBConnection();


//$ node test-db-connection.js pour test dans le terminal pour verifier connexion db avec sequelize