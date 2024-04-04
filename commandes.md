npm init -y
npm install express sequelize pg pg-hstore bcrypt dotenv express-session connect-pg-simple jest 
npm install eslint
npm i @faker-js/faker

<!-- Pour installer la CLI Sequelize : -->
npm install --save-dev sequelize-cli
<!-- Créer/exécuter les tables dans la base de données -->
<!-- Effectuer la migration dans l'ordre des tables en spécifiant le nom du fichier -->
npx sequelize-cli db:migrate
npx sequelize-cli db:migrate --to 20240329-create-users.js --from 20240329-create-tasks.js
npx sequelize-cli db:migrate --to 20240329-create-tasks.js

<!-- Fonctionnalité de correction automatique pour certaines règles -->
npx eslint . --fix

<!-- Au fil du projet, on se rends compte que pour définir une association pour qu'un Users puisse créer plusieurs Colocs (dans la vie du compte) mais qu'il puisse appartenir qu'à une seule Colocs -->
<!-- Pour cela nous faisons une nouvelle migration Sequelize pour MAJ la BDD -->
npx sequelize migration:generate --name add-userid-to-colocs
npx sequelize migration:generate --name add-currentcolocid-to-users

<!--  -->
npm install dayjs

