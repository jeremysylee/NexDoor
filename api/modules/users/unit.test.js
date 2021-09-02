process.env.NODE_ENV = 'test';

const bcrypt = require('bcrypt');
const { getMockReq, getMockRes } = require('@jest-mock/express');

const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');
const usersController = require('./controller');
const usersService = require('./service');
const db = require('../../db');
const locationsService = require('../locations/service');
const locationsController = require('../locations/controller');

const { res, next } = getMockRes();

describe('Users Controller', () => {
  describe('addUser', () => {
    afterEach(() => jest.restoreAllMocks());
    it('calls get email service, calls the getAddress service then the addUser service when address exists', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighborhood: undefined,
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      const checkForEmailSpy = jest.spyOn(usersService, 'checkForEmail')
        .mockImplementation(() => false);
      const getAddressOrAddSpy = jest.spyOn(locationsController, 'getAddresOrAdd')
        .mockImplementation(() => ({ addressId: 1 }));
      const addUserServiceSpy = jest.spyOn(usersService, 'addUser')
        .mockImplementation(() => ({ user_id: 1 }));

      // Act
      await usersController.addUser(req, res, next);

      // Assert
      expect(checkForEmailSpy).toBeCalled();
      expect(getAddressOrAddSpy).toBeCalled();
      expect(addUserServiceSpy).toBeCalled();
    });

    it('calls the getAddress service , addAddress service, then the addUser service when address does not exists', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighborhood: undefined,
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      const checkForEmailSpy = jest.spyOn(usersService, 'checkForEmail')
        .mockImplementation(() => false);
      const getAddressOrAddSpy = jest.spyOn(locationsController, 'getAddressOrAdd')
        .mockImplementation(() => false);
      const addUserServiceSpy = jest.spyOn(usersService, 'addUser')
        .mockImplementation(() => ({ user_id: 1 }));

      // Act
      await usersController.addUser(req, res, next);

      // Assert
      expect(checkForEmailSpy).toBeCalled();
      expect(getAddressOrAddSpy).toBeCalled();
      expect(addUserServiceSpy).toBeCalled();
    });

    it('throws an error and does not getAddressOrAdd or addUser if email already exists', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighborhood: undefined,
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      const checkForEmailSpy = jest.spyOn(usersService, 'checkForEmail')
        .mockImplementation(() => ({ userId: 1, password: 'notpassword' }));
      const getAddressOrAddSpy = jest.spyOn(locationsController, 'getAddressOrAdd')
        .mockImplementation(() => false);
      const addUserServiceSpy = jest.spyOn(usersService, 'addUser')
        .mockImplementation(() => ({ user_id: 1 }));

      // Act
      await usersController.addUser(req, res, next);

      // Assert
      expect(checkForEmailSpy).toBeCalled();
      expect(getAddressOrAddSpy).not.toBeCalled();
      expect(addUserServiceSpy).not.toBeCalled();
    });

    it('sends error to middleware if error thrown', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        streetAddress: '727 N Broadway',
        city: 'Los Angeles',
        state: 'CA',
        zipcode: '90012',
        neighborhood: undefined,
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      jest.spyOn(usersService, 'checkForEmail')
        .mockImplementation(() => false);
      jest.spyOn(usersService, 'addUser')
        .mockImplementation(() => ({ user_id: 1 }));
      jest.spyOn(locationsService, 'getAddress')
        .mockImplementation(() => false);
      jest.spyOn(locationsService, 'addAddress')
        .mockImplementation(() => { throw new ApiError('Error adding user', httpStatusCodes.INTERNAL_SERVER); });

      // Act
      await usersController.addUser(req, res, next);

      // Assert
      expect(next).toBeCalled();
    });
  });

  describe('getUser', () => {
    afterEach(() => jest.restoreAllMocks());
    it('calles the getUser service', async () => {
      // Arrange
      const req = getMockReq();
      req.params = { userId: 1 };

      const responseUserDTO = {
        user_id: 1,
        firstname: 'BillyBob',
        lastname: 'Testaker',
        email: 'testaker@tester.com',
        karma: 150,
        avg_rating: 4.3,
        profile_picture_url: 'google.com',
        address: {},
      };
      const getUserServiceSpy = jest.spyOn(usersService, 'getUser')
        .mockImplementation(() => responseUserDTO);

      // Act
      await usersController.getUser(req, res, next);

      // Assert
      expect(getUserServiceSpy).toBeCalled();
    });
  });

  describe('authenticateLogin', () => {
    it('calls the authenticateLogin service, calls session.save and calls the getLogin service', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        email: 'testaker@tester.com',
        password: 'notpassword',
      };
      jest.spyOn(usersService, 'checkForEmail').mockImplementation(() => ({ userId: 1, password: 'notpassword' }));
      const authenticateLoginServiceSpy = jest.spyOn(usersService, 'authenticateLogin')
        .mockImplementation(() => true);
      const getUserServiceSpy = jest.spyOn(usersService, 'getUser')
        .mockImplementation(() => {});
      req.session = {
        save: jest.fn(),
        destroy: jest.fn(),
      };
      const sessionFunctions = req.session;
      const destroySpy = jest.spyOn(sessionFunctions, 'destroy');
      const saveSpy = jest.spyOn(sessionFunctions, 'save');

      // Act
      await usersController.authenticateLogin(req, res, next);

      // Assert
      expect(authenticateLoginServiceSpy).toBeCalled();
      expect(getUserServiceSpy).toBeCalled();
      expect(saveSpy).toBeCalled();
      expect(destroySpy).not.toBeCalled();
    });

    it('saves user_id to the req.session object', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        email: 'testaker@tester.com',
        password: 'notpassword',
      };
      jest.spyOn(usersService, 'checkForEmail').mockImplementation(() => ({ userId: 1, password: 'notpassword' }));
      jest.spyOn(usersService, 'authenticateLogin').mockImplementation(() => true);
      jest.spyOn(usersService, 'getUser').mockImplementation(() => {});
      req.session = {
        destroy: jest.fn(),
      };

      // Act
      await usersController.authenticateLogin(req, res, next);

      // Assert
      expect(req.session.userId).toEqual(1);
    });

    it('destroys the session if unable to authenticate login', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        email: 'testaker@tester.com',
        password: 'notpassworddd',
      };
      jest.spyOn(usersService, 'checkForEmail').mockImplementation(() => ({ userId: 1, password: 'notpassword' }));
      jest.spyOn(usersService, 'authenticateLogin')
        .mockImplementation(() => { throw new ApiError('error: password does not match', httpStatusCodes.NOT_FOUND); });
      jest.spyOn(usersService, 'getUser').mockImplementation(() => {});
      req.session = {
        save: jest.fn(),
        destroy: jest.fn(),
      };

      // Act
      await usersController.authenticateLogin(req, res, next);

      // Assert
      expect(req.session.destroy).toBeCalled();
    });

    it('checks for email in db before authenticating', async () => {
      // Arrange
      const req = getMockReq();
      req.params = {
        email: 'testaker@tester.com',
        password: 'notpassworddd',
      };
      const checkForEmailServiceSpy = jest.spyOn(usersService, 'checkForEmail')
        .mockImplementation(() => ({ rows: [{ userId: 1, password: 'potato' }] }));
      const authenticateLoginServiceSpy = jest.spyOn(usersService, 'authenticateLogin').mockImplementation(() => {});
      req.session = {
        save: jest.fn(),
        destroy: jest.fn(),
      };

      // Act
      await usersController.authenticateLogin(req, res, next);

      // Assert
      expect(checkForEmailServiceSpy).toBeCalled();
      expect(authenticateLoginServiceSpy).toBeCalled();
    });
  });

  describe('authenticateSession', () => {
    afterEach(() => jest.restoreAllMocks());
    it('calls the authenticateSession service and the getUser Service if session exists', async () => {
      // Arrange
      const req = getMockReq();
      req.session = { userId: 1 };
      const authenticateSessionServiceSpy = jest.spyOn(usersService, 'authenticateSession')
        .mockImplementation(() => ({ userId: 1 }));
      const getUserServiceSpy = jest.spyOn(usersService, 'getUser').mockImplementation({});

      // Act
      await usersController.authenticateSession(req, res, next);

      // Assert
      expect(authenticateSessionServiceSpy).toBeCalled();
      expect(getUserServiceSpy).toBeCalled();
    });

    it('assigns false to req.sesion.userId if no session exists', async () => {
      // Arrange
      const req = getMockReq();
      req.session = { userId: undefined };
      const authenticateSessionServiceSpy = jest.spyOn(usersService, 'authenticateSession')
        .mockImplementation(() => ({ userId: 1 }));
      jest.spyOn(usersService, 'getUser').mockImplementation({});

      // Act
      await usersController.authenticateSession(req, res, next);

      // Assert
      expect(authenticateSessionServiceSpy).toHaveBeenLastCalledWith({ sessionUserId: false });
    });
  });

  describe('getUsersByRating', () => {
    afterEach(() => jest.restoreAllMocks());
    it('calls the getUsersByRating service', async () => {
      // Arrange
      const req = getMockReq();
      req.params = { quantity: 10, userId: 1, range: 10 };
      const getUsersByRatingServiceSpy = jest.spyOn(usersService, 'getUsersByRating').mockImplementation(jest.fn());

      // Act
      await usersController.getUsersByRating(req, res, next);

      // Assert
      expect(getUsersByRatingServiceSpy).toBeCalled();
    });
  });
});

describe('Users Service', () => {
  describe('addUser', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns the user_id', async () => {
      // Arrange
      const user = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ user_id: 1 }] }));
      jest.mock('bcrypt');
      jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => jest.fn('testhash'));
      const addressId = 1;

      // Act
      const userIdDTO = await usersService.addUser(user, addressId);

      // Assert
      expect(userIdDTO).toEqual({ user_id: 1 });
    });

    it('throws an internal server error if user cannot be added', async () => {
      // Arrange
      const user = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [] }));
      jest.mock('bcrypt');
      jest.spyOn(bcrypt, 'hashSync').mockImplementation(() => jest.fn('testhash'));
      const addressId = 1;

      // Act
      const addUserServiceSpy = (() => usersService.addUser(user, addressId));

      // Assert
      expect(addUserServiceSpy).rejects.toThrow(new ApiError('Error adding user', httpStatusCodes.INTERNAL_SERVER));
    });
  });

  describe('getUser', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns the user DTO', async () => {
      // Arrange
      const userDTO = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [userDTO] }));

      // Act
      const responseUserDTO = await usersService.getUser({ userId: 1 });

      // Assert
      expect(responseUserDTO).toEqual(userDTO);
    });

    it('queries the db and returns the user DTO', async () => {
      // Arrange
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [] }));

      // Act
      const getUserService = (() => usersService.getUser({ userId: 1 }));

      // Assert
      await expect(getUserService).rejects.toThrow(new ApiError('User not found!', httpStatusCodes.NOT_FOUND));
    });
  });

  describe('getUsersByRating', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns a users array DTO', async () => {
      // Arrange
      const userDTO = {
        firstName: 'Jimbo',
        lastName: 'Testaker',
        password: 'notpasword',
        email: 'jimbotester@tester.com',
        imgUrl: 'www.google.com',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [userDTO] }));
      const params = {
        userId: 1,
        range: 10,
        quantity: 10,
      };

      // Act
      const usersDTO = await usersService.getUsersByRating(params);

      // Assert
      expect(usersDTO[0]).toEqual(userDTO);
    });
  });

  describe('authenticateLogin', () => {
    afterEach(() => jest.restoreAllMocks());
    it('queries the db and returns true if passwords match', async () => {
      // Arrange
      const submittedPassword = { password: 'notpassword' };
      const password = { password: 'notpassword' };
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => true);

      // Act
      const userIdDTO = await usersService.authenticateLogin(submittedPassword, password);

      // Assert
      expect(userIdDTO).toEqual(true);
    });

    it('queries the db and throws API error if passwords do not match', async () => {
      // Arrange
      const submittedPassword = { password: 'thewrongpassword' };
      const password = { password: 'notpassword' };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [{ user_id: 1 }] }));
      jest.spyOn(bcrypt, 'compareSync').mockImplementation(() => false);

      // Act
      const authenticateLogin = (() => usersService.authenticateLogin(submittedPassword, password));

      // Assert
      await expect(authenticateLogin).rejects.toThrow(new ApiError('Passwords do not match, wrong password', httpStatusCodes.NOT_FOUND));
    });
  });

  describe('authenticateSession', () => {
    it('checks if there is a user_id in the session object and returns a user DTO', async () => {
      // Arrange
      const sessionUserIdObj = { sessionUserId: 1 };

      // Act
      const userIdDTO = await usersService.authenticateSession(sessionUserIdObj);

      // Assert
      expect(userIdDTO).toEqual({ userId: 1 });
    });

    it('throws an API error when there is no user_id in the session object', async () => {
      // Arrange
      const sessionUserId = { sessionUserId: undefined };

      // Act
      const authenticateSession = (() => usersService.authenticateSession(sessionUserId));

      // Assert
      await expect(authenticateSession).rejects.toThrow(new ApiError('No session found', httpStatusCodes.NOT_FOUND));
    });
  });

  describe('checkForEmail', () => {
    it('queries the db and throws API error if user email not found in db', async () => {
      // Arrange
      const credentials = {
        email: 'nonexistingemail@tester.com',
        password: 'wrongPassword',
      };
      jest.spyOn(db, 'query').mockImplementation(() => ({ rows: [] }));

      // Act
      const checkForEmailFn = (() => usersService.checkForEmail(credentials));

      // Assert
      await expect(checkForEmailFn).toEqual(false);
    });
  });
});
