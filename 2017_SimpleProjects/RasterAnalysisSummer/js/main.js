console.log("loading map");
////THE MAIN JS FILE////
// var dataset = "https://raw.githubusercontent.com/wenhaowuuu/week-2/master/CensusBlockGroup_2010.json";
console.log("dataseturl");
var dataset = "https://raw.githubusercontent.com/CPLN692-MUSA611/datasets/master/geojson/philadelphia-garbage-collection-boundaries.geojson";
// $(document).ready(function(){
//   $.ajax(dataset).done(function(data) {
//     console.log("download");
//   });
// });

console.log("test1");
var myStyle = function(feature){
  var MEDHVAL = feature.properties.MEDHVAL;
  switch(MEDHVAL){
    case MEDHVAL<50000:return{color:"#e74c3c"};
    case ((MEDHVAL>=50000) && (MEDHVAL<100000)):return{color:"#e67e22"};
  }
  return {};
};
console.log("test2");
var myFilter = function(feature) {
  if (feature.properties.MEDHVAL===' ') {
  return false;
  }
  else {
    return true;
  }
};

console.log("test3");

var myMarker = L.marker([39.952,-75.164]);
console.log(myMarker);
console.log("marker");

myMarker.addTo(map6);

console.log("marker added");

///MAYBE USEFUL:
//https://github.com/tombatossals/angular-leaflet-directive/issues/331
//https://esri.github.io/esri-leaflet/examples/switching-basemaps.html

$(document).ready(function() {
  $.ajax(dataset).done(function(data) {
    console.log("download");
    var parsedData = JSON.parse(data);
    var featureGroup = L.geoJson(parsedData, {
      style: myStyle,
      filter: myFilter
    }).addTo(map6).bindPopup("THIS AREA");
    console.log(parsedData);
    // featureGroup.eachLayer(eachFeatureFunction);
  });
});
console.log("test4");
