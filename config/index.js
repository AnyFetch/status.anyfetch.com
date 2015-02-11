var config = require('./config.js');

if(config.env === "production") {
  config.urls = config.productionUrls;
}
else {
  config.urls = config.stagingUrls;
}

module.exports = config;
