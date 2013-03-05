;(function(e,t,n,r){function i(r){if(!n[r]){if(!t[r]){if(e)return e(r);throw new Error("Cannot find module '"+r+"'")}var s=n[r]={exports:{}};t[r][0](function(e){var n=t[r][1][e];return i(n?n:e)},s,s.exports)}return n[r].exports}for(var s=0;s<r.length;s++)i(r[s]);return i})(typeof require!=="undefined"&&require,{1:[function(require,module,exports){var createCtrl = function ($scope, data) {

  $scope.url = '';

  $scope.add = function () {
    data.add($scope.url);
    $scope.url = 'http://';
  };

};

var urlsCtrl = function ($scope, socket) {
  
  var set = function (urls) {
    $scope.urls = urls;
  };

  socket.on('init', set);
  socket.on('urls', set);

};

var urlCtrl = function ($scope, events) {

  $scope.select = function () {
    events.emit('selected url', { url: $scope.url });
  };


};

var modalCtrl = function ($scope, events, socket) {

  $scope.display = false;

  events.on('selected url', function (e, args) {
    $scope.display = true;
    $scope.url = args.url.url;
    console.log('true');
  });

  $scope.cancel = function () {
    $scope.display = false;
  };

  $scope.submit = function () {

    var url = {

    };

    console.log($scope._5xx);
  };

};


// Filters

var cssFilter = function () {

  return function (input) {

    if (input.status === 'ENOTFOUND' || input.status === 'ECONNREFUSED' || input.status.toString().indexOf('5') === 0) {
      return 'error';
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

};

var nameFilter = function () {

  return function (input) {

    if (input.status === 'ENOTFOUND') {
      return 'Not found';
    }

    if (input.status === 'ECONNREFUSED') {
      return 'Refushed';
    }

    return input.status;

  };

};

var tinyUrlFilter = function () {

  return function (input) {

    input = input.replace(/http(s)?:\/\//, '');

    if (input.length > 20) {
      input = input.substr(0, 20) + '..';
    }

    return input;

  };

};

// Socket factory

var socketFactory = function ($rootScope) {

  var socket = window.io.connect();

  return {

    on: function (eventName, callback) {
      socket.on(eventName, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },

    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      });
    }
  };

};

// Events

var eventsFactory = function ($rootScope) {

  return {
    on: $rootScope.$on.bind($rootScope),
    emit: $rootScope.$emit.bind($rootScope)
  };

};

// Data

var dataFactory = function (socket) {

  var urls = {};

  return {

    add: function (url) {
      urls[url] = {};
      socket.emit('data changed', urls);
    },

    update: function (data) {
      urls[data.url] = data;
      socket.emit('data changed', urls);
    }

  };

};

// Init

var angular = window.angular;
var sup = angular.module('sup', []);

sup.filter('css', cssFilter);
sup.filter('name', nameFilter);
sup.filter('tinyUrl', tinyUrlFilter);

sup.factory('events', eventsFactory);
sup.factory('socket', socketFactory);
sup.factory('data', dataFactory);

sup.controller('createCtrl', createCtrl);
sup.controller('urlsCtrl', urlsCtrl);
sup.controller('urlCtrl', urlCtrl);
sup.controller('modalCtrl', modalCtrl);

},{}]},{},[1]);