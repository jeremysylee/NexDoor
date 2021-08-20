const { getMockReq, getMockRes } = require('@jest-mock/express');

const db = require('../../db');
const announcementsController = require('./controller');
const announcementsService = require('./service');

const { res, next, clearMockRes } = getMockRes();
const req = getMockReq();

describe('Announcements Controller', () => {
  beforeAll(() => {
    jest.mock('./service');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

  describe('Get announcements', () => {
    it('should call the getAnnouncements service', async () => {
      // Arrange
      const getAnnouncementsSpy = jest.spyOn(announcementsService, 'getAnnouncements');
      req.params.quantity = 25;

      // Act
      await announcementsController.getAnnouncements(req, res, next);

      // Assert
      expect(getAnnouncementsSpy).toBeCalled();
    });
  });

  describe('Add announcements', () => {
    it('should call the addAnnouncement service', async () => {
      // Arrange
      const addAnnouncementSpy = jest.spyOn(announcementsService, 'addAnnouncement');
      req.params.quantity = 25;

      // Act
      await announcementsController.addAnnouncement(req, res, next);

      // Assert
      expect(addAnnouncementSpy).toBeCalled();
    });
  });
});

describe('Announcements Service', () => {
  describe('getAnnouncements service', () => {
    beforeAll(() => {
      jest.mock('../../db');
    });

    afterAll(() => {
      jest.resetAllMocks();
    });

    it('should query the database function and return an announcements array DTO', async () => {
      // Arrange
      const querySpy = jest.spyOn(db, 'query').mockImplementation(() => ({
        rows: [{
          announcement_id: 1,
          user_id: 1,
          message_body: 'hello',
          date: '2021-07-31T10:00:00.000Z',
          time: '23:30:00',
        }],
      }));

      // Act
      const announcementsDTO = await announcementsService.getAnnouncements(15);

      // Assert
      expect(querySpy).toBeCalled();
      expect(announcementsDTO.length).toBeGreaterThan(0);
      expect(announcementsDTO[0]).toEqual({
        announcement_id: expect.any(Number),
        user_id: expect.any(Number),
        message_body: expect.any(String),
        date: expect.any(String),
        time: expect.any(String),
      });
    });
  });

  describe('add announcements service', () => {
    it('should query the database function and return a announcement_id DTO', async () => {
      // Arrange
      const querySpy = jest.spyOn(db, 'query').mockImplementation(() => ({
        rows: [{
          announcement_id: 1,
        }],
      }));
      const announcement = {
        userId: 1,
        announcementBody: 'test',
        date: '2021-07-31T10:00:00.000Z',
        time: '23:30:00',
      };

      // Act
      const announcementsDTO = await announcementsService.addAnnouncement(announcement);

      // Assert
      expect(querySpy).toBeCalled();
      expect(announcementsDTO.length).toBeGreaterThan(0);
      expect(announcementsDTO[0]).toEqual({
        announcement_id: expect.any(Number),
      });
    });
  });
});

afterAll(() => {
  db.end();
});
