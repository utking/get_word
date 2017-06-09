const should = require("chai").should();
const expect = require("chai").expect;

const Oxford = require("../classes/Oxford");
const Meaning = require("../classes/Meaning");
const Synonym = require("../classes/Synonym");
const Antonym = require("../classes/Antonym");
const Usage = require("../classes/Usage");
const Pronunciation = require("../classes/Pronunciation");

const Factory = require("../classes/Factory");
const Modes = require("../config/modes");
const getMode = require("../utils/getMode");

describe("Test the getMode util", () => {

  it("should return Modes.ANTONYM for the options.antonyms", () => {
    expect(getMode({ antonyms : 1 })).to.be.equal(Modes.ANTONYM);
  });
  it("should return Modes.SYNONYM for the options.synonyms", () => {
    expect(getMode({ synonyms : 1 })).to.be.equal(Modes.SYNONYM);
  });
  it("should return Modes.USAGE for the options.examples", () => {
    expect(getMode({ examples : 1 })).to.be.equal(Modes.USAGE);
  });
  it("should return Modes.PRONUNCIATION for the options.pronunciations", () => {
    expect(getMode({ pronunciations : 1 })).to.be.equal(Modes.PRONUNCIATION);
  });
  it("should return Modes.GENERAL for empty options", () => {
    expect(getMode()).to.be.equal(Modes.GENERAL);
  });

});

describe("Test the Oxford class", () => {
  it("should not produce results", () => {
    let o = new Oxford().getResults();
    should.not.exist(o);
  });
});

describe("Test the Factory class", () => {
  const f = new Factory();
  for (const m in Modes) {
    if (Modes.hasOwnProperty(m)) {
      it(`should create an Oxford descendant for ${m} mode`, () => {
        let o = f.create(m);
        should.exist(o);
      });
    }
  }

  it("should create an instance of the Antonym class", () => {
    expect(f.create(Modes.ANTONYM)).to.be.an.instanceof(Antonym);
  });
  it("should create an instance of the Synonym class", () => {
    expect(f.create(Modes.SYNONYM)).to.be.an.instanceof(Synonym);
  });
  it("should create an instance of the Usage class", () => {
    expect(f.create(Modes.USAGE)).to.be.an.instanceof(Usage);
  });
  it("should create an instance of the Meaning class", () => {
    expect(f.create(Modes.GENERAL)).to.be.an.instanceof(Meaning);
  });
  it("should create an instance of the Pronunciation class", () => {
    expect(f.create(Modes.PRONUNCIATION)).to.be.an.instanceof(Pronunciation);
  });
  it("should create an instance of the Meaning class by default", () => {
    expect(f.create()).to.be.an.instanceof(Meaning);
  });

});

describe("Test derived classes", () => {
  describe("Test the Meaning class", () => {
    it("should not produce results without processing items", () => {
      let o = new Meaning().getResults();
      should.not.exist(o);
    });
    it("should produce only headers for an empty array", () => {
      let o = new Meaning([]);
      o._process();
      "Meanings list:\n".should.be.equal(o.getResults());
    });
    it("should produce only headers for undefined input", () => {
      let o = new Meaning();
      o._process();
      "Meanings list:\n".should.be.equal(o.getResults());
    });
  });

  describe("Test the Synonym class", () => {
    it("should not produce results without processing items", () => {
      let o = new Synonym().getResults();
      should.not.exist(o);
    });
    it("should produce only headers for an empty array", () => {
      let o = new Synonym([]);
      o._process();
      "Synonyms list:\n".should.be.equal(o.getResults());
    });
    it("should produce only headers for undefined input", () => {
      let o = new Synonym();
      o._process();
      "Synonyms list:\n".should.be.equal(o.getResults());
    });
  });

  describe("Test the Antonym class", () => {
    it("should not produce results without processing items", () => {
      let o = new Antonym().getResults();
      should.not.exist(o);
    });
    it("should produce only headers for an empty array", () => {
      let o = new Antonym([]);
      o._process();
      "Antonyms list:\n".should.be.equal(o.getResults());
    });
    it("should produce only headers for undefined input", () => {
      let o = new Antonym();
      o._process();
      "Antonyms list:\n".should.be.equal(o.getResults());
    });
  });

  describe("Test the Usage class", () => {
    it("should not produce results without processing items", () => {
      let o = new Usage().getResults();
      should.not.exist(o);
    });
    it("should produce only headers for an empty array", () => {
      let o = new Usage([]);
      o._process();
      "Usage examples:\n".should.be.equal(o.getResults());
    });
    it("should produce only headers for undefined input", () => {
      let o = new Usage();
      o._process();
      "Usage examples:\n".should.be.equal(o.getResults());
    });
  });

  describe("Test the Pronunciation class", () => {
    it("should not produce results without processing items", () => {
      let o = new Pronunciation().getResults();
      should.not.exist(o);
    });
    it("should produce only headers for an empty array", () => {
      let o = new Pronunciation([]);
      o._process();
      "Pronunciations examples:\n".should.be.equal(o.getResults());
    });
    it("should produce only headers for undefined input", () => {
      let o = new Pronunciation();
      o._process();
      "Pronunciations examples:\n".should.be.equal(o.getResults());
    });
  });

});
