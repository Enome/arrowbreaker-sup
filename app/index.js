var express = require('express');
var stylus = require('stylus');
var nib = require('nib');
var app = express();

// Middleware

app.set('view engine', 'jade');
app.set('views', __dirname + '/views');

app.use(stylus.middleware({
  src: __dirname + '/static/src',
  dest: __dirname + '/static/public',
  compile: function (str, path) {
    return stylus(str).set('filename', path).use(nib());
  }
}));

app.use(express.static(__dirname + '/static/public'));
app.use(express.bodyParser());

// Routes

app.get('/', function (req, res) {
  res.render('index');
});

module.exports = app;
