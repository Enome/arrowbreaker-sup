var functions = require('./functions');

var old_results = [];

var mailer = function (new_results, data, server, from) {

  var parsed_results = functions.parseResult(new_results, old_results);
  var warnings = functions.warnings(parsed_results, data.all());
  var emails = functions.createEmails(warnings);

  emails.forEach(function (email) {

    server.send({
      subject: email.subject,
      text: email.text,
      to: email.email,
      from: from,
    }, function (err, message) {
      if (err) {
        console.log('There was a problem with sending the mail:');
        console.log(err);
      }
    });

  });


  old_results = new_results;
};


module.exports = mailer;
