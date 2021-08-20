var grammar = require('./grammar');
var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');

/**
 * @description Applies all the required highlights layer-by-layer.
 * @param {String} text Input string from the text area.
 * @returns {String} String with all the grammar rules markings.
 */
const applyHighlights = (text) => {
  text = grammar.checkIncorrectContractions(text);
  text = grammar.checkIncorrectPunctuationSpacing(text);
  text = grammar.checkFirstWordOfSentence(text);
  text = grammar.checkUseOfAdverbs(text);
  return text;
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