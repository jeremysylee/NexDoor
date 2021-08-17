/* eslint-disable indent */
const router = require('express').Router();
const tasks = require('./modules/tasks/routes');
const users = require('./modules/users/routes');
const messages = require('./modules/messages/routes');

const announceCtrl = require('./ctrls/announceCtrl');
const messageCtrl = require('./ctrls/messageCtrl');
const taskCtrl = require('./ctrls/taskCtrl');
const userCtrl = require('./ctrls/userCtrl');

// GET TASK BY TASK ID - May be solveable on front
// look into S3 for photo storage

router
  // ANNOUNCEMENTS---------------------------------------------------
    // GET
    .get('/announce/:quantity', announceCtrl.getAnnouncements)
    // ADD / UPDATE
    .post('/announce/:userId', announceCtrl.addAnnouncement)

    .use('/tasks', tasks)
    .use('/users', users)
    .use('/messages', messages)

  // LOGIN ----------------------------------------------------------
    .get('/credentials/:userId', userCtrl.getUserCredentials)
    .get('/email', userCtrl.checkForEmail)
    .get('/session', userCtrl.authenticateSession);

// import individual routes
const login = require('./routes/login');
const newuser = require('./routes/newuser');

// route each endpoint
router.use('/login', login);
router.use('/newuser', newuser);

module.exports = router;
