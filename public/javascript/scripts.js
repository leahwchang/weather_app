var header = document.querySelector('header');

var requestURL = 'http://ip-api.com/json';
var request = new XMLHttpRequest();
request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var latlon = request.response;

  // var latitude = document.createElement('h1');
  // latitude.textContent = latlon['lat'];
  // header.appendChild(latitude);
  // var longitude = document.createElement('h1');
  // longitude.textContent = latlon['lon'];
  // header.appendChild(longitude);

  populateLocationDiv(latlon);
  populateData(latlon);
};

function populateLocationDiv(jsonObj) {
  var latitude = document.createElement('h1');
  latitude.textContent = jsonObj['lat'];
  header.appendChild(latitude);

  var longitude = document.createElement('h1');
  longitude.textContent = jsonObj['lon'];
  header.appendChild(longitude);
}

function populateData(jsonObj) {
  // get regular 
  var latitude = jsonObj['lat'];
  console.log("lat=" + latitude + "&");
  var longitude = jsonObj['lon'];
  console.log("lon=" + longitude + "&");
  var weatherURL = 'http://api.openweathermap.org/data/2.5/weather?APPID=59985ba7ec6e4c11ee9767056f921dc7';
  var re =

//   var weather = new XMLHttpRequest();
//   weather.open('GET', weatherURL);
//   weather.responseType = 'json';
//   weather.send();
//   weather.onload = function() {
//     var temperature = weather.response;
//   }


}
