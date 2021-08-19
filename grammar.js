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
    const doc = nlp.readDoc(text);
    // const tokens = doc.tokens();
    const filteredTokens = doc.tokens().filter( (token) => (token.out(its.contractionFlag) === true) );
    // console.log(tokens.out(its.value, as.array));
    // console.log(tokens.out(its.contractionFlag, as.array));
    // console.log(filteredTokens.out(its.value, as.array));
    // console.log(filteredTokens.out(its.contractionFlag, as.value));

    const contractions = filteredTokens.out(its.value, as.array);
    console.log(contractions);
    var count = 0;
    for (var i in contractions) {
      if (i % 2 !== 0 && contractions[i].charAt(1) !== '\'') {
        count += 1;
        console.log('Err!! ' + count);
      }
    }
    return 'Hello';
};

  // const patterns = [
  //   { name: 'space&punctuation', patterns: ['yes ,'] },
  //   { name: 'cant', patterns: ['cant'] },
  // ]
  // const count = nlp.learnCustomEntities(patterns)
  // const doc = nlp.readDoc(text)
  // doc.customEntities().each((t) => t.markup())

  // console.log(doc.out(its.markedUpText))
  // text = doc.out(its.markedUpText)

  // console.log(doc.tokens().out())
  // console.log(doc.tokens().out(its.pos))
  // console.log(doc.tokens().out(its.contractionFlag))

  // return text
