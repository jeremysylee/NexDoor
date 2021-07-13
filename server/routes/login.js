const express = require('express');

const login = express.Router();
const { check, validationResult } = require('express-validator');

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
    res.status(200).json({
      success: true,
      message: 'login successful',
    });
});

module.exports = login;
