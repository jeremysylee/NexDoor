const express = require('express');

const user = express.Router();

const usersController = require('./controller');
const userValidator = require('./userValidator');

user
  .get('/', usersController.getUsers)
  .get('/:userId', usersController.getUser)
  .post('/', userValidator.newUser, usersController.addUser)
  .post('/login', userValidator.checkEmailAndPassword, usersController.authenticateLogin)
  .get('/:userId/session', usersController.authenticateSession);

module.exports = user;
