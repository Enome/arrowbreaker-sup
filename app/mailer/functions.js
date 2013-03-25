var checkStatus = function (warnings, result, url, status_code) {

  if (result.new_status.toString().indexOf(status_code) === 0 && url['_' + status_code]) {

    warnings.push({
      url: url.url,
      old_status: result.old_status,
      new_status: result.new_status,
      email: url.email,
    });

  }

};

var checkError = function (warnings, result, url, error) {

  if (result.new_status === error && url.errors) {

    warnings.push({
      url: url.url,
      old_status: result.old_status,
      new_status: result.new_status,
      email: url.email,
    });

  }

};

var functions = {

  parseResult: function (new_results, old_results) {

    var re = [];

    if (typeof old_results !== 'undefined') {

      new_results.forEach(function (new_result) {

        old_results.forEach(function (old_result) {

          if (new_result.url === old_result.url) {
            re.push({ url: new_result.url, old_status: old_result.status, new_status: new_result.status });
          }

        });

      });

    }

    return re;

  },

  warnings: function (results, urls) {

    var re = [];


    results.forEach(function (result) {

      urls.forEach(function (url) {

        if (result.url === url.url) {

          if (result.new_status !== result.old_status) {

            checkStatus(re, result, url, 2);
            checkStatus(re, result, url, 3);
            checkStatus(re, result, url, 4);
            checkStatus(re, result, url, 5);

            checkError(re, result, url, 'ENOTFOUND');
            checkError(re, result, url, 'ECONNREFUSED');

          }

        }

      });

    });

    return re;

  },

  createEmails: function (warnings) {

    var emails = {

    };

    warnings.forEach(function (warning) {

      if (warning.email) {

        if (typeof emails[warning.email] === 'undefined') {

          emails[warning.email] = {
            subjects: [],
            texts: [],
          };

        }

        emails[warning.email].subjects.push(warning.url);
        emails[warning.email].texts.push(warning.url + ': ' + warning.old_status + ' => ' + warning.new_status);

      }

    });

    var key;
    var re = [];

    for (key in emails) {

      if (emails.hasOwnProperty(key)) {

        re.push({
          subject: 'Status change: ' + emails[key].subjects.join(', '),
          text: emails[key].texts.join('\n'),
          email: key
        });

      }

    }

    return re;

  },

};

module.exports = functions;
