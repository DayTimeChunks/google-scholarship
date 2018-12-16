import React, { Component } from 'react'
import PropTypes from 'prop-types'
import * as FoursquareAPI from '../utils/FoursquareAPI'


class SearchField extends Component {

  static propTypes = {
    location: PropTypes.object.isRequired,
    update: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      query: ""
    };
  }

  updateQuery = (e) => {
    this.setState({
        query: e.target.value}
    );
  };

  onKeyPress = (e) => {
    if (e.key === 'Enter') {
      this.searchApi();
      // if (this.state.query){ // not empty
      //   this.searchApi();
      // }
    }
  };

  // Search API with a specific query/filter
  // update() is called in App.js, to update TapasList component
  searchApi = () => {
    if (this.state.query){
      FoursquareAPI.getQuery(this.state.query, this.props.location)
        .then(jsonRes => {
          this.props.update(jsonRes.response.venues, this.state.query);
          }
        ).catch( (err) => {
        alert(err.message)
      });
    } else {
      FoursquareAPI.getSearch(this.props.location)
        .then(jsonRes => {
          this.props.update(jsonRes.response.venues, this.state.query)
        }).catch( (err) => {
          alert(err.message)
      });
    }

  };

  render() {
    return (<div className="search-menu">
      <div className="search-book-bar">
        <div className="form-group">
          <input className="form-control"
                 type="search"
                 value={this.state.query}
                 onKeyPress={this.onKeyPress}
                 onChange={(event) => this.updateQuery(event)}
                 placeholder="Search by venue name..."
                 aria-label="Search by venue name"
          />
        </div>
        <img className="float-right" src={require("../images/powered-by-foursquare-grey.png")} height="10" alt=""/>
      </div>

    </div> )
  }
}

export default SearchField;

// Notes:
// Resources to develop the throttle functionality:
// https://www.peterbe.com/plog/how-to-throttle-and-debounce-an-autocomplete-input-in-react