var email = require('emailjs');

var _settings;

var settings = {

  set: function (sets) {

    if (typeof sets === 'undefined') {
      throw ('Settings is not defined.');
    }

    if (typeof sets.email_server === 'undefined') {
      console.log('## WARNING: Email server is not defined.');
    }

    if (typeof sets.from === 'undefined') {
      sets.from = 'Sup <sup@arrowbreaker.com>';
    }

    if (typeof sets.data_file === 'undefined') {
      sets.data_file = __dirname + '/data.json';
    }

    if (typeof sets.data_file === 'undefined') {
      sets.data_file = __dirname + '/data.json';
    }

    if (typeof sets.interval === 'undefined') {
      sets.interval = 10000;
    }

    if (!(!isNaN(parseFloat(sets.interval) && isFinite(sets.interval)))) {
      throw ('Interval is not a number.');
    }

    sets.email_server = email.server.connect(sets.email_server);

    _settings = sets;

  },

  get: function () {
    return _settings;
  }

};

module.exports = settings;
