var ping = require('./functions').ping;

var pinger = function (data, results, settings) {

  var urls = data.all();
  var pingers = [];

  var startPingers = function () {

    urls.forEach(function (url) {
      var p = ping(url.url, settings.interval, settings.timeout);

      p.on('ping', function (result) {
        results.update(result);
      });

      pingers.push(p);
    });

  };

  data.on('change', function () {

    pingers.forEach(function (pinger) {
      pinger.emit('stop');
    });

    startPingers();

  });

  startPingers();

};

module.exports = pinger;
