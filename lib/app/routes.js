'use strict';
// app/routes.js
module.exports = function(app, env) {
  app.get('/', function(req, res) {
    res.render('menu.ejs', {
      layout: false,
      env: env,
    });
  });
  app.get('/global', function(req, res) {
    res.render('global.ejs', {
      layout: false,
      env: 'global',
    });
  });
  app.get('/hydraters', function(req, res) {
    res.render('index.ejs', {
      layout: false,
    	env: env,
    	source: 'hydraters'
    });
  });
  app.get('/providers', function(req, res) {
    res.render('index.ejs', {
      layout: false,
    	env: env,
    	source: 'providers'
    });
  });
};
