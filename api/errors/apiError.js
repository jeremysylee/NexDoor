const httpStatusCodes = require('./httpStatusCodes');
const BaseError = require('./baseError');

class ApiError extends BaseError {
  constructor(
    description,
    statusCode = httpStatusCodes.NOT_FOUND,
    isOperational = true,
    // description = 'Not found',
  ) {
    super(description, statusCode, isOperational, description);
  }
}

module.exports = ApiError;
