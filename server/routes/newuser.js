const express = require('express');

const newuser = express.Router();
const { check, validationResult } = require('express-validator');
const API = require('../controllers');

newuser.post('/',
  [
    check('firstName')
      .not()
      .isEmpty()
      .withMessage('Name is required'),
    check('lastName')
      .not()
      .isEmpty()
      .withMessage('Name is required'),
    check('email')
      .isEmail()
      .exists()
      .withMessage('A valid email address is required')
      .custom(value => {
        return API.checkForEmail(value)
        .then(response => {
          console.log(response)
        })
      }),
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
      .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be 8-20 characters long'),
    check('confirm_password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("Passwords don't match");
        } else {
          return true;
        }
      }),
  ], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }
    // return API.addUser(req, res);
      // .then(response =>{
      //   res.status(200).json({
      //     success: true,
      //     message: 'New user successfully created',
      //   })
      // })
      // .catch(errors => {
      //   req.status(200).json({
      //     success: false,
      //     errors: errors.array(),
      //   })
      // })
  });

module.exports = newuser;
