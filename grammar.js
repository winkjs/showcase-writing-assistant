const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

/**
 * @param {text} text Input text
 * @returns returns a String marking all the incorrect contractions
 */
exports.checkContractions = (text) => {
  var modifiedText = '';
  const doc = nlp.readDoc(text);
  const filteredTokens = doc.tokens().filter((token) => token.out(its.contractionFlag) === true)
        .filter( (subtoken, index) => (index%2 !== 0) && !(subtoken.out(its.value).includes('\'')) )
        .each((t) => t.markup());
  return doc.out(its.markedUpText);
};

/**
 * @param {text} text Input text
 * @returns returns a String marking all the incorrect punctuation spacing
 */
exports.checkIncorrectPunctuationSpacing = (text) => {
  const doc = nlp.readDoc(text);
  const filteredTokens = doc.tokens()
        .filter( (token) => token.out(its.pos) === 'PUNCT' )
        .filter( (token) => !(token.out(its.precedingSpaces) === "") )
        .each( (token) => token.markup() );
  console.log(doc.out(its.markedUpText));
  return doc.out(its.markedUpText);
};

/**
 * @param {text} text Input text
 * @returns returns a String marking all the incorrect punctuation spacing
 */
exports.checkFirstWordOfSentence = (text) => {
  
  return text;
};