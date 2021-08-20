const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

const patterns = [
  { name: 'adverbSentences', patterns: [ '[ADV]' ] },
  { name: 'markTag', patterns: [ '<' ] }
];

nlp.learnCustomEntities( patterns );

var doc;

module.exports = (text) => {
  doc = nlp.readDoc(text);
};

module.exports.getText = () => {
  return doc.out(its.markedUpText);
};

/**
 * @description Check for incorrect contractions.
 */
module.exports.checkIncorrectContractions = (text) => {
  const filteredTokens = doc.tokens().filter((token) => token.out(its.contractionFlag) === true)
    .filter((subtoken, index) => (index % 2 !== 0) && !(subtoken.out(its.value).includes('\'')));
  filteredTokens.each((t) => t.markup('<mark style="background-color: #FF4848">', '</mark>'));
};


/**
 * @description Check for incorrect usage of punctuation spacing.
 */
module.exports.checkIncorrectPunctuationSpacing = () => {
  const filteredTokens = doc.tokens()
    .filter((token) => token.out(its.pos) === 'PUNCT' && token.out(its.value) === ',')
    .filter((token) => !(token.out(its.precedingSpaces) === ""));
  filteredTokens.each((token) => token.markup('<mark style="background-color: #B980F0">', '</mark>'));
};


/**
 * @description Check if the first word of sentence is capital or not.
 */
module.exports.checkFirstWordOfSentence = () => {
  // -- Yet to be completed...
};


/**
 * @description Check use of adverbs.
 */
module.exports.checkUseOfAdverbs = () => {
  const adverbSentence = doc.customEntities()
    .filter( (sentence) => sentence.out(its.type) === 'adverbSentences' );
  adverbSentence.each( ( e ) => e.parentSentence().markup('<mark style="background-color: #F6D167">', '</mark>') );
};


/**
 * @description Check use of passive voice.
 */
module.exports.checkUseOfPassiveVoice = () => {
  const tokens = doc.customEntities();
  // const filteredTokens = tokens.filter((token, index) => token.out(its.pos) === 'AUX' && console.log(token.out() + ' ' + tokens.itemAt(index+2).out()) );
};


// /**
//  * @description Check use of long sentences.
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.checkUseOfLongSentence = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


// /**
//  * @description Check for duplicate words.
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.checkDuplicateWords = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


// /**
//  * Rules after #8 has been defined below
//  * They have yet to be completed.
//  */


// /**
//  * @description Check for abusive words.
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.avoidAbusiveWords = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


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


// /**
//  * @description Always use consistent quotes and apostrophe (curly vs straight quotes).
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.useConsistentQuotesAndApostrophe = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


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
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.highlightWordiness = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


// /**
//  * @description A function that highlights the use of oxymoron.
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.highlightUseOfOxymorons = (text) => {
//   // -- Yet to be completed...
//   return text;
// };


// /**
//  * @description A function that warns the user for starting with a conjunction.
//  * @param {string} text Input text (may or may not contain markings).
//  * @returns {string} a String marking all the uncapitalized first words.
//  */
// exports.avoidStartingWithConjunctions = (text) => {
//   // -- Yet to be completed...
//   return text;
// };
