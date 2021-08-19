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
    const tokens = doc.tokens().out(its.value, as.array);
    const contractionFlag = doc.tokens().out(its.contractionFlag, as.array);
    console.log(tokens);
    console.log(contractionFlag);

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
