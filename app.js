// app.js
// set up ======================================================================
// get all the tools we need
var config = require('./config');
var morgan = require('morgan');
var path = require('path');
var webSocketServer = require('ws').Server;
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var wss = new webSocketServer({server: server});
// configuration ===============================================================
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static(path.join(__dirname, 'public'))); // to get local files

// routes ======================================================================
require('./lib/app/routes.js')(app, config.env); // load our routes and pass in our app
require('./lib/app/socketHandler.js')(config, wss);

module.exports = server;
