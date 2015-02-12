'use strict';
// app.js
// set up ======================================================================
// get all the tools we need
var config = require('./config');
var morgan = require('morgan');
var path = require('path');
var express = require('express');
var app = express.createServer();
app.listen(config.port);
var io = require('socket.io').listen(app);
// configuration ===============================================================
app.use(morgan('dev'));
app.set('view engine', 'ejs');

// to get local files
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./lib/app/routes.js')(app, config.env);
require('./lib/app/socket-handler.js')(config, io);

module.exports = app;
