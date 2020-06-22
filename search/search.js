//On key press click
function handle(event) {
  //If enter is pressed search
  if(event.keyCode === 13){
    window.location.href = "https://duckduckgo.com?q=" + document.getElementById('search').value;
  }
}
