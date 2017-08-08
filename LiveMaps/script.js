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
    "Air_Pressure": "Pressure (hPa)",
    "Carbon_Dioxide": "CO" + txt2.sub() + " (ppm)",
    "Carbon_Monoxide": "CO (ppm)",
    "Methane": "Methane (ppm)",
    "Temperature": "Temperature ("+ txto.sup() + "C)",
    "Water_Vapour": "H " +  txt2.sub() + "O (ppm)"
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

  
function initializeMap() {                                    //Set initial conditions of map
  var map = L.map('map');    //Center the map to these coordinates originally; set zoom
  var mapMarkers = [];
  L.marker([43.648349, -79.386162]).bindPopup("Pearl Power Station").addTo(map);
  L.marker([43.657632, -79.385199]).addTo(map).bindPopup("Walton Steam Plant");
  L.marker([43.643837, -79.355271]).addTo(map).bindPopup("GFL Solid Waste Transfer Station");
  L.marker([43.838468,-80.017354]).bindPopup("Caledon Sanitary Landfill Site").addTo(map);
  L.marker([43.9043,-79.9707]).bindPopup("Albion Landfill").addTo(map);
  L.marker([43.5843,-79.7177]).bindPopup("Streetsville Landfill").addTo(map);
  L.marker([43.602023,-79.695199]).bindPopup("Britannia Sanitary Landfill Site").addTo(map);
  L.marker([43.5289,-79.6451]).bindPopup("North Sheridan Landfill Site").addTo(map);
  L.marker([43.5334,-79.6397]).bindPopup("Newman Landfill Site").addTo(map);
  L.marker([43.546995,-79.654902]).bindPopup("Erindale Park Landfill").addTo(map);
  L.marker([43.578441,-79.648611]).bindPopup("Mavis Road Landfill").addTo(map);
  L.marker([43.54643,-79.585319]).bindPopup("Saddington Park Landfill").addTo(map);
  L.marker([43.551214,-79.587735]).bindPopup("Port Credit Memorial Park Landfill").addTo(map);
  L.marker([43.577868,-79.546584]).bindPopup("GE Booth Wastewater Plant").addTo(map);
  L.marker([43.633507,-79.479454]).bindPopup("Humber Bay Wastewater Plant").addTo(map);
  L.marker([43.492389,-79.622815]).bindPopup("Mississauga Cement Plant").addTo(map);
  L.marker([43.746466,-79.679979]).bindPopup("Goreway Power Station").addTo(map);
  L.marker([43.799361,-79.84919]).bindPopup("Chinguacousy Landfill").addTo(map);
  L.marker([43.49581,-79.62034]).bindPopup("Clarkson Wastewater Plant").addTo(map);
  L.marker([43.5588168,-79.8524932]).bindPopup("Halton Hills Generating Station").addTo(map);
  L.marker([43.8638027,-79.5013753]).bindPopup("Keele Valley Landfill").addTo(map);
  L.marker([43.6590082,-79.3218899]).bindPopup("Ashbridges Bay Wastewater Plant").addTo(map);
  L.marker([43.7625727,-79.5855149]).bindPopup("Thackeray Landfill").addTo(map);
  L.marker([43.7879406,-79.4653635]).bindPopup("Connaught Campus").addTo(map);
  L.marker([43.6494603,-79.3308377]).bindPopup("Portlands Energy Centre").addTo(map);
  L.marker([43.82505,-79.16188]).bindPopup("Beare Road Landfill").addTo(map);
  L.marker([43.925278,-78.835278]).bindPopup("Oshawa Landfill").addTo(map);
  L.marker([43.868496,-79.100544]).bindPopup("Brock West Landfill").addTo(map);
  L.marker([43.906087,-79.086437]).bindPopup("Brock Landfill").addTo(map);
  L.marker([43.869833,-78.875172]).bindPopup("Oshawa Car Assembly Plant").addTo(map);
  L.marker([43.85736,-78.893077]).bindPopup("Corbett Wastewater").addTo(map);
  L.marker([43.859374,-78.902599]).bindPopup("Whitby Cogeneration Plant").addTo(map);
  L.marker([43.854141,-78.908954]).bindPopup("Gerdau Ameristeel Whitby Mill").addTo(map);
  L.marker([43.8843945,-78.6984568]).bindPopup("Bowmanville Cement Plant").addTo(map);


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
        url: "../datasource.txt",                // as soon as the page is loaded. If successfull, we pass the polled
        cache: false,                            // data to processdata(). Next, we do the same thing iteratively with
        success: function(data) {                // a time delay between iterations.
          processData(map, mapMarkers, data);     
        },
        error: function() {           
          alert("Error encountered while polling data source.");
        },      
      });
    setTimeout(function() {
      j = j + 1
      $.ajax({                                    // This block does the bulk of the work:
        url: "../datasource.txt",                 // "Ajax" tells the browser to perform these tasks
        cache: false,                             // behind the scenes. If successful, the information
        success: function(data) {                 // polled from datasource.txt is passed to the processData
          processData(map, mapMarkers, data);     // function.
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
}

// Define a function to return "Unknown" if a value is NaN
function checkifNaN (value) {
    if (isNaN(value) || value === "nan"){
      return "Unknown"
  }
  else {
    return value
  }
}

// Get the color of the dot to be plotted based on Max and Mins
function getColor(d, array) {
  if (d === NaN){
    color = 'grey'
  }
  var path = window.location.pathname;
  var variable = path.split("/").slice(-2, -1)[0];

  if (array.length > 1){
    var max = Math.max.apply(Math, dataArray)
    var min = Math.min.apply(Math, dataArray)
    if (variable === "Methane") {
      var max = 2.40,
          min = 1.80;
    }

    var delta = (max - min)
    var x = ((d - min)/delta)
    var r = Math.floor(x * 255.)
    var g = 0
    var b = 255. - Math.floor(x * 255.)
    color = "rgb("+r+" ,"+g+","+ b+")"
    if (d > max) {
      color = "red"
    }  
  } else if (array.length < 2){
      color = 'white'
  }
  return color;
}


// Scale the length of the arrows which will represent wind
function scaleLength(d) {
  var max = 20.
  var min = 0.
  var delta = (max - min)
  var x = ((d - min)/delta)*100

  return x ;
}

// Update the legend based on the max and min values
legend.update = function(dataArray) {
    var grades = [],
        intervals = 7,
        max = Math.max.apply(Math, dataArray),
        min = Math.min.apply(Math, dataArray),
        path = window.location.pathname,
        variable = path.split("/").slice(-2, -1)[0];

        if (variable === "Methane") {
          var max = 2.40,
              min = 1.80;
        }
        gradeInterval = round((max - min)/intervals, 3),
        labels = [];
        
  // Create an array of grades by incrementally adding to the min value
  // Start from the max and go down to the min in order to get larger values at top of legend
  for (var i = 0; i < intervals + 1; i++) {
      grades.push(round((max - (gradeInterval * i)), 3));
    }
  // Add title to the legend
  div.innerHTML += "<b>" + legendDict[variable] + "</b><br>"
  for (var i = 0; i < intervals + 1 ; i++) {
    if (i === 0) {
      div.innerHTML +=
        '<i style="background:' + getColor(grades[i], dataArray) + '"></i> ' + grades[i] + " +<br>";
    }
    else {
      div.innerHTML +=
              '<i style="background:' + getColor(grades[i], dataArray) + '"></i> ' + grades[i] + (grades[i + 1] ? '<br>' : '');
    }
  }      
}

// Create an array of all values to be plotted
function getDataArray(data) {
  var dataRows = data.replace(/\s/g, '').split(";");
  if (dataRows.length > (pltNum + 1)) {
    startingIndex = dataRows.length - (pltNum + 1)
  } else {
    startingIndex = 0
    }
  for (i = startingIndex; i < dataRows.length - 1; i++) {
    var dataComponents = dataRows[i].split(",");
    var temperature = dataComponents[4];
    var windDirection = dataComponents[5];
    var windSpeed = dataComponents[6];                          //Speed in m/s
    var pressure = dataComponents[7];
    var avgTime = dataComponents[14];
    var CH4 = dataComponents[10];
    var H2O = dataComponents[13];
    var CO2 = dataComponents[11];
    var CO = dataComponents[12];
    var pltVar = getVar(pressure, CO2, CO, CH4, temperature, H2O);  
    if (isNaN(pltVar) === false) {
      dataArray.push(pltVar);
    }
  }
return dataArray ;
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
function processData(map, mapMarkers, data) {                               
  // reset the data array
  var dataArray = [],
      dataArray = getDataArray(data);
  // Check that all required parameters exist
  if (map && mapMarkers && data) {
    // Add the legend if it is undefined and wipe its contents
    if (plotWind() != true) {
      if (legend === undefined){
        legend.addTo(map);
      }
      div.innerHTML="";
    };
    var dataRows = data.replace(/\s/g, '').split(";");
    var startingIndex = 0;
    if (dataRows.length > (pltNum + 1) ) {                                            // Set the starting index of which lines to plot
      startingIndex = dataRows.length - (pltNum + 1);                                 // We always take the last x lines if there are more than x lines.
    } else if (dataRows.length < (pltNum + 1)) {                                   
      for (i = dataRows.length - 1; i < pltNum; i++) {
        if (mapMarkers[i] && mapMarkers[i][0] instanceof L.Marker) {         // Remove any previous arrow markers 
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
        var pltVar = getVar(pressure, CO2, CO, CH4, temperature, H2O);

        var arrow_icon = L.icon({
            iconUrl: 'https://cdn1.iconfinder.com/data/icons/simple-arrow/512/arrow_24-128.png',
            iconSize:     [50, scaleLength(windSpeed)],  // size of the icon [width,length]
            iconAnchor: [25, scaleLength(windSpeed)],    // Location on the icon which corresponts to it's actual position (pixels in x-y coordinates from top left)
            });

        var arrowMarker = new L.marker([latitude, longitude], {
          icon: arrow_icon,
           rotationAngle: (parseFloat(windDirection) + 180)
        });

        var circleMarker = new L.circleMarker([latitude, longitude], {                     //  We Create a marker positioned and colored corresponding to the data passed
          color: getColor(pltVar, dataArray),                                                            // from datasource.txt.
          radius: 5,
          opacity: 0.9,
          fillOpacity: 0.9
          }).bindPopup(
            "<p>Time (UTC): "                + timeStamp.substring(0, 10) + "  " + timeStamp.substring(10, 18)   + "</p>"
          + "<p>Temperature (C): "           + temperature                             + "</p>"
          + "<p>Wind Direction: "            + checkifNaN(round(windDirection, 2))     + "</p>"
          + "<p>Wind Speed: "                + checkifNaN(round(windSpeed, 2))         + " m/s</p>"
          + "<p>Pressure (hPa): "            + pressure                                + "</p>"
          + "<p>Methane: "                   + checkifNaN(round(CH4, 2))               + " ppm</p>" 
          + "<p>Water: "                     + checkifNaN(round(H2O, 2))               + " ppm</p>"
          + "<p>CO: "                        + checkifNaN(round(CO, 2))                + " ppm</p>"
          + "<p>Carbon Dioxide: "            + checkifNaN(round(CO2, 2))               + " ppm</p>");     // Add a popup tag which will show if someone clicks on the dot.

        mapMarkers[i - startingIndex] = [];
        mapMarkers[i - startingIndex][0] = arrowMarker;
        mapMarkers[i - startingIndex][1] = circleMarker;
        
        if (plotWind() === true) {
          if (isNaN(windDirection) === false && isNaN(windSpeed) === false){
            map.addLayer(mapMarkers[i - startingIndex][0]);
          }
        }
        if (plotWind() != true) {
          map.addLayer(mapMarkers[i - startingIndex][1]);
        }
      } catch(err) {

      }
    }
    if (plotWind() != true) {
      if (dataArray.length > 0 ) 
        {legend.update(dataArray)}
    };
    if (j === 1) {
      var bounds = L.latLngBounds(getBounds(data));
      if (bounds) {
        map.fitBounds(bounds,{paddingTopLeft: [20, 0], paddingBottomRight: [0, 20], maxZoom: 20});
      }
    }
    j = j + 1;
  }
}

