/* eslint-disable semi */
/* eslint-disable comma-dangle */
/* eslint-disable import/extensions */
/* eslint-disable linebreak-style */
/* eslint-disable indent */
/* eslint-disable eol-last */

const colocsRouter = require('./colocsRouter');
const usersRouter = require('./usersRouter');
const tasksRouter = require('./tasksRouter');
const passwordResetRouter = require('./passwordResetRouter');

module.exports = {
  usersRouter,
  tasksRouter,
  colocsRouter,
  passwordResetRouter
};