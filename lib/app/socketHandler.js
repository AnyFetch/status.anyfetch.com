var io = require('socket.io').listen(8081);

var crawler = require('./crawler.js');
var intervalProduction;
var userCount = 0;


module.exports = function(config) {
  io.on('connection', function(socket) {
    socket.emit('urls', config.urls);
    userCount++;

    if (userCount !==1) {
      crawler.sendSavedData(socket);
    }

    if(!intervalProduction) {
      intervalProdution = setInterval(function() {
        crawler.pollData(socket, config.urls, config.timeout);
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
};
