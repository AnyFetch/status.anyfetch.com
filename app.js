// app.js
// set up ======================================================================
// get all the tools we need
var config = require('./config');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var app = express.createServer();
app.listen(8080);
var io = require('socket.io').listen(app);
// configuration ===============================================================
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static(path.join(__dirname, 'public'))); // to get local files

// routes ======================================================================
require('./lib/app/routes.js')(app, config.env); // load our routes and pass in our app
require('./lib/app/socketHandler.js')(config, io);

module.exports = app;
