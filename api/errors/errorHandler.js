const newrelic = require('newrelic');
const BaseError = require('./baseError');

const logError = (err) => {
  if (process.env.NODE_ENV !== 'test') {
    console.error(err);
  }
};

const logErrorMiddleware = (err, req, res, next) => {
  logError(err);
  newrelic.noticeError(err);
  next(err);
};

const returnError = (err, req, res, next) => {
  console.log(err);
  newrelic.noticeError(err);
  res.status(err.statusCode || 500).send(err.message, err);
  next();
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
