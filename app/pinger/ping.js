var http = require('http');
var https = require('https');

var ping = function (domain, callback) {

  var protocol = http;

  if (domain.url.indexOf('https') === 0) {
    protocol = https;
  }

  var handler = function (start, res) {
    callback(null, { url: domain.url, status: res.code || res.statusCode, ms: parseInt(process.hrtime(start)[1] / 10000000, 10) });
  }.bind(null, process.hrtime());

  var request = protocol.get(domain.url, handler);
  request.on('error', handler);

};

module.exports = ping;
