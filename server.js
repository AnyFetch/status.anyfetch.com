// server.js
var config = require('./lib/config/configuration.js');
// set up ======================================================================
// get all the tools we need
var express  	 = require('express');
var app      	 = express();
var morgan       = require('morgan');
var path 		 = require('path');
// configuration ===============================================================
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static(path.join(__dirname, 'public'))); // to get local files

// routes ======================================================================
require('./lib/app/routes.js')(app, config.env); // load our routes and pass in our app
require('./lib/app/socketHandler.js')(config);

// launch ======================================================================
app.listen(config.port);
console.log('Server listening on port ' + config.port);
