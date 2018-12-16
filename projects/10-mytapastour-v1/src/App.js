import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import escapeRegExp from "escape-string-regexp";
import './App.css';
import SearchField from './components/SearchField'
import TapasList from './components/TapasList'
import * as FoursquareAPI from './utils/FoursquareAPI'
import MapPromise from "./components/MapPromise";
import FilterLength from "./components/FilterLength";

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      tapas: [],
      tapasShown: [],
      showLength: 10,
      location: {
        lat: 50.121870,
        lng: 8.689550
      },
      checkedId: "",
      recommend: false, // false: Reduce number of API requests
      mapKey: 0
    }
  }

  componentWillMount(){
    // Logging purposes only:
    // FoursquareAPI.getCategories(this.state.location)
    //   .then(myJson => {
    //     console.log("Json.response: ", myJson.response );
    //     console.log(JSON.stringify(myJson.response))
    //   })
  }

  // Lifecycle event, fetches restaurants from FourSquare API
  componentDidMount(){

    if (this.state.recommend){
      // Narrow search, recommended venues only
      FoursquareAPI.getBest(this.state.location)
        .then( myJson => {
          this.setState({tapas: myJson.response.groups[0].items},
            () => {this.addPhotos()});
        }).catch( err => {
          alert(err.message)
      } )
    } else {
      // Broad search
      FoursquareAPI.getSearch(this.state.location)
        .then( myJson => {
          this.setState({
            tapas: myJson.response.venues,
            tapasShown: this.shortenResults(myJson.response.venues, this.state.showLength)
          });
        }).catch( (err) => {
          alert(err.message)
      });
    }
  }

  // Method used in older versions. Currently disabled due to
  // limited number of Foursquare API requests allowed
  addPhotos = () => {
    let idArray;
    // Clone tapas (deep copy)
    let temp_tapas = JSON.parse(JSON.stringify(this.state.tapas));
    // let temp_tapas = [...this.state.tapas]; // TODO: Check if spread operator worked

    // If '/explore?' responses loaded, request API again with venue's id for photos
    // Not most efficient, but the explore-API returns no images on first request.
    if (this.state.tapas){

      idArray  = this.state.tapas.map( tapa => {
        let venue;
        if (this.state.recommend){
          venue = tapa.venue;
        } else {
          venue = tapa;
        }
        return venue.id;
      } );

      FoursquareAPI.getPhotos(idArray)
        .then( jsonResolvedArr => {
          // Create array of resolved promises' responses array
          jsonResolvedArr.map( (promise, indx) => (
            promise.then( res => {
              // Add photos to new venues objects
              temp_tapas[indx].photos = {id: idArray[indx], photo_res: res.response.photos.items}
            })));
        }) // Refresh state only after all photo addresses have been loaded
        .then( () => {
          this.setState({tapas: temp_tapas})
        })
    }
  };

  updateRecommendation = () => {
    if (this.state.recommend){
      this.setState({recommend: false})
    } else {
      this.setState({recommend: true})
    }
  };

  // Method called on SearchFields.js in searchApi()
  updateResults = (foundTapas, query) => {

    let cleanTapas = this.cleanSearchResults(foundTapas, query);
    let cleanShortTapas = this.shortenResults(cleanTapas, this.state.showLength);

    this.setState({
      tapas: cleanTapas,
      tapasShown: cleanShortTapas
      // mapKey: this.state.mapKey + 1 // Forces MapPromise component to re-mount, deleting the old markers on map
    },
      // () => {this.addPhotos()} // Disabled to reduce API requests
    )
  };

  updateTapasShown = (nr) => {
    if (nr !== this.state.showLength){
      let shownTapas = this.state.tapas.slice(0, nr);
      this.setState({
        tapasShown: shownTapas,
        showLength: nr
      })
    }

  };

  cleanSearchResults = (foundTapas, query) => {
    // Clean the results, checking for:
    // 1. Address is not empty
    // 2. Query is in name or in categories
    let cleanTapas = foundTapas.filter( tapa => {
      if (tapa.location.address) {
        const match = new RegExp(escapeRegExp(query), 'i');

        if (match.test(tapa.name)
          || match.test(tapa.categories[0].name)
          || match.test(tapa.categories[0].pluralName)
          || match.test(tapa.categories[0].shortName)) {
          return tapa;
        }
      }
    });

    return cleanTapas;
  };

  shortenResults = (tapas, length) => {
    return tapas.slice(0, length);
  };

  handleCheck = (id) => {
    // Clean all previous list selection (if any)
    let selections = document.getElementsByClassName("highlight");
    if (selections && selections.length > 0) {
      Array.prototype.map.call(selections, el => el.classList.remove("highlight") );
    }
    if (this.state.checkedId !== id){
      document.getElementById(id).classList.add("highlight");
    } else {
      id = ""
    }

    this.setState({
      checkedId: id
      }
    );
  };

  infoClosed = (id) => {
    if (id === this.state.checkedId){
      if (document.getElementById(this.state.checkedId)){
        document.getElementById(this.state.checkedId).classList.remove("highlight");
      }
      this.setState({ checkedId: ""})
    }
  };

  render() {

    return (
      <div>
        <Route exact path="/" render={ () => (
          <div className="row">
            <div className="col-12 col-md-6">

              <SearchField
                location={this.state.location}
                update={this.updateResults}/>

              <FilterLength
                tapas={this.state.tapas}
                tapasShown={this.state.tapasShown}
                onNumberUpdate={this.updateTapasShown}
              />

              <TapasList
                recommend={this.state.recommend}
                tapas={this.state.tapasShown}
                onCheckedId={this.handleCheck}
              />
            </div>

            <div className="map-container col-12 col-md-6" role="application" aria-label="Filtered venue locations">
              <MapPromise
                key={this.state.mapKey}
                recommend={this.state.recommend}
                tapas={this.state.tapasShown}
                checkedId={this.state.checkedId}
                handleInfoClose={this.infoClosed}
              />
            </div>
          </div>
        )}
        />
        {/*<Route path="/favourites" render={({history}) => (*/}
          {/*<Favourites/>*/}
        {/*)}/>*/}

      </div>
    );
  }
}

export default App;


/*
* <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
* */