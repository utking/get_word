# get_word

Script working with Oxford Dictionaries API and fetching meanings/synonyms for words.

## Requirements

* commander

## Installation

```
$ npm install
```

Create a `config.js` exporting an object of the following structure:

```
module.exports = {
  api_id: 'insert your id',
  api_key: 'insert your key'
};
```

## Usage examples

```
// Show all usage options
$ node index.js -h

// fetch a list of meanings for a word/phrase
$ node index.js [word|phrase]

// fetch a list of synonyms for a word/phrase
$ node index.js -s [word|phrase]

```

## License

This code uses the [MIT License](https://opensource.org/licenses/MIT)
