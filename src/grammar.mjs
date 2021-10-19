import oxymoronList from './oxymoronList.mjs'
import abusiveWords from './abusiveList.mjs'
import wordinessPhrases from './wordinessList.mjs'

const winkNLP = require('wink-nlp')
const model = require('wink-eng-lite-web-model')
const nlp = winkNLP(model)
const its = nlp.its
const as = nlp.as

var doc, logs
const patterns = [
  { name: 'adverbSentences', patterns: ['[ADV]'] },
  { name: 'oxymoron', patterns: oxymoronList() },
  { name: 'abusiveWords', patterns: abusiveWords() },
  { name: 'wordinessPhrases', patterns: wordinessPhrases() },
  { name: 'curlyApostrophes', patterns: ['[‘|’]'] },
  { name: 'redundantPhrases', patterns: ['[TIME] [ADP|] [DET|THE|] [TIME]'] },
]

nlp.learnCustomEntities(patterns)

module.exports = (text) => {
  logs = []
  doc = nlp.readDoc(text)
}

module.exports.getTextAndLog = () => {
  return [doc.out(its.markedUpText), logs]
}

const stringIsNotEmpty = (collection) => {
  return collection.out() !== ('%c<empty string>', '', 'font-style: italic;', '')
}

/**
 * @description Check for incorrect contractions.
 */
module.exports.checkIncorrectContractions = () => {
  const filteredTokens = doc
    .tokens()
    .filter((token) => token.out(its.type) !== 'tabCRLF')
    .filter((token) => token.out(its.contractionFlag) === true)
  const contractionToken = filteredTokens
    .filter(
      (token, index) => index % 2 !== 0 && !token.out(its.value).includes("'")
    )
  contractionToken.each((token, index) => {
    filteredTokens.itemAt(index*2).markup('<mark class="checkIncorrectContractions">', '</mark>')
    token.markup('<mark class="checkIncorrectContractions">', '</mark>')
  })
  if (contractionToken.out().length > 0) {
    if (contractionToken.out().length == 1) {
    logs.push({'checkIncorrectContractions': contractionToken.out().length + ' contraction is incorrect!'})
    }
    else
        logs.push({'checkIncorrectContractions': contractionToken.out().length + ' contractions are incorrect!'})

  }
}

/**
 * @description Check for incorrect usage of punctuation spacing.
 */
module.exports.checkIncorrectPunctuationSpacing = () => {
  const tokens = doc.tokens()

  const filteredTokens = tokens
    .filter((token) => token.out(its.pos) === 'PUNCT')
  const incorrectToken = filteredTokens.filter((token, index) => 
      (index < filteredTokens.out().length - 1 && 
        (!(token.out(its.precedingSpaces) === '' && (tokens.itemAt(token.index() + 1).out(its.precedingSpaces) === ' ' || tokens.itemAt(token.index() + 1).out(its.POS) !== 'PUNCT') ))
      ) 
      || (index === filteredTokens.out().length - 1 && !(token.out(its.precedingSpaces) === '' )))
  incorrectToken.each((token) => {
    token.markup('<mark class="checkIncorrectPunctuationSpacing" >', '</mark>')
  })

  if (incorrectToken.out().length > 0){
      if (incorrectToken.out().length ==  1){
    logs.push({'checkIncorrectPunctuationSpacing':incorrectToken.out().length + ' punctuation is incorrect!'})
  }
  else    logs.push({'checkIncorrectPunctuationSpacing':incorrectToken.out().length + ' punctuations are incorrect!'})

}
}

/**
 * @description Check if the first word of sentence is capital or not.
 */
module.exports.checkFirstWordOfSentence = () => {
  let count = 0
  if (stringIsNotEmpty(doc)) {
    doc.sentences().each((sentence) => {
      var tokens = sentence.tokens()
      if (tokens.out().length > 0 && tokens.itemAt(0).out(its.type) === 'word') {
        var firstWord = tokens.itemAt(0)
        if (firstWord.out(its.case) !== 'titleCase' && !(firstWord.out(its.case) === 'upperCase' && firstWord.out().length <= 1)) {
          count += 1
          firstWord.markup('<mark class="checkFirstWordOfSentence">', '</mark>')
        }
      }
    })
  }
  if (count > 0){
    if (count == 1){
      logs.push({'checkFirstWordOfSentence': count + ' sentence has incorrect casing!'})
}
else
      logs.push({'checkFirstWordOfSentence': count + ' sentences have incorrect casing!'})

  }
  
}

/**
 * @description Check use of adverbs. Adverbs are okay to be used, but it is generally recommended
 * that use of -ly ending adverbs should be avoided, and there should be only two adverbs at most
 * - if a sentence is moderately large.
 */
module.exports.checkUseOfAdverbs = () => {
  const adverbSentence = doc.customEntities()
    .filter((sentence) => sentence.out(its.type) === 'adverbSentences')
  adverbSentence.each((token) => token.markup('<mark class="checkUseOfAdverbs">', '</mark>'))
  if (adverbSentence.out().length > 0)
    if (adverbSentence.out().length ==1)

    logs.push({'checkUseOfAdverbs': adverbSentence.out().length + ' adverb found - be careful not to overuse it!'})

    else
        logs.push({'checkUseOfAdverbs': adverbSentence.out().length + ' adverbs found - be careful not to overuse them!'})


}

/**
 * @description Check use of passive voice.
 */
module.exports.checkUseOfPassiveVoice = () => {
  // -- empty function
}

/**
 * @description Marks long and very long sentences.
 */
module.exports.checkUseOfLongSentence = () => {
  let longSentence = 0
  let veryLongSentence = 0
  const sentences = doc.sentences()
  sentences.each((sentence) => {
    let wordCount = sentence.tokens()
      .filter((token) => token.out(its.type) === 'word')
      .out().length
    if (wordCount >= 15 && wordCount < 21) {
      longSentence+=1
      sentence.markup('<mark class="checkUseOfLongSentence-Long">', '</mark>')
    } else if (wordCount >= 21) {
      veryLongSentence+=1
      sentence.markup(
        '<mark class="checkUseOfLongSentence-VeryLong">',
        '</mark>'
      )
    }
  })
  if (longSentence > 0){
    if (longSentence ==1)
    logs.push({'checkUseOfLongSentence-Long': longSentence + ' sentence is long - try to shorten the length!'})
    else
        logs.push({'checkUseOfLongSentence-Long': longSentence + ' sentences are long - try to shorten the length!'})

  }
  if (veryLongSentence > 0){
    if(veryLongSentence ==1)
    logs.push({'checkUseOfLongSentence-VeryLong': veryLongSentence + ' sentence is extremely long - try to shorten the length!'})
    else
        logs.push({'checkUseOfLongSentence-VeryLong': veryLongSentence + ' sentences are extremely long - try to shorten the length!'})

  }
}

/**
 * @description Check for duplicate words.
 */
module.exports.checkDuplicateWords = () => {
  const sentences = doc.sentences()
  const tokens = doc.tokens()
  if (sentences.length() === tokens
      .filter((token) => token.out() === '.' || token.out() === '!' || token.out() === '?')
      .out().length) 
  {
    let duplicateWord = 0
    sentences.each((sentence) => {
      const eachSentence = sentence.tokens()
        .filter( (token) => token.out(its.type) !== 'tabCRLF' )
      eachSentence.each((token, index) => {
        if (
          index < sentence.tokens().length() - 2 &&
          token.out() === eachSentence.itemAt(index + 1).out()
        ) {
          duplicateWord += 1
          token.markup('<mark class="checkDuplicateWords">', '</mark>')
          eachSentence.itemAt(index + 1)
            .markup('<mark class="checkDuplicateWords">', '</mark>')
        }
      })
    })
    if (duplicateWord > 0){
    if(duplicateWord==1)
      logs.push({'checkDuplicateWords': duplicateWord + ' word has duplicates!'})
else
      logs.push({'checkDuplicateWords': duplicateWord + ' words have duplicates!'})

    }

  }
}

/**
 * @description Check for abusive words.
 */
module.exports.avoidAbusiveWords = () => {
  let count = 0
  doc
    .customEntities()
    .filter((entity) => entity.out(its.type) === 'abusiveWords')
    .each((entity) => {
      count+=1
      entity.markup('<mark class="avoidAbusiveWords">', '</mark>')
    })
    if (count > 0){
      if(count==1)
      logs.push({'avoidAbusiveWords': count + ' abusive word! Avoid it!'})
      else
      logs.push({'avoidAbusiveWords': count + ' abusive words! Avoid them!'})


}}

/**
 * @description Use consistent spellings - either British or American.
 */
module.exports.useConsistentSpellings = () => {
  // -- empty function
}

/**
 * @description Always use consistent apostrophe (curly vs straight). No need to check for quotes.
 */
module.exports.useConsistentApostrophe = () => {
  let count = 0
  doc.customEntities()
    .filter((entity) => entity.out(its.type) === 'curlyApostrophes')
    .each((symbol) => {
      count +=1
      symbol.markup('<mark class="useConsistentApostrophe">', '</mark>')
    })

  if (count > 0){
    if(count==1)
    logs.push({'useConsistentApostrophe': count + ' apostrophe not consistent! Use flat apostrophe only!'})
    else
    logs.push({'useConsistentApostrophe': count + ' apostrophes not consistent! Use flat apostrophe only!'})

    
}}

/**
 * @description Avoid use of "am" and "pm" when sentences defines the time of the
 * day(i.e. morning, evening, night, etc).
 */
module.exports.avoidRedundantConstruct = () => {
  let count = 0
  doc.customEntities()
  .filter((entity) => entity.out(its.type) === 'redundantPhrases')
  .each((entity) => {
    count+=1
    entity.markup('<mark class="avoidRedundantConstruct">', '</mark>')
  })
  if (count > 0)
  {
    if(count==1)
    logs.push({'avoidRedundantConstruct': count + ' redundant construct! Not necessarily wrong, but avoid it!'})
    else
        logs.push({'avoidRedundantConstruct': count + ' redundant constructs! Not necessarily wrong, but avoid them!'})

  }
}

/**
 * @description Highlights interjections without punctuations
 */
module.exports.highlightInterjectionsWithoutPunctuations = () => {
  let count = 0
  const tokens = doc.tokens()
  const sentences = doc.sentences()
  if (sentences.length() === tokens
                          .filter((token) => 
                            token.out() === '.' || token.out() === '!' || token.out() === '?')
                          .out().length
    ) {
    tokens.filter((token, index) =>
          token.out(its.pos) === 'INTJ' &&
          !(tokens.itemAt(index + 1).out() === '?' ||
            tokens.itemAt(index + 1).out() === '!' ||
            tokens.itemAt(index + 1).out() === ',' ||
            tokens.itemAt(index + 1).out() === '.'))
      .each((token) => {
        count+=1
        token.markup(
          '<mark class="highlightInterjectionsWithoutPunctuations">',
          '</mark>'
        )
        })
  }
  if (count > 0)
  {
    if(count==1)
    logs.push({'highlightInterjectionsWithoutPunctuations': count + ' incorrect interjection without proper punctuation! Use the following - "!", ".", "," OR "?".'})
    else
        logs.push({'highlightInterjectionsWithoutPunctuations': count + ' incorrect interjections without proper punctuations! Use the following - "!", ".", "," OR "?".'})


}
}

/**
 * @description Highlights wordiness (includes redundant acronym syndrome).
 */
module.exports.highlightWordiness = () => {
  let count = 0
  doc
    .customEntities()
    .filter((entity) => entity.out(its.type) === 'wordinessPhrases')
    .each((entity) => {
      count += 1
      entity.markup('<mark class="highlightWordiness">', '</mark>')
    })
  if (count > 0)  
  {
    if(count==1)
    logs.push({'highlightWordiness': count + ' phrase have been found with wordiness. It is advisable to update it.'})
    else
        logs.push({'highlightWordiness': count + ' phrases have been found with wordiness. It is advisable to update them.'})

}}

/** 
 * @description A function that highlights the use of oxymoron.
 */
module.exports.highlightUseOfOxymoron = () => {
  let count = 0
  doc.customEntities()
    .filter((e) => e.out(its.type) === 'oxymoron')
    .each((entity) => {
      count += 1
      entity.markup('<mark class="highlightUseOfOxymoron">', '</mark>')
    })
  if (count > 0)
  {
    if(count==1)
    logs.push({'highlightUseOfOxymoron': count + ' oxymoron detected! Careful while using it!'})

    else
        logs.push({'highlightUseOfOxymoron': count + ' oxymorons detected! Careful while using them!'})

  }
}

/**
 * @description A function that warns the user for starting with a conjunction
 */
module.exports.avoidStartingWithConjunctions = () => {
  let count = 0
  if (stringIsNotEmpty(doc)) {
    doc.sentences().each((sentence) => {
      if (stringIsNotEmpty(sentence) &&
        sentence.tokens().itemAt(0).out(its.type) === 'word'
      ) {
        var firstWord = sentence
          .tokens()
          .filter((word) => word.out(its.type) === 'word')
          .itemAt(0)
        if (firstWord.out(its.pos) === 'SCONJ' || firstWord.out(its.pos) === 'CCONJ') {
          count += 1
          firstWord.markup('<mark class="avoidStartingWithConjunctions">',
            '</mark>'
          )
        }
      }
    })
  }
  if (count > 0)
  { if(count==1)
    logs.push({'avoidStartingWithConjunctions': count + ' sentence starting with conjunction! Avoid it!'})

    else
        logs.push({'avoidStartingWithConjunctions': count + ' sentences starting with conjunction! Avoid them!'})

}
}
