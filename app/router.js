/* eslint-disable object-curly-newline */
/* eslint-disable import/order */
/* eslint-disable linebreak-style */
/* eslint-disable eol-last */
const express = require('express');

const app = express();

const { usersRouter, tasksRouter, colocsRouter, passwordResetRouter, authGoogleRouter, userColocTaskRouter } = require('./routers');

const router = require('express').Router();

app.get('/', (_, res) => {
    res.send('Bienvenue sur Cohabit!');
});

// j'utilise le routeur dédié aux Listes
router.use(usersRouter);
router.use(colocsRouter);
router.use(tasksRouter);
router.use(passwordResetRouter);
router.use(authGoogleRouter);
router.use(userColocTaskRouter);

module.exports = router;