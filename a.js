const winkNLP = require('wink-nlp')
const model = require('wink-eng-lite-web-model')
const nlp = winkNLP(model)
// Acquire "its" and "as" helpers from nlp.
const its = nlp.its
const as = nlp.as

var $container = $('.container')
var $backdrop = $('.backdrop')
var $highlights = $('.highlights')
var $textarea = $('textarea')
var $toggle = $('button')

function applyHighlights(text) {
  const patterns = [
    { name: 'space&punctuation', patterns: ['yes ,'] },
    { name: 'cant', patterns: ['cant'] },
  ]
  const count = nlp.learnCustomEntities(patterns)
  const doc = nlp.readDoc(text)
  doc.customEntities().each((t) => t.markup())

  console.log(doc.out(its.markedUpText))
  text = doc.out(its.markedUpText)

  console.log(doc.tokens().out())
  console.log(doc.tokens().out(its.pos))
  console.log(doc.tokens().out(its.contractionFlag))

  return text
}

function handleInput() {
  var text = $textarea.val()
  var highlightedText = applyHighlights(text)
  $highlights.html(highlightedText)
}

function handleScroll() {
  var scrollTop = $textarea.scrollTop()
  $backdrop.scrollTop(scrollTop)

  var scrollLeft = $textarea.scrollLeft()
  $backdrop.scrollLeft(scrollLeft)
}

function bindEvents() {
  $textarea.on({
    input: handleInput,
    scroll: handleScroll,
  })

  $toggle.on('click', function () {
    $container.toggleClass('perspective')
  })
}

bindEvents()
handleInput()
