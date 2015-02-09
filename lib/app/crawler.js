//crawler.js
var request = require('request');
var config = require('../config/config.json');

exports.refreshData = function(){
	request.get('url', function(err, res){
		if (err) console.log(err);
		else marketCap = JSON.parse(res.body);
	});
};
