const { ERROR_CODE } = require('./ErrorStatus');

class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.ErrorStatus = ERROR_CODE;
  }
}

module.exports = BadRequest;
