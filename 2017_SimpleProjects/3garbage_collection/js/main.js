/* =====================
Leaflet Configuration
===================== */
var dataset = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson";

var map = L.map('map', {
  center: [40.000, -75.1090],
  zoom: 11
});
var Stamen_TonerLite = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);

/* =====================


## Task 9 (Stretch Goal)

Use Underscore to perform analysis on this GeoJSON data: which day of
the week was the most common for garbage removal? Update the original state
of the application to report this information.

===================== */


// var myStyle = function(feature) {
//   if (feature.properties.COLLDAY==='MON') {
//     return {'fillColor':'blue'};
//   }
//   else if (feature.properties.COLLDAY==='TUE'){
//     return {'fillColor':'yellow'};
//   }
//   else if (feature.properties.COLLDAY==='WED'){
//     return {'fillColor':'green'};
//   }
//   else if (feature.properties.COLLDAY==='THU'){
//     return {'fillColor':'purple'};
//   }
//   else if (feature.properties.COLLDAY==='FRI'){
//     return {'fillColor':'red'};
//   }
// };

//THIS FUNCTION ASSIGN DIFFERENT COLORS TO DIFFERENT DISTRICTS BASED ON THEIR COLLECTION DAY//
var myStyle = function(feature){
  switch(feature.properties.COLLDAY){
    case "MON":return{color:"#e74c3c"};
    case "TUE":return{color:"#e67e22"};
    case "WED":return{color:"#28b463"};
    case "THU":return{color:"#2e86c1"};
    case "FRI":return{color:"#7d3c98"};
  }
  return {};
};

//
// var myStyle=function(feature){
//   switch(feature.properties.COLLDAY){
//     case "MON":return{color:"#00FFFF"};
//     case "TUE":return{color:"#0000FF"};
//     case "WED":return{color:"#FF7F50"};
//     case "THU":return{color:"#006400"};
//     case "FRI":return{color:"#FF1493"};
//   }
//   return {};
// };


var showResults = function() {
  /* =====================
  This function uses some jQuery methods that may be new. $(element).hide()
  will add the CSS "display: none" to the element, effectively removing it
  from the page. $(element).show() removes "display: none" from an element,
  returning it to the page. You don't need to change this part.
  ===================== */
  // => <div id="intro" css="display: none">
  $('#intro').hide();
  // => <div id="results">
  $('#results').show();
};


/* =====================
  The following code will run every time a layer on the map is clicked.
  Check out layer.feature to see some useful data about the layer that
  you can use in your application.
===================== */


//WHEN THE FEATURE IS CLICKED: //
 var eachFeatureFunction = function(layer) {
    layer.on('click', function (event) {
    // <div id="results" style="display: none;">
    document.getElementById("results").style.display = "inline";
    console.log(layer.feature);
      switch (layer.feature.properties.COLLDAY){
        case 'MON':
          $('.day-of-week').text('Monday');
          break;
        case 'TUE':
          $('.day-of-week').text('Tuesday');
          break;
        case 'WED':
          $('.day-of-week').text('Wednesday');
          break;
        case 'THU':
          $('.day-of-week').text('Thursday');
          break;
        case 'FRI':
          $('.day-of-week').text('Friday');
          break;
    // showResults();
    }
  });
};

// var myLayer = L.geoJSON().addTo(map);
// myLayer.addData(geojsonFeature);

var myFilter = function(feature) {
  if (feature.properties.COLLDAY===' ') {
  return false;
  }
  else {
    return true;
  }
};


$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    var parsedData = JSON.parse(data);
    var featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map).bindPopup("THIS AREA");

    // quite similar to _.each
    console.log(parsedData);
    featureGroup.eachLayer(eachFeatureFunction);
  });
});
