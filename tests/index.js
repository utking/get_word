const should = require('chai').should();

const Oxford = require('../classes/Oxford');
const Meaning = require('../classes/Meaning');
const Synonym = require('../classes/Synonym');
const Antonym = require('../classes/Antonym');
const Usage = require('../classes/Usage');

describe('Test the Oxford class', () => {
  it('should not produce results', () => {
    let o = new Oxford().getResults();
    should.not.exist(o);
  });
});

describe('Test derived classes', () => {
  describe('Test the Meaning class', () => {
    it('should not produce results without processing items', () => {
      let o = new Meaning().getResults();
      should.not.exist(o);
    });
    it('should produce only headers for an empty array', () => {
      let o = new Meaning([]);
      o._process();
      'Meanings list:\n'.should.be.equal(o.getResults());
    });
    it('should produce only headers for undefined input', () => {
      let o = new Meaning();
      o._process();
      'Meanings list:\n'.should.be.equal(o.getResults());
    });
  });

  describe('Test the Synonym class', () => {
    it('should not produce results without processing items', () => {
      let o = new Synonym().getResults();
      should.not.exist(o);
    });
    it('should produce only headers for an empty array', () => {
      let o = new Synonym([]);
      o._process();
      'Synonyms list:\n'.should.be.equal(o.getResults());
    });
    it('should produce only headers for undefined input', () => {
      let o = new Synonym();
      o._process();
      'Synonyms list:\n'.should.be.equal(o.getResults());
    });
  });

  describe('Test the Antonym class', () => {
    it('should not produce results without processing items', () => {
      let o = new Antonym().getResults();
      should.not.exist(o);
    });
    it('should produce only headers for an empty array', () => {
      let o = new Antonym([]);
      o._process();
      'Antonyms list:\n'.should.be.equal(o.getResults());
    });
    it('should produce only headers for undefined input', () => {
      let o = new Antonym();
      o._process();
      'Antonyms list:\n'.should.be.equal(o.getResults());
    });
  });

  describe('Test the Usage class', () => {
    it('should not produce results without processing items', () => {
      let o = new Usage().getResults();
      should.not.exist(o);
    });
    it('should produce only headers for an empty array', () => {
      let o = new Usage([]);
      o._process();
      'Usage examples:\n'.should.be.equal(o.getResults());
    });
    it('should produce only headers for undefined input', () => {
      let o = new Usage();
      o._process();
      'Usage examples:\n'.should.be.equal(o.getResults());
    });
  });

});
