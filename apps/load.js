var apps_dir = urlParams.get("type") || "default";
fetch("apps/" + apps_dir + "/list.json")
  .then(response => response.json())
  .then(json => loadIcons(json));

function loadIcons(json) {
  for (let i = 0, l = json.length; i < l; i++) {
    makeIcon(json[i], function() {
      this.classList.add("animate__animated");
      this.classList.add("animate__bounce");
      setTimeout(loadUrl, 800, this);
    });
  }
}

function makeIcon(app, onclick) {
  var icon = document.createElement("img")
  icon.id = app.url;
  icon.className = "dock-icon";
  icon.src = "apps/" + apps_dir + "/" + app.icon;
  icon.onclick = onclick;
  document.getElementById("dock").appendChild(icon);
}

function loadUrl(btn) {
  btn.className = "dock-icon";
  window.location.href="https://" + btn.id;
}
