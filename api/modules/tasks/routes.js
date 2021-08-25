const express = require('express');

const tasks = express.Router();

const tasksController = require('./controller');

tasks
  .get('/:userId/:range/:quantity/:offset', tasksController.getTasks)
  .post('/:userId', tasksController.addTask)
  .put('/', tasksController.updateTask)
  .delete('/:taskId', tasksController.deleteTask)

  .put('/status/:status/:taskId', tasksController.updateTaskStatus)
  // .put('/status/close/:taskId/:rating', tasksController.closeTask)
  .put('/helper/:taskId/:userId', tasksController.updateTaskHelper)
  .delete('/helper/:taskId', tasksController.deleteTaskHelper);

module.exports = tasks;
