const router = require('express').Router();
const controllers = require('./controllers');

router
  .get('/user/:userId', controllers.getUser)
  .get('/email', controllers.checkForEmail)
  .get('/tasks', controllers.getTasks)
  .get('/tasks/:userId/:range', controllers.getTasksInRange)
  .get('/messages/:taskId', controllers.getMessagesByTask)
  .get('/users/rating/:quantity', controllers.getUsersByRating)
  .post('/user', controllers.addUser)
  .post('/task/new/:userId', controllers.addTaskNewAddress)
  .post('/task/home/:userId', controllers.addTaskHomeAddress)
  .post('/announce/:userId', controllers.addAnnouncement)
  .post('/messages/:taskId/:userId', controllers.addMessage);

// import individual routes
const login = require('./routes/login');
const newuser = require('./routes/newuser');

// route each endpoint
router.use('/login', login);
router.use('/newuser', newuser);

module.exports = router;
