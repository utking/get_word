const Modes         = require("../config/modes.js");
const loggerMinix   = require("../utils/LoggerMixin.js");
const Meaning       = require("./Meaning");
const Synonym       = require("./Synonym");
const Antonym       = require("./Antonym");
const Usage         = require("./Usage");
const Pronunciation = require("./Pronunciation");

const FactoryMap = {
  [Modes.SYNONYM]: Synonym,
  [Modes.ANTONYM]: Antonym,
  [Modes.USAGE]: Usage,
  [Modes.PRONUNCIATION]: Pronunciation,
  [Modes.GENERAL]: Meaning
};

class OxfordFactory {
  create(mode, items) {
    let resObject = FactoryMap[mode] ? FactoryMap[mode] : Meaning;
    class ClassWithLogger extends loggerMinix(resObject) {}
    return new ClassWithLogger(items);
  }
}

module.exports = OxfordFactory;

