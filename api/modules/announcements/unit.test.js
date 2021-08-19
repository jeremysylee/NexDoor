const { getMockReq, getMockRes } = require('@jest-mock/express');

const announcementsController = require('./controller');
const announcementsService = require('./service');

const { res, next, clearMockRes } = getMockRes();
const req = getMockReq();

describe('Controller: announcements', () => {
  beforeAll(() => {
    jest.mock('./service');
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    clearMockRes();
  });

  it('should call the corresponding service', async () => {
    announcementsService.getAnnouncements = jest.fn();
    announcementsService.addAnnouncement = jest.fn();

    req.params.quantity = 25;

    await announcementsController.getAnnouncements(req, res, next);
    await announcementsController.addAnnouncement(req, res, next);

    expect(announcementsService.getAnnouncements).toBeCalled();
    expect(announcementsService.addAnnouncement).toBeCalled();
  });
});

// describe('Service: getAnnouncements', () => {
//   beforeEach(() => {

//   })
// }
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
