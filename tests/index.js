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

describe("Test the Oxford class", () => {
  it("should not produce results", () => {
    let o = new Oxford().getResults();
    should.not.exist(o);
  });
});

describe("Test the Factory class", () => {
  const f = new Factory();
  for (const m in Modes) {
    it("should create an Oxford descendant for ${m} mode", () => {
      let o = f.create(m);
      should.exist(o);
    });
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
