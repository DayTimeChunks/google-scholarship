import React, { Component } from 'react';
import {
  withGoogleMap, withScriptjs,
  GoogleMap, Marker, InfoBox } from 'react-google-maps';
import PropTypes from "prop-types";
const { compose, withProps, withStateHandlers } = require("recompose");



class MapCompose extends Component {

  static propTypes = {
    tapas: PropTypes.array,
  };

  render(){

    const StyledMapWithAnInfoBox = compose(
      withProps({
        googleMapURL: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB8uwCpGazZQ4JvdwNQP9Jt0GH0FukWd-M&v=3.exp&libraries=geometry,drawing,places",
        loadingElement: <div style={{ height: '100vh', width: '100%' }} />,
        containerElement: <div style={{ height: '100vh', width: '100%' }} />,
        mapElement: <div style={{ height: `100%` }} />,
        center: { lat: 50.121870, lng: 8.689550 },
      }),
      withStateHandlers(() => ({
        isOpen: false,
      }), {
        onToggleOpen: ({ isOpen }) => () => ({
          isOpen: !isOpen,
        })
      }),
      withScriptjs,
      withGoogleMap
    )(props =>
      <GoogleMap
        defaultZoom={5}
        defaultCenter={props.center}
        // defaultOptions={{ styles: demoFancyMapStyles }}
      >
        <InfoBox
          defaultPosition={{ lat: 50.121870, lng: 8.689550 }}
          options={{ closeBoxURL: ``, enableEventPropagation: true }}
        >
          <div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>
            <div style={{ fontSize: `16px`, fontColor: `#08233B` }}>
              Hello, Taipei!
            </div>
          </div>
        </InfoBox>
        {/*<Marker*/}
          {/*position={{ lat: 50.121870, lng: 8.689550 }}*/}
          {/*onClick={props.onToggleOpen}*/}
        {/*>*/}
          {/*{props.isOpen && <InfoBox*/}
            {/*onCloseClick={props.onToggleOpen}*/}
            {/*options={{ closeBoxURL: ``, enableEventPropagation: true }}*/}
          {/*>*/}
            {/*<div style={{ backgroundColor: `yellow`, opacity: 0.75, padding: `12px` }}>*/}
              {/*<div style={{ fontSize: `16px`, fontColor: `#08233B` }}>*/}
                {/*Hello, Kaohsiung!*/}
              {/*</div>*/}
            {/*</div>*/}
          {/*</InfoBox>}*/}
        {/*</Marker>*/}
      </GoogleMap>
    );

    return(
      <div>
        <StyledMapWithAnInfoBox
        />
      </div>
    );
  }
}

export default MapCompose;