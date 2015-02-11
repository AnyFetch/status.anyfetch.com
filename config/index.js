var config = require('./config.js');

config.urls = config[config.env];

module.exports = config;
