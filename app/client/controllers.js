var controllers = {

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
      socket.emit('ping cache');
    };

    socket.emit('get urls', null, set);
    socket.on('urls update', set);

  },

  urlCtrl: function ($scope, socket, events) {

    $scope.url.status = '';
    $scope.url.ms = '';

    var setPingResult = function (results) {

      var i, result;

      for (i = 0; i < results.length; i += 1) {
        if (results[i].url === $scope.url.url) {
          result = results[i];
          break;
        }
      }

      if (result) {
        $scope.url.status = result.status;
        $scope.url.ms = result.ms;
      }
    };

    socket.on('ping', setPingResult);

    $scope.select = function () {
      events.emit('selected url', $scope.url);
    };

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
