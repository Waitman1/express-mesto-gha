const { FORBIDDEN_ERROR } = require('./ErrorStatus');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.ErrorStatus = FORBIDDEN_ERROR;
  }
}

module.exports = Forbidden;
