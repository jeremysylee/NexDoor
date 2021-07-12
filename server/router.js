const router = require('express').Router();
const controllers = require('./controllers');

router
  .post('/user', controllers.addUser);

// import individual routes
const login = require('./routes/login');
const newuser = require('./routes/newuser');

// route each endpoint
router.use('/login', login);
router.use('/newuser', newuser);

module.exports = router;
