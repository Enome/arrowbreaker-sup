var app = require('./app');
var socket = require('./app/socket');
var socketio = require('socket.io');

var sup = {

  app: function () {
    return app;
  },

  socket: function (server) {
    var io = socketio.listen(server);
    sup.attachSocket(io);
  },

  attachSocket: socket,

};

module.exports = sup;
