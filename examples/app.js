// Basic example

var http = require('http');

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
  interval: 5000,                           // <optional> Defaults: 30 seconds
  timeout: 2500,                            // <optional> Defaults: 10 seconds
  data_file: __dirname + '/data.json',      // <optional> Defaults: __dirname/data.json

};

var sup = require('arrowbreaker-sup')(settings);  // Initialize sup

// Server & Socket

var server = http.createServer(sup.app());  // This returns an Express.js app and creates an http server;
sup.socket(server);                         // Socket IO needs an http server

// Start Server

server.listen(3000, function () {           // Listen to port 3000
  console.log('Sup');
});
