var sup = function (_settings) {

  // Requirement statements inside the function
  // because settings might not be defined yet.
  
  var settings = require('./settings');
  settings.set(_settings);

  var app = require('./app');
  var socketio = require('socket.io');

  var _sup = {

    app: function () {
      return app;
    },

    socket: function (server) {
      var io = socketio.listen(server);
      io.set('log level', 0);
      _sup.attachSocket(io);
    },

    attachSocket: require('./app/socket'),

  };

  return _sup;

};

module.exports = sup;
