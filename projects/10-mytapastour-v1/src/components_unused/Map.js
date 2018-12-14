import React, { Component } from 'react';
import {
  withGoogleMap, withScriptjs,
  GoogleMap, Marker, InfoBox } from 'react-google-maps';
import PropTypes from "prop-types";

// withGoogleMap is an HOC

class Map extends Component {

  static propTypes = {
    tapas: PropTypes.array,
  };

  render(){

    const {tapas} = this.props;

    // Component made with HOC
    const GoogleMapExample = withScriptjs(withGoogleMap(props => (
      <GoogleMap
        defaultCenter = { {lat: 50.121870, lng: 8.689550} }
        defaultZoom = { 13 }>

        {(tapas && (tapas.map( tapa => (
          <div>
            <Marker
            position={{
              lat: tapa.venue.location.lat, lng: tapa.venue.location.lng
            }}/>
          </div>
        ))))
        }

      </GoogleMap>
    )));

    return(
      <div>
        <GoogleMapExample
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyB8uwCpGazZQ4JvdwNQP9Jt0GH0FukWd-M"
          loadingElement={<div style={{ height: '100vh', width: '100%' }} />}
          containerElement={ <div style={{ height: '100vh', width: '100%' }} /> }
          mapElement={ <div style={{ height: `100%` }} /> }
        />
      </div>
    );
  }
};

export default Map;