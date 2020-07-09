//Get search bar
var input = document.getElementById('search-box');
var autocomplete = document.getElementById("autocomplete");
//List of suggestions
var suggestions = ["youtube", "yt", "twitter"];
//Clear previous text
input.value = "";
//On key press
function keyPress(e) {
  //If key is enter, search
  if (e.keyCode === 13) {
    //goTo(input.value);
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
      if (suggestions[i].substr(0, input.value.length) == input.value){
        suggestion = document.createElement("div");
        suggestion.innerHTML = "<strong>" + input.value + "</strong>" + suggestions[i].substr(input.value.length);
        suggestion.onclick = function() { alert('blah'); };
        autocomplete.appendChild(suggestion);
      }
    }
  }
}
