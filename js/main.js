var grammar = require('./grammar.mjs');
var $container = $('#text-container');
var $backdrop = $('.backdrop-wink');
var $highlights = $('.highlights-wink');
var $textArea = $('.textarea-wink');
var $legendTableBody = $('#legend-body');
var $toggle = $('#toggle-button');
// var $dropdown = $('.language');

/**
 * @description Applies all the required highlights layer-by-layer.
 * @param {String} text Input string from the text area.
 * @returns {[String, Array]} Returns an array that consists of:
 * 1. String with all the grammar rules markings
 * 2. An array that has all the logs saved to show grammar errors.
 */
const applyHighlights = (text) => {
  grammar(text);

  grammar.checkFirstWordOfSentence();

  grammar.checkUseOfAdverbs();
  grammar.avoidAbusiveWords();
  grammar.highlightUseOfOxymoron();
  grammar.highlightWordiness();

  // grammar.checkUseOfPassiceVoice();
  // grammar.useConsistentSpellings();
  grammar.checkDuplicateWords();

  grammar.useConsistentApostrophe();
  grammar.avoidStartingWithConjunctions();
  grammar.checkIncorrectContractions();
  grammar.checkIncorrectPunctuationSpacing();
  grammar.checkUseOfLongSentence();
  grammar.highlightInterjectionsWithoutPunctuations();

  grammar.avoidRedundantConstruct();
  return grammar.getTextAndLog();
};

/**
 * @description This function handles the job of inserting a tbody element
 * @param {Array} log An array of all key:pair values that contains the highlight error classes as well as their messages.
 * @returns {void}
 */
const highlightLegends = (log) => {
  var appendHTML = '';
  const def = 'No grammatical errors found- you\'re good to go!';
  const prefix = '<tr><td scope=\'col\'>';
  const suffix = '</td></tr>';
  if (log.length > 0) {
    log.forEach((element) => {
      Object.keys(element).forEach((key) => {
        appendHTML +=
          prefix + '<div class="fs-6 rounded ' + key + '">' + element[key] + '</div>' + suffix;
      });
    });
  } else {
    appendHTML = prefix + def + suffix;
  }
  $legendTableBody.html(appendHTML);
};

/**
 * @description A simple function that handles the input.
 * @returns {void}
 */
const handleInput = () => {
  var text = $textArea.val();
  var preserveSpace = text.split(text.trim());
  // var language = $dropdown.val();
  // console.log(language);
  var [ highlightedText, log ] = applyHighlights(text);
  $highlights.html(preserveSpace[0] + highlightedText + preserveSpace[1] + '\n');
  highlightLegends(log);
};

/**
 * @description A simple function that handles the scroll for textarea and highlight.
 * @returns {void}
 */
const handleScroll = () => {
  var scrollTop = $textArea.scrollTop();
  $backdrop.scrollTop(scrollTop);
  var scrollLeft = $textArea.scrollLeft();
  $backdrop.scrollLeft(scrollLeft);
};

/*
 * @description A simple function that binds all the events together.
 */
const bindEvents = () => {
  $textArea.on({
    input: handleInput,
    scroll: handleScroll,
  });

  $toggle.on('click', function () {
    $container.toggleClass('perspective');
  });

  // console.log($dropdown.val());
  // $dropdown.on({
  //   change: handleInput,
  // });
};

bindEvents();
handleInput();
handleScroll();
