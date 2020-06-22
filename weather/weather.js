//Get current location
const getLocation = (pos) => [pos.coords.latitude, pos.coords.longitude];
//Get url parameters
const urlParams = new URLSearchParams(window.location.search);
//Set coords array to location if found, else get url coords parameter
var coords = navigator.geolocation.getCurrentPosition(getLocation) || JSON.parse(urlParams.get('coords'));
//Type your api key
var api = "eff32c0e4ee7d564b4f05dc6520b9ff7";
//Fetch open weather api
var url = "https://api.openweathermap.org/data/2.5/weather?lat=" + coords[0] + "&lon=" + coords[1] + "&appid=" + api + "&units=metric";
fetch(url)
  .then(response => response.json())
  .then(data => showWeather(data));
//Show the weather
function showWeather(data) {
  var icons = {
		'01d': 'sun_icon.svg',
		'01n': 'moon_icon.svg',
		'02d': 'dfew_clouds.svg',
		'02n': 'nfew_clouds.svg',
		'03d': 'dscattered_clouds.svg',
		'03n': 'nscattered_clouds.svg',
		'04d': 'dbroken_clouds.svg',
		'04n': 'nbroken_clouds.svg',
		'09d': 'dshower_rain.svg',
		'09n': 'nshower_rain.svg',
		'10d': 'd_rain.svg',
		'10n': 'n_rain.svg',
		'11d': 'dthunderstorm.svg',
		'11n': 'nthunderstorm.svg',
		'13d': 'snow.svg',
		'13n': 'snow.svg',
		'50d': 'dmist.svg',
		'50n': 'nmist.svg'
	};
  icon = icons[data.weather[0].icon];
  document.getElementById("sky").style.background = "url('weather/icons/" + icon + "')";
  document.getElementById("sky").style.backgroundSize = "cover";
  document.getElementById("desc").innerHTML = data.weather[0].description + " in " + data.name;
  document.getElementById("temp").innerHTML = "temperature is " + data.main.temp + "° C, feels like " + data.main.feels_like + "° C";
  //Cool animation
  document.getElementById("weather-container").classList.add("animate__animated");
  document.getElementById("weather-container").classList.add("animate__zoomInDown");
}
