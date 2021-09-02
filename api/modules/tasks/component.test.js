process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('../../app');
const locationsController = require('../locations/controller');
const db = require('../../db');

let testTaskIdToDelete;

describe('Tasks API', () => {
  afterAll(async () => {
    redisClient.quit();
    db.end();
  });

  describe('GET tasks/:userId/:range/:quantity/:offset', () => {
    it('should get tasks and return 200 status when called with the appropriate inputs', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/tasks/1/1500/10/0');

      // Assert
      expect(response.statusCode).toEqual(200);
    });

    it('should return a tasks array shaped accordingly', async () => {
      // Arrange
      const expectedObjectShape = {
        task_id: expect.any(Number),
        requester: expect.any(Object),
        location: expect.any(Object),
        description: expect.any(String),
        category: expect.any(String),
        status: expect.any(String),
        start_time: expect.any(String),
        start_date: expect.any(String),
        end_date: expect.any(String),
        physical_labor_required: expect.any(String),
        helper: expect.any(Object),
        timestamp_requested: expect.any(String),
      };

      // Act
      const response = await supertest(app)
        .get('/api/tasks/1/1500/10/0');

      // Assert
      expect(response.body.requested[0]).toMatchObject(expectedObjectShape);
      expect(response.body.helper[0]).toMatchObject(expectedObjectShape);
      expect(response.body.allothers[0]).toMatchObject(expectedObjectShape);
    });

    it('should get return a 404 status wheno tasks are found', async () => {
      // Act + Arrange
      const response = await supertest(app)
        .get('/api/tasks/999999999992342342/0/10/0');
      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('POST /api/tasks/:userId', () => {
    it('Should add a task and return 200 status when called with the appropriate parameters', async () => {
      // Arrange
      const body = {
        addressId: undefined,
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
      jest.spyOn(locationsController, 'getAddressOrAdd').mockImplementation(() => ({ addressId: 1 }));

      // Act
      const response = await supertest(app)
        .post('/api/tasks/1')
        .send(body);
      testTaskIdToDelete = response.body.task_id;

      // Assert
      expect(response.statusCode).toEqual(200);
    });

    it('Should add a task and return 200 status when called an addressId instead of an address', async () => {
      // Arrange
      const body = {
        addressId: 1,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const getAddressorAdd = jest.spyOn(locationsController, 'getAddressOrAdd');

      // Act
      const response = await supertest(app)
        .post('/api/tasks/1')
        .send(body);
      testTaskIdToDelete = response.body.task_id;

      // Assert
      expect(getAddressorAdd).not.toBeCalled();
      expect(response.statusCode).toEqual(200);
    });

    it('Should throw an API error and return 500 status if locationsService is down', async () => {
      // Arrange
      const body = {
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
      jest.spyOn(locationsController, 'getAddressOrAdd').mockImplementation(() => (null));

      // Act
      const response = await supertest(app)
        .post('/api/tasks/1')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(500);
    });
  });

  describe('PUT /:taskId', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should update a task and return a 200 status if called with the proper parameters with existing address', async () => {
      // Arrange
      const body = {
        addressId: undefined,
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
      jest.spyOn(locationsController, 'getAddressOrAdd').mockImplementation(() => ({ addressId: 1 }));

      // Act
      const response = await supertest(app)
        .put('/api/tasks/1')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(200);
    });

    it('Should update a task and return a 200 status if called an addressID instead of an address', async () => {
      // Arrange
      const body = {
        addressId: 1,
        description: 'Can someone watch my dogs for an hour?',
        laborRequired: true,
        category: 'sitting',
        startDate: '2021-08-01',
        endDate: '2021-07-24',
        startTime: '22:35:00',
        duration: null,
        carRequired: false,
      };
      const getAddresOrAddSpy = jest.spyOn(locationsController, 'getAddressOrAdd');

      // Act
      const response = await supertest(app)
        .put('/api/tasks/1')
        .send(body);

      // Assert
      expect(getAddresOrAddSpy).not.toBeCalled();
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('DELETE /:taskId', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should delete a task and return a 200 status if called with the proper parameters', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .delete(`/api/tasks/${testTaskIdToDelete}`);

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('PUT /:taskId/status', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should update a task status and return a 200 status if called with the proper parameters', async () => {
      // Arrange
      const statusArr = ['Active', 'Open', 'Pending'];
      const randomIndex = Math.floor(Math.random() * 2 + 1);

      // Act
      const response = await supertest(app)
        .put(`/api/tasks/1/status/${statusArr[randomIndex]}`);

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('PUT /:taskId/helper/:userId', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should update a task helper to the current user and return a 200 status if called with the proper params', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .put('/api/tasks/1/helper/1');

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('DELETE /:taskId/helper/', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should delete the task helper and return a 200 status if called with the proper params', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .delete('/api/tasks/1/helper');

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });
});
