process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('../../server');

const locationsService = require('../locations/service');
const db = require('../../db');

describe('Tasks API', () => {
  afterAll(async () => {
    redisClient.quit();
    db.end();
  });

  describe('GET tasks/:userId/:range/:quantity/:offset', () => {
    it('should get tasks and return 200 status when called with the approrpiate inputs', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/tasks/1/15/10/0');

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
        .get('/api/tasks/1/15/10/0');

      // Assert
      expect(response.body[0].requested[0]).toMatchObject(expectedObjectShape);
      expect(response.body[0].helper[0]).toMatchObject(expectedObjectShape);
      expect(response.body[0].allothers[0]).toMatchObject(expectedObjectShape);
    });

    it('should throw an API error when called with incorrect parameters (taskId)', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/tasks/99999999999999999999/15/10/0');

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('POST tasks/:userId', () => {
    it('Should add a task and return 200 status when called with the appropriate parameters', async () => {
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
      jest.spyOn(locationsService, 'getAddress').mockImplementation(() => ({ address_id: 1 }));

      // Act
      const response = await supertest(app)
        .post('/api/tasks/1')
        .send(body);

      // Assert
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
      jest.spyOn(locationsService, 'getAddress').mockImplementation(() => (null));
      jest.spyOn(locationsService, 'addAddress').mockImplementation(() => (null));

      // Act
      const response = await supertest(app)
        .post('/api/tasks/1')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(500);
    });
  });

  describe('updateTask', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Should update a task and return a 200 status if called with the proper parameters', async () => {
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
    });
  });
});
