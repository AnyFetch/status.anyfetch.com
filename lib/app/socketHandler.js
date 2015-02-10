var io = require('socket.io').listen(8081);

var config = require('../config/config.js');
var crawler = require('./crawler.js');
var intervalProduction;
var userCount = 0;

io.on('connection', function(socket) {
  userCount++;
  socket.emit('urls', config.urls);

  if(!intervalProduction) {
    intervalProdution = setInterval(function() {
      crawler(socket, config.urls, config.timeout);
    }, config.pollingInterval);
  }

  socket.on('disconnect', function() {
    userCount--;
    if(userCount === 0) {
      clearInterval(intervalProduction);
      intervalProduction = null;
    }
  });
});
