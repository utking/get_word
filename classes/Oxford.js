const Console = require("console").Console;
const Logger = new Console(process.stdout, process.stderr);

class Oxford {
  constructor(resp) {
    this._resp = resp;
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
    Logger.log(this._result);
  }
}

module.exports = Oxford;

