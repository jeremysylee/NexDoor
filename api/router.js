const router = require('express').Router();
const tasks = require('./components/tasks/routes');
const users = require('./components/users/routes');
const messages = require('./components/messages/routes');
const announcements = require('./components/announcements/routes');

router
    .use('/tasks', tasks)
    .use('/users', users)
    .use('/messages', messages)
    .use('/announcements', announcements);

module.exports = router;
