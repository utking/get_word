# get_word

Script working with Oxford Dictionaries API and fetching meanings/synonyms for words.

## Requirements

* commander

## Installation

```
$ npm install
```

Create a `config.js` based on config/config.js.example file:

## Usage examples

```
// Show all usage options
$ node index.js -h

// fetch a list of meanings for a word/phrase
$ node index.js [word|phrase]

// fetch a list of synonyms for a word/phrase
$ node index.js -s [word|phrase]

// fetch a list of usage examples for a word/phrase
$ node index.js -e [word|phrase]

```

## License

This code uses the [MIT License](https://opensource.org/licenses/MIT)
