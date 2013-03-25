# Arrowbreaker: Sup

Sup is an easy to setup web application for Node.js that will ping your urls and warn by email if their HTTP status code changes.

- link to demo.
- link arrowbreaker

## License

This module is open source but not free. More info soon (link to arrowbreaker)

## Installation

```shell
npm install arrowbreaker-sup
```

## Usage

### Initialize

```js
var settings = {

  // Gmail example
  
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

var sup = require('arrowbreaker-sup')(settings); // Initialize sup

``` 

- We use the wonderful [emailjs](https://github.com/eleith/emailjs) module. The **email_server** option gets passed directly into email.server.connect method. So check their documentation to for more options. The email server is optional but you wont get an email warnings without it.
- The **interval** option is the amount of time between each ping. 
- The **data_file** option should point to a file on disk where sup will store your settings in a json format. If the doesn't exist it will be create.

### Basic (examples/app.js)

```js
var http = require('http');

var server = http.createServer(sup.app());  // This returns an Express.js app and creates an http server;
sup.socket(server);                         // Socket IO needs an http server
```

### As an Express.js sub-app (examples/app_sub.js)

```js
var http = require('http');
var base = express();

base.use('/sup', sup.app());                // Attach sup to your base app
var server = http.createServer(base);       // Create the server;
sup.socket(server);                         // Socket IO needs an http server
```

### Attach your own socket.io instance (examples/socket.js)

Use this if you are already using socket.io in your application.

```js
var http = require('http');
var socketio = require('socket.io');

var server = http.createServer(sup.app());  // Create the server;
var io = socketio.listen(server);           // Socket.io needs an http server
io.set('log level', 3);                     // Custom socket.io settings
sup.attachSocket(io);                       // Attach socket.io
```

If you have suggestions, bugs or need help don't be shy and open an issue.
