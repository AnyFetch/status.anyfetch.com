'use strict';

function handleNamespace(config, urls, namespace) {
  var crawler = require('./crawler.js');
  var intervalProduction;
  var userCount = 0;

  namespace.on('connection', function(socket) {
    socket.emit('urls', urls);
    userCount += 1;

    if(userCount !== 1) {
      crawler.sendSavedData(socket);
    }

    if(!intervalProduction) {
      intervalProduction = setInterval(function() {
        crawler.pollData(socket, urls, config.timeout);
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
}

module.exports = function socketHandler(config, io) {
  var hydratersNs = io.of('/hydraters');
  var providersNs = io.of('/providers');

  handleNamespace(config, config.urls.hydraters, hydratersNs);
  handleNamespace(config, config.urls.providers, providersNs);
};
