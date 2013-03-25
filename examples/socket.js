// Basic example + your own socket.io config

var http = require('http');
var socketio = require('socket.io');

// Configuration

var settings = {

  // Gmail example (Sup uses the emailjs module (https://github.com/eleith/emailjs) )
  
  email_server: {
    user: 'yourgmail@gmail.com',
    password: 'yourpassword',
    host: 'smtp.gmail.com',
    ssl: true
  },

  from: 'Sup <yourgmail@gmail.com>',        // <optional> Defaults: Sup <sup@arrowbreaker.com>
  interval: 5000,                           // <optional> Defaults: 10000
  data_file: __dirname + '/data.json',      // <optional> Defaults: __dirname/data.json

};

var sup = require('arrowbreaker-sup')(settings);     // Initialize sup

// Server & Socket

var server = http.createServer(sup.app());  // This returns an Express.js app and creates an http server;
var io = socketio.listen(server);           // Socket.io needs an http server

io.set('log level', 3);                     // Custom socket.io settings
sup.attachSocket(io);                       // Attach socket.io

// Start Server

server.listen(3000, function () {           // Listen to port 3000
  console.log('Sup');
});
