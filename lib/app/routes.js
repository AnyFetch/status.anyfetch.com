// app/routes.js
module.exports = function(app, env) {
  app.get('/', function(req, res) {
    res.render('index.ejs', {
      layout: false,
    	env: env
    });
  });
};
