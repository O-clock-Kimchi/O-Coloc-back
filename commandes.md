npm init -y
npm install express sequelize pg bcrypt dotenv express-session connect-pg-simple jest 
npm install eslint
npm i @faker-js/faker

<!-- Pour installer la CLI Sequelize : -->
npm install --save-dev sequelize-cli
<!-- Créer/exécuter les tables dans la base de données -->
<!-- Effectuer la migration dans l'ordre des tables en spécifiant le nom du fichier -->
npx sequelize-cli db:migrate --to nom_du_fichier de migration