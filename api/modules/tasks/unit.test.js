process.env.NODE_ENV = 'test';

const { getMockReq, getMockRes } = require('@jest-mock/express');

const tasksController = require('./controller');
const tasksService = require('./service');
const locationsService = require('../locations/service');
const db = require('../../db');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/apiError');

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

describe('Tasks Service', () => {
  describe('getTasks', () => {
    afterEach(() => jest.resetAllMocks());

    it('queries the db and returns a tasks array DTO', async () => {
      // Arrange
      const params = {
        userId: 1,
        range: 15,
        quantity: 20,
        offset: 0,
      };
      const tasksResponseObj = {
        rows: [{
          task_id: 1,
          requester: {},
          helper: {},
          address: {},
          description: 'help me with life',
        }],
      };
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => tasksResponseObj);

      // Act
      const tasksDTO = await tasksService.getTasks(params);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(tasksDTO[0]).toEqual({
        task_id: expect.any(Number),
        requester: expect.any(Object),
        helper: expect.any(Object),
        address: expect.any(Object),
        description: expect.any(String),
      });
    });

    it('throws an API error if no tasks are found', async () => {
      // Arrange
      const params = {
        userId: 1,
        range: 15,
        quantity: 20,
        offset: 0,
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [] }));

      // Act
      const getTasksService = (() => tasksService.getTasks(params));

      // Assert
      expect(getTasksService).rejects.toThrow(new ApiError('No tasks found', httpStatusCodes.NOT_FOUND));
    });

    it('throws an API error if parameters are missing (userId)', async () => {
      // Arrange
      const paramsNoUserId = {
        userId: undefined,
        range: 15,
        quantity: 20,
        offset: 0,
      };

      // Act
      const getTasksService = (() => tasksService.getTasks(paramsNoUserId));

      // Assert
      await expect(getTasksService).rejects.toThrow(new ApiError('Undefined params (userId || range || quantity)', httpStatusCodes.BAD_REQUEST));
    });
  });

  describe('addTasks', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns an taskId DTO on success', async () => {
      // Arrange
      const input = {
        userId: 1,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const addressId = 1;
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ task_id: 1 }] }));

      // Act
      const taskIdDTO = await tasksService.addTask(input, addressId);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(taskIdDTO).toEqual({ task_id: 1 });
    });

    it('throws an API error when called with missing inputs', async () => {
      // Arrange
      const inputNoUserId = {
        userId: undefined,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const addressId = 1;

      // Act
      const addTaskService = (() => tasksService.addTask(inputNoUserId, addressId));

      // Assert
      await expect(addTaskService).rejects.toThrow(new ApiError('Undefined parameters', httpStatusCodes.BAD_REQUEST));
    });

    it('throws an 500 internal API error when called with missing addressId', async () => {
      // Arrange
      const inputNoAddressId = {
        userId: 1,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };

      // Act
      const addTaskService = (() => tasksService.addTask(inputNoAddressId));

      // Assert
      await expect(addTaskService).rejects.toThrow(new ApiError('addressId undefined', httpStatusCodes.BAD_REQUEST));
    });
  });

  describe('updateTask', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a taskId DTO', async () => {
      // Arrange
      const task = {
        taskId: 1,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const addressId = 1;
      jest.spyOn(db, 'query').mockImplementation(() => ({ task_id: 1 }));

      // Act
      const taskIdDTO = await tasksService.updateTask(task, addressId);

      // Assert
      expect(taskIdDTO).toEqual({ task_id: expect.any(Number) });
    });

    it('throws an API error if params not passed in correctly when called (description)', async () => {
      // Arrange
      const taskNoDescription = {
        taskId: 1,
        description: undefined,
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const addressId = 1;

      // Act
      const updateTaskService = (() => tasksService.updateTask(taskNoDescription, addressId));

      // Assert
      await expect(updateTaskService).rejects.toThrow(new ApiError('Error updating task, parameters undefined', httpStatusCodes.BAD_REQUEST));
    });

    it('throws an 500 internal API error when called with missing addressId', async () => {
      // Arrange
      const updateTaskObjNoDescription = {
        taskId: 1,
        addressId: undefined,
        description: 'Help sit my dogs!',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };

      // Act
      const updateTaskService = (() => tasksService.updateTask(updateTaskObjNoDescription));

      // Assert
      await expect(updateTaskService).rejects.toThrow(new ApiError('Error updating task, addressId undefined. Check google api', httpStatusCodes.BAD_REQUEST));
    });
  });

  describe('deleteTask', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a taskId DTO', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => jest.fn());

      // Act
      const taskIdDTO = await tasksService.deleteTask({ taskId: 1 });

      // Assert
      expect(taskIdDTO).toEqual({ task_id: 1 });
    });
  });

  describe('updateTaskStatus', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a taskId DTO', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => jest.fn());

      // Act
      const taskIdDTO = await await tasksService.updateTaskStatus({ taskId: 1, status: 'open' });

      // Assert
      expect(taskIdDTO).toEqual({ task_id: 1 });
    });
  });

  describe('updateTaskHelper', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a taskId DTO', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => jest.fn());

      // Act
      const taskIdDTO = await tasksService.updateTaskHelper({ taskId: 1, userId: 1 });

      // Assert
      expect(taskIdDTO).toEqual({ task_id: 1 });
    });
  });

  describe('deleteTaskHelper', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a taskId DTO', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => jest.fn());

      // Act
      const taskIdDTO = await tasksService.deleteTaskHelper({ taskId: 1 });

      // Assert
      expect(taskIdDTO).toEqual({ task_id: 1 });
    });
  });
});
