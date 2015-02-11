// server.js
var config = require('./lib/config/configuration.js');
// set up ======================================================================
// get all the tools we need
var morgan       	   = require('morgan');
var path 		  	     = require('path');
var webSocketServer  = require('ws').Server;
var http 		     	   = require('http');
var express 		     = require('express');
var app              = express();
var server           = http.createServer(app);
var wss              = new webSocketServer({server: server});
console.log('WebSocket server online, listening on ' + config.port);
// configuration ===============================================================
// set up our express application
server.listen(config.port);
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static(path.join(__dirname, 'public'))); // to get local files

// routes ======================================================================
require('./lib/app/routes.js')(app, config.env); // load our routes and pass in our app
require('./lib/app/socketHandler.js')(config, wss);

// launch ======================================================================
console.log('Server listening on port ' + config.port);
