/*eslint-env node*/

//------------------------------------------------------------------------------
// hello world app is based on node.js starter application for Bluemix
//------------------------------------------------------------------------------

// This application uses express as its web server
// for more info, see: http://expressjs.com
var express = require('express');

// cfenv provides access to your Cloud Foundry environment
// for more info, see: https://www.npmjs.com/package/cfenv
var cfenv = require('cfenv');

// create a new express server
var app = express();

// serve the files out of ./public as our main files
app.use(express.static(__dirname + '/public'));

// get the app environment from Cloud Foundry
var appEnv = cfenv.getAppEnv();

const LanguageTranslatorV2 = require('watson-developer-cloud/language-translator/v2');
// const fs = require('fs');

const language_translator = new LanguageTranslatorV2({
  username: '341590ba-43a8-434d-ad5c-f6539c19c2a0',
  password: 'spQ8R0Rz1Bcj',
  url: 'https://gateway.watsonplatform.net/language-translator/api/'
});

language_translator.translate(
  {
    text: 'Good morning',
    source: 'en',
    target: 'ar'
  },
  function(err, translation) {
    if (err) {
      console.log('error:', err);
    } else {
      console.log(JSON.stringify(translation, null, 2));
    }
  }
);

// start server on the specified port and binding host
app.listen(appEnv.port, '0.0.0.0', function() {

	// print a message when the server starts listening
  console.log("server starting on " + appEnv.url);
});
