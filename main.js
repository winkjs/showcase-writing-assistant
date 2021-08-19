var grammar = require('./grammar');
var container = document.getElementById('.container');
var backdrop = document.getElementById('.backdrop');
var highlights = document.getElementById('.highlights');
var textarea = document.getElementById('textarea');
var toggle = document.getElementById('button');

/**
 * @param {text} text Input text
 * @returns {message} returning '1'
 */
const applyHighlights = (text) => grammar.checkContractions(text);

const handleInput = () => {
  var text = textarea.val();
  var highlightedText = applyHighlights(text);
  highlights.html(highlightedText);
};

const handleScroll = () => {
  var scrollTop = textarea.scrollTop();
  backdrop.scrollTop(scrollTop);
  var scrollLeft = textarea.scrollLeft();
  backdrop.scrollLeft(scrollLeft);
};

const bindEvents = () => {
  textarea.on({
    input: handleInput,
    scroll: handleScroll,
  });

  toggle.on('click', function () {
    container.toggleClass('perspective');
  });
};

bindEvents();
handleInput();
