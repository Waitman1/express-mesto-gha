const { CONFLICT_ERROR } = require('./ErrorStatus');

class Conflicted extends Error {
  constructor(message) {
    super(message);
    this.ErrorStatus = CONFLICT_ERROR;
  }
}

module.exports = Conflicted;
