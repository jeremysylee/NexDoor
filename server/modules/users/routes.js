const express = require('express');

const user = express.Router();

const userController = require('./controller');

user
  .get('/info/:userId', userController.getUser)
  .get('/rating/:quantity', userController.getUsersByRating)
  .get('/rangerating/:quantity/:userId/:range', userController.getUsersInRangeByRating)
  // ADD / UPDATE
  .post('/', userController.addUser);
// .put('/user/:userId', userCtrl.updateUser)
// .delete('/user/:userId', userCtrl.deleteUser)

module.exports = user;
