## AUDE

<!-- Middleware d'authentification : Créez un middleware qui vérifie si req.session.userId existe pour autoriser l'accès à certaines routes. -->
<!-- DEJA FAIT -->
Stockage des informations dans la session : Au moment de la connexion, stockez userId et current_coloc_id dans la session pour identifier l'utilisateur et sa colocation actuelle sans nécessiter de transmission dans les requêtes.