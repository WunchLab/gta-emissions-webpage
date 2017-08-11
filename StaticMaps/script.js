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
    "Water_Vapour": "H" +  txt2.sub() + "O (ppm)"
}
var path = window.location.pathname;
var variable = path.split("/").slice(-2, -1)[0];
var date = path.split("/")[3];

// Define now many points will be plotted
var pltNum = 10000;

$(function() {
  initializeMap();
});


//Define some Variables
var dataArray = [];
legend = L.control({position: 'bottomright'}),
div = L.DomUtil.create('div', 'info legend');
j = 1

function initializeMap() {                                    //Set initial conditions of map
  var map = L.map('map');    //Center the map to these coordinates originally; set zoom
  var mapMarkers = [];

  // Add static markers
    L.marker([43.648349, -79.386162]).addTo(map).bindPopup("Pearl Power Station");
    L.marker([43.657632, -79.385199]).addTo(map).bindPopup("Walton Steam Plant");
    L.marker([43.643837, -79.355271]).addTo(map).bindPopup("GFL solid waste transfer station");
    L.marker([43.838468,-80.01735]).bindPopup("Caledon Sanitary Landfill Site, Solid Waste").addTo(map);
    L.marker([43.9043,-79.970]).bindPopup("Albion Landfill, Solid Waste").addTo(map);
    L.marker([43.5843,-79.717]).bindPopup("Streetsville Landfill, Solid Waste").addTo(map);
    L.marker([43.602023,-79.69519]).bindPopup("Britannia Sanitary Landfill Site, Solid Waste").addTo(map);
    L.marker([43.5289,-79.645]).bindPopup("North Sheridan Landfill Site, Solid Waste").addTo(map);
    L.marker([43.5334,-79.639]).bindPopup("Newman Landfill Site, Solid Waste").addTo(map);
    L.marker([43.546995,-79.65490]).bindPopup("Erindale Park Landfill, Solid Waste").addTo(map);
    L.marker([43.54643,-79.58531]).bindPopup("Saddington Park Landfill, Solid Waste").addTo(map);
    L.marker([43.551214,-79.58773]).bindPopup("Port Credit Memorial Park Landfill, Solid Waste").addTo(map);
    L.marker([43.577868,-79.54658]).bindPopup("GE Booth Wastewater Plant, Wastewater").addTo(map);
    L.marker([43.633507,-79.47945]).bindPopup("Humber Bay Wastewater Plant, Wastewater").addTo(map);
    L.marker([43.492389,-79.62281]).bindPopup("Mississauga Cement Plant, Manufacturing").addTo(map);
    L.marker([43.746466,-79.67997]).bindPopup("Goreway Power Station, Power Plant").addTo(map);
    L.marker([43.799361,-79.8491]).bindPopup("Chinguacousy Landfill, Solid Waste").addTo(map);
    L.marker([43.49581,-79.6203]).bindPopup("Clarkson Wastewater Plant, Wastewater").addTo(map);
    L.marker([43.5588168,-79.852493]).bindPopup("Halton Hills Generating Station").addTo(map);
    L.marker([43.8650027,-79.501375]).bindPopup("Keele Valley Landfill, Solid Waste").addTo(map);
    L.marker([43.6590082,-79.321889]).bindPopup("Ashbridges Bay Wastewater Plant, Wastewater").addTo(map);
    L.marker([43.7625727,-79.585514]).bindPopup("Thackeray Landfill, Solid Waste").addTo(map);
    L.marker([43.7879406,-79.465363]).bindPopup("Connaught Campus, Manufacturing").addTo(map);
    L.marker([43.6494603,-79.330837]).bindPopup("Portlands Energy Centre, Power Plant").addTo(map);
    L.marker([43.82505,-79.1618]).bindPopup("Beare Road Landfill, Solid Waste").addTo(map);
    L.marker([43.925278,-78.83527]).bindPopup("Oshawa Landfill, Solid Waste").addTo(map);
    L.marker([43.868496,-79.10054]).bindPopup("Brock West Landfill, Solid Waste").addTo(map);
    L.marker([43.906087,-79.08643]).bindPopup("Brock Landfill, Solid Waste").addTo(map);
    L.marker([43.869833,-78.87517]).bindPopup("Oshawa Car Assembly Plant, Manufacturing").addTo(map);
    L.marker([43.85736,-78.89307]).bindPopup("Corbett Wastewater, Wastewater").addTo(map);
    L.marker([43.859374,-78.90259]).bindPopup("Whitby Cogeneration Plant, Power Plant").addTo(map);
    L.marker([43.854141,-78.90895]).bindPopup("Gerdau Ameristeel Whitby Mill").addTo(map);
    L.marker([43.8843945,-78.698456]).bindPopup("Bowmanville Cement Plant, Manufacturing").addTo(map);
    L.marker([43.8739,-79.5790]).bindPopup("TransCanada Maple, Natural Gas Transport").addTo(map);
    L.marker([43.95986,-78.8194]).bindPopup("TransCanada Bowmanville, Natural Gas Transport").addTo(map);
    L.marker([43.56328,-79.7877]).bindPopup("Union Gas Parkway Compressor Station, Natural Gas Transport").addTo(map);
    L.marker([43.91676,-79.3802]).bindPopup("Victoria Square Gate, Natural Gas Transport").addTo(map);
    L.marker([43.99502,-79.6371]).bindPopup("Schomberg Gate, Natural Gas Transport").addTo(map);
    L.marker([43.76428,-79.7399]).bindPopup("Goreway Gate, Natural Gas Transport").addTo(map);
    L.marker([43.50752,-79.8499]).bindPopup("Union Gas Milton Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.57012,-79.7847]).bindPopup("Enbridge Parkway Belt Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.58359,-79.7657]).bindPopup("Enbridge Lisgar Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.74407,-79.6309]).bindPopup("Enbridge Albion Road Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.78452,-79.4961]).bindPopup("Keele Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.72558,-79.3068]).bindPopup("Jonesville Station, Natural Gas Transport").addTo(map);
    L.marker([43.65651,-79.3455]).bindPopup("Station B, Natural Gas Transport").addTo(map);
    L.marker([43.94048,-79.2496]).bindPopup("Markham Gate Station, Natural Gas Transport").addTo(map);
    L.marker([43.6590082,-79.321889]).bindPopup("Ashbridges Bay, Wastewater").addTo(map);
    L.marker([43.633507,-79.47945]).bindPopup("Humber Bay, Wastewater").addTo(map);
    L.marker([43.766362,-79.15100]).bindPopup("Highland Creek, Wastewater").addTo(map);
    L.marker([44.357098,-79.02852]).bindPopup("Cannington, Wastewater").addTo(map);
    L.marker([43.85736,-78.89307]).bindPopup("Corbett, Wastewater").addTo(map);
    L.marker([43.871124,-78.75285]).bindPopup("Courtice, Wastewater").addTo(map);
    L.marker([43.879977,-78.8247]).bindPopup("Harmony Creek, Wastewater").addTo(map);
    L.marker([44.274868,-79.05804]).bindPopup("Sunderland, Wastewater").addTo(map);
    L.marker([43.89225,-78.66617]).bindPopup("Port Darlingtion, Wastewater").addTo(map);
    L.marker([43.819095,-79.05323]).bindPopup("Duffin Creek, Wastewater").addTo(map);
    L.marker([43.631228,-80.01954]).bindPopup("Acton, Wastewater").addTo(map);
    L.marker([43.639199,-79.87995]).bindPopup("Georgetown, Wastewater").addTo(map);
    L.marker([43.420801,-79.73336]).bindPopup("Oakville Mid Halton, Wastewater").addTo(map);
    L.marker([43.481232,-79.62991]).bindPopup("Oakville South East, Wastewater").addTo(map);
    L.marker([43.413101,-79.69330]).bindPopup("Oakville South West, Wastewater").addTo(map);
    L.marker([43.307828,-79.80067]).bindPopup("Burlington Skyway, Wastewater").addTo(map);
    L.marker([43.49581,-79.62034]).bindPopup("Clarkson ,Wastewater").addTo(map);
    L.marker([43.577868,-79.54658]).bindPopup("GE Booth ,Wastewater").addTo(map);
    L.marker([43.798577,-79.93126]).bindPopup("Inglewood ,Wastewater").addTo(map);
    L.marker([44.118546,-79.48197]).bindPopup("Holland Landing Lagoons, Wastewater").addTo(map);
    L.marker([43.82505,-79.1618]).bindPopup("Beare Road, Solid Waste").addTo(map);
    L.marker([43.868496,-79.10054]).bindPopup("Brock West, Solid Waste").addTo(map);
    L.marker([43.7625727,-79.585514]).bindPopup("Thackeray, Solid Waste").addTo(map);
    L.marker([43.7612979,-79.474747]).bindPopup("Dufferin Organics Processing, Solid Waste").addTo(map);
    L.marker([43.700538,-79.602643]).bindPopup("Disco Road Organics Processing, Solid Waste").addTo(map);
    L.marker([43.766362,-79.15100]).bindPopup("Highland Creek Incinerator, Solid Waste").addTo(map);
    L.marker([43.819095,-79.05323]).bindPopup("Duffin Creek Incinerator, Solid Waste").addTo(map);
    L.marker([44.061,-79.241]).bindPopup("Scott, Solid Waste").addTo(map);
    L.marker([43.925278,-78.83527]).bindPopup("Oshawa, Solid Waste").addTo(map);
    L.marker([43.9145,-78.694]).bindPopup("Darlington, Solid Waste").addTo(map);
    L.marker([44.1131,-78.817]).bindPopup("Scugog, Solid Waste").addTo(map);
    L.marker([44.1119,-78.817]).bindPopup("Blackstock, Solid Waste").addTo(map);
    L.marker([43.9513,-79.813]).bindPopup("Palgrave Landfill Site, Solid Waste").addTo(map);
    L.marker([43.551214,-79.58773]).bindPopup("Port Credit Memorial Park, Solid Waste").addTo(map);
    L.marker([43.686003,-79.7505]).bindPopup("Centennial Park, Solid Waste").addTo(map);
    L.marker([43.743873,-79.73797]).bindPopup("Professor’s Lake Park, Solid Waste").addTo(map);
    L.marker([43.610523,-79.5719]).bindPopup("Centre Street, Solid Waste").addTo(map);
    L.marker([43.8841,-79.732]).bindPopup("Bolton Landfill Site, Solid Waste").addTo(map);
    L.marker([43.5843,-79.717]).bindPopup("Streetsville, Solid Waste").addTo(map);
    L.marker([43.5334,-79.639]).bindPopup("Newman Landfill Site, Solid Waste").addTo(map);
    L.marker([43.54643,-79.58531]).bindPopup("Saddington Park, Solid Waste").addTo(map);
    L.marker([43.5289,-79.645]).bindPopup("North Sheridan Landfill Site, Solid Waste").addTo(map);
    L.marker([43.799361,-79.8491]).bindPopup("Chinguacousy Landfill, Solid Waste").addTo(map);
    L.marker([43.546995,-79.65490]).bindPopup("Erindale Park, Solid Waste").addTo(map);
    L.marker([43.838468,-80.01735]).bindPopup("Caledon Sanitary Landfill Site, Solid Waste").addTo(map);
    L.marker([43.602023,-79.69519]).bindPopup("Britannia Sanitary Landfill Site, Solid Waste").addTo(map);
    L.marker([43.709983,-79.6719]).bindPopup("Peel Integrated Waste Management Facility, Solid Waste").addTo(map);
    L.marker([43.840562,-80.01800]).bindPopup("Caledon Public Waste, Solid Waste").addTo(map);
    L.marker([43.799361,-79.8491]).bindPopup("Peel Curing Facility, Solid Waste").addTo(map);
    L.marker([43.8289,-79.05]).bindPopup("Miller Waste Pickering, Solid Waste").addTo(map);
    L.marker([43.8839447,-78.754905]).bindPopup("Miller Waste Clarington, Solid Waste").addTo(map);
    L.marker([43.746466,-79.67997]).bindPopup("Goreway Power Station, Power Plant").addTo(map);
    L.marker([43.6494603,-79.330837]).bindPopup("Portlands Energy Centre, Power Plant").addTo(map);
    L.marker([43.6980572,-79.642751]).bindPopup("Mississauga Cogeneration Plant, Power Plant").addTo(map);
    L.marker([43.5588168,-79.852493]).bindPopup("Halton Hills Generating Station, Power Plant").addTo(map);
    L.marker([43.859374,-78.90259]).bindPopup("Whitby Cogeneration, Power Plant").addTo(map);
    L.marker([44.0749737,-79.532114]).bindPopup("York Energy Centre, Power Plant").addTo(map);
    L.marker([43.6973067,-79.68066]).bindPopup("Algonquin Power  Energy from Waste Inc.,Power Plant").addTo(map);
    L.marker([43.691678,-79.61015]).bindPopup("GTAA Cogeneration, Power Plant").addTo(map);
    L.marker([43.857944,-79.3247]).bindPopup("Birchmount Energy Center, Power Plant").addTo(map);
    L.marker([43.883079,-79.22987]).bindPopup("Bur Oak Energy Center, Power Plant").addTo(map);
    L.marker([43.942405,-78.89647]).bindPopup("Durham College District Energy, Power Plant").addTo(map);
    L.marker([43.846553,-79.33361]).bindPopup("Warden Energy Center, Power Plant").addTo(map);
    L.marker([43.7720949,-79.27369]).bindPopup("Atlantic Packaging, Manufacturing").addTo(map);
    L.marker([43.721039,-79.81629]).bindPopup("Brampton Brick, Manufacturing").addTo(map);
    L.marker([43.4897403,-79.620245]).bindPopup("Toronto Board Plant, Manufacturing").addTo(map);
    L.marker([43.748917,-79.71488]).bindPopup("Brampton Assembly Plant, Manufacturing").addTo(map);
    L.marker([43.8300802,-79.34953]).bindPopup("Descor Industries Inc.,Manufacturing").addTo(map);
    L.marker([43.482859,-79.670819]).bindPopup("Oakville Assembly Plant, Manufacturing").addTo(map);
    L.marker([43.869833,-78.87517]).bindPopup("Oshawa Car Assembly Plant, Manufacturing").addTo(map);
    L.marker([43.854141,-78.90895]).bindPopup("Gerdau Ameristeel Whitby Mill, Manufacturing").addTo(map);
    L.marker([43.411453,-79.8028]).bindPopup("Hanson Brick - Burlington, Manufacturing").addTo(map);
    L.marker([43.6150845,-79.488362]).bindPopup("Mississauga Cement Plant, Manufacturing").addTo(map);
    L.marker([43.6942818,-79.504591]).bindPopup("Irving Tissue, Manufacturing").addTo(map);
    L.marker([43.614191,-79.804861]).bindPopup("Maple Lodge Farms Limited - Brampton, Manufacturing").addTo(map);
    L.marker([43.77409,-79.26762]).bindPopup("New Forest Paper Mills LP, Manufacturing").addTo(map);
    L.marker([43.704947,-79.73346]).bindPopup("OI Canada Brampton, Manufacturing").addTo(map);
    L.marker([43.499146,-79.61308]).bindPopup("Mississauga Lubricants Centre, Manufacturing").addTo(map);
    L.marker([43.6427839,-79.370987]).bindPopup("Toronto Refinery, Manufacturing").addTo(map);
    L.marker([43.5395207,-79.879383]).bindPopup("ROXUL Inc.,Manufacturing").addTo(map);
    L.marker([43.7879406,-79.465363]).bindPopup("Connaught Campus, Manufacturing").addTo(map);
    L.marker([43.7823886,-79.27643]).bindPopup("Agincourt Plant, Manufacturing").addTo(map);
    





  //Call the map tile to be used. This is from 'mapbox'
	L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw', {
		maxZoom: 25,
		attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	}).addTo(map);                     // Add the tile to the map
  L.control.scale().addTo(map);            // Add scale to map
  

//initialize legend by creating div element
if (plotWind() != true) {
  var legend = L.control({position: 'bottomright'});
  legend.onAdd = function (map) {
    div.innerHTML = ''
    return div;
  };
  legend.addTo(map);
}


  //Define a Function which will poll data from 'datasource.txt'
  (function pollDataSource() {
//    setTimeout(function() {
      $.ajax({                                    // This block does the bulk of the work:
        url: "../data_record_" + date + ".txt",     // "Ajax" tells the browser to perform these tasks
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
  
  var path = window.location.pathname;
  var variable = path.split("/").slice(-2, -1)[0];
  var current_date = new Date((path.split("/")[3]).substring(0,10));
  var current_time = current_date.getTime();
  var end_bicycle = 1500422400000;

  if (array.length > 1){
    var max = Math.max.apply(Math, dataArray)
    var min = Math.min.apply(Math, dataArray)

    if (current_time > end_bicycle) {
      if (variable === "Methane") {
        var max = 2.50,
            min = 1.87;
      }
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
    if (d < min) {
      color = "blue"
    }
 
  } else if (array.length < 2){
      color = 'white'
  }
  return color;
}

function scaleLength(d) {
  var max = 20.
  var min = 0.
  var delta = (max - min)
  var x = ((d - min)/delta)*150

  return x ;
}

legend.update = function(dataArray) {
  var grades = [],
      intervals = 7,
      max = Math.max.apply(Math, dataArray),
      min = Math.min.apply(Math, dataArray),
      path = window.location.pathname,
      variable = path.split("/").slice(-2, -1)[0],
      current_date = new Date((path.split("/")[3]).substring(0,10)),
      current_time = current_date.getTime(),
      end_bicycle = 1500422400000;

  if (current_time > end_bicycle) {
    if (variable === "Methane") {     
       var max = 2.50,
           min = 1.87;
    }
  }
        gradeInterval = round((max - min)/intervals, 3),        
        labels = [];
        
  // Create an array of grades by incrementally adding to the min value
  for (var i = 0; i < intervals + 1; i++) {
      grades.push(round((max - (gradeInterval * i)), 3));
    }
  // Add title to the legend
  div.innerHTML += "<b>" + legendDict[variable] + "</b><br>"
  for (var i = 0; i < intervals + 1; i++) {
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
    var windSpeed = dataComponents[6];                  //Speed in m/s
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

// Make a latlngBound array of all lat and longs
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
    if (checkifNaN(lat) != "Unknown" && checkifNaN(lon) != "Unknown"){
      latLngArray.push(arr);
    }
  }
return latLngArray ;
};

function processData(map, mapMarkers, data) {               //  Here we define what happens to the data that got polled from datasource.txt.
  //reset the dataArray
  var dataArray = []
  var dataArray = getDataArray(data);
      
  if (map && mapMarkers && data) {
  // Add the legend if it is undefined and wipe its contents
    if (plotWind() != true) {
      if (legend === undefined){
        legend.addTo(map);
      }
      div.innerHTML="";
    };
    div.innerHTML="";    
    var dataRows = data.replace(/\s/g, '').split(";");
    var startingIndex = 0;
    if (dataRows.length > (pltNum + 1) ) {
      startingIndex = dataRows.length - (pltNum + 1);
    } else if (dataRows.length < (pltNum + 1 )) {
      for (i = dataRows.length - 1; i < pltNum; i++) {
        if (mapMarkers[i] && mapMarkers[i][0] instanceof L.Marker) {
          map.removeLayer(mapMarkers[i][0]);
          
        }

        if (mapMarkers[i] && mapMarkers[i][1] instanceof L.circleMarker) {
          map.removeLayer(mapMarkers[i][1]);
        }
      }
    }
  
    for (i = startingIndex; i < dataRows.length - 1; i++) {
      try {
        if (mapMarkers[i - startingIndex] && mapMarkers[i - startingIndex][0] instanceof L.Marker) {
          map.removeLayer(mapMarkers[i - startingIndex][0]);
        }

        if (mapMarkers[i - startingIndex] && mapMarkers[i - startingIndex][1] instanceof L.circleMarker) {
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
        console.log(pltVar)
        var arrow_icon = L.icon({
            iconUrl: 'https://cdn1.iconfinder.com/data/icons/simple-arrow/512/arrow_24-128.png',
            iconSize:     [50, scaleLength(windSpeed)],  // size of the icon [width,length]
            iconAnchor: [25, scaleLength(windSpeed)],    // Location on the icon which corresponts to it's actual position (pixels in x-y coordinates from top left)
            });
        var pltTheta = parseFloat(windDirection) + 180;
        var arrowMarker = new L.marker([latitude, longitude], {
          icon: arrow_icon,
          rotationAngle: pltTheta
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
          + "<p>Pressure: "                  + pressure                                + " hPa</p>"
          + "<p>Methane: "                   + checkifNaN(round(CH4, 2))           +   " ppm</p>" 
          + "<p>Water: "                     + checkifNaN(round(H2O, 2))           +   " ppm</p>"
          + "<p>CO: "                        + checkifNaN(round(CO, 2))            +   " ppm</p>"
          + "<p>Carbon Dioxide: "            + checkifNaN(round(CO2, 2))           +   " ppm</p>");     // Add a popup tag which will show if someone clicks on the dot.

        mapMarkers[i - startingIndex] = [];
        mapMarkers[i - startingIndex][0] = arrowMarker;
        mapMarkers[i - startingIndex][1] = circleMarker;
        if (plotWind() === true) {
          if (isNaN(windDirection) === false && isNaN(windSpeed) === false) {
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
      if (dataArray.length > 0) 
        {legend.update(dataArray, pltVar)}
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


