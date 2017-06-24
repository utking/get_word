const Modes         = require("../config/modes.js");
const Meaning       = require("./Meaning");
const Synonym       = require("./Synonym");
const Antonym       = require("./Antonym");
const Usage         = require("./Usage");
const Pronunciation = require("./Pronunciation");

class OxfordFactory {
  create(mode, items, logger) {
    let resObject;
    switch (mode) {
      case Modes.SYNONYM:
        resObject = new Synonym(items);
        break;
      case Modes.ANTONYM:
        resObject = new Antonym(items);
        break;
      case Modes.USAGE:
        resObject = new Usage(items);
        break;
      case Modes.PRONUNCIATION:
        resObject = new Pronunciation(items);
        break;
      case Modes.GENERAL:
      default:
        resObject = new Meaning(items);
    }
    resObject.logger = logger;
    return resObject;
  }
}

module.exports = OxfordFactory;

