var request = require('request');
var EventEmitter = require('events').EventEmitter;

var functions = {

  ping: function (url, interval, timeout) {

    var tm;
    var ee = new EventEmitter();

    var p = function (start) {

      request.get({ url: url, timeout: timeout, followRedirect: false }, function (err, res, body) {
        ee.emit('ping', ({ url: url, status: (err && err.code) || res.statusCode, ms: parseInt(process.hrtime(start)[1] / 10000000, 10) }));
        tm = setTimeout(p.bind(null, process.hrtime()), interval);
      });

    };

    ee.on('stop', function () {
      clearTimeout(tm);
    });

    p(process.hrtime());

    return {
      on: ee.on.bind(ee),
      emit: ee.emit.bind(ee),
    };

  },

};

module.exports = functions;
