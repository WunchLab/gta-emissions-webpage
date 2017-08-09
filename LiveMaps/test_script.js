
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



$(function() {
  initializeMap();
});

//Define some Variables
var pltNum = 120;                                      //Number of data points to be plotted
legend = L.control({position: 'bottomleft'}),
div = L.DomUtil.create('div', 'info legend');
j = 1

  
function initializeMap() {
  var targets = L.layerGroup();
                                    
  L.marker([43.648349, -79.386162]).bindPopup("Pearl power station").addTo(targets);
  L.marker([43.657632, -79.385199]).bindPopup("Walton Steam Plant").addTo(targets);
  L.marker([43.643837, -79.355271]).bindPopup("GFL Solid Waste Transfer Station").addTo(targets);
  L.marker([43.838468,-80.017354]).bindPopup("Caledon Sanitary Landfill Site").addTo(targets);
  L.marker([43.9043,-79.9707]).bindPopup("Albion Landfill").addTo(targets);
  L.marker([43.5843,-79.7177]).bindPopup("Streetsville Landfill").addTo(targets);
  L.marker([43.602023,-79.695199]).bindPopup("Britannia Sanitary Landfill Site").addTo(targets);
  L.marker([43.5289,-79.6451]).bindPopup("North Sheridan Landfill Site").addTo(targets);
  L.marker([43.5334,-79.6397]).bindPopup("Newman Landfill Site").addTo(targets);
  L.marker([43.546995,-79.654902]).bindPopup("Erindale Park Landfill").addTo(targets);
  L.marker([43.578441,-79.648611]).bindPopup("Mavis Road Landfill").addTo(targets);
  L.marker([43.54643,-79.585319]).bindPopup("Saddington Park Landfill").addTo(targets);
  L.marker([43.551214,-79.587735]).bindPopup("Port Credit Memorial Park Landfill").addTo(targets);
  L.marker([43.577868,-79.546584]).bindPopup("GE Booth Wastewater Plant").addTo(targets);
  L.marker([43.633507,-79.479454]).bindPopup("Humber Bay Wastewater Plant").addTo(targets);
  L.marker([43.492389,-79.622815]).bindPopup("Mississauga Cement Plant").addTo(targets);
  L.marker([43.746466,-79.679979]).bindPopup("Goreway Power Station").addTo(targets);
  L.marker([43.799361,-79.84919]).bindPopup("Chinguacousy Landfill").addTo(targets);
  L.marker([43.49581,-79.62034]).bindPopup("Clarkson Wastewater Plant").addTo(targets);
  L.marker([43.5588168,-79.8524932]).bindPopup("Halton Hills Generating Station").addTo(targets);
  L.marker([43.8638027,-79.5013753]).bindPopup("Keele Valley Landfill").addTo(targets);
  L.marker([43.6590082,-79.3218899]).bindPopup("Ashbridges Bay Wastewater Plant").addTo(targets);
  L.marker([43.7625727,-79.5855149]).bindPopup("Thackeray Landfill").addTo(targets);
  L.marker([43.7879406,-79.4653635]).bindPopup("Connaught Campus").addTo(targets);
  L.marker([43.6494603,-79.3308377]).bindPopup("Portlands Energy Centre").addTo(targets);
  L.marker([43.82505,-79.16188]).bindPopup("Beare Road Landfill").addTo(targets);
  L.marker([43.925278,-78.835278]).bindPopup("Oshawa Landfill").addTo(targets);
  L.marker([43.868496,-79.100544]).bindPopup("Brock West Landfill").addTo(targets);
  L.marker([43.906087,-79.086437]).bindPopup("Brock Landfill").addTo(targets);
  L.marker([43.869833,-78.875172]).bindPopup("Oshawa Car Assembly Plant").addTo(targets);
  L.marker([43.85736,-78.893077]).bindPopup("Corbett Wastewater").addTo(targets);
  L.marker([43.859374,-78.902599]).bindPopup("Whitby Cogeneration Plant").addTo(targets);
  L.marker([43.854141,-78.908954]).bindPopup("Gerdau Ameristeel Whitby Mill").addTo(targets);
  L.marker([43.8843945,-78.6984568]).bindPopup("Bowmanville Cement Plant").addTo(targets);



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
      streets  = L.tileLayer(mbUrl, {id: 'mapbox.streets',   attribution: mbAttr}),
      satellite = L.tileLayer(mbUrl, {id: "mapbox.satellite", attribution: mbAttr});
//      terrain = L.tileLayer(mbUrl, {id: "mapbox.mapbox-outdoors-v10", attribution: mbAttr});


  // Dictionary of base maps
  var baseMaps = {
      "Streets": streets,
      "Grayscale": grayscale,
      "Satellite": satellite
//      "Terrain": terrain
  };
  
  // Dictionary of mutually exclusive base layers
  var baseLayers = {
      "Methane": CH4_markers,
      "Carbon Dioxide": CO2_markers,
      "CO": CO_markers,
      "Water Vapour": H2O_markers,
      "Temperature": temp_markers,
      "Pressure": press_markers

  };
  
  // Make dictionary of overlays
  var overlays = {
     "Wind": wind_markers,
     "Targets": targets
  };
  
  
  // Initialize the map itself and the layers which appear by default
  var map = L.map('map', {
      layers: [streets, CH4_markers]
  });

  // Add the map tiles control and a scale to the map 
  L.control.layers(baseMaps).addTo(map);
  L.control.scale().addTo(map);



  //Initialize legend by creating div element
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    div.innerHTML = ''
    return div;
  };
  legend.addTo(map);

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

  // Poll Data from datasource.txt
  (function pollDataSource() {
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
    }, 20000);                                    // This is the argument passed to the 'setTimeout' function.
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
  for (var i = startingIndex, l = dataRows.length - 1; i < l; i++) {
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
  
  // reset the base layers
  for (var key in baseLayers) {
    baseLayers[key].clearLayers();
  }
  
  // reset the wind overlay
  overlays["Wind"].clearLayers();

  // Set get the data arrays for the next points to be plotted           
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
      for (var key in baseLayers) {
        if (e.name === key) {
          div.innerHTML=""
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
//              map.removeLayer(baseLayers[key][i]);
              baseLayers[key][i - startingIndex].removeLayer(L.CircleMarker)
            }
            if (overlays["Wind"][i] && overlays["Wind"][i] instanceof L.Marker) {
              map.removeLayer(overlays["Wind"][i]);
              baseLayers["Wind"][i - startingIndex].removeLayer(L.CircleMarker)
            }
          }
        }
      } 
    }   

    for (var i = startingIndex, l = dataRows.length - 1; i < l; i++) {
    // Remove all pre-existing markers and replace with updated markers
      try {
        for (var key in baseLayers) {
          if (baseLayers.hasOwnProperty(key)) {
            if (baseLayers[key][i - startingIndex] && baseLayers[key][i - startingIndex] instanceof L.CircleMarker) {
//              map.removeLayer(baseLayers[key][i - startingIndex]);
                baseLayers[key][i - startingIndex].removeLayer(L.CircleMarker)
                console.log(key, baseLayers[key])
            }
          }
        }
        if (overlays["Wind"][i - startingIndex] && overlays["Wind"][i - startingIndex] instanceof L.Marker) {
//          map.removeLayer(overlays["Wind"][i - startingIndex]);
            baseLayers[key][i - startingIndex].removeLayer(L.Marker)
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

