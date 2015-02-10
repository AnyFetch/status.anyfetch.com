var urlsList = null;

jQuery(function() {
  $("#slider").slider({
    value: 100,
    min: 0,
    max: 1000,
    step: 50,
    slide: function(event, ui) {
      $("#slider-value").html(ui.value);
    }
  });

  $("#slider-value").html($('#slider').slider('value'));

  var socket = io('http://localhost:8081');

  socket.on('data', function(res) {
    var date = new Date().getTime();
    updateGraphs(res, date);
  });

  socket.on('urls', function(urls) {
    if(urlsList) {
      for(var i = 0; i < urls.length; i++) {
        $('.flot-' + urls[i][0]).remove();
      }
    }
    urlsList = urls;
    initGraphs(urls);
  });
});
