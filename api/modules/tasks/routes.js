const express = require('express');

const tasks = express.Router();

const tasksController = require('./controller');

tasks
  .get('/:userId/:range/:quantity/:offset', tasksController.getTasks)
  .post('/:userId', tasksController.addTask)
  .put('/', tasksController.updateTask)
  .delete('/:taskId', tasksController.deleteTask)

  .put('/status/:status/:taskId', tasksController.changeTaskStatus)
  .put('/status/close/:taskId/:rating', tasksController.closeTask)
  .put('/helper/:taskId/:userId', tasksController.updateHelper)
  .delete('/helper/:taskId', tasksController.removeHelper);
  // .post('/new/:userId', tasksController.addTaskNewAddress)
  // .post('/home/:userId', tasksController.addTaskHomeAddress)

module.exports = tasks;
