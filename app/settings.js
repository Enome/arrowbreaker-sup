var email = require('emailjs');

var settings = function (options) {

  if (typeof options === 'undefined') {
    throw ('Settings is not defined.');
  }

  if (typeof options.email_server === 'undefined') {
    console.log('## WARNING: Email server is not defined.');
  }

  if (typeof options.from === 'undefined') {
    options.from = 'Sup <sup@arrowbreaker.com>';
  }

  if (typeof options.data_file === 'undefined') {
    options.data_file = __dirname + '/data.json';
  }

  if (typeof options.data_file === 'undefined') {
    options.data_file = __dirname + '/data.json';
  }

  if (typeof options.interval === 'undefined') {
    options.interval = 30000;
  }

  if (typeof options.timeout === 'undefined') {
    options.timeout = 10000;
  }

  if (!(!isNaN(parseFloat(options.interval) && isFinite(options.interval)))) {
    throw ('Interval is not a number.');
  }

  options.email_server = email.server.connect(options.email_server);

  return options;

};

module.exports = settings;
