var dataArray = [];
var warnings = [];
var meaningFulData = {
  hydraters: 'pending',
  providers: 'pending_documents'
};

var totalDocuments = 0;
var globalFlot = {
    name: 'Global Statistics',
    dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
    id: 'global-statistics',
    options: getOptions(),
    html: "<div class='panel panel-default'><div class='panel-heading'>" +
    'Global statistics' + "</div><div id=flot-" + 'global-statistics' +
    " style='height:300px;'></div></div>"
};

function initGraphs(providers) {
  $('#global-graph').append(globalFlot.html);

  $.each(providers, function(index, value) {
    var dataSet = {
      name: index.charAt(0).toUpperCase() + index.slice(1) + ' ' + source + ' - ' + value,
      dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
      id: index,
      options: getOptions(),
      html: ''
    };
    dataSet.html = generateHtml(dataSet);
    // $('#graph-container').append(dataSet.html);
    var html = '';
    html += '<div class=col-md-4>';
    html += dataSet.html;
    html += '</div>';
    $('#graph-container').append(html);
    dataArray.push(dataSet);
  });
}

function updateAll() {
  $.plot($('#flot-global-statistics'), globalFlot.dataSet, globalFlot.options);
  dataArray.forEach(function(elem) {
    $.plot($('#flot-' + elem.id), elem.dataSet, elem.options);
  });
}

function generateHtml(dataSet) {
  return ("<div class='panel panel-default'><div class='panel-heading'>" +
    dataSet.name + "</div><div id=flot-" + dataSet.id +
    " style='height:300px;'></div></div>");
}

function updateGraphs(data, date, realtime) {
  totalDocuments = 0;
  dataArray.forEach(function(item) {
    if(item.options.yaxis.max < data[item.id][meaningFulData[source]]) {
      item.options.yaxis.max = data[item.id][meaningFulData[source]];
    }
    while(item.dataSet[0].data.length > storedValues) {
      item.dataSet[0].data.shift();
    }
    if(data[item.id][meaningFulData[source]] !== undefined) {
      totalDocuments += [date, data[item.id][meaningFulData[source]]][1];
      item.dataSet[0].data.push([date, data[item.id][meaningFulData[source]]]);
    }
    else {
      if(!warnings.some(function(warning) {
        if(warning[0] === item.name) {
          return true;
        }
      })) {
        warnings.push([item.name, 5]);
      }
    }
  });

  globalFlot.dataSet[0].data.push([new Date().getTime(), totalDocuments]);
  if(globalFlot.options.yaxis.max < totalDocuments) {
    globalFlot.options.yaxis.max = totalDocuments;
  }
  while(globalFlot.dataSet[0].data.length > storedValues) {
    globalFlot.dataSet[0].data.shift();
  }
  for(var j = warnings.length - 1; j > -1; j--) {
    if(warnings[j][1] > 0) {
      warnings[j][1] -= 1;
    }
    else {
      warnings.splice(j, 1);
    }
  }
  if (realtime) {
    showWarnings();
    updateAll();
  }
}

function showWarnings(){
  $('#activity').empty();
  $('#unresponding').empty();
  $('#unresponding').append('<p>' + warnings.length + ' not Responding:</p>');
  warnings.forEach(function(item) {
    $('#unresponding').append(item[0] + '</br>');
  });
  var total = 0;
  dataArray.forEach(function(item) {
    if(item.dataSet[0].data[item.dataSet[0].data.length - 1][1]) {
      total += item.dataSet[0].data[item.dataSet[0].data.length - 1][1];
    }
  });
  $('#activity').append('<p>' + total + ' document' + (total > 1 ? 's' : '') + ' pending:</p>');
  dataArray.forEach(function(item) {
    $('#activity').append(
      item.dataSet[0].data[item.dataSet[0].data.length - 1][1] + ' - ' + item.id + '</br>');
  });
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
