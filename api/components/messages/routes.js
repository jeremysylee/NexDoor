const express = require('express');

const messages = express.Router();

const messagesController = require('./controller');

messages
  .get('/:taskId', messagesController.getMessagesByTask)
  .post('/:taskId/:userId', messagesController.addMessage);

module.exports = messages;
