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
var dataset;
var value1, value2, value3;
var downloadData;
var parsed;
var markers;

$(document).ready(function() {
 //Set default values
 $("#text-input1").val("https://raw.githubusercontent.com/CPLN-692-401/datasets/master/json/philadelphia-solar-installations.json");
 $("#text-input2").val("LAT");
 $("#text-input3").val("LONG_");
 // Get values function

 var getvalues = function(){
 value1 = $("#text-input1").val();
 value2 = $("#text-input2").val();
 value3 = $("#text-input3").val();
 dataset={"URL": value1, "Latitude_Key": value2, "Longitude_Key": value3};
 return dataset;
}

// Write a function to prepare your data (clean it up, organize it as you like, create fields, etc)
var ParseData = function(data) {
  parsed = JSON.parse(data);
  return parsed;
};
// Write a function to use your parsed data to create a bunch of marker objects (don't plot them!)
 var makeMarkers = function(data) {return _.map(data, function(obj){return L.marker([obj[dataset.Latitude_Key],obj[dataset.Longitude_Key]])})};

// Now we need a function that takes this collection of markers and puts them on the map
 var plotMarkers = function(data) {return _.map(data, function(mark){return mark.addTo(map)})};

 var removeMarkers = function(data) {return _.each(data, function(mark){map.removeLayer(mark)})};


 $('button').click(function(e) {
   getvalues();
   downloadData = $.ajax(dataset.URL);
   console.log(dataset);
   removeMarkers(markers);
   downloadData.done(function(data) {
     ParseData(data);
     console.log(parsed);
     markers = makeMarkers(parsed);
     console.log(markers);
     plotMarkers(markers);
   });
  /* ParseData();
   console.log(parsed);
   markers = makeMarkers(parsed);
   console.log(markers);
   plotMarkers(markers); */
 })


});
