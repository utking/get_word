const Oxford = require("./Oxford");
const player = require("play-sound")();

class Pronunciation extends Oxford {
  constructor(resp) {
    super(resp);
    this._appendix = "pronunciations";
  }

  _process() {
    this._result = "Pronunciations examples:\n";
    (this._resp || [])
      .map((i) => {
        let item = i.pronunciations.pop();
        this.soundFile = item.audioFile;
        return {
          cat: i.lexicalCategory,
          spell: item.phoneticSpelling,
          note: item.phoneticNotation,
        };
      })
      .forEach((i) => { this._result += `  ${i.cat}: ${i.spell || ""} (${i.note || ""})\n`; });
    this.play();
  }

  _getFile() {
    return this.soundFile;
  }

  play() {
    let file = this._getFile();
    if (file) {
      player.play(file, (err) => {
        if (err) {
          this.log(err);
        }
      });
    } else {
      this.log("Sound file is not found");
    }
  }

}

module.exports = Pronunciation;

