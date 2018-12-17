import React, { Component } from 'react';
import PropTypes from "prop-types";

import { mapAPIkey } from '../utils/keys'

// Global "markers" variable is not ideal, but alternative
// would be to re-mount the Google Maps Api after every new search
// by changing the component's key value.
let markers;

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
      mapFailed: false,
      map: "",
      // markers: "", // Cannot setState in componentDidUpdate()
      infoWindow: "",
      center: {lat: 50.121870, lng: 8.689550}

    };
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          // console.log("window.google: ", window.google);
          resolve(window.google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Will catch map-API authentication errors.
        window.gm_authFailure = () => {
          this.setState({mapFailed: true})
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${mapAPIkey}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        script.defer = true;
        document.body.appendChild(script);
      });
    }
    // Return a promise for the Google Maps API
    return this.googleMapsPromise; // the "google" object
  }

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
    } else {
      throw new Error("Google Maps API did not respond!")
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
        let mapElement = document.getElementById('map');
        const map = new google.maps.Map(mapElement, {
          zoom: 13,
          center: this.state.center,
          mapTypeControl: false
        });

        let largeInfoWindow = new google.maps.InfoWindow();

        return {map: map, window: largeInfoWindow};
      })
      .then(obj => {
        this.setState({
          mapIsReady: true,
          map: obj.map,
          infoWindow: obj.window
        })
      }).catch(err => {
        console.log("caught in catch", err)
    })
  }


  componentDidUpdate(){

    const {checkedId} = this.props;
    const {map, infoWindow} = this.state;

    if (this.state.mapFailed){
      throw new Error(`Google API authentication problem. \nMaybe your API key is outdated?`)
    }

    // this.checkGoogleError();

    // window.onerror = function (msg, url, lineNo, columnNo, error) {
    //   var string = msg.toLowerCase();
    //   var substring = "script error";
    //   if (string.indexOf(substring) > -1){
    //     alert('Script Error: See Browser Console for Detail');
    //   } else {
    //     var message = [
    //       'Message: ' + msg,
    //       'URL: ' + url,
    //       'Line: ' + lineNo,
    //       'Column: ' + columnNo,
    //       'Error object: ' + JSON.stringify(error)
    //     ].join(' - ');
    //
    //     alert(message);
    //   }
    //
    //   return false;
    // };



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