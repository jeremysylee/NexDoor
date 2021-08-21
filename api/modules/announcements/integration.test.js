const supertest = require('supertest');

const { app, redisClient } = require('../../server');

const db = require('../../db');

describe('Announcements API', () => {
  afterAll(async () => {
    redisClient.quit();
    db.end();
  });
  describe('GET Announcements', () => {
    it('should get announcements and return 200 status when called with the appropriate inputs', async () => {
      // Arrange

      // Act
      const response = await supertest(app)
        .get('/api/announcements/1');

      // Assert
      expect(response.statusCode).toEqual(200);
    });
  });

  describe('POST Announcements', () => {
    it('should add an announcement and return 200 status when called with the appropriate inputs', async () => {
      // Arrange
      const body = {
        announcementBody: 'My house is on fire! Please help!',
        date: '2021-07-31',
        time: '23:30:00',
      };

      // Act
      const res = await supertest(app)
        .post('/api/announcements/1')
        .send(body);

      // Assert
      expect(res.statusCode).toEqual(200);
    });

    it('should return an API error when called with empty announcement body', async () => {
      // Arrange
      const body = {
        date: '2021-07-31',
        time: '23:30:00',
      };

      // Act
      const res = await supertest(app)
        .post('/api/announcements/1')
        .send(body);

      // Assert
      expect(res.statusCode).toEqual(400);
    });
  });
});
