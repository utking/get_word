# get_word

Script working with Oxford Dictionaries API and fetching meanings, synonyms, antonyms, and usages for words and short phrases.

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

// fetch a list of antonyms for a word/phrase
$ node index.js -a [word|phrase]

// fetch a list of pronunciations for a word
$ node index.js -p [word]

```

## License

This code uses the [MIT License](https://opensource.org/licenses/MIT)
