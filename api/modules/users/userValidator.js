const { check, validationResult } = require('express-validator');

const userValidator = {
  checkEmailAndPassword: [
    check('email')
      .not()
      .isEmpty()
      .isEmail()
      .withMessage('A valid email address is required'),
    check('password')
      .not()
      .isEmpty()
      .withMessage('Please enter password'),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      console.log('validated');
      return next();
    },
  ],

  newUser: [
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
      .withMessage('A valid email address is required'),
    check('password').matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,}$/, 'i')
      .withMessage('Password must include one lowercase character, one uppercase character, a number, and a special character.')
      .isLength({ min: 8, max: 20 })
      .withMessage('Password must be 8-20 characters long'),
    check('confirm_password')
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          console.log("passwords don't match");
          throw new Error("Passwords don't match");
        } else {
          return true;
        }
      }),
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        // console.log(errors);
        return res.status(400).json({
          success: false,
          errors: errors.array(),
        });
      }
      return next();
    },
  ],
};

module.exports = userValidator;
