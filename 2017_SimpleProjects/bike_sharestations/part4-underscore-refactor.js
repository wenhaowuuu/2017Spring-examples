  var map = L.map('map', {
    center: [39.9522, -75.1639],
    zoom: 14
  });
  var Stamen_TonerLite = L.tileLayer('http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lite/{z}/{x}/{y}.{ext}', {
    attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    subdomains: 'abcd',
    minZoom: 0,
    maxZoom: 20,
    ext: 'png'
  }).addTo(map);

  /* =====================

  # Lab 2, Part 4 — (Optional, stretch goal)

  ## Introduction

    You've already seen this file organized and refactored. In this lab, you will
    try to refactor this code to be cleaner and clearer - you should use the
    utilities and functions provided by underscore.js. Eliminate loops where possible.

  ===================== */

  // Mock user input
  // Filter out according to these zip codes:
  var acceptedZipcodes = [19106, 19107, 19124, 19111, 19118];
  // Filter according to enrollment that is greater than this variable:
  var minEnrollment = 300;


  console.log(schools);
  // clean data

var data = schools;
_.each(data,function(item){
  if (item.ZIPCODE=='string'){
    split = item.ZIPCODE.split(' ');
    var numberzip = parseInt(split[0]);
     item.ZIPCODE = numberzip;
  }
});


  // _.each(schools,function(item){
  //     if (typeof item.ZIPCODE === 'string') {
  //       split = item.ZIPCODE.split(' ');
  //       normalized_zip = parseInt(split[0]);
  //       item.ZIPCODE = normalized_zip;
  //     }
  //   });

    // Check out the use of typeof here — this was not a contrived example.
    // Someone actually messed up the data entry
    _.each(data,function(item){
      if (typeof item.GRADE_ORG === 'number') {  // if number
        item.HAS_KINDERGARTEN = item.GRADE_LEVEL < 1;
        item.HAS_ELEMENTARY = 1 < item.GRADE_LEVEL < 6;
        item.HAS_MIDDLE_SCHOOL = 5 < item.GRADE_LEVEL < 9;
        item.HAS_HIGH_SCHOOL = 8 < item.GRADE_LEVEL < 13;
      } else {  // otherwise (in case of string)
        item.HAS_KINDERGARTEN = item.GRADE_LEVEL.toUpperCase().indexOf('K') >= 0;
        item.HAS_ELEMENTARY = item.GRADE_LEVEL.toUpperCase().indexOf('ELEM') >= 0;
        item.HAS_MIDDLE_SCHOOL = item.GRADE_LEVEL.toUpperCase().indexOf('MID') >= 0;
        item.HAS_HIGH_SCHOOL = item.GRADE_LEVEL.toUpperCase().indexOf('HIGH') >= 0;
      }

  });


  // filter data
  var filtered_data = [];
  var filtered_out = [];
  _.each(schools,function(item1){
    isOpen = item1.ACTIVE.toUpperCase() == 'OPEN';
    isPublic = (item1.TYPE.toUpperCase() !== 'CHARTER' &&
                item1.TYPE.toUpperCase() !== 'PRIVATE');
    isSchool = (item1.HAS_KINDERGARTEN ||
                item1.HAS_ELEMENTARY ||
                item1.HAS_MIDDLE_SCHOOL ||
                item1.HAS_HIGH_SCHOOL);
    meetsMinimumEnrollment = item1.ENROLLMENT > minEnrollment;
    meetsZipCondition = acceptedZipcodes.indexOf(item1.ZIPCODE) >= 0;
    filter_condition = (isOpen &&
                        isSchool &&
                        meetsMinimumEnrollment &&
                        !meetsZipCondition);
    if (filter_condition) {
      filtered_data.push(item1);
    } else {filtered_out.push(item1);
    }
  });

  console.log('Included:', filtered_data.length);
  console.log('Excluded:', filtered_out.length);

  // main loop
  _.each(filtered_data,function(item2){
      var color;
      // Constructing the styling  options for our map
      if (item2.HAS_HIGH_SCHOOL){
        color = '#0000FF';
      } else if (item2.HAS_MIDDLE_SCHOOL) {
        color = '#00FF00';
      } else {
        color = '##FF0000';
      }
      // The style options
      var pathOpts = {'radius': item2.ENROLLMENT / 30,
                      'fillColor': color};
      L.circleMarker([item2.Y, item2.X], pathOpts)
        .bindPopup(item2.FACILNAME_LABEL)
        .addTo(map);

    });
