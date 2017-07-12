/* =====================
# Lab 2, Part 3 — Underscore Analyze

## Introduction

Let's revisit the bike share data from Week 2 Lab 1, Part 4. Remember, each array contains the following:

1. lng
2. lat
3. label
4. number of bike share docks at the station

## Task 1

We're especially interested in number 4: number of bike share docks at the station.

Using underscore functions, generate a list of all bike share docks that are greater than 20. One way to do
this is by using _.filter, but you can try other solutions as well. Set your answer to variable "largeStationList".

## Task 2

Let's say we only care about the final count of bike share locations with more than 20 docks. Calculate the value
by using _.countBy and set your answer to variable "largeStationCount".
===================== */
var map = L.map('map', {
  center: [39.9522, -75.1639],
  zoom: 13
});

var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
  attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  subdomains: 'abcd',
  minZoom: 0,
  maxZoom: 20,
  ext: 'png'
}).addTo(map);


var data = bikeArrayClean;

var largeStationList = _.filter(data,function(item){
  return item[3]>20;
});
console.log(largeStationList);

var icon1 = L.icon({
    iconUrl:'bike.png',
    iconSize:[55,55],
    iconAnchor:[22,94],
    // popupAnchor:[-3,-76],
    shadowUrl:'marker-shadow.png',
    shadowSize:[48,65],
    // shadowAnchor:[22,94]
});

_.map(data,function(item){
  L.circleMarker([item[1],item[0]]).addTo(map).bindPopup(item[2]);
});

_.map(largeStationList,function(item){
  L.marker([item[1],item[0]],{icon:icon1}).addTo(map).bindPopup(item[2]);
});



var largeStationCount = _.countBy(data,function(item){
  return item[3]>20? 'more than 20 docks':'not more than 20 docks';
});
console.log(largeStationCount);

// var largeStationList = _.filter(data,function(value){
//   return value[3] > 20;
// });
// console.log(largeStationList);
//
// var largeStationCount = _.countBy(data,function(value){
//   return value[3] > 20? 'large':'small';
// });
// console.log(largeStationCount);
