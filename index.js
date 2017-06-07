const https = require("https");
const program = require("commander");
const Modes = require("./config/modes");
const options = require("./config/config");
const OxfordFactory = require("./classes/Factory.js");

program
  .version("1.1.0")
  .usage("<word|phrase> [options]")
  .option("-s, --synonyms", "Show synonyms for the word")
  .option("-a, --antonyms", "Show antonyms for the word")
  .option("-e, --examples", "Show usage examples")
  .option("-p, --pronunciations", "Show pronunciation examples")
  .parse(process.argv);

if (!program.args.length || program.args[0].length < 1) {
  console.error(new Error("Empty request"));
  process.exit(0);
}

const mode = getMode(program);
const word = encodeURIComponent(program.args.join(" "));
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
  let results = "";
  res.on("data", (resp) => {
    results += resp;
  });

  res.on("end", () => {
    let resp = {};
    try {
      resp = JSON.parse(results);
    } catch (e) {}

    if (!resp.results || !Array.isArray(resp.results)) {
      console.info(`Info:: ${appendix} for the word "${decodeURIComponent(word)}" was not found`);

    } else {
      new OxfordFactory()
        .create(mode, resp.results.pop().lexicalEntries)
        .showResults();
    }
  });

  res.on("error", console.error);
}).on("error", console.error);

function getMode(program) {
  let mode = Modes.GENERAL;
  if (program.synonyms) {
    mode = Modes.SYNONYM;
  } else if (program.antonyms) {
    mode = Modes.ANTONYM;
  } else if (program.examples) {
    mode = Modes.USAGE;
  } else if (program.pronunciations) {
    mode = Modes.PRONUNCIATION;
  }
  return mode;
}

function getAppendix(mode) {
  let appendix = options.api_meaning_appendix;

  switch (mode) {
    case Modes.SYNONYM:
      appendix = options.api_synonym_appendix;
      break;
    case Modes.ANTONYM:
      appendix = options.api_antonym_appendix;
      break;
    case Modes.USAGE:
      appendix = options.api_usage_appendix;
      break;
    case Modes.PRONUNCIATION:
      appendix = options.api_pronunciations_appendix;
      break;
    default:
      appendix = options.api_meaning_appendix;
  }
  return appendix;
}

