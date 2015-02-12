'use strict';

var request = require('supertest');
var async = require('async');

var savedData = [];

module.exports.pollData = function pollData(socket, urls, timeout) {
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
    // We save the last 100 response for later use
    savedData.push(results);
    if(savedData.length > 100) {
      savedData.shift();
    }
    socket.broadcast.emit('data', results);
    socket.emit('data', results);
  });
};

module.exports.sendSavedData = function sendSavedData(socket) {
  socket.emit('savedData', savedData);
};
