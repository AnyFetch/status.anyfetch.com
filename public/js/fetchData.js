jQuery(function() {
  var socket = io('http://localhost:8081');
  socket.on('data', function(res) {
    console.log(res);
    var date = new Date().getTime();
    updateGraphs(res, date);
  });
  socket.on('urls', function(urls) {
    initGraphs(urls);
  });
});
