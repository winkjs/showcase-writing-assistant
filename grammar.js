const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;


/**
 * @description Check for incorrect contractions.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the incorrect contractions.
 */
exports.checkIncorrectContractions = (text) => {
  const doc = nlp.readDoc(text);
  const filteredTokens = doc.tokens().filter((token) => token.out(its.contractionFlag) === true)
    .filter((subtoken, index) => (index % 2 !== 0) && !(subtoken.out(its.value).includes('\'')))
    .each((t) => t.markup('<mark style="background-color: #FF4848">', '</mark>'));
  return doc.out(its.markedUpText);
};


/**
 * @description Check for incorrect usage of punctuation spacing.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the incorrect punctuation spacing.
 */
exports.checkIncorrectPunctuationSpacing = (text) => {
  const doc = nlp.readDoc(text);
  const filteredTokens = doc.tokens()
    .filter((token) => token.out(its.pos) === 'PUNCT' && token.out(its.value) === ',')
    .filter((token) => !(token.out(its.precedingSpaces) === ""))
    .each((token) => token.markup('<mark style="background-color: #B980F0">', '</mark>'));
  console.log(doc.out(its.markedUpText));
  return doc.out(its.markedUpText);
};


/**
 * @description Check if the first word of sentence is capital or not.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.checkFirstWordOfSentence = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Check use of adverbs.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.checkUseOfAdverbs = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Check use of passive voice.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.checkUseOfPassiveVoice = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Check use of long sentences.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.checkUseOfLongSentence = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Check for duplicate words.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.checkDuplicateWords = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * Rules after #8 has been defined below
 * They have yet to be completed.
 */


/**
 * @description Check for abusive words.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.avoidAbusiveWords = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Use consistent spellings - either British or American.
 * @param {string} text Input text (may or may not contain markings).
 * @param {boolean} type set "TRUE" for British, "FALSE" for American English
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.useConsistentSpellings = (text, type) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Always use consistent quotes and apostrophe (curly vs straight quotes).
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.useConsistentQuotesAndApostrophe = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Avoid use of "am" and "pm" when sentences defines the time of the day(i.e. morning, evening, night, etc).
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.avoidConstructs = (text) => {
  // -- Yet to be completed...
  return text;
};

/**
 * @description Highlights interjections without comma 
 * (Warning: might also use em-dash, which we are not checking for).
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.highlightInterjectionsWithoutComma = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description Highlights wordiness (includes redundant acronym syndrome).
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.highlightWordiness = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description A function that highlights the use of oxymoron.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.highlightUseOfOxymorons = (text) => {
  // -- Yet to be completed...
  return text;
};


/**
 * @description A function that warns the user for starting with a conjunction.
 * @param {string} text Input text (may or may not contain markings).
 * @returns {string} a String marking all the uncapitalized first words.
 */
exports.avoidStartingWithConjunctions = (text) => {
  // -- Yet to be completed...
  return text;
};
