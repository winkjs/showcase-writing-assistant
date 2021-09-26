# English language writing assistant

[![built with winkNLP](https://img.shields.io/badge/built%20with-winkNLP-blueviolet)](https://github.com/winkjs/wink-nlp) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby) [![Follow on Twitter](https://img.shields.io/twitter/follow/winkjs_org?style=social)](https://twitter.com/winkjs_org)

Before building, make sure that all the dependencies are installed:
1. NodeJS
2. NPM
3. live-server (`npm install live-server`)
4. browserify (`npm install browserify`)

## Steps to build
  - Clone/Fork the repo
  - `npm install`
  - `browserify js/main.js -o bundle.js`
  - run index.html on live-server

## Rules used
1. ✅ Incorrect contractions — `cant` v/s `can't`: We can check for **contraction flags**. If true, select the second part of the word, and see if the preceeding character is an apostrophe. If not, then mark the word.

2. ✅ Incorrect punctuation spacing — `yes,` v/s `yes ,`: check for `PUNC` entity and check for its.precedingSpaces as well as the succeding space.

3. ✅ First word of sentence is not capitalized: Check for `its.case` of the first word in a sentence. If not `titleCase`, mark the word.

4. ✅ Use of adverbs should be discouraged: we have used custom entity to match adverbs.

5. ❌ Use of passive voice — [am/are/were/being/is/been/was/be] followed by a past tense verb
    > auxillarry verbs -> !lemma and !ing if same ing rule -> ignore universal present continous tense

6. ✅ Long sentence > 15 words & Very Long sentence > 21 words. Count the number of words per sentences, and mark as per the given condition.

7. ✅ Duplicate words — `the the` OR `the <newline> the`(\<newline\> will be "\n" in Javascript)

8. ✅ Do not use abusive words: We use a predefined list of insults and symbols considered as abusive. These can be located inside the [`abusiveList.mjs`](./js/abusiveList.mjs)

9. ❌ Consistent spelling — either British or American: We can ask the user to choose en-US or en-GB as we decided todo in the use case. Our language model may be chosen based on the same feature.

10. ✅ Consistent apostrophe ' vs ’: We will only accept flat apostrophes `'`. Other types of curly apostrophes will be highlighted.

11. ✅ Avoid constructs (am in the morning, pm in the afternoon/evening/night, 12 noon):
 We can use patterns to approach this.

12. ✅ The word "yes" should always follow a "," or ".": Check if injections are followed by a punctuation mark [INTJ PUNC (Punctuations are limited to `?`, `!`, `,`, and `.` only)].

13. ✅ Wordiness (It includes redundant acronym syndrome (RAS) — ATM machine, ABS brakes, HIV virus, PIN number, LCD display, UPC code, please RSVP etc.): We can check from the predefined list of words.

14. ✅ Highlight use of oxymorons
    > Oxymorons - Oxymoron is a literary figure of speech in which opposite orcontradictory words, terms, phrases or ideas are combined to create arhetorical effect by paradoxical means. For example, despairing hope, tendercruelty, glad mourning and sad joy etc.

    ```
    The syntactic frame of oxymoron may fall into the following types:-
        a. adverb + adjective
        b. adverb + verb
        c. verb + adverb
        d. adjective + noun
        e. adjective + adjective
        f. noun + noun
    ```
In our case, we will use pre-defined oxymorons.

15. ✅ Avoid starting sentence with words (But, And, Just): Use of `SCONJ` and `CCONJ` flags.
