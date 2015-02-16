'use strict';

var request = require('supertest');
var async = require('async');

var savedData = {
  hydraters: [],
  providers: []
};

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
    // We save the last 100 response for later use
    savedData[source].push(results);
    if(savedData[source].length > 100) {
      savedData[source].shift();
    }
    socket.broadcast.emit('data', results);
    socket.emit('data', results);
  });
};

module.exports.sendSavedData = function sendSavedData(socket, source) {
  socket.emit('savedData', savedData[source]);
};
