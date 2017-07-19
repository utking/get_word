const Modes = require("../config/modes");

const modesMap = {
  synonyms: Modes.SYNONYM,
  antonyms: Modes.ANTONYM,
  examples: Modes.USAGE,
  pronunciations: Modes.PRONUNCIATION
};

module.exports = function (program) {
  let mode = Modes.GENERAL;
  if (program) {
    for (let k in modesMap) {
      if (program[k] && modesMap[k]) {
        return modesMap[k];
      }
    }
  }
  return mode;
};

