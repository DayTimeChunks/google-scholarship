/* global google */
import React, { Component } from 'react';
import PropTypes from "prop-types";

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
      infoWindow: ""
    };
  }

  getGoogleMaps() {
    // If we haven't already defined the promise, define it
    if (!this.googleMapsPromise) {
      this.googleMapsPromise = new Promise((resolve) => {
        // Add a global handler for when the API finishes loading
        window.resolveGoogleMapsPromise = () => {
          // Resolve the promise
          resolve(google);

          // Tidy up
          delete window.resolveGoogleMapsPromise;
        };

        // Load the Google Maps API
        const script = document.createElement("script");
        const API = 'AIzaSyCEhfBMzJxAaTKLtp8GjcVwEZobHckXXis';
        script.src = `https://maps.googleapis.com/maps/api/js?key=${API}&callback=resolveGoogleMapsPromise`;
        script.async = true;
        document.body.appendChild(script);
      });
    }
    // Return a promise for the Google Maps API
    return this.googleMapsPromise;
  }

  // Method used on each marker upon creation or if list item is checked
  populateInfoWindow = (marker, infoWindow, map) => {

    marker.setAnimation(google.maps.Animation.BOUNCE);
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

    let bounds = new google.maps.LatLngBounds();

    // Function returns the markers array (to global scope?)
    return tapas.map(tapa => {
      let venue;
      if (recommend){
        venue = tapa.venue;
      } else {
        venue = tapa;
      }

      let marker = new google.maps.Marker({
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

  componentWillMount() {
    // Start Google Maps API loading since we know we'll soon need it
    // this.getGoogleMaps();
  }

  componentDidMount() {
    // Once the Google Maps API has finished loading, initialize the map
    // NOTE: Moved content to componentDidUpdate() because props was still empty at this point.
    this.getGoogleMaps().then((google) => {
      const center = {lat: 50.121870, lng: 8.689550};
      const map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: center,
        mapTypeControl: false
      });

      let largeInfoWindow = new google.maps.InfoWindow();

      return {map:map, window: largeInfoWindow};

    }).then(obj => {
      this.setState({
        map: obj.map,
        infoWindow: obj.window
      })
    })
  }

  componentDidUpdate(){

    const {checkedId} = this.props;
    const {map, infoWindow} = this.state;

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
    for (let i = 0; i < markers.length; i++){
      if (markers[i].id === checkedId){
        this.populateInfoWindow(markers[i], infoWindow, map);
      }
    }
  }

  render() {
    return (
      <div style={{ height: '88vh', width: '100%' }} >
        <div id="map" style={{ height: '100%', width: '100%' }} role="application" aria-label="Filtered venue locations"></div>
      </div>
    )
  }
}

export default MapPromise;

// {/*<div id="map" style={{width: 400, height: 300}}></div>*/}