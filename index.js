var sup = function (_settings) {

  var settings = require('./settings');
  settings.set(_settings);

  var app = require('./app');
  var socket = require('./app/socket');
  var socketio = require('socket.io');

  var _sup = {

    app: function () {
      return app;
    },

    socket: function (server) {
      var io = socketio.listen(server);
      _sup.attachSocket(io);
    },

    attachSocket: socket,

  };

  return _sup;

};

module.exports = sup;
