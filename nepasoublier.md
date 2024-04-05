## AUDE

<!-- Middleware d'authentification : Créez un middleware qui vérifie si req.session.userId existe pour autoriser l'accès à certaines routes. -->
<!-- DEJA FAIT -->
Stockage des informations dans la session : Au moment de la connexion, stockez userId et current_coloc_id dans la session pour identifier l'utilisateur et sa colocation actuelle sans nécessiter de transmission dans les requêtes.

Sécurité et Permissions :

Utilisez des middlewares pour vérifier non seulement l'authentification de l'utilisateur mais aussi s'il a la permission de modifier une colocation spécifique, basé sur current_coloc_id stocké dans la session.

Conception des API et Sécurité :

Il n'est pas recommandé d'inclure des identifiants sensibles comme user_id dans les URLs ou corps des requêtes. Utilisez plutôt les informations de la session pour identifier les utilisateurs et gérer les permissions.
Exemple de middleware d'authentification et de vérification des permissions a été fourni pour illustrer comment sécuriser les routes nécessitant une vérification d'authentification et de droits d'accès.

## CAITLYNE

Stratégie d'Association Unique Utilisateur-Colocation :
Unicité : Chaque utilisateur peut être lié à une seule colocation à la fois, via current_coloc_id dans le modèle Users.
Changement de Colocation : Pour rejoindre une nouvelle colocation, l'utilisateur doit d'abord être détaché de l'actuelle. Ceci peut être géré automatiquement par votre application ou nécessiter une action explicite de l'utilisateur.

function canJoinNewColoc(req, res, next) {
    if (req.session.userId && req.session.currentColocId) {
        return res.status(403).json({ message: "Vous devez d'abord quitter votre colocation actuelle." });
    }
    next();
}


