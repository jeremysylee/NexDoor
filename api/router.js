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
    .use('/announcements', announcements)
    .use('/loaderio-1a4211073599720da7419a4e8835d00b', (req, res, next) => {
        res.send('loaderio-1a4211073599720da7419a4e8835d00b');
    })

module.exports = router;
