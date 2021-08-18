const BaseError = require('./baseError');

const logError = (err) => {
  console.error(err);
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  next(err);
};

const returnError = (err, req, res) => {
  res.status(err.statusCode || 500).send(err.message);
};

const isOperationalError = (error) => {
  if (error instanceof BaseError) {
    return error.isOperationalError;
  }
  return false;
};

module.exports = {
  logError,
  logErrorMiddleware,
  returnError,
  isOperationalError,
};
