var grammar = require('./grammar.mjs');
var $container = $('.container');
var $backdrop = $('.backdrop');
var $highlights = $('.highlights');
var $textarea = $('textarea');
var $toggle = $('button');
var $dropdown = $('.language');

/**
 * @description Applies all the required highlights layer-by-layer.
 * @param {String} text Input string from the text area.
 * @returns {[String, Array]} Returns an array that consists of:
 * 1. String with all the grammar rules markings
 * 2. An array that has all the logs saved to show grammar errors.
 */
const applyHighlights = (text) => {
  grammar(text);

  /**
   * @author Ashvith
   * So the one thing that I've noticed that that the order in which
   * functions need to be executed is dependent. First, we must execute
   * all customEntities()-based methods, and then the default collections
   * like sentences(), tokens() or entities().
   */

  // -- functions that highlight the mistakes in sentence structuring
  grammar.checkFirstWordOfSentence();                // working

  // -- functions that highlight mistakes in parts of sentences
  grammar.checkUseOfAdverbs();                          // working
  grammar.avoidAbusiveWords();                          // working
  grammar.highlightUseOfOxymorons();                    // working
  grammar.highlightWordiness();                         // working

  // grammar.checkUseOfPassiceVoice();
  grammar.checkDuplicateWords();

  // -- functions that emphasis grammar rules
  grammar.useConsistentApostrophe();                    // working
  grammar.avoidStartingWithConjunctions();              // working
  grammar.checkIncorrectContractions();                 // working
  grammar.checkIncorrectPunctuationSpacing();           // working
  grammar.checkUseOfLongSentence();                     // working x 2
  grammar.highlightInterjectionsWithoutPunctuations();  // working

  return grammar.getTextAndLog();
};

/**
 * @description A simple function that handles the input.
 */
const handleInput = () => {
  var text = $textarea.val();
  var language = $dropdown.val();
  // console.log(language);
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
  // console.log($dropdown.val());
  $dropdown.on({
    change: handleInput,
  });
};

bindEvents();
handleInput();