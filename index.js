const https = require('https');
const program = require('commander');
const modes = require('./config/modes');
const options = require('./config/config');

program
  .version('1.0.2')
  .usage('<word|phrase> [options]')
  .option('-s, --synonyms', 'Show synonyms for the word')
  .option('-e, --examples', 'Show usage examples')
  .parse(process.argv);

if (!program.args.length || program.args[0].length < 1) {
  console.error(new Error('Empty request'));
  process.exit(0);
}

const mode = getMode(program);
const word = encodeURIComponent(program.args.join(' '));
const appendix = getAppendix(mode);

const requestHeaders = {
  hostname: options.api_hosthane,
  path: `${options.api_path}${options.lang}/${word.toLowerCase()}/${appendix}`,
  port: options.api_port,
  headers: {
    app_id: options.api_id,
    app_key: options.api_key
  }
};

let req = https.get(requestHeaders, (res) => {
  let results = '';
  res.on('data', (resp) => {
    results += resp;
  });

  res.on('end', () => {
    let resp = {};
    try {
      resp = JSON.parse(results);
    } catch (e) {}

    if (!resp.results) {
      console.info(`Info:: ${appendix} for the word '${decodeURIComponent(word)}' was not found`);

    } else {
      let items = resp.results.pop().lexicalEntries;
      switch (mode) {
        case modes.SYNONYMS:
          showSynonyms(items);
          break;
        case modes.USAGE:
          showUsage(items);
          break;
        default:
          showMeaning(items);
      }

    }
  });

  res.on('error', (e) => {
    console.error('Error:',e);
  });
}).on('error', (e) => {
  console.error('Error:',e);
});

function showUsage(resp) {
  console.info('Usage examples:');
  let index = 0;
  resp
    .map(i => i.sentences)
    .reduce((p, c) => { return p.concat(c)}, [])
    .map(i => i.text)
    .forEach((i) => console.log(`  ${++index}: ${i}`))
  ;
}

function showMeaning(resp) {
  console.info('Meanings list:');
  let index = 0;
  resp
    .map(i => i.entries.pop())
    .filter(i => i.senses)
    .map(i => i.senses)
    .reduce((prev, cur) => {
      cur.forEach(i => { prev.push(i); });
      return prev;
    }, [])
    .map(i => i.definitions.join('; '))
    .sort()
    .reduce((prev, cur)=> {
      if (!prev)
        prev = new Set();
      prev.add(cur);
      return prev;
    }, null)
    .forEach((i) => console.log(`  ${++index}: ${i}`))
  ;
}

function showSynonyms(resp) {
  console.info('Synonyms list:');
  let index = 0;
  resp
    .map(i => i.entries.pop())
    .filter(i => i.senses)
    .map(i => i.senses)
    .reduce((prev, cur) => {
      cur.forEach(i => { prev.push(i.synonyms); });
      return prev;
    }, [])
    .reduce((prev, cur) => {
      let items = cur.map(i => i.text).join(';');
      prev.push(items);
      return prev;
    }, [])
    .join(';').split(';').sort()
    .reduce((prev, cur)=> {
      if (!prev)
        prev = new Set();
      prev.add(cur);
      return prev;
    }, null)
    .forEach((i) => console.log(`  ${++index}: ${i}`))
  ;
}

function getMode(program) {
  let mode = modes.GENERAL;
  if (program.synonyms) {
    mode = modes.SYNONYMS;
  } else if (program.examples) {
    mode = modes.USAGE;
  }
  return mode;
}

function getAppendix(mode) {
  let appendix = options.api_meaning_appendix;

  switch (mode) {
    case modes.SYNONYMS:
      appendix = options.api_synonym_appendix;
      break;
    case modes.USAGE:
      appendix = options.api_usage_appendix;
      break;
    default:
      appendix = options.api_meaning_appendix;
  }
  return appendix;
}

