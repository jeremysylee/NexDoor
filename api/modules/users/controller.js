/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const usersService = require('./service');
const locationsController = require('../locations/controller');
const ApiError = require('../../errors/apiError');
const httpStatusCodes = require('../../errors/httpStatusCodes');

const userController = {
  addUser: async (req, res, next) => {
    const userInfo = {
      streetAddress: req.body.streetAddress,
      city: req.body.city,
      state: req.body.state,
      zipcode: req.body.zipcode,
      neighborhood: req.body.neighborhood,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      password: req.body.password,
      email: req.body.email,
      imgUrl: req.body.imgUrl || '',
    };
    try {
      if (await usersService.checkForEmail(userInfo)) {
        throw new ApiError('This email address already exists', httpStatusCodes.NOT_FOUND);
      }

      const addressIdDTO = await locationsController.getAddressOrAdd(userInfo);

      const user = await usersService.addUser(userInfo, addressIdDTO.addressId);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    const userId = { userId: req.params.userId };
    const email = { email: req.body.email };
    try {
      const user = await usersService.getUser(userId, email);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  },

  getUsersByRating: async (req, res, next) => {
    const params = {
      quantity: req.params.quantity || 25,
      userId: req.params.userId,
      range: req.params.range || 1,
    };
    try {
      const users = await usersService.getUsersByRating(params);
      res.status(200).send(users);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  authenticateLogin: async (req, res, next) => {
    const email = { email: req.body.email };
    const submittedPassword = { submittedPassword: req.body.password };
    try {
      const userCredentialsDTO = await usersService.checkForEmail(email);
      if (!userCredentialsDTO) {
        throw new ApiError('This email address does not exist', httpStatusCodes.NOT_FOUND);
      }
      await usersService.authenticateLogin(submittedPassword, userCredentialsDTO);
      const userDTO = await usersService.getUser(userCredentialsDTO);

      req.session.userId = userCredentialsDTO.userId;
      req.session.save();

      res.status(200).send(userDTO);
    } catch (err) {
      req.session.destroy();
      next(err);
    }
  },

  authenticateSession: async (req, res, next) => {
    try {
      const sessionUserId = { sessionUserId: req.session.userId || false };
      const userId = await usersService.authenticateSession(sessionUserId);
      const user = await usersService.getUser(userId);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  },
};

module.exports = userController;
