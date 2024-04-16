const express = require('express');
const refreshTokenRouter = express.Router();
const refreshTokenController = require('../controllers/refreshTokenController');

refreshTokenRouter.get('/refresh-token', refreshTokenController.refreshToken);

module.exports = refreshTokenRouter;