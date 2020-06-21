function handle(e) {
  if(e.keyCode === 13){
    window.location.href = "https://duckduckgo.com?q=" + document.getElementById('search').value;
  }
}
