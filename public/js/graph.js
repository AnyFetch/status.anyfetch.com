var dataArray = [];
var warnings = [];
var meaningfullData = {
  hydraters: 'pending',
  providers: 'pending_documents'
};


function initGraphs(providers) {
  $.each(providers, function(index, value) {
    var dataSet = {
      name: index.charAt(0).toUpperCase() + index.slice(1) + ' provider - ' + value,
      dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
      id: index,
      options: getOptions(),
      html: ''
    };
    dataSet.html = generateHtml(dataSet);
    $('#graph-container').append(dataSet.html);
    dataArray.push(dataSet);
  });
}

function updateAll() {
  dataArray.forEach(function(elem){
    $.plot($('#flot-' + elem.id), elem.dataSet, elem.options);
  })
}

function generateHtml(dataSet) {
  return ("<div class='panel panel-default'><div class='panel-heading'>" +
    dataSet.name + "</div><div id=flot-" + dataSet.id +
    " style='height:300px;'></div></div>");
}

function updateGraphs(data, date, realtime) {
  dataArray.forEach(function(item) {
    if(item.options.yaxis.max < data[item.id][meaningfullData[source]]) {
      item.options.yaxis.max = data[item.id][meaningfullData[source]];
    }
    while(item.dataSet[0].data.length > storedValues) {
      item.dataSet[0].data.shift();
    }
    if(data[item.id][meaningfullData[source]] !== undefined) {
      item.dataSet[0].data.push([date, data[item.id][meaningfullData[source]]]);
    }
    else {
      var found = false;
      if(warnings.length === 0) {
        warnings.push([item.name, 5]);
      }
      else {
        // where 5 is the number of server ticks before the error can disappear
        if(!warnings.some(function(warning) {
          if (warning[0] === item.name) {
            return true;
          }
        })) {
          warnings.push([item.name, 5]);
        }
      }
    }
    for(var j = warnings.length - 1; j > -1; j--) {
      $('#critical-status').append(warnings[j][0] + '</br>');
      if(warnings[j][1] > 0) {
        warnings[j][1] -= 1;
      }
      else {
        warnings.splice(j, 1);
      }
    }
  });
  if (realtime) {
    showWarnings();
    updateAll();
  }
}

function showWarnings() {
  $('#critical-status').empty();
  if(warnings.length !== 0) {
    $('#critical-status').append('<p>Not Responding: ' + warnings.length + '</p>');
    warnings.forEach(function(item) {
      $('#critical-status').append(item[0] + '</br>');
    });
  }
  else {
    $('#critical-status').append('<p>Everything looks good!</p>Documents pending:</br>');
    dataArray.forEach(function(item) {
      $('#critical-status').append(
        item.dataSet[0].data[item.dataSet[0].data.length - 1][1] + ' - ' + item.id + '</br>');
    });
  }
}

function getOptions() {
  var options = {
    series: {
      lines: {
        show: true,
        lineWidth: 1.2,
        fill: true
      }
    },
    xaxis: {
      mode: "time",
      tickSize: [2, "second"],
      tickFormatter: function(v, axis) {
        var date = new Date(v);

        if(date.getSeconds() % 20 === 0) {
          var hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours();
          var minutes = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes();
          var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

          return hours + ":" + minutes + ":" + seconds;
        }
        else {
          return "";
        }
      },
      axisLabel: "Time",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    yaxis: {
      min: 0,
      max: 50,
      axisLabel: "Documents pending",
      axisLabelUseCanvas: true,
      axisLabelFontSizePixels: 12,
      axisLabelFontFamily: 'Verdana, Arial',
      axisLabelPadding: 10
    },
    legend: {
      labelBoxBorderColor: "#fff"
    },
    grid: {
      backgroundColor: "#000000",
      tickColor: "#008040"
    }
  };
  return options;
}
