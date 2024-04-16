/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable dot-notation */
/* eslint-disable consistent-return */
/* eslint-disable linebreak-style */
// const jwt = require('jsonwebtoken');

// function authenticateToken(req, res, next) {
//     const authHeader = req.headers.authorization;
//     const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

//     if (token == null) {
//         return res.sendStatus(401); // Aucun token, non autorisé
//     }

//     jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
//         if (err) {
//             // Vérifier le refresh token ici
//             const refreshToken = req.cookies.refreshToken; // Récupérer le refresh token depuis les cookies (ou autre source)
//             if (!refreshToken) {            
//             return res.sendStatus(403); // Token invalide
//             }
//         req.userId = user.user_id;
//         req.user = Object.assign({}, user);
//         delete req.user.password;
//         next();
//         }
//     });
// }

// module.exports = authenticateToken;

const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: "Aucun token d'accès fourni. Veuillez vous connecter pour accéder à cette ressource." });

        
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            const refreshToken = req.cookies.refreshToken; // Récupérer le refresh token depuis les cookies (ou autre source)

            if (!refreshToken) {
                return res.status(403).json({ message: "Aucun refresh token trouvé dans les cookies. Veuillez vous reconnecter." });

            }

            // Vérifiez et validez le refresh token
            jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
                if (err) {
                    return res.status(403).json({ message: "Le refresh token est invalide ou a expiré. Veuillez vous reconnecter." });

                }

                // Générez un nouveau JWT token
                const newToken = jwt.sign(
                    { user_id: user.user_id },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '1h' } // Configurez le token pour être valide pendant 1 heure
                );

                // Stockez le nouveau token dans les cookies ou autre source si nécessaire
                res.cookie('token', newToken, {
                    httpOnly: true,
                    secure: process.env.NODE_ENV === 'production',
                    sameSite: 'strict',
                    maxAge: 3600000 // 1 heure en millisecondes
                });

                req.userId = user.user_id;
                req.user = Object.assign({}, user);
                delete req.user.password;

                next();
            });
        } else {
            req.userId = user.user_id;
            req.user = Object.assign({}, user);
            delete req.user.password;
            next();
        }
    });
}

module.exports = authenticateToken;

