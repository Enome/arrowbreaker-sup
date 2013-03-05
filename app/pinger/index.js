var EventEmitter = require('events').EventEmitter;
var http = require('http');
var https = require('https');
var async = require('async');

var ping = require('./ping');

var pinger = function (domains, t) {

  var ee = new EventEmitter();

  var interval;

  ee.start = function () {

    process.nextTick(function () {

      var handler = function () {
        async.map(domains, ping, function (err, result) {
          ee.emit('ping', result);
        });
      };

      setInterval(handler, t);
      handler();

    });

  };


  ee.restart = function () {
    clearInterval(interval);
    ee.start();
  };

  return ee;

};

module.exports = pinger;
