const { NOT_FOUND_CODE } = require('./ErrorStatus');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.ErrorStatus = NOT_FOUND_CODE;
  }
}

module.exports = NotFound;
