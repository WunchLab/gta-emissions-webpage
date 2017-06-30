$(function() {
  initializeMap();
});
// Define some Variables
var txt = "2";
var dataArray = [];
legend = L.control({position: 'bottomright'}),
div = L.DomUtil.create('div', 'info legend');
j = 1

function initializeMap() {                                    //Set initial conditions of map
  var map = L.map('map');    //Center the map to these coordinates originally; set zoom
  var mapMarkers = [];

  //Call the map tile to be used. This is from 'mapbox'
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 25,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);                     // Add the tile to the map
  L.control.scale().addTo(map);            // Add scale to map



//Initialize legend by creating div element
var legend = L.control({position: 'bottomright'});
legend.onAdd = function (map) {
  div.innerHTML = ''
  return div;
};
legend.addTo(map);


  //Define a Function which will poll data from 'datasource.txt'
  (function pollDataSource() {
//    setTimeout(function() {
      $.ajax({                                    // This block does the bulk of the work:
        url: "../data_record_2017-06-27.txt",     // "Ajax" tells the browser to perform these tasks
        cache: false,                             // behind the scenes. If successful, the information
        success: function(data) {                 // polled from datasource.txt is passed to the processData
          processData(map, mapMarkers, data);     // function.
        },
        error: function() {                       // If polling unsuccessful, return the following error
          alert("Error encountered while polling data source.");
        },
//        complete: pollDataSource                // This calls the pollDataSource function again,
      });                                         // leading to an infinite loop.
//    }, 10000);                                  // This is the argument passed to the 'setTimeout' function.
  })();                                           // It simply inserts a 1000 ms time delay before
}                                                 // the next polling call

function round(number, decimals) {
  return (Math.round(number * Math.pow(10, decimals)))/Math.pow(10, decimals);
}

function checkifNaN (value) {
  if (isNaN(value) || value === 'nan') {
    return "Unknown"
  }
  else {
    return value
  }
}


function getColor(d, array) {
  if (d === NaN){
    color = 'grey'
  }
  if (array.length > 1){
    var max = Math.max.apply(Math, dataArray)
    var min = Math.min.apply(Math, dataArray)
    var delta = (max - min)
    var x = ((d - min)/delta)
    var r = Math.floor(x * 255.)
    var g = 0
    var b = 255. - Math.floor(x * 255.)
    color = "rgb("+r+" ,"+g+","+ b+")"
  
    } else if (array.length < 2){
      color = 'white'
  }
  return color;
}

function scaleLength(d) {
  var max = 20.
  var min = 0.
  var delta = (max - min)
  var x = ((d - min)/delta)*100

  return x ;
}

legend.update = function(dataArray) {
        grades = [],
        intervals = 8,
        gradeInterval = round((Math.max.apply(Math, dataArray) - Math.min.apply(Math, dataArray))/intervals, 3),
        labels = [];
        
  // Create an array of grades by incrementally adding to the min value
  for (var i = 0; i < 8; i++) {
      grades.push(round((Math.max.apply(Math, dataArray) - (gradeInterval * i)), 3));
    }
  // Add title to the legend
  div.innerHTML += '<b>CO' + txt.sub() + ' (ppm)</b><br>'
  for (var i = 0; i < intervals; i++) {
        div.innerHTML +=
              '<i style="background:' + getColor(grades[i], dataArray) + '"></i> ' +
              //grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
              grades[i] + (grades[i + 1] ? '<br>' : '+');

    }      
}

// Create an array of all values to be plotted
function getDataArray(data) {
  var dataRows = data.replace(/\s/g, '').split(";");
  for (i = 0; i < dataRows.length - 1; i++) {
    var dataComponents = dataRows[i].split(",");
    var CO2 = dataComponents[11]; 
    if (isNaN(CO2) === false) {
      dataArray.push(CO2);
    }
  }
return dataArray ;
};

function getBounds(data) {
  var latLngArray = [];
  var dataRows = data.replace(/\s/g, '').split(";");
  if (dataRows.length > 601) {
    startingIndex = dataRows.length - 601
  } else {
    startingIndex = 0
    }
  for (i = startingIndex; i < dataRows.length - 1; i++) {
    var dataComponents = dataRows[i].split(",");
    var lat = dataComponents[1];
    var lon = dataComponents[2];
    var arr = new Array([lat, lon]);
    if (checkifNaN(lat) != "Unknown" && checkifNaN(lon) != "Unknown"){
      latLngArray.push(arr);
    }
  }
return latLngArray ;
};

function processData(map, mapMarkers, data) {                               //  Here we define what happens to the data that got polled from datasource.txt.
  var dataArray = getDataArray(data);
  if (map && mapMarkers && data) {
    div.innerHTML='';
    if (legend === undefined){
      legend.addTo(map);
    };
    
    var dataRows = data.replace(/\s/g, '').split(";");
    var startingIndex = 0;
    if (dataRows.length > 601 ) {
      startingIndex = dataRows.length - 601;
    } else if (dataRows.length < 601 ) {
      for (i = dataRows.length - 1; i < 600; i++) {
        if (mapMarkers[i] && mapMarkers[i][0] instanceof L.Marker) {
          map.removeLayer(mapMarkers[i][0]);
          
        }

        if (mapMarkers[i] && mapMarkers[i][1] instanceof L.CircleMarker) {
          map.removeLayer(mapMarkers[i][1]);
        }
      }
    }
  
    for (i = startingIndex; i < dataRows.length - 1; i++) {
      try {
        if (mapMarkers[i - startingIndex] && mapMarkers[i - startingIndex][0] instanceof L.Marker) {
          map.removeLayer(mapMarkers[i - startingIndex][0]);
        }

        if (mapMarkers[i - startingIndex] && mapMarkers[i - startingIndex][1] instanceof L.CircleMarker) {
          map.removeLayer(mapMarkers[i - startingIndex][1]);
        }

        var dataComponents = dataRows[i].split(",");                // Break up line i in datasource by commas,                                     
        var timeStamp = dataComponents[0];                          // call this the variable 'dataComponents'.
        var latitude = dataComponents[1];                           // We set a variable for each parameter in datasource.txt.
        var longitude = dataComponents[2];
        var temperature = dataComponents[4];
        var windDirection = dataComponents[5];
        var windSpeed = dataComponents[6];                          //Speed in m/s
        var pressure = dataComponents[7];
        var avgTime = dataComponents[14];
        var CH4 = dataComponents[10];
        var H2O = dataComponents[13];
        var CO2 = dataComponents[11];
	      var CO = dataComponents[12];

        var arrow_icon = L.icon({
            iconUrl: 'https://cdn1.iconfinder.com/data/icons/simple-arrow/512/arrow_24-128.png',
            iconSize:     [50, scaleLength(windSpeed)],  // size of the icon [width,length]
            iconAnchor: [25, scaleLength(windSpeed)],    // Location on the icon which corresponts to it's actual position (pixels in x-y coordinates from top left)
            });

        var arrowMarker = new L.marker([latitude, longitude], {
          icon: arrow_icon,
          rotationAngle: windDirection
        });

        var circleMarker = new L.circleMarker([latitude, longitude], {                     //  We Create a marker positioned and colored corresponding to the data passed
          color: getColor(CO2, dataArray),                                                            // from datasource.txt.
          radius: 9,
          opacity: 0.9,
          fillOpacity: 0.9
          }).bindPopup(
            "<p>Time (UTC): "                     + timeStamp.substring(0, 10)         + ' '
          + timeStamp.substring(10, 12)  +  ':'   + timeStamp.substring(12, 14)        + ':'
          + timeStamp.substring(14, 16)  +  '.'   + timeStamp.slice(-2)                + "</p>"
          + "<p>Temperature (C): "           + temperature                             + "</p>"
          + "<p>Wind Direction: "            + checkifNaN(round(windDirection, 2))     + "</p>"
          + "<p>Wind Speed: "                + checkifNaN(round(windSpeed, 2))         + " m/s</p>"
          + "<p>Pressure: "                  + pressure                                + " hPa</p>"
          + "<p>Methane: "                   + checkifNaN(round(CH4, 2))           +   " ppm</p>" 
          + "<p>Water: "                     + checkifNaN(round(H2O, 2))           +   " ppm</p>"
          + "<p>CO: "                        + checkifNaN(round(CO, 2))            +   " ppm</p>"
          + "<p>Carbon Dioxide: "            + checkifNaN(round(CO2, 2))           +   " ppm</p>");     // Add a popup tag which will show if someone clicks on the dot.

        mapMarkers[i - startingIndex] = [];
        mapMarkers[i - startingIndex][0] = arrowMarker;
        mapMarkers[i - startingIndex][1] = circleMarker;

        map.addLayer(mapMarkers[i - startingIndex][0]);
        map.addLayer(mapMarkers[i - startingIndex][1]);
    
      } catch(err) {

      }
    }
    if (dataArray.length > 0 ) 
      {legend.update(dataArray)};
    if (j === 1) {
      var bounds = L.latLngBounds(getBounds(data));
    if (bounds) {
      map.fitBounds(bounds,{paddingTopLeft: [20, 0], paddingBottomRight: [0, 20], maxZoom: 20});
      }
    }
    j = j + 1;
  }
}


