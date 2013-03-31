var functions = require('./functions');

var old_results = [];

var mailer = function (results, data, settings) {

  var email = function () {

    var parsed_results = functions.parseResult(results, old_results);
    var warnings = functions.warnings(parsed_results, data.all());
    var emails = functions.createEmails(warnings);

    emails.forEach(function (email) {

      settings.email_server.send({
        subject: email.subject,
        text: email.text,
        to: email.email,
        from: settings.from,
      }, function (err, message) {
        if (err) {
          console.log('There was a problem with sending the email:');
          console.log(err);
        }
      });

    });

  };

  setInterval(function () {
    email();
    old_results = JSON.parse(JSON.stringify(results));
  }, settings.interval);


};


module.exports = mailer;
