const { Sequelize } = require('sequelize');
require('dotenv').config();
// Configuring Sequelize with database connection information
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: 'localhost',
    dialect: 'postgres',
    // Add other options if necessary
  }
);

// Test the database connection
async function testDBConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connexion à la base de données établie avec succès.');
  } catch (error) {
    console.error('Impossible de se connecter à la base de données :', error);
  } finally {
    // Make sure to close the connection after testing
    await sequelize.close();
  }
}

console.log('DB_USERNAME:', process.env.DB_USERNAME);
console.log('DB_PASSWORD:', process.env.DB_PASSWORD);

// Call the function to test the connection to the database
testDBConnection();


//$ node test-db-connection.js for testing in the terminal to check db connection with sequelize