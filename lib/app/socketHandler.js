var io = require('socket.io').listen(8081);

var config = require('../config/config.js');
var crawler = require('./crawler.js');
var intervalObject;
var userCount = 0;


io.on('connection', function(socket) {
  userCount++;
  if(!intervalObject) {
    intervalObject = setInterval(function() {
      console.log(new Date() + ' - polling data.');
      crawler(socket);
    }, config.pollingInterval);
  }

  socket.on('disconnect', function() {
    userCount--;
    if(userCount === 0) {
      clearInterval(intervalObject);
      intervalObject = null;
    }
  });
});
