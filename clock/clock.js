//Start the clock
tick();
//Show the clock (+super cool animation)
var clock = document.getElementById("clock-container");
clock.classList.add("animate__animated");
clock.classList.add("animate__zoomIn");
clock.style.display = "flex";
//Clock function (repeats every second)
function tick() {
  //Get date
  var date = new Date();
  //Show time
  var days = [
    'SUN',
    'MON',
    'TUE',
    'WED',
    'THU',
    'FRI',
    'SAT'
  ];
  document.getElementById('clock-day').innerHTML = days[date.getDay()];
  document.getElementById('clock-hour').innerHTML = date.getHours();
  document.getElementById('clock-min').innerHTML = date.getMinutes();
  document.getElementById('clock-sec').innerHTML = date.getSeconds();
  //Repeat
  setTimeout(tick, 1000);
}
