# Mobile Web Specialist Certification Course
---
#### _Three Stage Course Material Project - Restaurant Reviews_

## Project Overview: Stage 1

This first stage of the **Restaurant Reviews** project required conversion of a static webpage to a responsive, mobile-ready web application on different sized displays and accessible for screen reader use. 
The site now includes also a service worker starting to take the site towards a seamless offline experience.

At the start of this project, the the static design lacked accessibility, was unresponsive and only worked online. 
The code had a lot of issues and was barely usable on a desktop browser, much less a mobile device. 

The original project repository can be found [here](https://github.com/udacity/mws-restaurant-stage-1/tree/master).  

### How to load this application?


1. Clone or download this project anywhere on your computer. Open up a terminal and change the directory to the `./app` sub-folder of this project. 

2. Once in the `./app` sub-folder, start up a simple HTTP server to serve up the site files on your local computer. 
Python has some simple tools to do this, and you don't even need to know Python. For most people, it's already installed on your computer. 

    In a terminal, check the version of Python you have, by typing: `python -V`. 
    - If you have Python 2.x, spin up the server with `python -m SimpleHTTPServer 8000` (or some other port, if port 8000 is already in use.) 
    - For Python 3.x, you can use `python3 -m http.server 8000`. If you don't have Python installed, navigate to Python's [website](https://www.python.org/) to download and install the software.

3. With your server running, visit the site: `http://localhost:8000`, and look around for a bit. To see what the current works without internet connection, turn off your airport terminal and reload the page.

## Leaflet.js and Mapbox:

This repository uses [leafletjs](https://leafletjs.com/) with [Mapbox](https://www.mapbox.com/). 

The current version works with my own MapBox key, but I will disable that after some time. 
In case you come to this project at a later date, just follow the mapbox link and get your own key (its free).

After you have gotten the mapbox token from [Mapbox](https://www.mapbox.com/), you need 
to replace the string following `mapboxToken:` in two JS files:

- `app/js/restaurant_info.js`
- `app/js/main.js`
 

### Note about ES6

Most of the code in this project has been written to the ES6 JavaScript specification for compatibility with modern web browsers and future proofing JavaScript code. 

