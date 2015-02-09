// server.js
var config 		 = require('./lib/config/config.json');
// set up ======================================================================
// get all the tools we need
var express  	 = require('express');
var app      	 = express();
var port     	 = process.env.PORT || 8080;
var morgan       = require('morgan');
var path 		 = require('path');

// configuration ===============================================================
// set up our express application
app.use(morgan('dev')); // log every request to the console
app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(express.static(path.join(__dirname, 'public'))); // to get local files

// routes ======================================================================
require('./lib/app/routes.js')(app); // load our routes and pass in our app

// launch ======================================================================
app.listen(port);
console.log('Server listening on port ' + port);
