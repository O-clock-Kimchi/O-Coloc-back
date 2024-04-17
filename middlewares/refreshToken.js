// const {generateToken}= require('../app/utils/fonctions');

// function refreshToken(req,res,next) {
//     if (req.user.exp < Date.now() / 1000) {
//         const newToken = generateToken(req.user.payload);
      
//         res.json({ token: newToken });
//     } else {
       
//         res.status(400).json({ message: "Le token n'est pas expiré." });
//     }
// }



function refreshToken(req, res) {
    const refreshToken = req.cookies.refreshToken;
    if (!refreshToken) {
        return res.status(401).json({ message: "Refresh token missing" });
    }
    jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, decoded) => {
        if (err) {
            return res.status(403).json({ message: "Invalid refresh token" });
        }
        // Générez un nouveau access token et renvoyez-le à l'utilisateur
        const accessToken = jwt.sign(
            { user_id: decoded.user_id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' } // Configure the token to be valid for 1 hour
        );
        res.json({ accessToken });
        console.log(accessToken)
    });
};
module.exports = refreshToken;