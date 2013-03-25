var services = {

  socket: function ($rootScope) {

    var socket = window.io.connect();
    var old_on = socket.on.bind(socket);
    var old_emit = socket.emit.bind(socket);

    var on = function (eventName, callback) {
      old_on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    };

    var emit = function (eventName, data, callback) {
      old_emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    };

    socket.on = on;
    socket.emit = emit;

    return socket;

  },

  events: function ($rootScope) {

    return {
      on: $rootScope.$on.bind($rootScope),
      emit: $rootScope.$emit.bind($rootScope)
    };

  },

};

module.exports = services;
