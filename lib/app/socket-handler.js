'use strict';

module.exports = function socketHandler(config, io) {
  var crawler = require('./crawler.js');
  var intervals = {
    hydraters: null,
    providers: null
  };
  var userCount = {
    hydraters: 0,
    providers: 0
  };

  io.on('connection', function(socket) {
    // source can either be 'providers' or 'hydraters'
    socket.on('source', function(source) {
      socket.join(source);
      socket.emit('urls', config.urls[source]);

      userCount[source] += 1;

      // send cached data
      // if(userCount[source] !== 1) {
      //   crawler.sendSavedData(socket, source);
      // }

      if(!intervals[source]) {
        intervals[source] = setInterval(function() {
          crawler.pollData(socket, config.urls[source], config.timeout, source);
        }, config.pollingInterval);
      }

      // stop polling on disconect if there are no more users
      socket.on('disconnect', function() {
        userCount[source] -= 1;
        if(userCount[source] <= 0) {
          clearInterval(intervals[source]);
          intervals[source] = null;
        }
      });
    });
  });
};
