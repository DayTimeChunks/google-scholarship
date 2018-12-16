
import escapeRegExp from 'escape-string-regexp'
import {secret, id} from './keys'

// Useful documents:
// https://github.com/foursquare/react-foursquare

const apiUpToDate = "20181204"; // Date I built this app, tells FourSquare to use an api version compatible with this date
const limitResponses = "50"; // Number of responses (I think maximum is 50)

let apiUrl = "https://api.foursquare.com/v2";
let apiFeature = "/venues";

export const getBest = (loc) => {
  /*
  Uses the "explore?" Foursquare endpoint,
  which searches only for recommended places.
  Use the "search?" endpoint instead for a wider search.

  To access the results array, the structure is:
  array:  myJson.response.groups[0].items
  * */

  const api = "https://api.foursquare.com/v2/venues/explore?";
  const food = "4d4b7105d754a06374d81259";

  let myHeaders = new Headers();

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

  myHeaders.append("Accept-Language", "en");

  return fetch(`${api}client_id=${id}&client_secret=${secret}&v=${apiUpToDate}&limit=${limitResponses}&intent=browse&ll=${loc.lat},${loc.lng}&categoryId=${food}`, myInit)
    .then((res) => {
      if (res.ok){
        return res.json();
      }
      throw new Error(`Network response was not OK on getBest() request. Status: ${res.status}`);
    })
};

export const getSearch = (loc) => {

  /*
  * Returns a wider search than getBest()
  *
  * The response is accessed differently, with venues directly returned as array.
  *   array:  myJson.venues
  * */

  const api = "https://api.foursquare.com/v2/venues/search?";
  const food = "4d4b7105d754a06374d81259";

  let myHeaders = new Headers();

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

  myHeaders.append("Accept-Language", "en");

  return fetch(`${api}client_id=${id}&client_secret=${secret}&v=${apiUpToDate}&limit=${limitResponses}&intent=browse&ll=${loc.lat},${loc.lng}&radius=2000&categoryId=${food}`, myInit)
    .then((res) => {
      if (res.ok){
        return res.json();
      }
      throw new Error(`Network response was not OK on getSearch() request. Status: ${res.status}`);
    })
};


// Additional query, based on 1st result query,
// which obtained a set of venue IDs
export const getPhotos = (idArr) => {
  // Construct an array of "fetch" requests
  let fetchArray = idArr.map( idPhoto =>
    (fetch(`${apiUrl}${apiFeature}/${idPhoto}/photos?client_id=${id}&client_secret=${secret}&v=${apiUpToDate}`)));

  // Fetch all, and wait for all to resolve,
  // then return an array of responses converted to json()
  return Promise.all(fetchArray)
    .then( respArr => {
      return respArr.map( response => response.json());
      // jsonResolvedArr: Array of resolved promises
  });
};

// Main query method used, returns a list of venues with information
export const getQuery = (query, loc) => {
  const match = new RegExp(escapeRegExp(query), 'i');
  const food = "4d4b7105d754a06374d81259";
  const api = `https://api.foursquare.com/v2/venues/search?client_id=${id}&client_secret=${secret}&v=${apiUpToDate}&limit=${limitResponses}&intent=browse&ll=${loc.lat},${loc.lng}&radius=10000&categoryId=${food}&query=${match}`;

  let myHeaders = new Headers();

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

  myHeaders.append("Accept-Language", "en");

  return fetch(api, myInit)
    .then((res) => {
      if (res.ok){
        return res.json();
      }
      throw new Error(`Network response was not OK on getQuery() request. Status: ${res.status}`);
    })
};

// Not used, only for exploring the API.
// Returns valid Venue categories to be used as filters in the app.
export const getCategories = (loc) => {
  const api = "https://api.foursquare.com/v2/venues/categories?";

  let myHeaders = new Headers();

  const myInit = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default' };

  myHeaders.append("Accept-Language", "en");

  return fetch(`${api}client_id=${id}&client_secret=${secret}&v=${apiUpToDate}&limit=${limitResponses}&intent=browse&ll=${loc.lat},${loc.lng}&radius=10000`, myInit)
    .then((res) => res.json())
    .catch( (err) => {
      console.log("getSearch error, ", err)
    });
}


