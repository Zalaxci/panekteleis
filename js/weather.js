//Load weather
function loadWeather(place) {
  //Type your city
  var city = place || "";
  //Type your api key
  var api = "";
  //Fetch open weather api
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=metric";
  fetch(url)
    .then(response => response.json())
    .then(json => showWeather(json));
}
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
  a_icon.style.width = "80px";
  a_icon.style.height = "80px";
  a_icon.style.background = "url('assets/icons/" + icon + "')";
  a_icon.style.backgroundSize = "cover";
  a_title.innerHTML = data.weather[0].description + " in " + data.name;
  a_text.innerHTML = "temperature is " + data.main.temp + "° C, feels like " + data.main.feels_like + "° C";
}
