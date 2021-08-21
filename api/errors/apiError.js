const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class ApiError extends BaseError {
  constructor(
    name,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    description = 'Not found',
  ) {
    super(name, statusCode, isOperational, description);
  }
}

module.exports = ApiError;
