var fs = require('fs');
var arrr = require('arrr');
var settings = require('../settings');

var urls = [];

var file = settings.get().data_file;

try {
  var data = fs.readFileSync(file);

  if (data.length !== 0) {
    urls = JSON.parse(data);
  }
} catch (e) {}

var data = arrr(urls, 'url');

data.on('change', function () {
  fs.writeFile(file, JSON.stringify(urls));
});

module.exports = data;
