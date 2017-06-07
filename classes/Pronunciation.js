const Oxford = require("./Oxford");

class Pronunciation extends Oxford {
  constructor(resp) {
    super(resp);
  }

  _process() {
    let index = 0;
    this._result = `Pronunciations examples:\n`;
    (this._resp || [])
      .map(i => {
        let item = i.pronunciations.pop();
        return {
          cat: i.lexicalCategory,
          spell: item.phoneticSpelling,
          note: item.phoneticNotation,
        };
      })
      .forEach(i => this._result += `  ${i.cat}: ${i.spell} (${i.note})\n`);
  }
}

module.exports = Pronunciation;

