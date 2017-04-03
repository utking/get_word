const https = require('https');
const program = require('commander');
const api_config = require('./config');

program
  .version('1.0.1')
  .usage('<word|phrase> [options]')
  .option('-s, --synonyms', 'Show synonyms for the word')
  .parse(process.argv);

const options = {
  api_hosthane: 'od-api.oxforddictionaries.com',
  api_path: '/api/v1/entries/',
  api_synonym_appendix: 'synonyms',
  api_meaning_appendix: 'definitions',
  api_id: api_config.api_id,
  api_port: 443,
  api_key: api_config.api_key,
  lang: 'en'
};

if (!program.args.length || program.args[0].length < 1) {
  console.error(new Error('Empty request'));
  process.exit(0);
}

const synonymsMode = (program.synonyms ? true : false);
const word = encodeURIComponent(program.args.join(' '));

let appendix = options.api_meaning_appendix;

if (synonymsMode) {
  appendix = options.api_synonym_appendix;
}

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
      if (synonymsMode)
        showSynonyms(items);
      else
        showMeaning(items);
    }
  });

  res.on('error', (e) => {
    console.error('Error:',e);
  });
}).on('error', (e) => {
  console.error('Error:',e);
});

function showMeaning(resp) {
  console.info('Meanings list:');
  resp
    .map(i => i.entries.pop())
    .filter(i => i.senses)
    .map(i => i.senses)
    .reduce((prev, cur) => {
      cur.forEach(i => { prev.push(i); });
      return prev;
    }, [])
    .map(i => i.definitions.join('; '))
    .forEach((i,index) => console.log(`  ${index+1}: ${i}`))
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
