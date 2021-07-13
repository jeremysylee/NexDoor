const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/user/:id', controllers.getUser)
  .get('/email', controllers.checkForEmail)
  .get('/tasks', controllers.getTasks)
  .get('/messages/:taskId', controllers.getMessagesByTask)
  .post('/user', controllers.addUser)
  .post('/task/new/:id', controllers.addTaskNewAddress)
  .post('/task/home/:id', controllers.addTaskHomeAddress)
  .post('/announce/:userId', controllers.addAnnouncement)
  .post('/messages/:taskId/:userId', controllers.addMessage);

// import individual routes
const login = require('./routes/login');
const newuser = require('./routes/newuser');

// route each endpoint
router.use('/login', login);
router.use('/newuser', newuser);

module.exports = router;
