const Oxford = require('./Oxford');

class Meaning extends Oxford {
  constructor(resp) {
    super(resp);
  }

  _process() {
    let index = 0;
    this._result = `Meanings list:\n`;
    (this._resp || [])
      .map(i => i.entries.pop())
      .filter(i => i.senses)
      .map(i => i.senses)
      .reduce((prev, cur) => {
        cur.forEach(i => { prev.push(i); });
        return prev;
      }, [])
      .map(i => i.definitions.join('; '))
      .sort()
      .reduce((prev, cur) => {
        prev.add(cur);
        return prev;
      }, new Set())
      .forEach(i => this._result += `  ${++index}: ${i}\n`);
  }
}

module.exports = Meaning;

