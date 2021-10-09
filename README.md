# English language writing assistant


[![built with winkNLP](https://img.shields.io/badge/built%20with-winkNLP-blueviolet)](https://github.com/winkjs/wink-nlp) [![Gitter](https://img.shields.io/gitter/room/nwjs/nw.js.svg)](https://gitter.im/winkjs/Lobby) [![Follow on Twitter](https://img.shields.io/twitter/follow/winkjs_org?style=social)](https://twitter.com/winkjs_org)

[<img align="right" src="https://decisively.github.io/wink-logos/logo-title.png" width="100px" >](https://winkjs.org/)

This demo takes text and highlights error in real-time:
\- it tags all the error of the implemeted rules in the text using the [`markup`](https://winkjs.org/wink-nlp/visualizing-markup.html) method.

[<img src="https://cdn.discordapp.com/attachments/770700218811285574/891729754762403910/unknown.png" alt="Wink Wizard Showcase">](https://winkjs.org/)

Before building, make sure that all the required dependencies are installed:
1. NodeJS
2. npm
3. live-server (`npm install live-server`)
4. browserify (`npm install browserify`)

## Steps to build
  - Clone/Fork the repo
  - `npm install`
  - `browserify js/main.js -o bundle.js` to generate the `bundle.js` file
  - run index.html on live-server
