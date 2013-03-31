var sup = function (options) {

  var settings = require('./app/settings')(options);
  var results = require('./app/results');

  //Data
  
  var data = require('./app/data')(settings);

  // Pinger

  var pinger = require('./app/pinger')(data, results, settings);

  // Mailer

  require('./app/mailer')(results.all(), data, settings);

  // Socket

  var socket = require('./app/socket').bind(null, data, results, settings);

  // App

  var _sup = {

    app: function () {
      return require('./app');
    },

    socket: function (server) {
      var socketio = require('socket.io');
      var io = socketio.listen(server);
      io.set('log level', 0);
      _sup.attachSocket(io);
    },

    attachSocket: socket,

  };

  return _sup;

};

module.exports = sup;
