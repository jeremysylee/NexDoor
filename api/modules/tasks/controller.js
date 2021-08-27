/* eslint-disable spaced-comment */
/* eslint-disable max-len */
// const getCoordinates = require('./coordinates');
const tasksService = require('./service');
const locationsService = require('../locations/service');

const taskControllers = {
  getTasks: async (req, res, next) => {
    const params = {
      userId: req.params.userId,
      range: req.params.range,
      quantity: req.params.quantity,
      offset: req.params.offset,
    };
    try {
      const tasks = await tasksService.getTasks(params);
      res.status(200).send(tasks);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  addTask: async (req, res, next) => {
    const task = {
      userId: req.params.userId,
      addressId: req.body.addressId,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      description: req.body.description,
      laborRequired: req.body.laborRequired,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      duration: req.body.duration,
      carRequired: req.body.carRequired,
    };
    try {
      let addressIdDTO = { addressId: task.addressId || false };
      if (!addressIdDTO.addressId) {
        addressIdDTO = await locationsService.getAddress(task);
        if (!addressIdDTO.addressId) {
          addressIdDTO = await locationsService.addAddress(task);
        }
      }
      const taskId = await tasksService.addTask(task, addressIdDTO.addressId);
      console.log(taskId, '<><><><><><>');
      res.status(200).send(taskId);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  updateTask: async (req, res, next) => {
    const task = {
      addressId: req.body.addressId,
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      description: req.body.description,
      carRequired: req.body.carRequired,
      laborRequired: req.body.laborRequired,
      category: req.body.category,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      startTime: req.body.startTime,
      duration: req.body.duration,
      taskId: req.params.taskId,
    };
    try {
      let addressIdDTO = { addressId: task.addressId || false };
      if (!addressIdDTO.addressId) {
        addressIdDTO = await locationsService.getAddress(task);
        if (!addressIdDTO.addressId) {
          addressIdDTO = await locationsService.addAddress(task);
        }
      }
      const taskIdDTO = await tasksService.updateTask(task, addressIdDTO.addressId);
      res.status(200).send(`Task ${taskIdDTO.task_id} has been updated`);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  deleteTask: async (req, res, next) => {
    const taskId = { taskId: req.params.taskId };
    try {
      const taskIdDTO = await tasksService.deleteTask(taskId);
      res.status(200).send(`Task ${taskIdDTO.task_id} has been deleted`);
    } catch (err) {
      next(err);
    }
  },

  updateTaskStatus: async (req, res, next) => {
    const params = {
      taskId: req.params.taskId,
      status: req.params.status,
    };
    try {
      const taskIdDTO = await tasksService.updateTaskStatus(params);
      res.status(200).send(`Task ${taskIdDTO.task_id} status changed to ${params.status}`);
    } catch (err) {
      next(err);
    }
  },

  updateTaskHelper: async (req, res, next) => {
    const params = {
      userId: req.params.userId,
      taskId: req.params.taskId,
    };
    try {
      const taskIdDTO = await tasksService.updateTaskHelper(params);
      res.status(200).send(`Added helper to task ${taskIdDTO.task_id}`);
    } catch (err) {
      next(err);
    }
  },

  deleteTaskHelper: async (req, res, next) => {
    const taskId = { taskId: req.params.taskId };
    try {
      const success = await tasksService.deleteTaskHelper(taskId);
      res.status(200).send(success);
    } catch (err) {
      next(err);
    }
  },

  // *************************************************************
  // closeTask: async (req, res, next) => {
  //   const { rating } = req.params;
  //   const { review } = req.body;
  //   try {
  //     const success = await tasksService.closeTask(rating, review);
  //     res.status(200).send(success);
  //   } catch (err) {
  //     next(err);
  //   }
  // },
};

module.exports = taskControllers;
