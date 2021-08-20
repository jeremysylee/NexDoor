const { getMockReq, getMockRes } = require('@jest-mock/express');
const { createResponse } = require('node-mocks-http');
const announcementsController = require('./controller');
const announcementsService = require('./service');

const { next, clearMockRes } = getMockRes();
const req = getMockReq();
const res = createResponse();

describe('Announcements Component', () => {
  beforeEach(() => {
    clearMockRes();
  });
  describe('Get Announcements', () => {
    it('should get announcements and return 200 status when called with the appropriate inputs', async () => {
      req.params.quantity = 15;
      await announcementsController.getAnnouncements(req, res, next);
      console.log(res.status);
      expect(res.status).toEqual(200);
    });
  });
});
