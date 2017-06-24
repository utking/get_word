class Oxford {
  constructor(resp) {
    this._resp = resp;
  }

  set logger(logger) {
    this._logger = logger;
  }

  get logger() {
    return this._logger;
  }

  log(...items) {
    if (this._logger && this._logger.log) {
      this._logger.log(...items);
    }
  }

  getAppendix() {
    return this._appendix;
  }

  _process() { }

  getResults() {
    return this._result;
  }

  showResults() {
    this._process();
    this.log(this._result);
  }
}

module.exports = Oxford;

