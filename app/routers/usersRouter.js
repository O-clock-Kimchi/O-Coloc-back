/* eslint-disable eol-last */
/* eslint-disable import/newline-after-import */
/* eslint-disable comma-dangle */
/* eslint-disable spaced-comment */
// userRouter.js

const express = require('express');
const usersRouter = express.Router();

const { signup } = require('../controllers/usersSignupController');
const { login } = require('../controllers/usersLoginController');
const { updateProfile } = require('../controllers/usersUpdateController');
const { deleteProfile } = require('../controllers/usersDeleteController');
const { getProfile } = require('../controllers/usersGetProfile');
const { logout } = require('../controllers/usersLogoutController');
const authenticateToken = require('../../middlewares/authenticateToken');

// Route for registering a new user
usersRouter.post('/signup', signup);

// Route for user login
usersRouter.post('/login', login);

//Route for updating the profile of a logged in user
usersRouter.put('/profile', authenticateToken, updateProfile);

//Route for deleting a user account (logged in user)
usersRouter.delete('/delete', authenticateToken, deleteProfile);

//Route for viewing the profile page by the user
usersRouter.get('/profile', authenticateToken, getProfile);

//Route for user logout
usersRouter.post('/logout', authenticateToken, logout);

module.exports = usersRouter;