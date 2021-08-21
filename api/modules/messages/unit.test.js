const { getMockReq, getMockRes } = require('@jest-mock/express');
const messagesController = require('./controller');
const messagesService = require('./service');

const { res, next } = getMockRes();

describe('Messages Controller', () => {
  beforeAll(() => {
    jest.mock(messagesService);
  });

  afterAll(() => {
    jest.resetAllMocks();
  });

  describe('Add a message', () => {
    it('Calls the add message service', async () => {
      // arrange
      const req = getMockReq();
      const addMessageSpy = jest.spyOn(messagesService, 'addMessage').mockImplementation(() => jest.fn());

      // act
      await messagesController.addMessage(req, res, next);

      // assert
      expect(addMessageSpy).toBeCalled();
    });
  });
});
