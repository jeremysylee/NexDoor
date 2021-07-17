const express = require('express');

const login = express.Router();
const { check, validationResult } = require('express-validator');
const session = require('express-session');
const db = require('../controllers/userCtrl');

login.post('/',
  [
    check('email')
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('A valid email address is required'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Please enter password'),
  ], (req, res) => {
    console.log('req: ', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    if (!req.session || !req.session.userId) {
      db.authenticateLogin(req, res);
      // if authenticated, create a new session
    } else if (req.session) {
      db.authenticateLogin(req, res);
      // check if (req.session === valid)
      // if yes, redirect user to home page
      console.log("success using a session!")
      res.status(200).send("success using a session!");
    }
  });

// const redirectLogin = (req, res, next) => {
//   if (!req.session.userId) {
//     res.redirect('/login');
//   } else {
//     next();
//   }
// };

module.exports = login;
