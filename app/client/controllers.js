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
