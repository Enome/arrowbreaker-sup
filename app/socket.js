var data = require('./data');
var mailer = require('./mailer');

var settings = require('../settings').get();

var email_server = settings.email_server;
var from = settings.from;
var pinger = require('./pinger')(data.all(), settings.interval);

var socket = function (io) {

  var cache;

  // Init Pinger

  pinger.start();

  pinger.on('ping', function (result) {
    cache = result;
  });

  // Init Sockets

  io.sockets.on('connection', function (socket) {

    // Urls

    data.on('change', function () {
      socket.emit('urls update', data.all());
      socket.broadcast.emit('urls update', data.all());
    });

    socket.on('get urls', function (_, fn) {
      fn(data.all());
    });

    socket.on('url add', function (url) {
      data.add({ url: url });
      pinger.restart();
    });

    socket.on('url remove', function (url) {
      data.remove(url);
      pinger.restart();
    });

    socket.on('url update', function (url) {
      data.update({
        url: url.url,
        email: url.email,
        errors: url.errors,
        _5: url._5,
        _4: url._4,
        _3: url._3,
        _2: url._2
      });
    });


    // Results

    socket.on('ping cache', function () {
      socket.emit('ping', cache);
    });

    pinger.on('ping', function (results) {
      socket.emit('ping', results);
      mailer(results, data, email_server, from);
    });

  });

};

module.exports = socket;
