const { getMockReq, getMockRes } = require('@jest-mock/express');

const db = require('../../db');
const announcementsController = require('./controller');
const announcementsService = require('./service');

const { res, next, clearMockRes } = getMockRes();
const req = getMockReq();

describe('Controller: announcements', () => {
  beforeAll(() => {
    jest.mock('./service');
  });

  afterAll(() => {
    jest.restoreAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

  it('should call the corresponding service', async () => {
    const getAnnouncementsSpy = jest.spyOn(announcementsService, 'getAnnouncements');
    const addAnnouncementSpy = jest.spyOn(announcementsService, 'addAnnouncement');
    // const mockAddAnnouncement = jest.fn();
    // announcementsService.getAnnouncements = mockGetAnnouncements;
    // announcementsService.addAnnouncement = mockAddAnnouncement;
    // console.log(mockGetAnnouncements, mockAddAnnouncement);
    // announcementsService.getAnnouncements = jest.fn();
    // announcementsService.addAnnouncement = jest.fn();

    req.params.quantity = 25;

    await announcementsController.getAnnouncements(req, res, next);
    await announcementsController.addAnnouncement(req, res, next);

    expect(getAnnouncementsSpy).toBeCalled();
    expect(addAnnouncementSpy).toBeCalled();
  });
});

describe('Service: getAnnouncements', () => {
  beforeAll(() => {
    jest.mock('../../db');
  });
  it('should query the database function', async () => {
    const querySpy = jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ announcement_id: 1 }, {}] }));
    const announcementsDTO = await announcementsService.getAnnouncements(15);

    expect(querySpy).toBeCalled();
    expect(announcementsDTO[0]).toHaveProperty('announcement_id', 'potato', 'user_id', 'message_body', 'date', 'time', 'potato', ' junglejuice');
    expect(announcementsDTO[0].announcement_id).toEqual(1);
  });
});

afterAll(() => {
  jest.resetAllMocks();
  db.end();
});

// test('should 200 and return correct value', async () => {
//   // test
//   jest.mock('./service');
//   const mockService = require('./service');
//   mockService.getAnnouncements(() => jest.fn());
//   // endtest

//   const req = getMockReq();
//   req.params.quantity = 25;

//   await announcementsController.getAnnouncements(req, res, next);

//   expect(res.send).toHaveBeenCalled();
//   expect(mockService.getAnnouncements).toHaveBeenCalled();
// });