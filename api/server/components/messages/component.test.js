process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('../../app');
const db = require('../../../db');

describe('Messages API', () => {
  afterAll(() => {
    redisClient.quit();
    db.end();
  });

  afterEach(() => jest.restoreAllMocks());

  describe('GET /api/messages/:taskId', () => {
    it('should get messages and return a 200 status when called with appropriate inputs', async () => {
      // Arrange: n/a
      const expectedObject = {
        date: expect.any(String),
        firstname: expect.any(String),
        lastname: expect.any(String),
        user_id: expect.any(Number),
        message_body: expect.any(String),
        time: expect.any(String),
        profile_picture_url: expect.any(String),
      };

      // Act
      const response = await supertest(app)
        .get('/api/messages/1');

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body[0]).toEqual(expectedObject);
    });

    it('should return an 404 status if no messages are found', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/messages/9999999999');

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('POST api/messages/:taskId/:userId', () => {
    it('should post a new message and return a 200 status when called with the appropriate inputs', async () => {
      // Arrange
      const message = {
        messageBody: 'How are you doing today?',
        date: '2021-07-31',
        time: '23:30:00',
        imgUrl: null,
      };

      // Act
      const response = await supertest(app)
        .post('/api/messages/1/1')
        .send(message);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toEqual({ message_id: expect.any(Number) });
    });

    it('should return 500 status when called with missing messageBody input', async () => {
      // Arrange
      const message = {
        date: '2021-07-31',
        time: '23:30:00',
        imgUrl: null,
      };

      // Act
      const response = await supertest(app)
        .post('/api/messages/1/1')
        .send(message);

      // Assert
      expect(response.statusCode).toEqual(400);
    });
  });
});
