//Get url parameters
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
//Load weather
function loadWeather(place) {
  //Type your city
  var city = place || urlParams.get("city") || "";
  //Type your api key
  var api = urlParams.get("key") || "";
  //Fetch open weather api
  var url = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=metric";
  fetch(url)
    .then(response => response.json())
    .then(json => showWeather(json));
}
//Show the weather
function showWeather(data) {
  a_title.innerHTML = data.weather[0].description + " in " + data.name;
  a_text.innerHTML = "temperature is " + data.main.temp + "° C, feels like " + data.main.feels_like + "° C";
}
