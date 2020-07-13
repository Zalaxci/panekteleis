//Get search bar and text
var input = document.getElementById("search-box");
var answer = document.getElementById("answer");
var a_title = document.getElementById("answer-title");
var a_text = document.getElementById("answer-text");
//Higlight input box and load weather
input.value = "weather";
input.focus();
input.select();
ask("weather");
//On key up
function keyUp(e) {
  //Get input text
  var inputText = input.value;
  //Default url
  url = "https://www.ecosia.org/search?q=" + inputText;
  //Different url for different inputs (bookmarks/different types of search)
  switch (inputText) {
    case "reddit":
      url = "https://reddit.com";
      inputText = "";
      break;
    case "youtube":
      url = "https://youtube.com";
      inputText = "";
      break;
    case "github":
      url = "https://github.com";
      inputText = "";
      break;
    case "g " + inputText.substring(2):
      var inputText = inputText.substring(2);
      url = "https://www.google.com/search?q=" + inputText;
      inputText = "";
      break;
    case "youtube " + inputText.substring(8):
      var inputText = inputText.substring(8);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      inputText = "";
      break;
    case "yt " + inputText.substring(3):
      var inputText = inputText.substring(3);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      inputText = "";
      break;
    case inputText.substring(0,(inputText.length - 4)) + " gif":
      if (e.keyCode == 13) fetch("https://api.tenor.com/v1/search?q=" + inputText.substring(0,(inputText.length - 4)) + "&key=TTJEW9NDWEJV&limit=1")
        .then(response => response.json())
        .then(json => {
          var jsonData = json;
          window.location.href = json.results[0].itemurl;
        });
      break;
  }
  //If enter is pressed, search/go to url, if not show answer text
  if (e.keyCode == 13) window.location.href = url;
  else ask(inputText);
}

function ask(what) {
  //Remove previous text
  a_title.innerHTML = "";
  a_text.innerHTML = "";
  a_text.removeAttribute("href");
  //Shows text/images depending on input
  switch (what) {
    case "":
    case "how" + what.substring(3):
      break;
    case "time":
      loadTime();
      break;
    case "time " + what.substring(5):
      var tz = what.substring(5).replace(/ /, "/");
      tz = tz.replace(/ /g, "_");
      loadTime(tz);
      break;
    case "weather" + what.substring(7):
      loadWeather(what.substring(7));
      break;
    default:
      fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=description|pageimages&titles=" + what + "&piprop=original&formatversion=2")
        .then(response => response.json())
        .then(json => loadWiki(json));
  }
}
//Load wikipedia data
function loadWiki(json) {
  if(typeof json.query.pages[0].original != 'undefined'){
    a_title.innerHTML = json.query.pages[0].description;
    a_text.innerHTML = "more on wikipedia";
    a_text.href = "https://en.wikipedia.org/wiki/" + json.query.pages[0].title;
  }
}
//Load cool gif
function loadGif(json) {
  a_title.innerHTML = json.results[0].title;
  a_text.innerHTML = "view on tenor";
  a_text.href = json.results[0].itemurl;
}
//Load time when time is searched
function loadTime(tz) {
  if (tz == "") {
    var date = new Date();
    a_title.innerHTML = "the time is " + date.getHours() + " o'clock and " + date.getMinutes() + " minutes";
  } else if(isValidTimeZone(tz)) {
    var countryTime = new Date().toLocaleString("en-US", {timeZone: tz});
    var date = new Date(countryTime);
    a_title.innerHTML = "the time is " + date.getHours() + " o'clock and " + date.getMinutes() + " minutes";
  } else {
    a_title.innerHTML = "false time zone";
  }
}
//Find valid timezone
function isValidTimeZone(tz) {
    try {
        Intl.DateTimeFormat(undefined, {timeZone: tz});
        return true;
    }
    catch (ex) {
        return false;
    }
}
