var socket = function (data, results, settings, io) {

  // Init Sockets

  io.sockets.on('connection', function (socket) {

    // Urls

    data.on('change', function () {
      socket.emit('urls update', data.all());
      socket.broadcast.emit('urls update', data.all());
    });

    socket.on('get urls', function (_, fn) {
      fn(data.all());
    });

    socket.on('url add', function (url) {
      data.add({ url: url, _5: true, _4: true, _3: true, _2: true, errors: true });
    });

    socket.on('url remove', function (url) {
      data.remove(url.url);
    });

    socket.on('url update', function (url) {
      data.update({
        url: url.url,
        email: url.email,
        errors: url.errors,
        _5: url._5,
        _4: url._4,
        _3: url._3,
        _2: url._2
      });
    });

    // Results

    socket.on('get results', function (url, fn) {
      fn(results.find(url.url));
    });

  });

};

module.exports = socket;
