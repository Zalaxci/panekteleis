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
    case "youtube":
      url = "https://studio.youtube.com";
      var inputText = "";
      break;
    case "g " + inputText.substring(2):
      var inputText = inputText.substring(2);
      url = "https://www.google.com/search?q=" + inputText;
      break;
    case "youtube " + inputText.substring(8):
      var inputText = inputText.substring(8);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      var inputText = "";
      break;
    case "yt " + inputText.substring(3):
      var inputText = inputText.substring(3);
      url = "https://www.youtube.com/results?search_query=" + inputText;
      var inputText = "";
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
  a_text.removeAttribute("href");
  //Shows text depending on input
  switch (what) {
    case "":
    case "how" + what.substring(3):
      break;
    case what.substring(0,(what.length - 4)) + " gif":
      fetch("https://api.tenor.com/v1/search?q=" + what.substring(0,(what.length - 4)) + "&key=TTJEW9NDWEJV&limit=1")
        .then(response => response.json())
        .then(json => loadGif(json));
      break;
    case "time":
      loadTime();
      break;
    case "time " + what.substring(5):
      var tz = what.substring(5).replace(/ /, "/");
      var tz = tz.replace(/ /g, "_");
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
  //Cool animation
  answer.classList.add("animate__animated");
  answer.classList.add("animate__zoomInDown");
}
//Load wikipedia data
function loadWiki(json) {
  if(typeof json.query.pages[0].original != 'undefined'){
    a_icon.style.background = "url(" + json.query.pages[0].original.source + ")";
    a_icon.style.backgroundSize = "cover";
    a_title.innerHTML = json.query.pages[0].description;
    a_text.innerHTML = "more on wikipedia";
    a_text.href = "https://en.wikipedia.org/wiki/" + json.query.pages[0].title;
  }
}
//Load cool gif
function loadGif(json) {
  a_icon.style.width = json.results[0].media[0].tinygif.dims[0] + "px";
  a_icon.style.height = json.results[0].media[0].tinygif.dims[1] + "px";
  a_icon.style.background = "url(" + json.results[0].media[0].tinygif.url + ")";
  a_title.innerHTML = json.results[0].title;
  a_text.innerHTML = "view on tenor";
  a_text.href = json.results[0].itemurl;
}
