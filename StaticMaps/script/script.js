
// Get text to put in legend based on variable being plotted
var txt2 = "2";
var txto = "o";

legendDict = {
    "Pressure": ["Pressure (hPa)"],
    "Carbon Dioxide": ["CO" + txt2.sub() + " (ppm)", 400, 550],
    "CO": ["CO (ppm)", 0.8, 2.2],
    "Methane": ["Methane (ppm)", 1.84, 2.3],
    "Temperature": ["Temperature ("+ txto.sup() + "C)"],
    "Water Vapour": ["H" +  txt2.sub() + "O (ppm)"]
}



$(function() {
  initializeMap();
});

//Define some Variables
//var pltNum = 250;                                     //Number of data points to be plotted
var legend = L.control({position: 'bottomleft'});
var div = L.DomUtil.create('div', 'info legend');
var j = 1;
var path = window.location.pathname;
var variable = path.split("/").slice(-2, -1)[0];
var d = path.split("/")[3];

  
function initializeMap() {
  var targets = L.layerGroup();
    L.marker([43.648349, -79.386162]).addTo(targets).bindPopup("Pearl Power Station");
    L.marker([43.657632, -79.385199]).addTo(targets).bindPopup("Walton Steam Plant");
    L.marker([43.643837, -79.355271]).addTo(targets).bindPopup("GFL solid waste transfer station");
    L.marker([43.838468,-80.01735]).bindPopup("Caledon Sanitary Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.9043,-79.970]).bindPopup("Albion Landfill, Solid Waste").addTo(targets);
    L.marker([43.5843,-79.717]).bindPopup("Streetsville Landfill, Solid Waste").addTo(targets);
    L.marker([43.602023,-79.69519]).bindPopup("Britannia Sanitary Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.5289,-79.645]).bindPopup("North Sheridan Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.5334,-79.639]).bindPopup("Newman Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.546995,-79.65490]).bindPopup("Erindale Park Landfill, Solid Waste").addTo(targets);
    L.marker([43.54643,-79.58531]).bindPopup("Saddington Park Landfill, Solid Waste").addTo(targets);
    L.marker([43.551214,-79.58773]).bindPopup("Port Credit Memorial Park Landfill, Solid Waste").addTo(targets);
    L.marker([43.577868,-79.54658]).bindPopup("GE Booth Wastewater Plant, Wastewater").addTo(targets);
    L.marker([43.633507,-79.47945]).bindPopup("Humber Bay Wastewater Plant, Wastewater").addTo(targets);
    L.marker([43.492389,-79.62281]).bindPopup("Mississauga Cement Plant, Manufacturing").addTo(targets);
    L.marker([43.746466,-79.67997]).bindPopup("Goreway Power Station, Power Plant").addTo(targets);
    L.marker([43.799361,-79.8491]).bindPopup("Chinguacousy Landfill, Solid Waste").addTo(targets);
    L.marker([43.49581,-79.6203]).bindPopup("Clarkson Wastewater Plant, Wastewater").addTo(targets);
    L.marker([43.5588168,-79.852493]).bindPopup("Halton Hills Generating Station").addTo(targets);
    L.marker([43.8638027,-79.501375]).bindPopup("Keele Valley Landfill, Solid Waste").addTo(targets);
    L.marker([43.6590082,-79.321889]).bindPopup("Ashbridges Bay Wastewater Plant, Wastewater").addTo(targets);
    L.marker([43.7625727,-79.585514]).bindPopup("Thackeray Landfill, Solid Waste").addTo(targets);
    L.marker([43.7879406,-79.465363]).bindPopup("Connaught Campus, Manufacturing").addTo(targets);
    L.marker([43.6494603,-79.330837]).bindPopup("Portlands Energy Centre, Power Plant").addTo(targets);
    L.marker([43.82505,-79.1618]).bindPopup("Beare Road Landfill, Solid Waste").addTo(targets);
    L.marker([43.925278,-78.83527]).bindPopup("Oshawa Landfill, Solid Waste").addTo(targets);
    L.marker([43.906087,-79.08643]).bindPopup("Brock Landfill, Solid Waste").addTo(targets);
    L.marker([43.869833,-78.87517]).bindPopup("Oshawa Car Assembly Plant, Manufacturing").addTo(targets);
    L.marker([43.85736,-78.89307]).bindPopup("Corbett Wastewater, Wastewater").addTo(targets);
    L.marker([43.859374,-78.90259]).bindPopup("Whitby Cogeneration Plant, Power Plant").addTo(targets);
    L.marker([43.854141,-78.90895]).bindPopup("Gerdau Ameristeel Whitby Mill").addTo(targets);
    L.marker([43.8843945,-78.698456]).bindPopup("Bowmanville Cement Plant, Manufacturing").addTo(targets);
    L.marker([43.8739,-79.5790]).bindPopup("TransCanada targetsle, Natural Gas Transport").addTo(targets);
    L.marker([43.95986,-78.8194]).bindPopup("TransCanada Bowmanville, Natural Gas Transport").addTo(targets);
    L.marker([43.56328,-79.7877]).bindPopup("Union Gas Parkway Compressor Station, Natural Gas Transport").addTo(targets);
    L.marker([43.91676,-79.3802]).bindPopup("Victoria Square Gate, Natural Gas Transport").addTo(targets);
    L.marker([43.99502,-79.6371]).bindPopup("Schomberg Gate, Natural Gas Transport").addTo(targets);
    L.marker([43.76428,-79.7399]).bindPopup("Goreway Gate, Natural Gas Transport").addTo(targets);
    L.marker([43.50752,-79.8499]).bindPopup("Union Gas Milton Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([42.69286,-82.2772]).bindPopup("Dawn Storage Gate, Natural Gas Transport").addTo(targets);
    L.marker([43.57012,-79.7847]).bindPopup("Enbridge Parkway Belt Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([43.58359,-79.7657]).bindPopup("Enbridge Lisgar Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([43.74407,-79.6309]).bindPopup("Enbridge Albion Road Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([43.78452,-79.4961]).bindPopup("Keele Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([43.72558,-79.3068]).bindPopup("Jonesville Station, Natural Gas Transport").addTo(targets);
    L.marker([43.65651,-79.3455]).bindPopup("Station B, Natural Gas Transport").addTo(targets);
    L.marker([43.94048,-79.2496]).bindPopup("Markham Gate Station, Natural Gas Transport").addTo(targets);
    L.marker([43.6590082,-79.321889]).bindPopup("Ashbridges Bay, Wastewater").addTo(targets);
    L.marker([43.633507,-79.47945]).bindPopup("Humber Bay, Wastewater").addTo(targets);
    L.marker([43.766362,-79.15100]).bindPopup("Highland Creek, Wastewater").addTo(targets);
    L.marker([44.357098,-79.02852]).bindPopup("Cannington, Wastewater").addTo(targets);
    L.marker([43.85736,-78.89307]).bindPopup("Corbett, Wastewater").addTo(targets);
    L.marker([43.871124,-78.75285]).bindPopup("Courtice, Wastewater").addTo(targets);
    L.marker([43.879977,-78.8247]).bindPopup("Harmony Creek, Wastewater").addTo(targets);
    L.marker([44.274868,-79.05804]).bindPopup("Sunderland, Wastewater").addTo(targets);
    L.marker([43.89225,-78.66617]).bindPopup("Port Darlingtion, Wastewater").addTo(targets);
    L.marker([43.819095,-79.05323]).bindPopup("Duffin Creek, Wastewater").addTo(targets);
    L.marker([43.631228,-80.01954]).bindPopup("Acton, Wastewater").addTo(targets);
    L.marker([43.639199,-79.87995]).bindPopup("Georgetown, Wastewater").addTo(targets);
    L.marker([43.420801,-79.73336]).bindPopup("Oakville Mid Halton, Wastewater").addTo(targets);
    L.marker([43.481232,-79.62991]).bindPopup("Oakville South East, Wastewater").addTo(targets);
    L.marker([43.413101,-79.69330]).bindPopup("Oakville South West, Wastewater").addTo(targets);
    L.marker([43.307828,-79.80067]).bindPopup("Burlington Skyway, Wastewater").addTo(targets);
    L.marker([43.49581,-79.62034]).bindPopup("Clarkson ,Wastewater").addTo(targets);
    L.marker([43.577868,-79.54658]).bindPopup("GE Booth ,Wastewater").addTo(targets);
    L.marker([43.798577,-79.93126]).bindPopup("Inglewood ,Wastewater").addTo(targets);
    L.marker([44.118546,-79.48197]).bindPopup("Holland Landing Lagoons, Wastewater").addTo(targets);
    L.marker([43.82505,-79.1618]).bindPopup("Beare Road, Solid Waste").addTo(targets);
    L.marker([43.868496,-79.10054]).bindPopup("Brock West, Solid Waste").addTo(targets);
    L.marker([43.8638027,-79.501375]).bindPopup("Keele Valley, Solid Waste").addTo(targets);
    L.marker([43.7625727,-79.585514]).bindPopup("Thackeray, Solid Waste").addTo(targets);
    L.marker([43.7612979,-79.474747]).bindPopup("Dufferin Organics Processing, Solid Waste").addTo(targets);
    L.marker([43.700538,-79.602643]).bindPopup("Disco Road Organics Processing, Solid Waste").addTo(targets);
    L.marker([43.766362,-79.15100]).bindPopup("Highland Creek Incinerator, Solid Waste").addTo(targets);
    L.marker([43.819095,-79.05323]).bindPopup("Duffin Creek Incinerator, Solid Waste").addTo(targets);
    L.marker([44.061,-79.241]).bindPopup("Scott, Solid Waste").addTo(targets);
    L.marker([43.925278,-78.83527]).bindPopup("Oshawa, Solid Waste").addTo(targets);
    L.marker([43.9145,-78.694]).bindPopup("Darlington, Solid Waste").addTo(targets);
    L.marker([44.1131,-78.817]).bindPopup("Scugog, Solid Waste").addTo(targets);
    L.marker([44.1119,-78.817]).bindPopup("Blackstock, Solid Waste").addTo(targets);
    L.marker([43.9513,-79.813]).bindPopup("Palgrave Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.551214,-79.58773]).bindPopup("Port Credit Memorial Park, Solid Waste").addTo(targets);
    L.marker([43.686003,-79.7505]).bindPopup("Centennial Park, Solid Waste").addTo(targets);
    L.marker([43.743873,-79.73797]).bindPopup("Professor’s Lake Park, Solid Waste").addTo(targets);
    L.marker([43.610523,-79.5719]).bindPopup("Centre Street, Solid Waste").addTo(targets);
    L.marker([43.8841,-79.732]).bindPopup("Bolton Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.5843,-79.717]).bindPopup("Streetsville, Solid Waste").addTo(targets);
    L.marker([43.5334,-79.639]).bindPopup("Newman Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.54643,-79.58531]).bindPopup("Saddington Park, Solid Waste").addTo(targets);
    L.marker([43.5289,-79.645]).bindPopup("North Sheridan Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.799361,-79.8491]).bindPopup("Chinguacousy Landfill, Solid Waste").addTo(targets);
    L.marker([43.546995,-79.65490]).bindPopup("Erindale Park, Solid Waste").addTo(targets);
    L.marker([43.838468,-80.01735]).bindPopup("Caledon Sanitary Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.602023,-79.69519]).bindPopup("Britannia Sanitary Landfill Site, Solid Waste").addTo(targets);
    L.marker([43.709983,-79.6719]).bindPopup("Peel Integrated Waste Management Facility, Solid Waste").addTo(targets);
    L.marker([43.840562,-80.01800]).bindPopup("Caledon Public Waste, Solid Waste").addTo(targets);
    L.marker([43.799361,-79.8491]).bindPopup("Peel Curing Facility, Solid Waste").addTo(targets);
    L.marker([43.8289,-79.05]).bindPopup("Miller Waste Pickering, Solid Waste").addTo(targets);
    L.marker([43.8839447,-78.754905]).bindPopup("Miller Waste Clarington, Solid Waste").addTo(targets);
    L.marker([43.746466,-79.67997]).bindPopup("Goreway Power Station, Power Plant").addTo(targets);
    L.marker([43.6494603,-79.330837]).bindPopup("Portlands Energy Centre, Power Plant").addTo(targets);
    L.marker([43.6980572,-79.642751]).bindPopup("Mississauga Cogeneration Plant, Power Plant").addTo(targets);
    L.marker([43.5588168,-79.852493]).bindPopup("Halton Hills Generating Station, Power Plant").addTo(targets);
    L.marker([43.859374,-78.90259]).bindPopup("Whitby Cogeneration, Power Plant").addTo(targets);
    L.marker([44.0749737,-79.532114]).bindPopup("York Energy Centre, Power Plant").addTo(targets);
    L.marker([43.6973067,-79.68066]).bindPopup("Algonquin Power  Energy from Waste Inc.,Power Plant").addTo(targets);
    L.marker([43.691678,-79.61015]).bindPopup("GTAA Cogeneration, Power Plant").addTo(targets);
    L.marker([43.857944,-79.3247]).bindPopup("Birchmount Energy Center, Power Plant").addTo(targets);
    L.marker([43.883079,-79.22987]).bindPopup("Bur Oak Energy Center, Power Plant").addTo(targets);
    L.marker([43.942405,-78.89647]).bindPopup("Durham College District Energy, Power Plant").addTo(targets);
    L.marker([43.846553,-79.33361]).bindPopup("Warden Energy Center, Power Plant").addTo(targets);
    L.marker([43.7720949,-79.27369]).bindPopup("Atlantic Packaging, Manufacturing").addTo(targets);
    L.marker([43.721039,-79.81629]).bindPopup("Brampton Brick, Manufacturing").addTo(targets);
    L.marker([43.4897403,-79.620245]).bindPopup("Toronto Board Plant, Manufacturing").addTo(targets);
    L.marker([43.748917,-79.71488]).bindPopup("Brampton Assembly Plant, Manufacturing").addTo(targets);
    L.marker([43.8300802,-79.34953]).bindPopup("Descor Industries Inc.,Manufacturing").addTo(targets);
    L.marker([43.482859,-79.670819]).bindPopup("Oakville Assembly Plant, Manufacturing").addTo(targets);
    L.marker([43.869833,-78.87517]).bindPopup("Oshawa Car Assembly Plant, Manufacturing").addTo(targets);
    L.marker([43.854141,-78.90895]).bindPopup("Gerdau Ameristeel Whitby Mill, Manufacturing").addTo(targets);
    L.marker([43.411453,-79.8028]).bindPopup("Hanson Brick - Burlington, Manufacturing").addTo(targets);
    L.marker([43.6150845,-79.488362]).bindPopup("Mississauga Cement Plant, Manufacturing").addTo(targets);
    L.marker([43.6942818,-79.504591]).bindPopup("Irving Tissue, Manufacturing").addTo(targets);
    L.marker([43.614191,-79.804861]).bindPopup("targetsle Lodge Farms Limited - Brampton, Manufacturing").addTo(targets);
    L.marker([43.77409,-79.26762]).bindPopup("New Forest Paper Mills LP, Manufacturing").addTo(targets);
    L.marker([43.704947,-79.73346]).bindPopup("OI Canada Brampton, Manufacturing").addTo(targets);
    L.marker([43.499146,-79.61308]).bindPopup("Mississauga Lubricants Centre, Manufacturing").addTo(targets);
    L.marker([43.6427839,-79.370987]).bindPopup("Toronto Refinery, Manufacturing").addTo(targets);
    L.marker([43.5395207,-79.879383]).bindPopup("ROXUL Inc.,Manufacturing").addTo(targets);
    L.marker([43.7879406,-79.465363]).bindPopup("Connaught Campus, Manufacturing").addTo(targets);
    L.marker([43.7823886,-79.27643]).bindPopup("Agincourt Plant, Manufacturing").addTo(targets);                                    


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
     "Facilities": targets
  };
  
  
  // Initialize the map itself and the layers which appear by default
  var map = L.map('map', {
      layers: [streets, CH4_markers]
  });

  // Add the map tiles control and a scale to the map 
  L.control.layers(baseMaps).addTo(map);
  L.control.scale().addTo(map);



  //Initialize legend by creating div element
  var legend = L.control({position: 'bottomleft'});
  legend.onAdd = function (map) {
    div.innerHTML = ''
    return div;
  };
  legend.addTo(map);

//  $.ajax({                                     // Do one initial poll using ajax, that way the first dots show up 
//      url: "data_record_" + d + ".txt",                // as soon as the page is loaded. If successfull, we pass the polled
//      cache: false,                            // data to processdata(). Next, we do the same thing iteratively with
//      success: function(data) {                // a time delay between iterations.
//        processData(map, baseLayers, overlays, data);
//      },
//      error: function() {
//        alert("Error encountered while polling data source.");
//      },
//    });
//
//}
  //Define a Function which will poll data from 'datasource.txt'
  (function pollDataSource() {
//    setTimeout(function() {
      $.ajax({                                    // This block does the bulk of the work:
        url: "data_record_" + d + ".txt",     // "Ajax" tells the browser to perform these tasks
        cache: false,                             // behind the scenes. If successful, the information
        success: function(data) {                 // polled from datasource.txt is passed to the processData
          processData(map, baseLayers, overlays, data);     // function.
        },
        error: function() {                       // If polling unsuccessful, return the following error
          console.log("Error encountered while polling data source.");
        },
//        complete: pollDataSource                // This calls the pollDataSource function again,
      });                                         // leading to an infinite loop.
//    }, 10000);                                  // This is the argument passed to the 'setTimeout' function.
  })();                                           // It simply inserts a 1000 ms time delay before
}   


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
    return 'grey'
  }
 
  if (legendDict[variable].length == 1) {  
    if (dataArray.length < 2) {
      console.log(dataArray)
      return "black"
    }
  
    if (dataArray.length > 2) {
      var max = Math.max.apply(Math, dataArray),
          min = Math.min.apply(Math, dataArray);
    }
  } else if (legendDict[variable].length > 1) {
      var min = legendDict[variable][1],
          max = legendDict[variable][2];
  }

  if (value > max) {   
    return "red"}
  else if (value < min) {
    return "blue"}
  else { 
    var delta = (max - min);
    var x = ((value - min)/delta)
    var r = Math.floor(x * 255.);
    var g = 0;
    var b = 255. - Math.floor(x * 255.);
    var color = "rgb(" + r + " ," + g + "," + b + ")";
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
  var grades = [];
  var intervals = 8;

  if (legendDict[variable].length == 1) {
    var min = Math.min.apply(Math, dataArray);
    var max = Math.max.apply(Math, dataArray);
  } else {
    var  min = legendDict[variable][1];
    var  max = legendDict[variable][2];
  }
  var gradeInterval = round((max - min)/intervals, 2);

  // Create an array of grades by incrementally adding to the min value
  // Start from the max and go down to the min in order to get larger values at top of legend
  for (var i = 0; i < intervals + 1; i++) {
      grades.push(round((max - (gradeInterval * i)), 3));
    }
  // Add title to the legend
  div.innerHTML += "<b>" + legendDict[variable][0] + "</b><br>"
  for (var i = 0; i < intervals + 1; i++) {
    if (i === 0) {
      div.innerHTML +=
              '<i style="background:' + getColor(grades[i], variable, dataArray, layer_group) + '"></i> ' 
              + (parseFloat(grades[i])).toFixed(2) + ' +<br>';
    } else {
    div.innerHTML +=
            '<i style="background:' + getColor(grades[i], variable, dataArray, layer_group) + '"></i> ' 
            + (parseFloat(grades[i])).toFixed(2) + (grades[i + 1] ? '<br>' : '');
    }
  }      
}

// Create an array of all values to be plotted
function getDataArray(data, dataArrays, baseLayers) {
  var dataRows = data.replace(/\s/g, '').split(";");
//  if (dataRows.length > (pltNum + 1)) {
//    startingIndex = dataRows.length - (pltNum + 1)
//  } else {
  var startingIndex = 0;
//    }
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
//      if (dataArrays[key].length === pltNum) {
//        dataArrays[key].shift()
//      }
    }
  }
return dataArrays ;
};

// Make a latLngBound array of all lat and longs
function getBounds(data) {
  var latLngArray = [];
  var dataRows = data.replace(/\s/g, '').split(";");
//  if (dataRows.length > (pltNum + 1)) {
//    startingIndex = dataRows.length - (pltNum + 1)
//  } else {
  var startingIndex = 0;
//    }
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
  
//  // reset the base layers
//  for (var key in baseLayers) {
//    baseLayers[key].clearLayers();
//  }
//  
//  // reset the wind overlay
//  overlays["Wind"].clearLayers();

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

    // Update the legend
    legend.update(dataArrays["Methane"], "Methane", baseLayers)

    var dataRows = data.replace(/\s/g, '').split(";");
    var startingIndex = 0;
//    if (dataRows.length > (pltNum + 1) ) {                                  
//      startingIndex = dataRows.length - (pltNum + 1);                       
//    } 
//    else if (dataRows.length < (pltNum + 1)) {                                   
//      for (var key in baseLayers) {
//        if (baseLayers.hasOwnProperty(key)) {
//        // If there are fewer data rows than points we want to plot, 
//        // remove the last pltNum number of points, if they exist.
//
//          for (i = dataRows.length - 1; i < pltNum; i++) {
//            if (baseLayers[key][i] && baseLayers[key][i] instanceof L.CircleMarker) { 
//              map.removeLayer(baseLayers[key][i]);
//              baseLayers[key][i - startingIndex].removeLayer(L.CircleMarker)
//              console.log(
//            }
//            if (overlays["Wind"][i] && overlays["Wind"][i] instanceof L.Marker) {
//              map.removeLayer(overlays["Wind"][i]);
//              baseLayers["Wind"][i - startingIndex].removeLayer(L.CircleMarker)
//            }
//          }
//        }
//      } 
//    }   

    for (var i = startingIndex, l = dataRows.length - 1; i < l; i++) {
      // Remove all pre-existing markers and replace with updated markers
      try {
//        for (var key in baseLayers) {
//          if (baseLayers.hasOwnProperty(key)) {
//            if (baseLayers[key][i - startingIndex] && baseLayers[key][i - startingIndex] instanceof L.CircleMarker) {
////              map.removeLayer(baseLayers[key][i - startingIndex]);
//                baseLayers[key][i - startingIndex].removeLayer(L.CircleMarker)
//                console.log(key, baseLayers[key])
//            }
//          }
//        }
//        if (overlays["Wind"][i - startingIndex] && overlays["Wind"][i - startingIndex] instanceof L.Marker) {
////          map.removeLayer(overlays["Wind"][i - startingIndex]);
//            baseLayers[key][i - startingIndex].removeLayer(L.Marker)
//        }
     
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
          if (dataDict["latitude"] != "nan" && dataDict["latitude"] != "nan") {
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
          }
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

