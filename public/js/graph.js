'use strict';

var Graph = function Graph(source) {
  this.storedValues = 100;
  this.source = source;
  this.dataArray = [];
  this.warnings = [];
  this.meaningFulData = {
    hydraters: 'pending',
    providers: 'pending_documents'
  };

  this.totalDocuments = 0;
  this.globalFlot = {
    name: 'Global Statistics',
    dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
    id: 'global-statistics',
    options: this.getOptions(),
    html: "<div class='panel panel-default'><div class='panel-heading'>" +
    'Global statistics' + "</div><div id=flot-" + 'global-statistics' +
    " style='height:300px;'></div></div>"
  };
};

Graph.prototype.initGraphs = function(providers) {
  $('#global-graph').append(this.globalFlot.html);

  $.each(providers, function(index, value) {
    var dataSet = {
      name: index.charAt(0).toUpperCase() + index.slice(1) + ' ' + this.source + ' - ' + value,
      dataSet: [{label: "Documents pending", data: [], color: "#00FF00"}],
      id: index,
      options: this.getOptions(),
      html: ''
    };
    dataSet.html = this.generateHtml(dataSet);
    // $('#graph-container').append(dataSet.html);
    var html = '';
    html += '<div class=col-md-4>';
    html += dataSet.html;
    html += '</div>';
    $('#graph-container').append(html);
    this.dataArray.push(dataSet);
  }.bind(this));
};

Graph.prototype.updateAll = function() {
  $.plot($('#flot-global-statistics'), this.globalFlot.dataSet, this.globalFlot.options);
  this.dataArray.forEach(function(elem) {
    $.plot($('#flot-' + elem.id), elem.dataSet, elem.options);
  });
};

Graph.prototype.generateHtml = function(dataSet) {
  return ("<div class='panel panel-default'><div class='panel-heading'>" +
    dataSet.name + "</div><div id=flot-" + dataSet.id +
    " style='height:300px;'></div></div>");
};

Graph.prototype.updateGraphs = function(data, date, realtime) {
  this.totalDocuments = 0;
  this.dataArray.forEach(function(item) {
    if(item.options.yaxis.max < data[item.id][this.meaningFulData[this.source]]) {
      item.options.yaxis.max = data[item.id][this.meaningFulData[this.source]];
    }
    while(item.dataSet[0].data.length > this.storedValues) {
      item.dataSet[0].data.shift();
    }
    if(data[item.id][this.meaningFulData[this.source]] !== undefined) {
      this.totalDocuments += [date, data[item.id][this.meaningFulData[this.source]]][1];
      item.dataSet[0].data.push([date, data[item.id][this.meaningFulData[this.source]]]);
    }
    else {
      if(!this.warnings.some(function(warning) {
        if(warning[0] === item.name) {
          return true;
        }
      })) {
        this.warnings.push([item.name, 5]);
      }
    }
  }.bind(this));

  this.globalFlot.dataSet[0].data.push([new Date().getTime(), this.totalDocuments]);
  if(this.globalFlot.options.yaxis.max < this.totalDocuments) {
    this.globalFlot.options.yaxis.max = this.totalDocuments;
  }
  while(this.globalFlot.dataSet[0].data.length > this.storedValues) {
    this.globalFlot.dataSet[0].data.shift();
  }
  for(var j = this.warnings.length - 1; j > -1; j--) {
    if(this.warnings[j][1] > 0) {
      this.warnings[j][1] -= 1;
    }
    else {
      this.warnings.splice(j, 1);
    }
  }
  if(realtime) {
    this.showWarnings();
    this.updateAll();
  }
};

Graph.prototype.showWarnings = function(){
  $('#activity').empty();
  $('#unresponding').empty();
  $('#unresponding').append('<p>' + this.warnings.length + ' not Responding:</p>');
  this.warnings.forEach(function(item) {
    $('#unresponding').append(item[0] + '</br>');
  });
  var total = 0;
  this.dataArray.forEach(function(item) {
    if(item.dataSet[0].data[item.dataSet[0].data.length - 1][1]) {
      total += item.dataSet[0].data[item.dataSet[0].data.length - 1][1];
    }
  });
  $('#activity').append('<p>' + total + ' document' + (total > 1 ? 's' : '') + ' pending:</p>');
  this.dataArray.forEach(function(item) {
    $('#activity').append(
      item.dataSet[0].data[item.dataSet[0].data.length - 1][1] + ' - ' + item.id + '</br>');
  });
};

Graph.prototype.getOptions = function() {
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
};
