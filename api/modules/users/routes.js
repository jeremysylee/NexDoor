const express = require('express');

const user = express.Router();

const usersController = require('./controller');
const userValidator = require('./userValidator');

user
  .get('/info/:userId', usersController.getUser)
  .get('/rating/:quantity', usersController.getUsersByRating)
  .get('/rangerating/:quantity/:userId/:range', usersController.getUsersInRangeByRating)
  .get('/session', usersController.authenticateSession)
  .post('/', userValidator.newUser, usersController.addUser)
  .post('/login', userValidator.checkEmailAndPassword, usersController.authenticateLogin);
module.exports = user;
