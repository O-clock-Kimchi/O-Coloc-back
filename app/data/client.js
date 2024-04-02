// temporary
require('dotenv').config();

const pg = require('pg');

// * On instancie le client pg
const client = new pg.Client(process.env.DB_URL);

client.connect();

module.exports = client;