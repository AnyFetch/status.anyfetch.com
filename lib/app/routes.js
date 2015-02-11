// app/routes.js
var request = require('request');

module.exports = function(app, env) {
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      layout: false,
    	env: env
    });
  });
};
