//Url var, used to redirect on enter
var url;
//Get search bar and text
var input = document.getElementById("search-box");
var answer = document.getElementById("answer");
var a_icon = document.getElementById("answer-icon");
var a_title = document.getElementById("answer-title");
var a_text = document.getElementById("answer-text");
//Higlight input box and load weather
input.value = "weather";
input.focus();
input.select();
search("");
//On key up
function search(e) {
  //If input is not blank
  if (input.value != "") {
    //Bookmarks (set the url to that of the bookmark)
    if (input.value == "github") url = "https://github.com";
    else if (input.value == "reddit") url = "https://reddit.com";
    else if (input.value == "youtube") url = "https://youtube.com";
    //Time
    else if (input.value.startsWith("time")) loadTime();
    //Weather
    else if (input.value.startsWith("weather")) loadWeather();
    //Gifs
    else if (input.value.endsWith("gif")) loadGif();
    //Search on google/yt (set the url to google/youtube + the input)
    else if (input.value.startsWith("g ")) url = "https://www.google.com/search?q=" + input.value.substring(2);
    else if (input.value.startsWith("yt ")) url = "https://www.google.com/search?q=" + input.value.substring(3);
    //Load wikipedia and search ecosia (set the url to ecosia + the input
    else loadWiki();
    //If enter is pressed, go to url
    if (e.keyCode == 13) window.location.href = url;
  }
}
//Load time
function loadTime() {
  if (input.value.length == 4) {
    //If no timezone is typed, load current time
    var date = new Date();
    loadText(["", "the time is " + date.getHours() + " o'clock and " + date.getMinutes() + " minutes", "", "https://www.timeanddate.com/worldclock/"]);
  } else {
    //Get typed timezone
    var tz = input.value.substring(5).replace(/ /, "/").replace(/ /g, "_");
    if (isValidTimeZone(input.value.substring(5).replace(/ /, "/").replace(/ /g, "_"))) {
      //If it is valid, load it
      var countryTime = new Date().toLocaleString("en-US", {timeZone: tz});
      var date = new Date(countryTime);
      loadText(["", "the time is " + date.getHours() + " o'clock and " + date.getMinutes() + " minutes", "", "https://www.timeanddate.com/worldclock/"]);
    } else {
      //If not then output false timezone
      loadText(["", "false timezone :((", "", ""]);
    }
  }
}
//Load weather
function loadWeather() {
  //Get url parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Type your city or input it as ?city= in url or type it in the search box
  var city = input.value.substring(7) || urlParams.get("city") || "";
  //Type your api key or input it as ?key= in url
  var api = urlParams.get("key") || "";
  //Fetch open weather api
  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + api + "&units=metric")
    .then(response => response.json())
    .then(json => {
    //Icon list
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
    //Weather icon and description
    loadText(["url('assets/icons/" + icons[json.weather[0].icon] + "')", json.weather[0].description + " in " + json.name, "temperature is " + json.main.temp + "° C, feels like " + json.main.feels_like + "° C", "https://openweathermap.org/city/" + json.id]);
  });
}
//Load cool gif
function loadGif(json) {
  //Fetch tenor api
  fetch("https://api.tenor.com/v1/search?q=" + input.value.substring(0,(input.value.length - 4)) + "&key=TTJEW9NDWEJV&limit=1")
    .then(response => response.json())
    .then(json => loadText(["url(" + json.results[0].media[0].tinygif.url + ")", json.results[0].title, "", json.results[0].url]));
}
//Load wikipedia data
function loadWiki(json) {
  //Fetch wikipedia api
  fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=description|pageimages&titles=" + input.value + "&piprop=original&formatversion=2")
    .then(response => response.json())
    //If article exists (not undefined) load it
    .then(json => {if(typeof json.query.pages[0].original != 'undefined') loadText(["url(" + json.query.pages[0].original.source + ")", json.query.pages[0].description, "", "https://www.ecosia.org/search?q=" + input.value]);});
}
//Show text and icon
function loadText(array) {
  //Icon
  a_icon.style.background = array[0];
  a_icon.style.backgroundSize = "100% 100%";
  //Title
  a_title.innerHTML = array[1];
  //Text
  a_text.innerHTML = array[2];
  //URL (on enter)
  url = array[3];
  //Cool animation
  answer.classList.add("animate__animated");
  answer.classList.add("animate__zoomInDown");
}
