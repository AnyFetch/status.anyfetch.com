'use strict';

var request = require('supertest');
var async = require('async');

module.exports.pollData = function pollData(socket, urls, timeout, source) {
  var results = {};

  // We call every /status and gather responses into the results object
  async.map(Object.keys(urls), function(url, cb) {
    request(urls[url])
    .get('/status')
    .timeout(timeout)
    .expect(200)
    .end(function(err, res) {
      results[url] =  err ? -1 : res.body;
      cb();
    });
  }, function() {
    socket.broadcast.to(source).emit('data', results);
    socket.emit('data', results);
  });
};
