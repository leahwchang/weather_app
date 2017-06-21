var header = document.querySelector('header');

var locationURL = 'http://ip-api.com/json';
var requestLocation = new XMLHttpRequest();
requestLocation.open('GET', locationURL);
requestLocation.responseType = 'json';
requestLocation.send();
requestLocation.onload = function() {
  var location = requestLocation.response;
  getWeather(location);
};

function getWeather(jsonObj) {
  var weatherURL = 'http://api.openweathermap.org/data/2.5/weather';
  var units = '&units=imperial';
  var appid = '&APPID=59985ba7ec6e4c11ee9767056f921dc7';
  var latitude = 'lat=' + jsonObj['lat'] + '&';
  var longitude = 'lon=' + jsonObj['lon'] + '&';

  weatherURL = weatherURL + '?' + latitude + longitude + units + appid;

  var requestWeather = new XMLHttpRequest();
  requestWeather.open('GET', weatherURL);
  requestWeather.responseType = 'json';
  requestWeather.send();
  requestWeather.onload = function() {
    var weather = requestWeather.response;
    populateData(weather);
  }

  function populateData(jsonObj) {
    var degrees = document.createElement('h1');
    degrees.textContent = jsonObj['main']['temp'];
    header.appendChild(degrees);
  }
}
