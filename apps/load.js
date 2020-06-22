//Search bar
var search_bar = document.getElementById("search")
var show_search = false;

//Fetch json
var apps_dir = urlParams.get("type") || "default";
fetch("apps/" + apps_dir + "/list.json")
  .then(response => response.json())
  .then(json => loadIcons(json));

//Load the icons
function loadIcons(json) {
  //Search icon
  makeIcon({"url":"searchbar", "icon":"search.png"}, function() {
    //Show search bar
    search_bar.style.display = "block";
    show_search = !show_search;
    //Exit/entrance animation
    search_bar.className = show_search ? "animate__animated animate__bounceInUp" : "animate__animated animate__bounceOutDown";
    //Hide if it's meant to be hidden, else a weird glitch occurs
    setTimeout(hideSearch, 1000);
  });
  //Make app icons
  for (let i = 0, l = json.length; i < l; i++) {
    makeIcon(json[i], function() {
      //Bounce on click
      this.classList.add("animate__animated");
      this.classList.add("animate__bounce");
      //Then go to website
      setTimeout(loadUrl, 800, this);
    });
  }
}

//Load each icon
function makeIcon(app, onclick) {
  var icon = document.createElement("img")
  icon.id = app.url;
  icon.className = "dock-icon";
  icon.src = "apps/" + apps_dir + "/" + app.icon;
  icon.onclick = onclick;
  document.getElementById("dock").appendChild(icon);
}

//Load website
function loadUrl(btn) {
  btn.className = "dock-icon";
  window.location.href="https://" + btn.id;
}

//Hide the searchbar
function hideSearch(){
  search_bar.style.display = show_search ? "block" : "none";
}
