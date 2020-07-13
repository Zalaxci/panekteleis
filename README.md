# startpage
A simple, work in progress startpage with an experimental search that can perform a variety of things.
![Screenshot](/assets/screenshot.png)

## Search can:
Find info on wikipedia about something.  
Web search, default search engine is ecosia but it can be changed by typing a keyword in front of the query ("g " for google and "yt " for youtube). By typing gif at the end cool GIFs will be shown.  
weather( [city]) = show weather in any city/village that is included in openweathermap, if a city isn't typed weather in your city (which can be provided in js/weather.js or as url parameter ?city=) will be shown  
[bookmark text], then enter = redirect to bookmark (bookmarks are in js/search.js and there is currently youtube, reddit and github)  
time( [timezone]) = show the time, there is a clock but this also works on other timezones, by timing the tz as [continent place] for example "america new york"  

## Clock
Clock is a modified version of https://codepen.io/eehayman/pen/jVPKpN

## Animations
Found in https://animate.style/

## Liscense
https://opensource.org/licenses/MIT
