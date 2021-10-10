// process.env.NODE_ENV = 'test';

const supertest = require('supertest');
const { getMockReq, getMockRes } = require('@jest-mock/express');

const { app, redisClient } = require('../../app');
const usersController = require('./controller');
const usersService = require('./service');
const db = require('../../../db');

const randomizedNums = () => Math.floor(Math.random() * 987654321);

afterAll(() => {
  redisClient.quit();
  db.end();
});

describe('Users API', () => {
  describe('GET /api/users/:userId', () => {
    afterEach(() => jest.restoreAllMocks());
    it('should get users and return 200 status when called with the appropriate inputs', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/users/1');

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject({
        user_id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
        email: expect.any(String),
        karma: expect.any(Number),
        average_rating: expect.any(Number),
        address: expect.any(Object),
      });
    });

    it('should return a 404 status when no user found', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/users/999999999999999999');

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('POST /api/users', () => {
    afterEach(() => jest.restoreAllMocks());
    it('should add a user and return 200 status when called with appropriate inputs', async () => {
      // Arrange
      const body = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighborhood: undefined,
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notA4pa!sword',
        confirm_password: 'notA4pa!sword',
        email: `jimbotester${randomizedNums()}@tester.com`,
        imgUrl: 'www.google.com',
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(200);
    });

    it('should throw an API error and respond with a 404 when password does not meet requirements', async () => {
      // Arrange
      const body = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'aaaaa',
        confirm_password: 'notA4pa!sword',
        email: `jimbotester${randomizedNums()}@tester.com`,
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });

    it('should throw an API error and respond with a 404 when passwords do not match', async () => {
      // Arrange
      const body = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'abdnotA4pa!sword',
        confirm_password: 'notA4pa!sword',
        email: `jimbotester${randomizedNums()}@tester.com`,
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });

    it('should throw an 400 API error when user is not able to be added to db', async () => {
      // Arrange
      const body = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'abdnotA4pa!sword',
        confirm_password: 'notA4pa!sword',
        email: `jimbotesterabc${randomizedNums()}@tester.com`,
      };
      jest.spyOn(db, 'query').mockImplementation({ rows: [] });

      // Act
      const response = await supertest(app)
        .post('/api/users/')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('GET api/users/?sortBy&quantity&userId&range', () => {
    afterEach(() => jest.restoreAllMocks());
    it('Gets users array and returns a 200 status when called with appropriate inputs', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/users/?sortBy=rating&quantity=10&userId=1&range=100');

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body[0]).toMatchObject({
        user_id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
        address_id: expect.any(Number),
      });
    });

    it('throws an API error and returns a 404 when no tasks are found', async () => {
      // Arrange + Act
      const response = await supertest(app)
        .get('/api/users/?sortBy=rating&quantity=10&userId=9921380192839108231&range=100');

      // Assert
      expect(response.statusCode).toEqual(404);
    });
  });

  describe('POST api/users/login', () => {
    afterEach(() => jest.restoreAllMocks());
    it('returns a 200 status and a user DTO', async () => {
      // Arrange
      const body = {
        password: 'notA4pa!sword',
        email: 'jimbotester@tester.com',
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(200);
      expect(response.body).toMatchObject({
        user_id: expect.any(Number),
        firstname: expect.any(String),
        lastname: expect.any(String),
        email: expect.any(String),
        karma: expect.any(Number),
        address: expect.any(Object),
      });
    });

    it('throws an 404 error when the credentials are incorrect (wrong password)', async () => {
      // Arrange
      const body = {
        password: 'thewrongA4pa!sword',
        email: 'jimbotester@tester.com',
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(404);
    });

    it('throws an 404 error when email provided does not exist in the database', async () => {
      // Arrange
      const body = {
        password: 'thewrongA4pa!sword',
        email: `jimbotester${randomizedNums()}@tester${randomizedNums()}.com`,
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(404);
    });

    it('throws an 400 error when no password is provided', async () => {
      // Arrange
      const body = {
        password: undefined,
        email: 'jimbotester@tester.com',
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });

    it('throws an 400 error when no email is provided', async () => {
      // Arrange
      const body = {
        password: 'thewrongA4pa!sword',
        email: undefined,
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });

    it('throws an 400 error when email provided is not an email', async () => {
      // Arrange
      const body = {
        password: 'thewrongA4pa!sword',
        email: 'amazon.com',
      };

      // Act
      const response = await supertest(app)
        .post('/api/users/login')
        .send(body);

      // Assert
      expect(response.statusCode).toEqual(400);
    });
  });

  describe('authenticateSession', () => {
    afterEach(() => jest.restoreAllMocks());
    it('checks for userId in the session and if exists calls the getUser service with the acquired userId', async () => {
      // Arrange
      const req = getMockReq();
      req.session = { userId: 1 };
      const { res, next } = getMockRes();

      // Act
      const getUserSpy = jest.spyOn(usersService, 'getUser');
      await usersController.authenticateSession(req, res, next);

      // Assert
      expect(getUserSpy).toHaveBeenLastCalledWith({
        userId: expect.any(Number),
      });
    });
  });
});
