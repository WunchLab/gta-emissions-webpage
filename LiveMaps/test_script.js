// Make a function that checks if we are plotting wind only
function plotWind() {
  var path = window.location.pathname;
  var variable = path.split("/").slice(-2, -1)[0];
  if (variable === "Wind") {
    return true ;
  }
}

// Determine which variable the map will plot
function getVar(pressure, CO2, CO, CH4, temperature, H2O) {
  var varDict = {
    "Air_Pressure": pressure,
    "Carbon_Dioxide": CO2,
    "Carbon_Monoxide": CO,
    "Methane": CH4,
    "Temperature": temperature,
    "Water_Vapour": H2O
  };
  var path = window.location.pathname;
  var variable = path.split("/").slice(-2, -1)[0];
  var gas = varDict[variable]; 
  return gas; 
}

// Get text to put in legend based on variable being plotted
var txt2 = "2";
var txto = "o";

legendDict = {
    "Pressure": "Pressure (hPa)",
    "Carbon Dioxide": "CO" + txt2.sub() + " (ppm)",
    "CO": "CO (ppm)",
    "Methane": "Methane (ppm)",
    "Temperature": "Temperature ("+ txto.sup() + "C)",
    "Water Vapour": "H" +  txt2.sub() + "O (ppm)"
}
var path = window.location.pathname;
var variable = path.split("/").slice(-2, -1)[0];



$(function() {
  initializeMap();
});

//Define some Variables
var dataArray = [];
var pltNum = 120;                                      //Number of data points to be plotted
legend = L.control({position: 'bottomright'}),
div = L.DomUtil.create('div', 'info legend');
j = 1

  
function initializeMap() {
  var targets = L.layerGroup();
                                    
  L.marker([43.648349, -79.386162]).bindPopup("Pearl power station").addTo(targets);
  L.marker([43.657632, -79.385199]).bindPopup("Walton Steam Plant").addTo(targets);
  L.marker([43.643837, -79.355271]).bindPopup("GFL Solid Waste Transfer Station").addTo(targets);

  var CH4_markers = L.layerGroup(),
      CO2_markers = L.layerGroup(),
      CO_markers = L.layerGroup(),
      H2O_markers = L.layerGroup(),
      temp_markers = L.layerGroup(),
      press_markers = L.layerGroup(),
      wind_markers = L.layerGroup();

     
  //Call the map tile to be used. This is from 'mapbox'
  var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                        '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
                        'Imagery © <a href="http://mapbox.com">Mapbox</a>',
      mbUrl = 'https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

  var grayscale   = L.tileLayer(mbUrl, {id: 'mapbox.light', attribution: mbAttr}),
      streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr});

  var baseMaps = {
      "Streets": streets,
      "Grayscale": grayscale
  };

  var baseLayers = {
      "Methane": CH4_markers,
      "Carbon Dioxide": CO2_markers,
      "CO": CO_markers,
      "Water Vapour": H2O_markers,
      "Temperature": temp_markers,
      "Pressure": press_markers

  };
  
  var overlays = {
     "Wind": wind_markers,
     "Targets": targets
  };
  
  
   
  var map = L.map('map', {
      layers: [streets, CH4_markers]
  });

      
  L.control.layers(baseMaps).addTo(map);
  //  L.control.layers(baseLayers, overlays).addTo(map);
  L.control.scale().addTo(map);



//Initialize legend by creating div element
if (plotWind() != true) {
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    div.innerHTML = ''
    return div;
  };
  legend.addTo(map);
}


  // Poll Data from datasource.txt
  (function pollDataSource() {
    $.ajax({                                     // Do one initial poll using ajax, that way the first dots show up 
        url: "datasource.txt",                // as soon as the page is loaded. If successfull, we pass the polled
        cache: false,                            // data to processdata(). Next, we do the same thing iteratively with
        success: function(data) {                // a time delay between iterations.
          processData(map, baseLayers, overlays, data);     
        },
        error: function() {           
          alert("Error encountered while polling data source.");
        },      
      });
    setTimeout(function() {
      j = j + 1
      $.ajax({                                    // This block does the bulk of the work:
        url: "datasource.txt",                 // "Ajax" tells the browser to perform these tasks
        cache: false,                             // behind the scenes. If successful, the information
        success: function(data) {                 // polled from datasource.txt is passed to the processData
          processData(map, baseLayers, overlays, data);     // function.
        },
        error: function() {                       // If polling unsuccessful, return the following error
          alert("Error encountered while polling data source.");
        },
        complete: pollDataSource                  // This calls the pollDataSource function again,
      });                                         // leading to an infinite loop.
    }, 15000);                                    // This is the argument passed to the 'setTimeout' function.
  })();                                           // It simply inserts a 1000 ms time delay before
}                                                 // the next polling call


// Define a function which will round numbers
function round(number, decimals) {
  return (Math.round(number * Math.pow(10, decimals)))/Math.pow(10, decimals);
};

// Define a function to return "Unknown" if a value is NaN
function checkifNaN (value) {
    if (isNaN(value) || value === "nan"){
      return "Unknown"
  }
  else {
    return value
  }
};

// Make a function which calculates average of an array
// careful not to call this fn if array.length = 0
function avg(array) {
  var sum = 0;
  for(var i = 0, l =  array.length; i < l; i++) {
    sum += parseFloat(array[i])
  }

  var avg = sum/(array.length);
  return avg;
};

// Find the standard deviation of an array
function sigma(array) {
  var mean = avg(array);
  var variance = avg(array.map(function(num) {
      return Math.pow(parseFloat(num) - mean, 2)
      }));
  return Math.sqrt(variance);
};

function median(arr){
  arr = arr.sort(function(a, b){ return a - b; });
  var i = arr.length / 2;
  return i % 1 == 0 ? (arr[i - 1] + arr[i]) / 2 : arr[Math.floor(i)];
}

// Get the color of the dot to be plotted based on Max and Mins
// Take the variable as an input to determine which scale to use.
function getColor(value, variable, dataArray, layer_group) {
  if (value === NaN || value === "nan"){
    color = 'grey'
  }
  
  if (dataArray.length < 2) {
    color = "black"
  }
  if (dataArray.length > 0) {
    var max = (2 * parseFloat(sigma(dataArray))) + parseFloat(median(dataArray)),
        min = Math.min.apply(Math, dataArray);


    if (value > max) { 
      color = "red"}
    else if (value < min) {
      color = "blue"}
    else { 
      var delta = (max - min);
      var x = ((value - min)/delta)
      var r = Math.floor(x * 255.);
      var g = 0;
      var b = 255. - Math.floor(x * 255.);
      var color = "rgb(" + r + " ," + g + "," + b + ")";
    }
  }
  return color
};


// Scale the length of the arrows which will represent wind
function scaleLength(d) {
  var max = 20.
  var min = 0.
  var delta = (max - min)
  var x = ((d - min)/delta)*100

  return x ;
};

// Update the legend based on the max and min values
legend.update = function(dataArray, variable, layer_group) {
        grades = [],
        intervals = 7,
        min = Math.min.apply(Math, dataArray),
        max = (2 * parseFloat(sigma(dataArray))) + parseFloat(median(dataArray)),
        gradeInterval = round((max - min)/intervals, 2);
        
  // Create an array of grades by incrementally adding to the min value
  // Start from the max and go down to the min in order to get larger values at top of legend
  for (var i = 0; i < intervals + 1; i++) {
      grades.push(round((max - (gradeInterval * i)), 3));
    }
  // Add title to the legend
  div.innerHTML += "<b>" + legendDict[variable] + "</b><br>"
  for (var i = 0; i < intervals + 1; i++) {
    if (i === 0) {
      div.innerHTML +=
              '<i style="background:' + getColor(grades[i], variable, dataArray, layer_group) + '"></i> ' 
              + grades[i] + ' +<br>';
    }
      div.innerHTML +=
              '<i style="background:' + getColor(grades[i], dataArray, dataArray, layer_group) + '"></i> ' 
              + grades[i] + (grades[i + 1] ? '<br>' : '');
    }      
}

// Create an array of all values to be plotted
function getDataArray(data, dataArrays, baseLayers) {
  var dataRows = data.replace(/\s/g, '').split(";");
  if (dataRows.length > (pltNum + 1)) {
    startingIndex = dataRows.length - (pltNum + 1)
  } else {
    startingIndex = 0
    }
  for (var i = startingIndex, l = dataRows.length - 1; i < l; i++) {
    var dataComponents = dataRows[i].split(",");
    var dataDict = {
            "timeStamp":      dataComponents[0],                          // call this the variable 'dataComponents'.
            "latitude":       dataComponents[1],                         // We set a variable for each parameter in datasource.txt.
            "longitude":      dataComponents[2],
            "Temperature":    dataComponents[4],
            "windDirection":  dataComponents[5],
            "windSpeed":      dataComponents[6],                          //Speed in m/s
            "Pressure":       dataComponents[7],
            "avgTime":        dataComponents[14],
            "Methane":        dataComponents[10],
            "Water Vapour":   dataComponents[13],
            "Carbon Dioxide": dataComponents[11],
            "CO":             dataComponents[12],
        };

    for (var key in baseLayers) {
      //Update contents of relevant data array
      if (isNaN(dataDict[key]) === false) {
        dataArrays[key].push(dataDict[key])
      }
      // Remove values from data array which won't be plotted
      if (dataArrays[key].length === pltNum) {
        dataArrays[key].shift()
      }
    }
  }
return dataArrays ;
};

// Make a latLngBound array of all lat and longs
function getBounds(data) {
  var latLngArray = [];
  var dataRows = data.replace(/\s/g, '').split(";");
  if (dataRows.length > (pltNum + 1)) {
    startingIndex = dataRows.length - (pltNum + 1)
  } else {
    startingIndex = 0
    }
  for (i = startingIndex; i < dataRows.length - 1; i++) {
    var dataComponents = dataRows[i].split(",");
    var lat = dataComponents[1];
    var lon = dataComponents[2];
    var arr = new Array([lat, lon]);
    if (checkifNaN(lat) != "Unknown" && checkifNaN(lon) != "Unknown") {
      latLngArray.push(arr);
    }
  }
return latLngArray ;
};


//  Here we define what happens to the data that got polled from datasource.txt.
function processData(map, baseLayers, overlays, data) { 

  //reset the data arrays
  var dataArrays = {
    "Methane": [],
    "Carbon Dioxide": [],
    "CO": [],
    "Water Vapour": [],
    "Temperature": [],
    "Pressure": []
  };
                               
  var dataArrays = getDataArray(data, dataArrays, baseLayers);

  // Check that all required parameters exist
  if (map && baseLayers && overlays && data) {

    // Add the legend if it is undefined and wipe its contents
    if (legend === undefined){
      legend.addTo(map);
    }
    div.innerHTML="";


    // Make function to change legend when baselayer is changed
    map.on({
      baselayerchange: function(e) {
      div.innerHTML=""
      for (var key in baseLayers) {
        if (e.name === key) {
          legend.update(dataArrays[key], key, baseLayers)
        }
      }
      }
    });

    for (var key in baseLayers) {
      // Update the legend
      if (map.hasLayer(baseLayers[key])) {
        legend.update(dataArrays[key], key, baseLayers)
      }
    }

    var dataRows = data.replace(/\s/g, '').split(";");
    var startingIndex = 0;
    if (dataRows.length > (pltNum + 1) ) {                                  
      startingIndex = dataRows.length - (pltNum + 1);                       
    } 
    else if (dataRows.length < (pltNum + 1)) {                                   
      for (var key in baseLayers) {
        if (baseLayers.hasOwnProperty(key)) {
        // If there are fewer data rows than points we want to plot, 
        // remove the last pltNum number of points, if they exist.

          for (i = dataRows.length - 1; i < pltNum; i++) {
            if (baseLayers[key][i] && baseLayers[key][i] instanceof L.CircleMarker) { 
              map.removeLayer(baseLayers[key][i]);
            }
            if (overlays["Wind"][i] && overlays["Wind"][i] instanceof L.Marker) {
              map.removeLayer(overlays["Wind"][i]);
            }
          }
        }
      } 
    }   

    for (i = startingIndex; i < dataRows.length - 1; i++) {
    // Remove all pre-existing markers and replace with updated markers
      try {
        for (var key in baseLayers) {
          if (baseLayers[key][i - startingIndex] && baseLayers[key][i - startingIndex] instanceof L.Marker) {
            map.removeLayer(baseLayers[key][i - startingIndex]);
          }
        }
        if (overlays["Wind"][i - startingIndex] && overlays["Wind"][i - startingIndex] instanceof L.Marker) {
          map.removeLayer(overlays["Wind"][i - startingIndex]);
        }
     
        var dataComponents = dataRows[i].split(",");                // Break up line i in datasource by commas,                                     
        var dataDict = {
            "timeStamp":      dataComponents[0],                          // call this the variable 'dataComponents'.
            "latitude":       dataComponents[1],                         // We set a variable for each parameter in datasource.txt.
            "longitude":      dataComponents[2],
            "Temperature":    dataComponents[4],
            "windDirection":  dataComponents[5],
            "windSpeed":      dataComponents[6],                          //Speed in m/s
            "Pressure":       dataComponents[7],
            "avgTime":        dataComponents[14],
            "Methane":        dataComponents[10],
            "Water Vapour":   dataComponents[13],
            "Carbon Dioxide": dataComponents[11],
            "CO":             dataComponents[12],
        };

        if (checkifNaN(dataDict["windDirection"]) != "Unknown" || checkifNaN(dataDict["windSpeed"]) != "Unknown") { 
          var arrow_icon = L.icon({
              iconUrl: 'https://cdn1.iconfinder.com/data/icons/simple-arrow/512/arrow_24-128.png',
              iconSize:     [50, scaleLength(dataDict["windSpeed"])],  // size of the icon [width,length]
              iconAnchor: [25, scaleLength(dataDict["windSpeed"])],    // Location on the icon which corresponts to it's actual position (pixels in x-y coordinates from top left)
              });

          var arrowMarker = new L.marker([dataDict["latitude"], dataDict["longitude"]], {
            icon: arrow_icon,
            rotationAngle: parseFloat(dataDict["windDirection"]) + 180
            });
        }

        for (var key in baseLayers) {
          //  Create a marker positioned and colored corresponding to the data passed from datasource.txt
          var circleMarker = new L.circleMarker([ dataDict["latitude"], dataDict["longitude"] ], {  
            color: getColor(dataDict[key], key, dataArrays[key], baseLayers),                       
            radius: 5,
            opacity: 0.9,
            fillOpacity: 0.9
            }).bindPopup(
              "<p>Time (UTC): "            + dataDict["timeStamp"].substring(0, 10) + "  " + dataDict["timeStamp"].substring(10, 18)   + "</p>"
            + "<p>Temperature: "           + dataDict["Temperature"]                + " "  + txto.sup() + "C</p>"
            + "<p>Wind Direction: "        + checkifNaN(round(dataDict["windDirection"], 2))     + " " + txto.sup() +  "</p>"
            + "<p>Wind Speed: "            + checkifNaN(round(dataDict["windSpeed"], 2))         + " m/s</p>"
            + "<p>Pressure: "              + dataDict["Pressure"]                                + " hPa</p>"
            + "<p>Methane: "               + checkifNaN(round(dataDict["Methane"], 2))           + " ppm</p>" 
            + "<p>Water: "                 + checkifNaN(round(dataDict["Water Vapour"], 2))      + " ppm</p>"
            + "<p>CO: "                    + checkifNaN(round(dataDict["CO"], 2))                + " ppm</p>"
            + "<p>Carbon Dioxide: "        + checkifNaN(round(dataDict["Carbon Dioxide"], 2))    + " ppm</p>");     // Add a popup tag which will show if someone clicks on the dot.
            baseLayers[key][i - startingIndex] = baseLayers[key]
            .addLayer(circleMarker)
        };
        
        overlays["Wind"][i - startingIndex] = overlays["Wind"]
        .addLayer(arrowMarker)
        
      // try condition ends here
      } catch(err) {
      }

    // for loop ends here
    }
    
    
    // Centre the view on the points (only first time)
    if (j === 1) {
      // Add the baseLayers and overlays control to the map (first time only)
      L.control.layers(baseLayers, overlays).addTo(map);
      var bounds = L.latLngBounds(getBounds(data));
      if (bounds) {
        map.fitBounds(bounds,{paddingTopLeft: [20, 0], paddingBottomRight: [0, 20], maxZoom: 20});
      }
    }
    
    j = j + 1;
  }
}

