const { Sequelize } = require('sequelize');

// Option 2: Passing a a list of infos : nom de la bdd, user de la bdd, passsword : on remarque aussi la clé host: 'localhost'
function getConnexion() {
    // * Cette fonction retourne une instance de sequelize prête à fournir aux modèles
    return new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USERNAME,
        process.env.DB_PASSWORD,
        {
            define: {
                createdAt: 'created_at',
                updatedAt: 'updated_at',
                // * nécessaire pour obtenir les clé étrangères avec underscore
                underscored: true,
            },
            host: 'localhost',
            // ! L'option dialect est obligatoire
            dialect: 'postgres',
            logging: false,
        }
    );
}

module.exports = getConnexion;