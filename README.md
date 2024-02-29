# neko-de.su
<b><ruby>猫<rt>neko</rt>です<rt>desu</rt></ruby> = "I am a cat" in Japanese (literally cat + politeness particle)</b>
A (planned) personal website with a bio, links to other services I shall hopefully self-host in subdomains and other useful tools.
(Yes, I know this sounds too generic, but idk how else to describe this site cause I'm not yet sure how it'll turn out)

## About the website this used to be
This was a startpage website I made in 2020. Its main feature was a fancy do-it-all search box that can open bookmarks stored in JSON, search various sites like DuckDuckGo, Google and YouTube and search gifs / images. It also had a weather and clock applet. The plan is to incorparate some of that into neko-de.su while also adding new features.

## Search can:
Find info on wikipedia about something.  
Web search, default search engine is ecosia but it can be changed by typing a keyword in front of the query ("g " for google and "yt " for youtube). By typing gif at the end cool GIFs will be shown.  
weather( [city]) = show weather in any city/village that is included in openweathermap, if a city isn't typed weather in your city (which can be provided in js/weather.js or as url parameter ?city=) will be shown  
[bookmark text], then enter = redirect to bookmark (bookmarks are in js/search.js and there is currently youtube, reddit and github)  
time( [timezone]) = show the time, there is another clock at the bottom but this also works for other timezones, by typing the timezone as [continent place], for example "america new york"  

## Clock
Clock is a modified version of https://codepen.io/eehayman/pen/jVPKpN

## Animations
Found in https://animate.style/

## About Rectangulist
Rectangulist was an attempt at a better "startpage" made on August 2022. It was also a project to learn Nuxt.js and Vue from. It was planned to be more serious and instead of silly gifs and youtube videos that I liked when I was a silly and edgy teenager it would mainly incorporate a TODO-list to use in 2022 when I was a somewhat less silly and edgy teenager studying for exams. Sadly it went nowhere, but I also plan to incorparate elements of rectangulist here.

## Liscense
Was MIT because I was libertarian back then, now that I'm a communist I changed it to GPL-3.0-Or-Later:
https://www.gnu.org/licenses/gpl-3.0.en.html