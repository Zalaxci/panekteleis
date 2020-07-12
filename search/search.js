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
ask("weather");
//On key up
function keyUp(e) {
  //Get input text
  var inputText = input.value;
  //Default url
  var url = "https://www.ecosia.org/search?q=" + inputText;
  //Different url for different inputs
  switch (inputText) {
    case "weather":
      url = "https://meteo.gr/cf.cfm?city_id=71";
      break;
    case "youtube":
      url = "https://studio.youtube.com";
      break;
    case "g " + inputText.substring(2):
      var inputText = inputText.substring(2);
      url = "https://www.google.com/search?q=" + inputText;
      break;
    case "gif " + inputText.substring(4):
      var inputText = inputText.substring(4);
      url = "https://giphy.com/search/" + inputText;
      break;
    case "youtube " + inputText.substring(8):
      var inputText = inputText.substring(8);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      break;
    case "yt " + inputText.substring(3):
      var inputText = inputText.substring(3);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      break;
  }
  //If enter is pressed, search/go to url, if not show answer text
  if (e.keyCode == 13) window.location.href = url;
  else ask(inputText);
}

function ask(what) {
  //Remove previous text
  a_icon.style.background = "";
  a_title.innerHTML = "";
  a_text.innerHTML = "";
  //Shows text depending on input
  switch (what) {
    case "time" + what.substring(4):
      if (what.length > 11) {
        var tz = what.substring(5).replace(/ /, "/");
        var tz = tz.replace(/ /g, "_");
        loadTime(tz);
      } else {
        loadTime();
      }
      break;
    case "weather" + what.substring(7):
      loadWeather(what.substring(7));
      break;
    case "how" + what.substring(3):
      break;
    default:
      fetch("https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=description|pageimages&titles=" + what + "&piprop=original&formatversion=2")
        .then(response => response.json())
        .then(json => loadWiki(json));
  }
  //Cool animation
  answer.classList.add("animate__animated");
  answer.classList.add("animate__zoomInDown");
}

function loadWiki(json) {
  if(typeof json.query.pages[0].original != 'undefined'){
    a_icon.style.background = "url(" + json.query.pages[0].original.source + ")";
    a_icon.style.backgroundSize = "cover";
    a_title.innerHTML = json.query.pages[0].description;
    a_text.innerHTML = "more on wikipedia";
    a_text.href = "https://en.wikipedia.org/wiki/" + json.query.pages[0].title;
  }
}
