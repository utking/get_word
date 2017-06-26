class Oxford {
  constructor(resp) {
    this._resp = resp;
  }

  log() { }

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

