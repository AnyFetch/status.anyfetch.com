'use strict';
// app/routes.js
module.exports = function(app, env) {
  app.get('/hydraters', function(req, res, next) {
    res.render('index.ejs', {
      layout: false,
    	env: env,
    	source: 'hydraters'
    });
    next();
  });
  app.get('/providers', function(req, res, next) {
    res.render('index.ejs', {
      layout: false,
    	env: env,
    	source: 'providers'
    });
    next();
  });
};
