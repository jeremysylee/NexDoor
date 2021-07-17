/* eslint-disable indent */
const router = require('express').Router();
const announceCtrl = require('./controllers/announceCtrl');
const messageCtrl = require('./controllers/messageCtrl');
const taskCtrl = require('./controllers/taskCtrl');
const userCtrl = require('./controllers/userCtrl');

// GET TASK BY TASK ID - May be solveable on front
// look into S3 for photo storage

router
  // ANNOUNCEMENTS---------------------------------------------------
    // GET
    .get('/announce/:quantity', announceCtrl.getAnnouncements)
    // ADD / UPDATE
    .post('/announce/:userId', announceCtrl.addAnnouncement)
  // MESSAGES--------------------------------------------------------
    // GET
    .get('/messages/:taskId', messageCtrl.getMessagesByTask)
    // ADD / UPDATE
    .post('/messages/:taskId/:userId', messageCtrl.addMessage)
  // TASKS-----------------------------------------------------------
    // GET
    // .get('/taskobj', taskCtrl.getOneTask)
    // .get('/tasks/user/:userId', taskCtrl, getTasksByUser)
    .get('/tasks/master/:userId/:range/:quantity/:offset', taskCtrl.getTasksMasterDefaultAddress)
    .get('/tasks/altmaster/:userId/:range/:quantity/:offset', taskCtrl.getTasksMasterAltAddress)
    .get('/tasks/all/:userId/:quantity/:offset', taskCtrl.getTasks)
    .get('/tasks/req/:userId', taskCtrl.getReqTasksByUser)
    .get('/tasks/help/:userId', taskCtrl.getHelpTasksByUser)
    .get('/tasks/range/:userId/:range', taskCtrl.getTasksInRange)
    .get('/tasks/alt/:range', taskCtrl.getTasksInRangeAltAddress)
    // ADD / UPDATE
    .put('/task/help/:taskId/:userId', taskCtrl.updateHelper)
    .put('/task/rmhelp/:taskId', taskCtrl.removeHelper)
    .put('/task/change/:status/:taskId', taskCtrl.changeTaskStatus)
    .put('/task/close/:taskId/:rating', taskCtrl.closeTask)
    .put('/task/edit', taskCtrl.editTask)
    // .put('/task/conf/:taskId', taskCtrl.confirmTask)
    .post('/task/check/:userId', taskCtrl.addTaskCheckAddress)
    .post('/task/new/:userId', taskCtrl.addTaskNewAddress)
    .post('/task/home/:userId', taskCtrl.addTaskHomeAddress)
    // .put('/task/:taskId', taskCtrl.updateTask)
    .delete('/task/:taskId', taskCtrl.deleteTask)
  // USERS----------------------------------------------------------
    // GET
    .get('/user/info/:userId', userCtrl.getUser)
    .get('/users/rating/:quantity', userCtrl.getUsersByRating)
    // ADD / UPDATE
    .post('/user', userCtrl.addUser)
    // .put('/user/:userId', userCtrl.updateUser)
    // .delete('/user/:userId', userCtrl.deleteUser)
  // LOGIN ----------------------------------------------------------
    .get('/credentials/:userId', userCtrl.getUserCredentials)
    .get('/email', userCtrl.checkForEmail);

// import individual routes
const login = require('./routes/login');
const newuser = require('./routes/newuser');

// route each endpoint
router.use('/login', login);
router.use('/newuser', newuser);

module.exports = router;
