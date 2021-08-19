1.  Incorrect contractions — cant v/s can't -

    - Approach 1 : We can check for contraction flag if true split the word and check for the last 2 ending letters

2.  Incorrect punctuation spacing — yes, v/s yes ,

- Approach 1 : check for PUNC entity and check for its.precedingSpaces

3.  First word of sentence is not capitalized

    - Check for its.case before a period PUNC and check if first word of sentence is Title Case
    - if not mark the parent word with a light color or manually capitalize it

4.  Use of adverbs should be discouraged

    - Approach 1 : We can use Custom entity to make the use of adverbs

5.  Use of passive voice — [am/are/were/being/is/been/was/be] followed by a past tense verb

    - Approach 1 : auxillarry verbs -> !lemma and !ing
      if same
      ing rule -> ignore universal present continous tense

6.  Long sentence >15 words; very long sentence >21 words — refer to for further refinement https://techcomm.nz/Story?Action=View&Story_id=106

    - Approach 1 : We can create a function Sentence word counter. This will reset as the period PUNC is encountered.

    - Approach 2 : Leverage its.readabilityStats - can also show error if complex word is used or score gets poorer

7.  Duplicate words — the the OR the <newline> the; <newline> will be "\n" in javascript

    - Approach 1 : tokenize and check. bit this will be slow

    - Approach 2 :

8.  Do not use abusive words

    - Approach 1 : Content-Based Method

      1.1 We use a number of morphological features. We use the message length, average word length, and maximal word length, all expressed in number of characters. We count the number of unique characters in the message. We distinguish between six classes of characters (letters, digits, punctuation, spaces, and others) and compute two features for each one: number of occurrences, and proportion of characters in the message. We proceed similarly with capital letters. Abusive messages often contain a lot of copy/paste. To deal with such redundancy, we apply the Lempel–Ziv–Welch (LZW) compression algorithm (Batista and Meira, 2004) to the message and take the ratio of its raw to compress lengths, expressed in characters. Abusive messages also often contain extra-long words, which can be identified by collapsing the message: extra occurrences of letters repeated more than two times consecutively are removed. For instance, “looooooool” would be collapsed to “lool”. We compute the difference between the raw and collapsed message lengths.

      1.2 We count the number of words, unique words and bad words in the message. For the latter, we use a predefined list of insults and symbols considered as abusive

      We compute two overall tf–idf scores corresponding to the sums of the standard tf–idf scores of each individual word in the message.

    Approach 2 : Graph-Based Method -:

9.  Consistent spelling — either british or american

    - Approach 1: We can ask the user to choose en-US or en-GB as we decided to do in the use case. Similarly we can provide a select option in the showcase. Because many other language support will be added further

    - Approach 2: We can compare few words to a predefined list and set the state as EN/GB of the whole document. The state will govern the rules further on.

10. Consistent apostrophe ' vs ’

    - Approach 1 : We can check for first encounter of apostrophe and set the state of document or we can count the number of ' vs ’ and the majority of number can rule the state of the document.

      We can also ask the user to select in our showcase

11. Avoid constructs: am in the morning, pm in the afternoon/evening/night, 12 noon

    - Approach 1 : We can check from the predefined list of words

12. The word "yes" should always follow a "," or "."

    Approach 1: Check for injections are followed by a punctuation mark

    [INTJ PUNC]

13. Wordiness — refer to https://www.thoughtco.com/common-redundancies-in-english-1692776 It includes redundant acronym syndrome (RAS) — ATM machine, ABS brakes, HIV virus, PIN number, LCD display, UPC code, please RSVP etc. Refer to http://www.nanday.com/rap/

    - Approach 1 : We can check from the predefined list of words

14. Highlight use of oxymorons — refer to http://www.fun-with-words.com/oxym_example.html

    Oxymorons - Oxymoron is a literary figure of speech in which opposite or contradictory words, terms, phrases or ideas are combined to create a rhetorical effect by paradoxical means. For example, despairing hope, tender cruelty, glad mourning and sad joy etc.

    The syntactic frame of oxymoron may fall into the following types:-

        a. adverb + adjective
        b. adverb + verb
        c. verb + adverb
        d. adjective + noun
        e. adjective + adjective
        f. noun + noun

    Approach 1 : We can create a rule to check these custom entities. But will not be able check oxymorons because this requires to check the meanings of the tokens.

    We can use word embedings and compare the values of the vectors.
    https://www.slideshare.net/WonIkCho/warnikchow-detecting-oxymoronococosda

15. Avoid starting sentence with words "So","Just","There".

    - Approach 1 : predefined list?? need something better
