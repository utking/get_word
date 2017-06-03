class Oxford {
  constructor(resp) {
    this._resp = resp;
    this._result = undefined;
  }

  _process() { }

  getResults() {
    return this._result;
  }

  showResults() {
    this._process();
    console.log(this._result);
  }
}

module.exports = Oxford;

