const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;

/**
 * @param {text} text Input text
 * @returns {number} returning '1'
 */

exports.checkContractions = (text) => {
  var modifiedText = '';
  const doc = nlp.readDoc(text);
  const filteredTokens = doc.tokens().filter((token) => token.out(its.contractionFlag) === true);
  const contractions = filteredTokens.out(its.value, as.array);
  console.log(contractions);
  filteredTokens.filter( (subtoken, index) => (index%2 !== 0) && !(subtoken.out(its.value).includes('\'')) ).each((t) => t.markup());
  modifiedText = doc.out(its.markedUpText);
  console.log(modifiedText)
  return modifiedText;
};
