var header = document.querySelector('header');

var latlonURL = 'https://ipapi.co/json';
var requestLatlon = new XMLHttpRequest();
requestLatlon.open('GET', latlonURL);
requestLatlon.responseType = 'json';
requestLatlon.send();
requestLatlon.onload = function() {
  var latlon = requestLatlon.response;
  console.log(latlon, latlon.latitude, latlon.longitude, latlon.city, latlon.region, latlon.country, latlon.postal);
  getWeather(latlon);
};

// get api data from openweathermap.org
function getWeather(jsonObj) {
  var weatherURL = 'https://api.openweathermap.org/data/2.5/weather';
  var zip = 'zip=' + jsonObj.postal + ',' + jsonObj.country;
  var units = '&units=imperial';
  var appid = '&APPID=59985ba7ec6e4c11ee9767056f921dc7';
  weatherURL = weatherURL + '?' + zip + units + appid;
  // console.log(weatherURL);

  var requestWeather = new XMLHttpRequest();
  requestWeather.open('GET', weatherURL);
  requestWeather.responseType = 'json';
  requestWeather.send();
  requestWeather.onload = function() {
    var weather = requestWeather.response;
    populateData(weather);
    degreeUnits(weather);
    dayNight(weather);
    background(weather);
  }

  // grab data from api for city and weather description
  function populateData(jsonObj) {
    var time = document.getElementById("time");
    var currentTime = document.createElement("h2");
    var d1 = new Date().toDateString();
    currentTime.textContent = d1;
    time.appendChild(currentTime);

    var city = document.getElementById("city");
    var location = document.createElement('h1');
    location.textContent = jsonObj.name + ', ' + jsonObj.sys.country;
    city.appendChild(location);

    var text = document.getElementById("text");
    var description = document.createElement('h2');
    description.textContent = jsonObj.weather[0].main;
    text.appendChild(description);
  }

  // grab data from api for temperature
  // show unit type in Metrics or Imperial
  // default: Imperial
  function degreeUnits(jsonObj) {
    var temp = document.getElementById("temp");
    temp.textContent = jsonObj.main.temp.toFixed();
    var temperature = $("#temp").text();
    $("#switchUnitsType").on("click", function(){
      if ($("#temp").hasClass("fahrenheit")) {
        // if temperature is in fahrenheit
        // convert temperature to celsius
        // change unit type to Metrics °C
        // change button to Show in Imperial
        $("#temp").addClass("celsius");
        $("#temp").removeClass("fahrenheit");
        temperature = ((temperature - 32) * 5 / 9).toFixed();
        $("#temp").html(temperature);
        $("#unitsType").html("°C");
        $("#switchUnitsType").html("Show in Imperial");
      } else if ($("#temp").hasClass("celsius")) {
        // if temperature is in celsius
        // convert temperature to fahrenheit
        // change unit type to Imperial °F
        // change button to Show in Metrics
        $("#temp").addClass("fahrenheit");
        $("#temp").removeClass("celsius");
        temperature = (temperature * (9 / 5) + 32).toFixed();
        $("#temp").html(temperature);
        $("#unitsType").html("°F");
        $("#switchUnitsType").html("Show in Metrics");
      }
    });
  }

  // grab api data to determine current time (dt) and sunrise and sundown
  function dayNight(jsonObj) {
    var currentTime = jsonObj.dt;
    var sunrise = jsonObj.sys.sunrise;
    var sunset = jsonObj.sys.sunset;
    if (sunrise > currentTime > sunset) {
      // if current time is between sunrise and sunset
      // set background colors to day time colors
      document.body.style.background = "radial-gradient(circle, rgb(173, 228, 255), rgb(93, 197, 249), rgb(0, 171, 255))";
    } else if (sunrise < currentTime < sunset) {
      // if current time is between sunset and sunrise
      // set background colors to night time colors
      document.body.style.background = "radial-gradient(circle, rgb(58, 86, 152), rgb(14, 37, 92), rgb(7, 16, 40))";
    }
  }

  // grab api data for openweathermap icon number
  function background(jsonObj) {
    var apiIcon = jsonObj.weather[0].icon;
    var icon = document.createElement('div');
    var weatherIcon = document.getElementById('weatherIcon');
    switch(apiIcon) {
      case "01d":
        // clear sky - sun
        icon.innerHTML = "<div class=\"sun\"><div class=\"sun-rays long-rays\"></div><div class=\"sun-rays short-rays\"></div></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "01n":
        // clear sky - moon
        icon.innerHTML = "<div class=\"moon\"><div class=\"stars\"><span class=\"star-rays v-ray\"></span><span class=\"star-rays h-ray\"></span></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "02d":
        // few clouds - day - sun
        icon.innerHTML = "<div class=\"few-clouds-sun\"><div class=\"sun\"><div class=\"sun-rays long-rays\"></div><div class=\"sun-rays short-rays\"></div></div><div class=\"cloud\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "02n":
        // few clouds - night - moon
        icon.innerHTML = "<div class=\"few-clouds-moon\"><div class=\"moon\"><div class=\"stars\"><span class=\"star-rays v-ray\"></span><span class=\"star-rays h-ray\"></span></div></div><div class=\"cloud dark\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "03d":
        // clouds - day
        icon.innerHTML = "<div class=\"cloud\"></div>";
        weatherIcon.appendChild(icon);
        break;
      case "03n":
        // clouds - night
        icon.innerHTML = "<div class=\"cloud dark\"></div>";
        weatherIcon.appendChild(icon);
        break;
      case "04d":
        // broken clouds - day
        icon.innerHTML = "<div class=\"broken-clouds-d\"><div class=\"cloud one\"></div><div class=\"cloud two\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "04n":
        // broken clouds - night
        icon.innerHTML = "<div class=\"broken-clouds-n\"><div class=\"cloud dark one\"></div><div class=\"cloud dark two\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "09d":
        // shower - day
        icon.innerHTML = "<div class=\"shower-d\"><div class=\"cloud\"></div><div class=\"rain\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "09n":
        // shower - night
        icon.innerHTML = "<div class=\"shower-n\"><div class=\"cloud dark\"></div><div class=\"rain\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "10d":
        // heavy rain - day
        icon.innerHTML = "<div class=\"rain-d\"><div class=\"broken-clouds-d\"><div class=\"cloud one\"></div><div class=\"cloud two\"></div></div><div class=\"rain heavy-rain\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "10n":
        // heavy rain - night
        icon.innerHTML = "<div class=\"rain-n\"><div class=\"broken-clouds-n\"><div class=\"cloud dark one\"></div><div class=\"cloud dark two\"></div></div><div class=\"rain heavy-rain\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "11d":
      case "11n":
        // thunder
        icon.innerHTML = "<div class=\"thunderStorm\"><div class=\"broken-clouds-n\"><div class=\"cloud dark one\"></div><div class=\"cloud dark two\"></div></div><div class=\"thunder\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "13d":
      case "13n":
        // snow
        icon.innerHTML = "<div class=\"snow\"><div class=\"broken-clouds-n\"><div class=\"cloud dark one\"></div><div class=\"cloud dark two\"></div></div><div class=\"flake\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      case "50d":
      case "50n":
        // fog/wind
        icon.innerHTML = "<div class=\"mist\"><div class=\"fog fog1\"></div><div class=\"fog fog2\"></div></div>";
        weatherIcon.appendChild(icon);
        break;
      // default:
    }
  }

}
