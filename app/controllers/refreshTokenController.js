const refreshTokenController = {
    async refreshToken(req,res){
    if (req.user.exp < Date.now() / 1000) {
        const newToken = generateToken(req.user.payload);
      
        res.json({ token: newToken });
    } else {
       
        res.status(400).json({ message: "Le token n'est pas expiré." });
    }
    }
}

module.exports = refreshTokenController;