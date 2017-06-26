const Modes         = require("../config/modes.js");
const LoggerMinix   = require("../utils/LoggerMixin.js");
const Meaning       = require("./Meaning");
const Synonym       = require("./Synonym");
const Antonym       = require("./Antonym");
const Usage         = require("./Usage");
const Pronunciation = require("./Pronunciation");

class OxfordFactory {
  create(mode, items) {
    let resObject;
    switch (mode) {
      case Modes.SYNONYM:
        resObject = Synonym;
        break;
      case Modes.ANTONYM:
        resObject = Antonym;
        break;
      case Modes.USAGE:
        resObject = Usage;
        break;
      case Modes.PRONUNCIATION:
        resObject = Pronunciation;
        break;
      case Modes.GENERAL:
      default:
        resObject = Meaning;
    }
    class ClassWithLogger extends LoggerMinix(resObject) {}
    return new ClassWithLogger(items);
  }
}

module.exports = OxfordFactory;

