const Modes = require("../config/modes");

module.exports = function (program) {
  let mode = Modes.GENERAL;
  if (!program) {
    return mode;
  }
  if (program.synonyms) {
    mode = Modes.SYNONYM;
  } else if (program.antonyms) {
    mode = Modes.ANTONYM;
  } else if (program.examples) {
    mode = Modes.USAGE;
  } else if (program.pronunciations) {
    mode = Modes.PRONUNCIATION;
  }
  return mode;
};

