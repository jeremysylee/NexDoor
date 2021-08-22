const express = require('express');

const tasks = express.Router();

const tasksController = require('./controller');

tasks
  .get('/master/:userId/:range/:quantity/:offset', tasksController.getTasksMaster)
  .get('/range/:userId/:range', tasksController.getTasksInRange)
  .get('/alt/:range', tasksController.getTasksInRangeAltAddress)

  .put('/help/:taskId/:userId', tasksController.updateHelper)
  .put('/rmhelp/:taskId', tasksController.removeHelper)
  .put('/change/:status/:taskId', tasksController.changeTaskStatus)
  .put('/close/:taskId/:rating', tasksController.closeTask)
  .put('/edit', tasksController.editTask)
  .post('/check/:userId', tasksController.addTaskCheckAddress)
  .post('/new/:userId', tasksController.addTaskNewAddress)
  .post('/home/:userId', tasksController.addTaskHomeAddress)
  .delete('/:taskId', tasksController.deleteTask);

module.exports = tasks;
