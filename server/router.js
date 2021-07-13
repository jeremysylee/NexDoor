const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/user/:id', controllers.getUser)
  .get('/email', controllers.checkForEmail)
  .post('/user', controllers.addUser)
  .post('/task/new/:id', controllers.addTaskNewAddress)
  .post('/task/home/:id', controllers.addTaskHomeAddress);

module.exports = router;
