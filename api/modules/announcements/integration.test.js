const { getMockReq, getMockRes } = require('@jest-mock/express');
const express = require('express');
const { createResponse } = require('node-mocks-http');
const request = require('supertest');
const { app, redisClient } = require('../../server');

describe('Announcements API', () => {
  describe('Get Announcements', () => {
    afterAll(() => {
      redisClient.quit();
    });
    it('should get announcements and return 200 status when called with the appropriate inputs', async () => {
      // Arrange

      // Act
      await request(app)
        .get('/api/announcements/15')
        .expect(200)
        .then((response) => {
          expect(response.body).toEqual(1);
        });

      // Assert
      // expect(response).toEqual({});
      // expect(response.statusCode).toEqual(201);
    });
  });
});
