const Oxford = require('./Oxford');

class Antonym extends Oxford {
  constructor(resp) {
    super(resp);
  }

  _process() {
    let index = 0;
    this._result = `Antonyms list:\n`;
    (this._resp || [])
      .map(i => i.entries.pop())
      .filter(i => i.senses)
      .map(i => i.senses)
      .reduce((prev, cur) => {
        cur.forEach(i => { prev.push(i.antonyms); });
        return prev;
      }, [])
      .reduce((prev, cur) => {
        let items = cur.map(i => i.text).join(';');
        prev.push(items);
        return prev;
      }, [])
      .join(';').split(';').sort()
      .reduce((prev, cur)=> {
        if (cur) {
          prev.add(cur);
        }
        return prev;
      }, new Set())
      .forEach(i => this._result += `  ${++index}: ${i}\n`);
  }
}

module.exports = Antonym;

