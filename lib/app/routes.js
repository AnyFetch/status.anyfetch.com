// app/routes.js
var config = require('../config/config.json');
var request = require('request');
var url = require('url');

module.exports = function(app){
    app.get('/', function(req, res){
        res.render('index.ejs');
    });
    ////////////////////////////////////
    /////////// DAT SOCKET.IO ////////////////
    ////////////////////////////////////
};
