//Url var, used to redirect on enter
var url;
//Get search bar and text
var input = document.getElementById("search-box");
var answer = document.getElementById("content");
var a_icon = document.getElementById("content-icon");
var a_title = document.getElementById("content-title");
var a_text = document.getElementById("content-text");
//Higlight input box and load weather
input.value = "notes";
input.focus();
input.select();
//On key up
function keyUp(e) {
  //If input is not blank, then search, and if enter is pressed load url
  if (input.value != "" && search() && e.keyCode == 13) window.location.href = url;
}
function search() {
  //Fetch bookmarks (set the url to that of the bookmark)
  return fetch("bookmarks.json")
    .then(response => response.json())
    .then(json => {
      //Redifine input var
      var input = document.getElementById("search-box");
      //If input is equal to a bookmark, change the url to that of the bookmark and return true
      var i;
      for (i = 0; i < json.length; i++) if (input.value.startsWith(json[i].keyWord) && changeUrl(json[i].url)) return true;
      //If not, then perform different functions depending on how the input starts/ends
      //Weather
      else if (input.value.startsWith("weather")) loadWeather();
      //Cool gifs
      else if (input.value.endsWith("gif")) loadGif();
      //Search on google/yt on enter (set the url to google/youtube + the input)
      else if (input.value.startsWith("g ")) changeUrl("https://www.google.com/search?q=" + input.value.substring(2));
      else if (input.value.startsWith("yt ")) changeUrl("https://www.youtube.com/results?search_query" + input.value.substring(3));
      //If none of these statements is true, search ddg and wikipedia
      else {
        changeUrl("https://duckduckgo.com/?q=" + input.value); //Search on ddg on enter (set the url to ddg + the input)
        loadWiki(); //Load text from wikipedia
      }
    });
}
//Load weather
function loadWeather() {
  //Get url parameters
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  //Type your city or input it as ?city= in url or type it in the search box
  var city = input.value.substring(7) || urlParams.get("city") || "thassos";
  //Type your api key or input it as ?key= in url
  var api = urlParams.get("key") || "eff32c0e4ee7d564b4f05dc6520b9ff7";
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
    loadText("url('assets/icons/" + icons[json.weather[0].icon] + "')", json.weather[0].description + " in " + json.name, "temperature is " + json.main.temp + "° C, feels like " + json.main.feels_like + "° C");
    changeUrl("https://openweathermap.org/city/" + json.id);
  });
}
//Load cool gif
function loadGif(json) {
  //Fetch tenor api
  fetch("https://api.tenor.com/v1/search?q=" + input.value.substring(0,(input.value.length - 4)) + "&key=TTJEW9NDWEJV&limit=1")
    .then(response => response.json())
    .then(json => {
      loadText("url(" + json.results[0].media[0].tinygif.url + ")", json.results[0].title);
      changeUrl(json.results[0].url);
      });
}
//Load wikipedia data
function loadWiki(json) {
  //Fetch wikipedia api
  fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=description|pageimages&titles=" + input.value + "&piprop=original&formatversion=2")
    .then(response => response.json())
    //If article exists (not undefined) load it
    .then(json => {
      if (typeof json.query.pages[0].original != 'undefined') loadText("url(" + json.query.pages[0].original.source + ")", json.query.pages[0].description)
      else loadText();
    });
}
//Show text and icon
function loadText(icon, title, text) {
  //Icon
  a_icon.style.background = icon || "";
  a_icon.style.backgroundSize = "100% 100%";
  if (a_icon.style.background == "") a_icon.classList.remove("shadow");
  else a_icon.classList.add("shadow");
  //Title
  a_title.innerHTML = title || "";
  //Text
  a_text.innerHTML = text || "";
  //Cool animation
  answer.classList.add("animate__animated");
  answer.classList.add("animate__zoomInDown");
}
//A function is needed to change the url since fetch code is isolated and cannot access variables
function changeUrl(new_url) {
  //URL (on enter)
  url = new_url;
  return true;
}
