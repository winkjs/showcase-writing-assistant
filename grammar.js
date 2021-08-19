const winkNLP = require('wink-nlp')
const model = require('wink-eng-lite-web-model')
const nlp = winkNLP(model)
const its = nlp.its
const as = nlp.as

/**
 * @param {text} text Input text
 * @returns {number} returning '1'
 */

exports.checkContractions = (text) => {
  const doc = nlp.readDoc(text)
  // const tokens = doc.tokens();
  const filteredTokens = doc
    .tokens()
    .filter((token) => token.out(its.contractionFlag) === true)
    

  const contractions = filteredTokens.out(its.value, as.array)
  console.log(contractions)
  var count = 0
  for (var i in contractions) {
    if (i % 2 !== 0 && contractions[i].charAt(1) !== "'") {
      filteredTokens.each((t) => t.markup())
      text = doc.out(its.markedUpText)
    }
  }
  return text
}
