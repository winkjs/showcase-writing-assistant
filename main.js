var grammar = require('./grammar');
var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');

/**
 * @param {text} text Input text
 * @returns {message} returning '1'
 */
const applyHighlights = (text) => {
  text = grammar.checkContractions(text);
  text = grammar.checkIncorrectPunctuationSpacing(text);
  return grammar.checkFirstWordOfSentence(text);
};

/**
 * @param {text} text Filler
 * @returns {message} Filler
 */
const handleInput = () => {
  var text = $textarea.val();
  var highlightedText = applyHighlights(text);
  $highlights.html(highlightedText);
};

/**
 * @param {text} text Filler
 * @returns {message} Filler
 */
const handleScroll = () => {
  var scrollTop = $textarea.scrollTop();
  $backdrop.scrollTop(scrollTop);
  var scrollLeft = $textarea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);
};

/**
 * @param {text} text Filler
 * @returns {message} Filler
 */
const bindEvents = () => {
  $textarea.on({
    input: handleInput,
    scroll: handleScroll,
  });

  $toggle.on('click', function () {
    $container.toggleClass('perspective');
  });
};

bindEvents();
handleInput();