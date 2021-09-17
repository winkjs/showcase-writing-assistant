var grammar = require('./grammar.mjs')
var $container = $('#text-container')
var $backdrop = $('#backdrop')
var $highlights = $('#highlights')
var $textArea = $('textarea')
var $legendTableBody = $('#legend-body')
// var $toggle = $('button')
// var $dropdown = $('.language')

/**
 * @description Applies all the required highlights layer-by-layer.
 * @param {String} text Input string from the text area.
 * @returns {[String, Array]} Returns an array that consists of:
 * 1. String with all the grammar rules markings
 * 2. An array that has all the logs saved to show grammar errors.
 */
const applyHighlights = (text) => {
  grammar(text)

  // -- functions that highlight the mistakes in sentence structuring
  grammar.checkFirstWordOfSentence() // working

  // -- functions that highlight mistakes in parts of sentences
  grammar.checkUseOfAdverbs() // working
  grammar.avoidAbusiveWords() // working
  grammar.highlightUseOfOxymoron() // working
  grammar.highlightWordiness() // working

  // grammar.checkUseOfPassiceVoice();
  grammar.checkDuplicateWords()

  // -- functions that emphasis grammar rules
  grammar.useConsistentApostrophe() // working
  grammar.avoidStartingWithConjunctions() // working
  grammar.checkIncorrectContractions() // working
  grammar.checkIncorrectPunctuationSpacing() // working
  grammar.checkUseOfLongSentence() // working x 2
  grammar.highlightInterjectionsWithoutPunctuations() // working

  grammar.avoidRedundantConstruct()
  return grammar.getTextAndLog()
}

/**
 * @description A simple function that handles the input.
 */
const handleInput = () => {
  var text = $textArea.val()
  // var language = $dropdown.val()
  // console.log(language);
  var [highlightedText, log] = applyHighlights(text)
  $highlights.html(highlightedText)
  highlightLegends(log)
}

const highlightLegends = (log) => {
  var appendHTML = ""
  const def = "<tr><td scope='row'>No grammatical errors found- you're well to go!</td></tr>"
  const prefix = "<tr><td scope='row'>"
  const suffix = "</td></tr>"
  if (log.length) {
    log.forEach(element => {
      Object.keys(element).forEach((key) => {
        appendHTML += prefix + 
          "<div class=" + key + ">"+ element[key] + "</div>" + suffix
      });
    });
  } else {
    appendHTML = prefix + 
    "<div class='key'>"+ def + "</div>" + suffix
  }
  $legendTableBody.html(appendHTML);
}

/**
 * @description A simple function that handles the scroll for textarea and highlight.
 */
const handleScroll = () => {
  var scrollTop = $textArea.scrollTop()
  $backdrop.scrollTop(scrollTop)
  var scrollLeft = $textArea.scrollLeft()
  $backdrop.scrollLeft(scrollLeft)
}

/**
 * @description A simple function that binds all the events together.
 */
const bindEvents = () => {
  $textArea.on({
    input: handleInput,
    scroll: handleScroll,
  })

  // $toggle.on('click', function () {
  //   $container.toggleClass('perspective')
  // })
  // console.log($dropdown.val());
  // $dropdown.on({
  //   change: handleInput,
  // })
}

bindEvents()
handleInput()
