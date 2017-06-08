const Oxford = require("./Oxford");

class Usage extends Oxford {
  constructor(resp) {
    super(resp);
    this._appendix = "sentences";
  }

  _process() {
    let index = 0;
    this._result = "Usage examples:\n";
    (this._resp || [])
      .map((i) => i.sentences)
      .reduce((p, c) => p.concat(c), [])
      .map((i) => i.text)
      .forEach((i) => { this._result += `  ${++index}: ${i}\n`; });
  }
}

module.exports = Usage;

