const express = require('express');

const login = express.Router();
const { check, validationResult } = require('express-validator');
const db = require('../controllers');

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
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    db.findUser(req, res);
  });

module.exports = login;
