var seequal = require('seequal');

var data = require('./data');
var pinger = require('./pinger')(data.all(), 10000);

var socket = function (io) {

  var cache;

  pinger.start();

  pinger.on('ping', function (result) {
    cache = result;
  });

  io.sockets.on('connection', function (socket) {

    socket.emit('init', cache);

    socket.on('data changed', function (url) {

      var result = seequal(data.create, url);

      result.success(function () {
        pinger.restart();
      });

      result.error(function (error) {
        socket.emit('error', error);
      });

    });

    pinger.on('ping', function (result) {
      socket.emit('urls', result);
      cache = result;
    });

  });

};

module.exports = socket;
