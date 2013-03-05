var fs = require('fs');

var domains = [];

var file = __dirname + '/../settings.json';

try {
  var data = fs.readFileSync(file);

  if (data.length !== 0) {
    domains = JSON.parse(data);
  }
} catch (e) {}

var data = {

  create: function (body, callback) {
    domains.push(body);
    callback(null, body);

    fs.writeFile(file, JSON.stringify(domains));
  },

  all: function () {
    return domains;
  },

};

module.exports = data;
