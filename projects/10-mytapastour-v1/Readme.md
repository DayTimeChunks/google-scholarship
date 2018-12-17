

# My *Tapas* Tour

## Description

This is a single page application of my current city, Frankfurt am Main in Germany. The app uses two third-party APIs, 
[Google Maps API](https://cloud.google.com/maps-platform/) and [Foursquare API](https://developer.foursquare.com/) to load venue information
onto a list view and a map view. 

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

In the current MVP version of the project (v1), the app has the ability to browse **food venues** via a keyword search filter and 
limit the search output down to 10 and up to 50 venues (Foursquare API response limit). 

## Limitations / TODO's

Current limitations/TODO's of the app beyond project requirements:

### Search filters

- Include food categories as button filters.
- Include ability to search area based on map zoom extents (like Foursquare does)
- Include neighbourhood filters searches 

### Foursquare's API architecture:

- Foursquare's API architecture is not great for getting venue photos on a venue search request (i.e., need a separate request per venue to get any photos).
A possible option would be to build my own API progressively based on Foursquare's results.

- Query key words build-up could be adapted with more research (see this [example](https://stackoverflow.com/questions/8945377/whats-the-best-way-to-tune-my-foursquare-api-search-queries)) 

### Venue rankings and sorting

- Include sorting option
- Ranking values are not available on search query. Recommended venues can be obtained, but limits output.
This option could be implemented with a second filter combination.  

## Running this app

There are two options to run this app: 

### ...without service worker (on development mode)

To run this app: 

1. Download the project directory
2. cd into the project's folder
3. Run the following commands on terminal:

    `npm install`
    
    `npm start`
 
4. The browser should launch automatically on: `http://localhost:3000/`

5. To terminate, type `ctrl + c`

 
### ...with a service worker (on build mode)

1. Follow steps 1 and 2 above.
2. Run the following commands on terminal:

    `npm install -g serve`
    
    `serve -s build` 
    
3. The app will be available on: `http://localhost:5000 `

4. To terminate, type `ctrl + c`

5. Delete caches on your localhost port by going to: *Developer tools > Applications > Cache* . Then delete the relevant cache.
     
Note to self: to build the project I ran `npm run build`



### Other attributions

- Thanks to [Sean Groff](https://medium.com/@sgroff04/2-minutes-to-learn-react-16s-componentdidcatch-lifecycle-method-d1a69a1f753) for an example on `componentDidCatch()` to handle errors.

- Using a promise to fetch [Google Maps API](https://stackoverflow.com/questions/48493960/using-google-map-in-react-component) 
- Multiple checks on Maps [API](https://stackoverflow.com/questions/45429484/how-to-implement-google-maps-js-api-in-react-without-an-external-library) 
- Same as the second, [but with React](https://jsbin.com/tejutihoka/edit?js,output)