const router = require('express').Router();
const controllers = require('./controllers');

router
  .post('/user', controllers.addUser);

module.exports = router;
