const Modes   = require('../config/modes.js');
const Meaning = require('./Meaning');
const Synonym = require('./Synonym');
const Antonym = require('./Antonym');
const Usage   = require('./Usage');

class OxfordFactory {
  create(mode, items) {
    switch (mode) {
      case Modes.SYNONYM:
        return new Synonym(items);
      case Modes.ANTONYM:
        return new Antonym(items);
      case Modes.USAGE:
        return new Usage(items);
      case Modes.GENERAL:
      default:
        return new Meaning(items);
    }
  }
}

module.exports = OxfordFactory;

