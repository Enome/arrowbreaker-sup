var fs = require('fs');
var arrr = require('arrr');

var data = function (settings) {

  var urls = [];
  var file = settings.data_file;

  try {
    var file_data = fs.readFileSync(file);

    if (file_data.length !== 0) {
      urls = JSON.parse(file_data);
    }
  } catch (e) {}
  
  var _data = arrr(urls, 'url');

  _data.on('change', function () {
    fs.writeFile(file, JSON.stringify(urls));
  });

  return _data;

};

module.exports = data;
