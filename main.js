var grammar = require('./grammar');
var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');

/**
 * @description Applies all the required highlights layer-by-layer.
 * @param {String} text Input string from the text area.
 * @returns {[String, Arrvfay]} Returns an array that consists of:
 * 1. String with all the grammar rules markings
 * 2. An array that has all the logs saved to show grammar errors.
 */
const applyHighlights = (text) => {
  grammar(text);
  grammar.checkIncorrectContractions();
  grammar.checkIncorrectPunctuationSpacing();
  grammar.checkFirstWordOfSentence();
  grammar.checkUseOfAdverbs();
  grammar.highlightUseOfOxymorons();
  // grammar.checkUseOfPassiceVoice();
  grammar.checkUseOfLongSentence();
  return grammar.getTextAndLog();
};

/**
 * @description A simple function that handles the input.
 */
const handleInput = () => {
  var text = $textarea.val();
  var [highlightedText, log] = applyHighlights(text);
  $highlights.html(highlightedText);
};

/**
 * @description A simple function that handles the scroll for textarea and highlight.
 */
const handleScroll = () => {
  var scrollTop = $textarea.scrollTop();
  $backdrop.scrollTop(scrollTop);
  var scrollLeft = $textarea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);
};

/**
 * @description A simple function that binds all the events together.
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