const express = require('express');

const newuser = express.Router();
// const API = require('../controllers');
const { check, validationResult } = require('express-validator');
// const { check, body, validationResult, oneOf } = require('express-validator');

newuser.post('/',
  [
    check('name')
      .not()
      .isEmpty()
      .withMessage('Name is required'),
    check('email')
      .isEmail()
      .exists()
      .withMessage('A valid email address is required'),
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
      .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be 8-20 characters long'),
    check('confirm_password')
      // .matches('password')
    // if (val !== "aA#123456") { //req.body.confirm_password) {
    //       throw new Error("Passwords don't match");
    //     } else {
    //       return val;
    //     }
    //   }),
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
      message: 'New user successfully created',
    });
  });

module.exports = newuser;
