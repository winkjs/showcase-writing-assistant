import oxymoronList from './oxymoronList.js'
import abusiveWords from './abusiveList.js';
import wordinessPhrases from './wordnessList.js';
const winkNLP = require('wink-nlp');
const model = require('wink-eng-lite-web-model');
const nlp = winkNLP(model);
const its = nlp.its;
const as = nlp.as;


var doc, logs;
const patterns = [
  { name: 'adverbSentences', patterns: ['[ADV]'] },
  { name: 'oxymoron', patterns: oxymoronList() },
  { name: 'abusiveWords', patterns: abusiveWords() },
  { name: 'wordinessPhrases', patterns: wordinessPhrases() },
  { name: 'curlyApostrophes', patterns: ['[‘|’]'] }
]

nlp.learnCustomEntities(patterns);

module.exports = (text) => {
  logs = [];
  doc = nlp.readDoc(text);
};

module.exports.getTextAndLog = () => {
  return [doc.out(its.markedUpText), logs];
};

/** Works fine - no need to make any changes.
 * @description Check for incorrect contractions.
 */
module.exports.checkIncorrectContractions = () => {
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
  filteredTokens.each((token) => { 
    token.markup('<mark class="checkIncorrectPunctuationSpacing" style="background-color: #B980F0">', '</mark>')
  });
  if (filteredTokens.out().length > 0) logs.push(filteredTokens.out().length + " punctuations are incorrect!");
};


/**
 * @description Check if the first word of sentence is capital or not.
 */
module.exports.checkFirstWordOfSentence = () => {
  if (doc.out() !== ("%c<empty string>", "", "font-style: italic;", "")) {
    doc.sentences().each((sentence) => {
      var firstWord = sentence.tokens().filter((word) => word.out(its.type) === 'word').itemAt(0);
      // console.log(firstWord.out(its.value));
      if (firstWord.out(its.case) !== 'titleCase' && !(firstWord.out(its.case) === 'upperCase' && firstWord.out().length <= 1))
        firstWord.markup('<mark class="checkFirstWordOfSentence" style="background-color: #F037A5">', '</mark>');
    });
  }
};


/** 
 * @description Check use of adverbs. Adverbs are okay to be used, but it is generally recommended
 * that use of -ly ending adverbs should be avoided, and there should be only two adverbs at most
 * - if a sentence is moderately large.
 */
module.exports.checkUseOfAdverbs = () => {
  const adverbSentence = doc.customEntities().filter((sentence) => sentence.out(its.type) === 'adverbSentences');
  // adverbSentence.each((e) => e.parentSentence().markup('<mark style="background-color: #F6D167">', '</mark>'));
  // This is when you want to mark the whole sentence, instead of individual adverbs
  adverbSentence.each((token) => token.markup('<mark class="checkUseOfAdverbs" style="background-color: #F6D167">', '</mark>'))
};


/** !Warning: Work in progress - DO NOT USE.
 * @description Check use of passive voice.
 */
module.exports.checkUseOfPassiveVoice = () => {
  // const tokens = doc.tokens();
  // const filteredTokens = tokens.filter((token, index) => token.out(its.pos) === 'AUX' && console.log(tokens.itemAt(index + 1).out(its.lemma)));
};


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
      entity.markup('<mark class="avoidAbusiveWords" style="background-color: #81B214">', '</mark>');
    });
};


/**
 * @description Use consistent spellings - either British or American.
 */
module.exports.useConsistentSpellings = () => {

};


/**
 * @description Always use consistent apostrophe (curly vs straight). No need to check for quotes.
 */
module.exports.useConsistentApostrophe = () => {
  doc.customEntities().filter((entity) => entity.out(its.type) === 'curlyApostrophes')
  .each((symbol) => symbol.markup('<mark class="useConsistentApostrophe" style="background-color: #A0937D">', '</mark>'));
};


/**
 * @description Avoid use of "am" and "pm" when sentences defines the time of the 
 * day(i.e. morning, evening, night, etc).
 */
module.exports.avoidConstructs = () => {
  
};

/**
 * @description Highlights interjections without punctuations 
 * (Note: might also use em-dash, which we are not checking for).
 */
module.exports.highlightInterjectionsWithoutPunctuations = () => {
  const tokens = doc.tsokens();
  const sentences = doc.sentences();
  if(sentences.length() === tokens.filter((token) => token.out()==='.' || token.out()==='!' || token.out()==='?' ).out().length) {
    tokens.filter( (token, index) => 
      token.out(its.pos) === 'INTJ' && (tokens.itemAt(index + 1).out()  === '?' || tokens.itemAt(index + 1).out()  === '!' || tokens.itemAt(index + 1).out()  === ',' || tokens.itemAt(index + 1).out()  === '.') )
      .each( (token) => token.markup('<mark class="useConsistentApostrophe" style="background-color: #A0937D">', '</mark>') ) ;
  }
};


/**
 * @description Highlights wordiness (includes redundant acronym syndrome).
 */
module.exports.highlightWordiness = () => {
  doc.customEntities().filter((entity) => entity.out(its.type) === 'wordinessPhrases').each((entity) =>
    entity.markup('<mark class="highlightWordiness" style="background-color: #B4846C">', '</mark>'));
};


/**
 * @description A function that highlights the use of oxymoron.
 */
module.exports.highlightUseOfOxymorons = () => {
  doc.customEntities()
    .filter((e) => e.out(its.type) === 'oxymoron')
    .each((entity) => entity.markup('<mark class="highlightUseOfOxymorons" style="background-color: #FFF542">', '</mark>'));
};


/**
 * @description A function that warns the user for starting with a conjunction
 */
module.exports.avoidStartingWithConjunctions = () => {
  if (doc.out() !== ("%c<empty string>", "", "font-style: italic;", "")) {
    doc.sentences().each((sentence) => {
      if ( sentence.out() !== ("%c<empty string>", "", "font-style: italic;", "") && sentence.tokens().itemAt(0).out(its.type) === 'word') {
        var firstWord = sentence.tokens().filter((word) => word.out(its.type) === 'word').itemAt(0);
        // console.log(firstWord.out());
        if (firstWord.out(its.pos) === 'SCONJ' || firstWord.out(its.pos) === 'CCONJ') {
          firstWord.markup('<mark class="avoidStartingWithConjunctions" style="background-color: #FFF5AB">', '</mark>');
        }
      }
    });
  }
};
