const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/user/:id', controllers.getUser)
  .post('/user', controllers.addUser);

module.exports = router;
