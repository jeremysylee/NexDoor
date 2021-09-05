const express = require('express');

const tasks = express.Router();

const tasksController = require('./controller');

tasks
  .get('/', tasksController.getTasks)
  .post('/', tasksController.addTask)
  .put('/:taskId', tasksController.updateTask)
  .delete('/:taskId', tasksController.deleteTask)

  .put('/:taskId/status/:status', tasksController.updateTaskStatus)
  // .put('/status/close/:taskId/:rating', tasksController.closeTask)
  .put('/:taskId/helper/:userId', tasksController.updateTaskHelper)
  .delete('/:taskId/helper', tasksController.deleteTaskHelper);

module.exports = tasks;
