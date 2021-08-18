/* eslint-disable indent */
const router = require('express').Router();
const tasks = require('./modules/tasks/routes');
const users = require('./modules/users/routes');
const messages = require('./modules/messages/routes');
const announcements = require('./modules/announcements/routes');

router
    .use('/tasks', tasks)
    .use('/users', users)
    .use('/messages', messages)
    .use('/announcements', announcements);

module.exports = router;
