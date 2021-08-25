process.env.NODE_ENV = 'test';

const supertest = require('supertest');

const { app, redisClient } = require('../../server');

const db = require('../../db');

describe('Tasks API', () => {
  afterAll(async () => {
    redisClient.quit();
    db.end();
  });

  describe('GET Tasks', () => {
    it('should get tasks and return 200 status when called with the approrpiate inputs', async () => {

    });
  });
});