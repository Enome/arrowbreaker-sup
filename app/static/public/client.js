;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){var angular = window.angular;
var sup = angular.module('sup', []);


var filters = require('./filters');

sup.filter('css', filters.cssFilter);
sup.filter('name', filters.nameFilter);
sup.filter('tinyUrl', filters.tinyUrlFilter);


var services = require('./services');

sup.factory('events', services.events);
sup.factory('socket', services.socket);


var controller = require('./controllers');

sup.controller('createCtrl', controller.createCtrl);
sup.controller('urlsCtrl', controller.urlsCtrl);
sup.controller('urlCtrl', controller.urlCtrl);
sup.controller('modalCtrl', controller.modalCtrl);

},{"./filters":2,"./services":3,"./controllers":4}],2:[function(require,module,exports){var filters = {

  cssFilter: function () {

    return function (input) {

      if (input.status === 'ENOTFOUND' || input.status === 'ECONNREFUSED' || input.status === 'ETIMEDOUT' || input.status.toString().indexOf('5') === 0) {
        return 'error';
      }

      if (input.status === 'Pinging') {
        return 'pinging';
      }

      if (input.status.toString().indexOf('4') === 0) {
        return 'status-4xx';
      }

      if (input.status.toString().indexOf('3') === 0) {
        return 'status-3xx';
      }

      if (input.status.toString().indexOf('2') === 0) {
        return 'status-2xx';
      }


    };

  },

  nameFilter: function () {

    return function (input) {

      if (input.status === 'ENOTFOUND') {
        return 'Not found';
      }

      if (input.status === 'ECONNREFUSED') {
        return 'Refused';
      }

      if (input.status === 'ETIMEDOUT') {
        return 'Timeout';
      }

      return input.status;

    };

  },

  tinyUrlFilter: function () {

    return function (input) {

      input = input.replace(/http(s)?:\/\//, '');

      if (input.length > 20) {
        input = input.substr(0, 20) + '..';
      }

      return input;

    };

  }

};

module.exports = filters;

},{}],3:[function(require,module,exports){var services = {

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

},{}],4:[function(require,module,exports){var controllers = {

  createCtrl: function ($scope, socket) {

    $scope.add = function () {
      socket.emit('url add', $scope.url);
      $scope.url = '';
    };

  },

  urlsCtrl: function ($scope, socket) {
    
    var set = function (urls) {
      socket.removeAllListeners('ping');
      $scope.urls = urls;
    };

    socket.emit('get urls', null, set);
    socket.on('urls update', set);

  },

  urlCtrl: function ($scope, socket, events) {

    $scope.url.status = 'Pinging';
    $scope.url.ms = '0';

    $scope.select = function () {
      events.emit('selected url', $scope.url);
    };

    var pingResults = function () {
      socket.emit('get results', $scope.url, function (args) {
        if (args) {
          $scope.url.status = args.status;
          $scope.url.ms = args.ms;
        }
      });
    };

    var interval = setInterval(pingResults, 5000);

    pingResults();

    $scope.$on('$destroy', function () {
      clearInterval(interval);
    });

  },

  modalCtrl: function ($scope, events, socket) {

    $scope.display = false;

    events.on('selected url', function (e, args) {
      $scope.display = true;
      $scope.url = args;
    });

    $scope.submit = function () {
      socket.emit('url update', $scope.url);
      $scope.display = false;
    };

    $scope.remove = function (event) {
      socket.emit('url remove', $scope.url);
      $scope.display = false;
    };

    $scope.cancel = function (event) {
      event.preventDefault();
      $scope.display = false;
    };

  }

};

module.exports = controllers;

},{}]},{},[1]);