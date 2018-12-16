import React, { Component } from 'react';
import PropTypes from "prop-types";

import { mapAPIkey } from '../utils/keys'


// Global "markers" variable is not ideal, but alternative
// would be to re-mount the Google Maps Api after every new search
// by changing the component's key value.
let markers;

// Sources:
// https://stackoverflow.com/questions/48493960/using-google-map-in-react-component  (best)
// https://stackoverflow.com/questions/45429484/how-to-implement-google-maps-js-api-in-react-without-an-external-library
// https://jsbin.com/tejutihoka/edit?js,output

class MapPromise extends Component {

  static propTypes = {
    recommend: PropTypes.bool,
    tapas: PropTypes.array,
    checkedId: PropTypes.string,
    handleInfoClose: PropTypes.func
  };

  constructor(props){
    super(props);
    this.state = {
      mapIsReady: false,
      map: "",
      // markers: "", // Cannot setState in componentDidUpdate()
      infoWindow: "",
      center: {lat: 50.121870, lng: 8.689550}
    };
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve, reject) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          // console.log("window.google: ", window.google);
          resolve(window.google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapAPIkey}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        script.defer = true;
        script.onerror = (error) => reject(error);
        document.body.appendChild(script);
      });
    }
    // Return a promise for the Google Maps API
    return this.googleMapsPromise; // the "google" object
  }

  // Ignore. Method for testing alternative approaches (for next version)
  fetchGoogleMaps = () => {
    fetch(`https://maps.googleapis.com/maps/api/js?key=${mapAPIkey}`, {})
      .then( response => { // this would be the "google" object
        if (response.ok){
          return response;
        }
        throw new Error(`My promise error, response: ${response}`);
      })
  }

  // checkGoogleError = () => {
  //   document.addEventListener("DOMContentLoaded", () => {
  //
  //   });
  //   // if (this.state.mapIsReady){
  //   //   alert("Oops. Check Your Google Maps API Key.")
  //   // }
  // }

  // Method used on each marker upon creation or if list item is checked
  populateInfoWindow = (marker, infoWindow, map) => {

    marker.setAnimation(window.google.maps.Animation.BOUNCE);
    setTimeout(() => {
      marker.setAnimation(null);
    }, 1000);

    marker.setIcon(marker.mIcon);


    infoWindow.marker = marker;
    infoWindow.setContent(
      `<div class="text-center"><p class="mb-1">${marker.title}</p><small>${marker.category}</small></div>`);
    infoWindow.open(map, marker);

    // Check that only one element on the venue list is highlighted
    let selections = document.getElementsByClassName("highlight");
    if (selections && selections.length > 0) {
      Array.prototype.map.call(selections, el => el.classList.remove("highlight") );
    }
    document.getElementById(marker.id).classList.add("highlight");

    infoWindow.addListener('closeclick', ()=>{
      marker.setIcon(null);
      infoWindow.marker = null;
      this.props.handleInfoClose(marker.id);
      let openMarker = document.getElementById(marker.id);
      if (openMarker){ openMarker.classList.remove("highlight"); }

    });

  };

  addMapMarkers() {
    const {tapas, recommend} = this.props;
    const {map, infoWindow} = this.state;

    if (window.google){
      let bounds = new window.google.maps.LatLngBounds();

      // Function returns the markers array (to global scope?)
      return tapas.map(tapa => {
        let venue;
        if (recommend){
          venue = tapa.venue;
        } else {
          venue = tapa;
        }

        let marker = new window.google.maps.Marker({
          map: map,
          position: {lat: venue.location.lat, lng: venue.location.lng},
          title: venue.name,
          // animation: google.maps.Animation.DROP,
          id: venue.id,
          category: venue.categories[0].name,
          mIcon: `${venue.categories[0].icon.prefix}bg_32${venue.categories[0].icon.suffix}`

        });
        marker.addListener('click', () => {
          if (infoWindow.marker !== marker){
            this.populateInfoWindow(marker, infoWindow, map);
          }
        });
        bounds.extend(marker.position);

        return marker;
      });
    }

  }

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    // this.getGoogleMaps();
  }

  componentDidMount() {

    // Once the Google Maps API has finished loading, initialize the map
    // NOTE: Moved content to componentDidUpdate() because props was still empty at this point.
    this.getGoogleMaps()
      .then((google) => {
        const map = new google.maps.Map(document.getElementById('map'), {
          zoom: 13,
          center: this.state.center,
          mapTypeControl: false
        });

        let largeInfoWindow = new google.maps.InfoWindow();

        return {map: map, window: largeInfoWindow};
      })
      .then(obj => {
        this.setState({
          mapIsRead: true,
          map: obj.map,
          infoWindow: obj.window
        })
      })
      .catch(reason => {
        alert(`Error with Google Maps API. Reason: ${reason}`);
        //\nAttaching a static map instead...`
        // let div = document.getElementById("map");
        // let img = document.createElement("img");
        // const height = (div.clientHeight ? div.clientHeight : "600");
        // const width = (div.clientWidth ? div.clientWidth: "800");
        //
        // const center = this.state.center;
        // const url = `https://maps.googleapis.com/maps/api/staticmap?`;
        // const c = `center=${center.lat},${center.lng}&zoom=13&size=${height}x${width}&maptype=roadmap`;
        // const marker1 = `&markers=color:blue%7Clabel:S%7C40.702147,-74.015794`;
        // const marker2 = `&markers=color:green%7Clabel:G%7C40.711614,-74.012318;`
        // const marker3 = `&markers=color:red%7Clabel:C%7C40.718217,-73.998284`
        // const key = `&key=${API}`;
        //
        // img.src = url + c + key;
        // if (div) {
        //   document.getElementById("map").appendChild(img);
        // }
      })
  }


  componentDidUpdate(){

    const {checkedId} = this.props;
    const {map, infoWindow} = this.state;

    // this.checkGoogleError();

    // Closes info window when list item gets clicked (on un-check)
    if (infoWindow.marker){
      infoWindow.close();
    }

    if (markers){
      markers.map( marker => {
        marker.setMap(null)
      })
    }

    markers = this.addMapMarkers();

    // Populates marker when list item gets clicked (on-check)
    if (markers){
      for (let i = 0; i < markers.length; i++){
        if (markers[i].id === checkedId){
          this.populateInfoWindow(markers[i], infoWindow, map);
        }
      }
    }

  }

  // componentDidUpdate(){
  //   if (this.state.mapIsReady) {
  //     // Display the map
  //     this.map = new window.google.maps.Map(document.getElementById('map'), {
  //       center: {lat: 50.121870, lng: 8.689550},
  //       zoom: 13,
  //       mapTypeId: 'roadmap',
  //       mapTypeControl: false
  //     });
  //
  //     let infoWindow = new window.google.maps.InfoWindow();
  //
  //   }
  // }

  render() {
    return (
      <div style={{ height: '88vh', width: '100%' }} >
        <div id="map" style={{ height: '100%', width: '100%' }}></div>
      </div>
    )
  }
}

export default MapPromise;

// {/*<div id="map" style={{width: 400, height: 300}}></div>*/}