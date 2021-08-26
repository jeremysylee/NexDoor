/* eslint-disable spaced-comment */
/* eslint-disable max-len */
/* eslint camelcase: 0 */ // --> OFF

const usersService = require('./service');
const locationsService = require('../locations/service');

const userControllers = {
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
      if (!addressIdDTO) {
        addressIdDTO = await locationsService.addAddress(userInfo);
      }
      const user = await usersService.addUser(userInfo, addressIdDTO.address_id);
      res.status(200).send(user);
    } catch (err) {
      next();
    }
  },

  getUser: async (req, res, next) => {
    const userId = { userId: req.params.userId };
    try {
      const user = await usersService.getUser(userId);
      res.status(200).send(user);
    } catch (err) {
      next();
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
      next();
    }
  },

  authenticateLogin: async (req, res, next) => {
    const credentials = {
      email: req.body.email,
      password: req.body.password,
    };
    try {
      const userId = await usersService.authenticateLogin(credentials);
      const user = await usersService.getUser(userId);
      req.session.user_id = userId;
      req.session.save();
      res.status(200).send(user);
    } catch (err) {
      req.session.destroy();
      next();
    }
  },

  authenticateSession: async (req, res, next) => {
    const sessionUserId = { sessionUserId: req.session.user_id };
    try {
      const userId = await usersService.authenticateSession(sessionUserId);
      const user = await usersService.getUser(userId);
      res.status(200).send(user);
    } catch (err) {
      next();
    }
  },

};

module.exports = userControllers;
