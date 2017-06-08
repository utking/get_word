const Console = require('console').Console;
const Logger = new Console(process.stdout, process.stderr);

class Oxford {
  constructor(resp) {
    this._resp = resp;
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

