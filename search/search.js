//Get search bar
var input = document.getElementById('search-box');
var autocomplete = document.getElementById("autocomplete");
//List of common searches
var suggestions = ["youtube", "yt", "twitter"]
//Clear previous text
input.value = "";
//On key press
function keyPress(e) {
  //If key is enter, search
  if (e.keyCode === 13) {
    var url;
    switch(input.value) {
      case "twitter":
        url = "https://twitter.com"
        break;
      case "youtube":
        url = "https://youtube.com"
        break;
      default:
        url = "https://www.ecosia.org/search?q=" + input.value;
    }
    window.location.href = url;
  }
  //Focus on search if it is not focused
  if (input !== document.activeElement) {
    input.focus();
    input.select();
    input.value += String.fromCharCode(e.keyCode);
  }
}

function keyDown() {  
  //Autocomplete
  autocomplete.innerHTML = '';
  if(input.value != ""){
    for (i = 0; i < suggestions.length; i++) {
      if (suggestions[i].substr(0, input.value.length) == input.value){suggestion = document.createElement("div");
        suggestion.innerHTML = "<strong>" + input.value + "</strong>" + suggestions[i].substr(input.value.length);
        autocomplete.appendChild(suggestion);
      }
    }
  }
}
