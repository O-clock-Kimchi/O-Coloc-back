/* eslint-disable eol-last */
/* eslint-disable comma-dangle */
/* eslint-disable indent */
// const { Sequelize } = require('sequelize');

// function getConnexion() {
//     return new Sequelize(
//         process.env.DB_NAME,
//         process.env.DB_USERNAME,
//         process.env.DB_PASSWORD,
//         {
//             define: {
//                 createdAt: 'created_at',
//                 updatedAt: 'updated_at',
//                 underscored: true,
//             },
//             host: 'localhost',
//             dialect: 'postgres',
//             logging: false,
//         }
//     );
// }


// module.exports = getConnexion;

const { Sequelize } = require('sequelize');

const sequelize = new Sequelize( process.env.DB_NAME,
           process.env.DB_USERNAME,
           "moucherons",
           {
               define: {
                   createdAt: 'created_at',
                   updatedAt: 'updated_at',
                   underscored: true,
               },
               host: 'localhost',
               dialect: 'postgres',
               logging: false,
   // process.env.DB_URL, {
   // dialect: "postgres"
});

module.exports = sequelize;
