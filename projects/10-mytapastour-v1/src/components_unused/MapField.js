import React, { Component } from 'react'
import GoogleMap from 'google-map-react';

const apiKey = "AIzaSyB8uwCpGazZQ4JvdwNQP9Jt0GH0FukWd-M";


class MapField extends Component {

  constructor(props) {
    super(props);
    this.state = "";
  }

  // initMap = () => {
  //   let mMap = new google.maps.Map(document.getElementById('map'), {
  //     center: {
  //       lat: 50.121870,
  //       lng: 8.689550
  //     },
  //     zoom: 13
  //   });
  // };

  render() {
    return (

        <GoogleMap
          style={{ height: '100vh', width: '100%' }}
          bootstrapURLKeys={{key: "AIzaSyB8uwCpGazZQ4JvdwNQP9Jt0GH0FukWd-M"}}
          center={{
            lat: 50.121870,
            lng: 8.689550}
          }
          zoom={13}
        >
        </GoogleMap>

    )
  }
}

export default MapField
// export default GoogleApiWrapper({
//   apiKey: 'AIzaSyB8uwCpGazZQ4JvdwNQP9Jt0GH0FukWd-M'
// })(MapField);


/*
*
*
*
* */