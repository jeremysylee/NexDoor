process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('../../server');

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
      // Arrange + Act
    })
  })
});