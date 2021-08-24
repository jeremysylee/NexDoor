const { getMockReq, getMockRes } = require('@jest-mock/express');

const tasksController = require('./controller');
const tasksService = require('./service');
const locationsService = require('../locations/service');
const db = require('../../db');
const ApiError = require('../../errors/apiError');

const req = getMockReq();
const { res, next } = getMockRes();

describe('Tasks Controller', () => {
  describe('Get Tasks', () => {
    afterEach(() => jest.restoreAllMocks());

    it('Calls the get tasks service', async () => {
      // Arrange
      req.params = {
        userId: 1, range: 15, quantity: 15, offset: 0,
      };
      const getTasksServiceSpy = jest.spyOn(tasksService, 'getTasks').mockImplementation(() => jest.fn());

      // Act
      tasksController.getTasks(req, res, next);

      // Assert
      expect(getTasksServiceSpy).toBeCalled();
    });
  });

  describe('Add Task', () => {
    req.params = { userId: 1 };
    req.body = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighborhood: undefined,
      description: 'Can someone watch my dogs for an hour?',
      laborRequired: true,
      category: 'sitting',
      startDate: '2021-08-01',
      endDate: '2021-07-24',
      startTime: '22:35:00',
      duration: null,
      carRequired: false,
    };

    afterEach(() => jest.restoreAllMocks());

    it('Calls the get getAddress, addAddress, and addTask service if address does not exist in the db', async () => {
      // Arrange
      const getAddressSpy = jest.spyOn(locationsService, 'getAddress').mockImplementation(() => (false));
      const addAddressSpy = jest.spyOn(locationsService, 'addAddress').mockImplementation(() => ({ address_id: 1 }));
      const addTasksServiceSpy = jest.spyOn(tasksService, 'addTask').mockImplementation(() => ({ task_id: 1 }));

      // Act
      await tasksController.addTask(req, res, next);

      // Assert
      expect(getAddressSpy).toBeCalled();
      expect(addAddressSpy).toBeCalled();
      expect(addTasksServiceSpy).toBeCalled();
    });

    it('it does not call the addAddress service if address does exist in the db', async () => {
      // Arrange
      const getAddressSpy = jest.spyOn(locationsService, 'getAddress').mockImplementation(() => ({ address_id: 1 }));
      const addAddressSpy = jest.spyOn(locationsService, 'addAddress').mockImplementation(() => ({ address_id: 1 }));
      const addTasksServiceSpy = jest.spyOn(tasksService, 'addTask').mockImplementation(() => ({ task_id: 1 }));

      // Act
      await tasksController.addTask(req, res, next);

      // Assert
      expect(getAddressSpy).toBeCalled();
      expect(addAddressSpy).not.toBeCalled();
      expect(addTasksServiceSpy).toBeCalled();
    });
  });

  describe('Update Task', () => {
    afterEach(() => jest.restoreAllMocks());
    req.params = { userId: 1 };
    req.body = {
      streetAddress: '727 N Broadway',
      city: 'Los Angeles',
      state: 'CA',
      zipcode: '90012',
      neighborhood: undefined,
      description: 'Can someone watch my dogs for an hour?',
      laborRequired: true,
      category: 'sitting',
      startDate: '2021-08-01',
      endDate: '2021-07-24',
      startTime: '22:35:00',
      duration: null,
      carRequired: false,
    };

    it('calls the getAddress, addAddress, and updateTask services if address does not exist in db', async () => {
      // Arrange
      const getAddressSpy = jest.spyOn(locationsService, 'getAddress').mockImplementation(() => (false));
      const addAddressSpy = jest.spyOn(locationsService, 'addAddress').mockImplementation(() => ({ address_id: 1 }));
      const addTasksServiceSpy = jest.spyOn(tasksService, 'updateTask').mockImplementation(() => ({ task_id: 1 }));

      // Act
      await tasksController.updateTask(req, res, next);

      // Assert
      expect(getAddressSpy).toBeCalled();
      expect(addAddressSpy).toBeCalled();
      expect(addTasksServiceSpy).toBeCalled();
    });
  });

  describe('Delete Task', () => {
    afterEach(() => jest.restoreAllMocks());
    req.params = { taskId: 1 };

    it('calls the deleteTask service', async () => {
      // Arrange
      const deleteTasksServiceSpy = jest.spyOn(tasksService, 'deleteTask').mockImplementation(() => 'Deleted task 1 from db');

      // Act
      tasksController.deleteTask(req, res, next);

      // Assert
      expect(deleteTasksServiceSpy).toBeCalled();
    });
  });

  describe('Update Task Status', () => {
    afterEach(() => jest.restoreAllMocks());

    req.params = { status: 'open', taskId: 1 };

    it('calls the updateTaskStatus service', async () => {
      // Arrange
      const updateTaskStatusServiceSpy = jest.spyOn(tasksService, 'updateTaskStatus').mockImplementation(() => 'Status Updated');

      // Act
      await tasksController.updateTaskStatus(req, res, next);

      // Assert
      expect(updateTaskStatusServiceSpy).toBeCalled();
    });
  });

  describe('Update Helper', () => {
    afterEach(() => jest.restoreAllMocks());

    req.params = { taskId: 1, userId: 1 };

    it('calls the updateTaskHelper service', async () => {
      // Arrange
      const updateTaskHelperServiceSpy = jest.spyOn(tasksService, 'updateTaskHelper').mockImplementation(() => 'Helper updated');

      // Act
      await tasksController.updateTaskHelper(req, res, next);

      // Assert
      expect(updateTaskHelperServiceSpy).toBeCalled();
    });
  });
});
