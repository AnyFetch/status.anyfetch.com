var request = require('supertest');
var async = require('async');

module.exports = function pollData(socket, urls, timeout) {
  var results = {};

  async.map(urls, function(url, cb) {
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
