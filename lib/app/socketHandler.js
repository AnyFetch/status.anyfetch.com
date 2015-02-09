var config = require('../config/config.js');
var crawler = require('./crawler.js');
var io = require('socket.io').listen(8081);
var intervalObject;
var userCount = 0;

io.on('connection', function(socket) {
  userCount++;
  if(!intervalObject) {
    intervalObject = setInterval(function() {
      crawler(socket);
    }, 2000);
  }

  socket.on('disconnect', function() {
    userCount--;
    if(userCount === 0) {
      clearInterval(intervalObject);
    }
  });
});
