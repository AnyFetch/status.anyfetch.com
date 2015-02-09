// app/routes.js
var request = require('request');
var url = require('url');

module.exports = function(app) {
  app.get('/', function(req, res) {
    res.render('index.ejs');
  });
};
