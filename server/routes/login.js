const express = require('express');
const { check, validationResult } = require('express-validator');
const db = require('../ctrls/userCtrl');

const login = express.Router();

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
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log(errors);
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    console.log(req.body);
    return db.authenticateLogin(req, res);
    // return db.authenticateLogin(req, res, (err, user_id) => {
    //   if (err) { res.status(400).send('error: password does not match'); }
    //   req.params.user_id = user_id;
    //   db.getUser(req, res);
    // });
  });

module.exports = login;
