import oxymoronList from './oxymoronList.js'
import absusiveWords from './absuiveList.js';
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;
// var oxymorons = require('./oxymoronlist');


var doc, logs;
const patterns = [
  { name: 'adverbSentences', patterns: ['[ADV]'] },
  { name: 'oxymoron', patterns:oxymoronList() },
  { name: 'abusiveWords', patterns: absusiveWords()}]

nlp.learnCustomEntities(patterns);

module.exports = (text) => {
  logs = [];
  doc = nlp.readDoc(text);
  textIsEmpty = text === '' ? true : false;
  
};

module.exports.getTextAndLog = () => {
  return [doc.out(its.markedUpText), logs];
};

/** Works fine - no need to make any changes.
 * @description Check for incorrect contractions.
 */
module.exports.checkIncorrectContractions = (text) => {
  const filteredTokens = doc.tokens().filter((token) => token.out(its.type) !== 'tabCRLF')
    .filter((token) => token.out(its.contractionFlag) === true)
    .filter((token, index) => (index % 2 !== 0) && !(token.out(its.value).includes('\'')));
  filteredTokens.each((token, index) => token.markup('<mark style="background-color: #FF4848">', '</mark>'));
  if (filteredTokens.out().length > 0) logs.push(filteredTokens.out().length + " contractions are incorrect!");
};


/** Works fine - condition is limited to checking the following properties -
 * 1) Should be a punctuation 
 * 2) Should be comma - for now at least (could also be a semi-colon or a colon but we're not looking into that)
 * @description Check for incorrect usage of punctuation spacing.
 */
module.exports.checkIncorrectPunctuationSpacing = () => {
  const filteredTokens = doc.tokens()
    .filter((token) => token.out(its.pos) === 'PUNCT' && token.out(its.value) === ',')
    .filter((token) => !(token.out(its.precedingSpaces) === ""));
  filteredTokens.each((token) => token.markup('<mark style="background-color: #B980F0">', '</mark>'));
  if (filteredTokens.out().length > 0) logs.push(filteredTokens.out().length + " punctuations are incorrect!");
};


/**
 * @description Check if the first word of sentence is capital or not.
 */
module.exports.checkFirstWordOfSentence = () => {
  if (!textIsEmpty) {
    doc.sentences().each((sentence) => {
      var firstWord = sentence.tokens().itemAt(0);
      if (firstWord.out(its.case) !== 'titleCase' && !(firstWord.out(its.case) === 'upperCase' && firstWord.out().length < 1))
        firstWord.markup('<mark style="background-color: #F037A5">', '</mark>');
    });
  }
};


/** 
 * @description Check use of adverbs.
 */
module.exports.checkUseOfAdverbs = () => {
  const adverbSentence = doc.customEntities().filter((sentence) => sentence.out(its.type) === 'adverbSentences');
  // adverbSentence.each((e) => e.parentSentence().markup('<mark style="background-color: #F6D167">', '</mark>'));
  adverbSentence.each((token) => token.markup('<mark style="background-color: #F6D167">', '</mark>'))
};


// /** !Warning: Work in progress - DO NOT USE.
//  * @description Check use of passive voice.
//  */
// module.exports.checkUseOfPassiveVoice = () => {
//   const tokens = doc.tokens();
//   const filteredTokens = tokens.filter((token, index) => token.out(its.pos) === 'AUX' && console.log(tokens.itemAt(index + 1).out(its.lemma)));
// };


/**
 * @description Marks long and very long sentences.
 */
module.exports.checkUseOfLongSentence = () => {
  const sentences = doc.sentences();
  sentences.each((sentence) => {
    let wordCount = sentence.tokens().filter((token) => token.out(its.type) === 'word').out().length;
    if (wordCount >= 15 && wordCount < 21) {
      sentence.markup('<mark class="checkUseOfLongSentence-Long" style="background-color: #D4F3EF">', '</mark>');
    } else if (wordCount >= 21) {
      sentence.markup('<mark class="checkUseOfLongSentence-VeryLong" style="background-color: #C2F784">', '</mark>');
    }
  });
};


/**
 * @description Check for duplicate words.
 */
module.exports.checkDuplicateWords = () => {
};

/**
 * @description Check for abusive words.
 */
module.exports.avoidAbusiveWords = () => {
  doc.customEntities().filter((entity) => entity.out(its.type) === 'abusiveWords')
    .each((entity) => {
      entity.markup('<mark style="background-color: #961216">', '</mark>');
    });
};


// /**
//  * @description Use consistent spellings - either British or American.
//  * @param {string} text Input text (may or may not contain markings).
//  * @param {boolean} type set "TRUE" for British, "FALSE" for American English
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.useConsistentSpellings = (text, type) => {
//   // -- Yet to be completed...
//   return text;
// };


/**
 * @description Always use consistent quotes and apostrophe (curly vs straight quotes).
 */
exports.useConsistentQuotesAndApostrophe = (text) => {
  // -- Yet to be completed...
  return text;
};


// /**
//  * @description Avoid use of "am" and "pm" when sentences defines the time of the day(i.e. morning, evening, night, etc).
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.avoidConstructs = (text) => {
//   // -- Yet to be completed...
//   return text;
// };

// /**
//  * @description Highlights interjections without comma 
//  * (Warning: might also use em-dash, which we are not checking for).
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.highlightInterjectionsWithoutComma = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


// /**
//  * @description Highlights wordiness (includes redundant acronym syndrome).
//  * @param {string} text Input text (may or may not contain markings).s
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.highlightWordiness = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


/**
 * @description A function that highlights the use of oxymoron.
 */
module.exports.highlightUseOfOxymorons = () => {
  const oxymorons = doc.customEntities()
    .filter((e) => e.out(its.type) === 'oxymoron')
    .each((entity) => {
      entity.markup('<mark style="background-color: #FFF542">', '</mark>');
    });
};


/**
 * @description A function that warns the user for starting with a conjunction
 */
module.exports.avoidStartingWithConjunctions = () => {
  if (!textIsEmpty) {
    doc.sentences().each((sentence) => {
      var firstWord = sentence.tokens().itemAt(0);
      if (firstWord.out(its.pos) === 'SCONJ' || firstWord.out(its.pos) === 'CCONJ')
        firstWord.markup('<mark style="background-color: #FFF5AB">', '</mark>');
    });
  }
};
