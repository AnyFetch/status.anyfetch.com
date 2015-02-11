var request = require('supertest');
var async = require('async');

var savedData = [];

exports.pollData = function(socket, urls, timeout) {
  var results = {};

  async.map(urls, function(url, cb) {
    request(url[1])
    .get('/status')
    .timeout(timeout)
    .expect(200)
    .end(function(err, res) {
      results[url[0]] =  err ? -1 : res.body;
      cb();
    });
  }, function() {
    savedData.push(results);
    if(savedData.length > 100) {
      savedData.shift();
    }
    socket.broadcast.emit('data', results);
    socket.emit('data', results);
  });
};

exports.sendSavedData = function(socket) {
  socket.emit('savedData', savedData);
};
