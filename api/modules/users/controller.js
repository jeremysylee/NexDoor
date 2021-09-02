/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const usersService = require('./service');
const locationsService = require('../locations/service');

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
      imgUrl: req.body.imgUrl,
    };

    try {
      let addressIdDTO = await locationsService.getAddress(userInfo);
      if (!addressIdDTO.addressId) {
        addressIdDTO = await locationsService.addAddress(userInfo);
      }

      const user = await usersService.addUser(userInfo, addressIdDTO.addressId);
      res.status(200).send(user);
    } catch (err) {
      console.log(err);
      next(err);
    }
  },

  getUser: async (req, res, next) => {
    const userId = { userId: req.params.userId };
    try {
      const user = await usersService.getUser(userId);
      res.status(200).send(user);
    } catch (err) {
      next(err);
    }
  },

  getUsersByRating: async (req, res, next) => {
    const params = {
      quantity: req.params.quantity,
      userId: req.params.userId,
      range: req.params.range,
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
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const userIdDTO = await usersService.authenticateLogin(credentials);
      const user = await usersService.getUser(userIdDTO);

      req.session.userId = userIdDTO.userId;
      req.session.save();

      res.status(200).send(user);
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
