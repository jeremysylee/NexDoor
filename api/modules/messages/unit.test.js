const { getMockReq, getMockRes } = require('@jest-mock/express');
const messagesController = require('./controller');
const messagesService = require('./service');
const db = require('../../db');

const { res, next } = getMockRes();
const req = getMockReq();

describe('Messages Controller', () => {
  beforeAll(() => jest.mock('./service'));

  afterAll(() => jest.restoreAllMocks());

  describe('Add a message', () => {
    it('Calls the add message service', async () => {
      // Arrange
      const addMessageSpy = jest.spyOn(messagesService, 'addMessage').mockImplementation(() => jest.fn());

      // Act
      await messagesController.addMessage(req, res, next);

      // Assert
      expect(addMessageSpy).toBeCalled();
    });
  });

  describe('Get messages', () => {
    it('Calls the getMessagesByTask service', async () => {
      // Arrange
      const getMessagesSpy = jest.spyOn(messagesService, 'getMessagesByTask').mockImplementation(() => jest.fn());

      // Act
      await messagesController.getMessagesByTask(req, res, next);

      // Assert
      expect(getMessagesSpy).toBeCalled();
    });
  });
});

describe('Messages Service', () => {
  describe('Add a Message', () => {
    beforeAll(() => jest.mock('../../db'));
    afterAll(() => { jest.resetAllMocks(); });

    it('Should query the database and should return a message_id DTO', async () => {
      // Arrange
      const params = {
        taskId: 1,
        userId: 1,
      };
      const message = {
        messageBody: 'How are you doing today?',
        date: '2021-07-31',
        time: '23:30:00',
        imgUrl: null,
      };
      const dbSpy = jest.spyOn(db, 'query').mockImplementation(() => ({ messageId: 1 }));

      // Act
      const messageId = await messagesService.addMessage(params, message);

      // Assert
      expect(dbSpy).toBeCalled();
      expect(messageId).toEqual({ messageId: 1 });
    });

    it('Should throw an API error when called with missing messageBody', async () => {
      // arrange
      const params = {
        taskId: 1,
        userId: 1,
      };
      const message = {
        date: '2021-07-31',
        time: '23:30:00',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ messageId: 1 }));

      // act
      const potato = () => { messagesService.addMessage(params, message); };

      // assert
      expect(potato).toThrow('MessageBody / date / time is not defined');
    });
  });
});
