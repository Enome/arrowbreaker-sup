var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var app = express();

// Setup

app.use(stylus.middleware({
  src: __dirname + '/static/src',
  dest: __dirname + '/static/public',
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

app.use(express.favicon(__dirname + '/static/favicon.ico'));
app.use(express.static(__dirname + '/static/public'));
app.use(express.bodyParser());

// Routes

app.get('/', function (req, res) {
  res.locals.base_url = app.path();
  res.render(__dirname + '/index.jade');
});

module.exports = app;
