const { getMockReq, getMockRes } = require('@jest-mock/express');

const tasksController = require('./controller');
const tasksService = require('./service');
const db = require('../../db');
const ApiError = require('../../errors/apiError');

const req = getMockReq();
const { res, next } = getMockRes();

describe('Tasks Controller', () => {
  describe('Get Tasks', () => {
    // set up mock?**
    afterEach(() => jest.restoreAllMocks());

    it('Calls the get tasks service', async () => {
      // Arrange
      req.params = {
        userId: 1,
        range: 15,
        quantity: 15,
        offset: 0,
      };
      const spyGetTasksMaster = jest.spyOn(tasksService, 'getTasksMaster')
        .mockImplementation(() => jest.fn());

      // Act
      tasksController.getTasksMaster(req, res, next);

      // Assert
      expect(spyGetTasksMaster).toBeCalled();
    });
  });

  describe('Add Task', () => {
    // set up mock?**
    afterEach(() => jest.restoreAllMocks());

    it('Calls the add tasks service', async () => {
      // Arrange
      req.params = {
        userId: 1,
        range: 15,
        quantity: 15,
        offset: 0,
      };
      const spyGetTasksMaster = jest.spyOn(tasksService, 'getTasksMaster')
        .mockImplementation(() => jest.fn());

      // Act
      tasksController.getTasksMaster(req, res, next);

      // Assert
      expect(spyGetTasksMaster).toBeCalled();
    });
  });
});
