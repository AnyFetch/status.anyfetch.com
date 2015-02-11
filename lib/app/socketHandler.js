'use strict';

var crawler = require('./crawler.js');
var intervalProduction;
var userCount = 0;


module.exports = function(config, io) {
  io.on('connection', function(socket) {
    socket.emit('urls', config.urls);
    userCount += 1;

    if(userCount !== 1) {
      crawler.sendSavedData(socket);
    }

    if(!intervalProduction) {
      intervalProduction = setInterval(function() {
        crawler.pollData(socket, config.urls, config.timeout);
      }, config.pollingInterval);
    }

    socket.on('disconnect', function() {
      userCount -= 1;
      if(userCount === 0) {
        clearInterval(intervalProduction);
        intervalProduction = null;
      }
    });
  });
};
