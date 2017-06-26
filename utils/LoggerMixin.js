const Console = require("console").Console;
const Logger = new Console(process.stdout, process.stderr);

module.exports = (base) => {
  return class extends base {
    constructor(...args) {
      super(...args);
    }

    log(...items) {
      Logger.log(...items);
    }
  };
};
