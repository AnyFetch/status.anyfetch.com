var request = require('supertest');
var async = require('async');

var config = require('../config/config.js');
var timeout = 1000;


module.exports = function pollData(socket) {
  var results = {};

  async.map(config.urls, function(url, cb) {
    request(url[1])
    .get('/status')
    .timeout(timeout)
    .expect(200)
    .end(function(err, res) {
      results[url[0]] =  err ? err : res.body;
      cb();
    });
  }, function() {
    socket.broadcast.emit('data', results);
    socket.emit('data', results);
  });
};
