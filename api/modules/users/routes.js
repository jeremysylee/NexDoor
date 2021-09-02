const express = require('express');

const user = express.Router();

const usersController = require('./controller');
const userValidator = require('./userValidator');

user
  .get('/:userId', usersController.getUser)
  .post('/', userValidator.newUser, usersController.addUser)
  .get('/rating/:quantity/:userId/:range', usersController.getUsersByRating)
  .post('/login', userValidator.checkEmailAndPassword, usersController.authenticateLogin)
  .get('/:userId/session', usersController.authenticateSession);

module.exports = user;
