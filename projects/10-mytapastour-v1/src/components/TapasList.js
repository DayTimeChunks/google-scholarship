import React, {Component} from 'react'
import PropTypes from 'prop-types'



class TapasList extends Component {

  static propTypes = {
    recommend: PropTypes.bool.isRequired,
    tapas: PropTypes.array.isRequired,
    onCheckedId: PropTypes.func
  };

  getVenuePhoto = (tapa) => {
    // Method not used in this version, Can exceed Foursquare API request limits quite quickly.
    if (tapa.photos && tapa.photos.photo_res.length > 0) {
      let prefix = tapa.photos.photo_res[0].prefix;
      let suffix  = tapa.photos.photo_res[0].suffix;
      return `${prefix}300x300${suffix}`;
    } else {
      return `https://via.placeholder.com/300`;
    }
  };

  getVenueIcon = (tapa) => {
    // Known sizes: 32, 45, 60, 90, 120
    if (tapa.categories[0].icon) {
      let prefix = tapa.categories[0].icon.prefix;
      let suffix  = tapa.categories[0].icon.suffix;
      return `${prefix}bg_120${suffix}`;
    } else {
      return `https://via.placeholder.com/300`;
    }
  };


  handleSelection(e){
    // e.persist();
    // e.preventDefault();
    this.props.onCheckedId(e.currentTarget.dataset.id);
  }

  componentDidUpdate(){
    // console.log("did update")
    // //
    // if (this.props.tapas && this.props.tapas.length > 0){
    //   console.log(this.props.tapas);
    //   this.props.tapas.map(tapa => {
    //     let element = document.getElementById(tapa.id);
    //     if (element){
    //       element.addEventListener("keyup", (evt => {
    //         // evt.preventDefault();
    //         if (evt.keyCode === 13){
    //           element.click();
    //         }
    //       }))
    //     }
    //   })
    // }
  }

  isRecommended = (tapas) => {
    if (tapas && tapas.length === 0){
      return (<li key={0} className='card text-center'>
          <div className="card-body">
            <h5 className="card-title pt-3">Sorry no results for your search!</h5>
            <p className="font-weight-normal">...maybe try something else?</p>
          </div>
      </li>)
    }

    if (this.props.recommend){
      return (tapas && tapas.length > 0 && (tapas.map( tapa => (
        <li key={tapa.referralId} className='card'
            onClick={this.handleSelection.bind(this)} data-id={tapa.venue.id} tabIndex="0" id={tapa.venue.id}>
          <div className='card-body'>
            <img className="photo rounded float-left img-fluid"
                 src={this.getVenuePhoto(tapa)} alt={`${tapa.venue.name}`} width="300" height="300"/>
            <div className="card-body">
              <h5 className="card-title mb-1">{tapa.venue.name}</h5>
              <p className="font-weight-normal mb-0">Address: {tapa.venue.location.address}</p>
              <p className="font-weight-light mb-0">Category: {tapa.venue.categories[0].name}</p>
              <p className="font-weight-light font-italic mb-0"> {tapa.reasons.items[0].summary}</p>
            </div>
          </div>
        </li>
      ))))
    } else {
      return (tapas && tapas.length > 0 && (tapas.map( venue => (
        <li key={venue.id} className='card'
            onClick={this.handleSelection.bind(this)} data-id={venue.id} tabIndex="0" id={venue.id}>
          <div className='card-body'>
            <img className="photo rounded float-left img-fluid"
                 src={this.getVenueIcon(venue)} alt={`Icon of ${venue.name}`} width="300" height="300"/>
            <div className="card-body">
              <h5 className="card-title mb-1">{venue.name}</h5>
              <p className="font-weight-normal mb-0">Address: {venue.location.address}</p>
              <p className="font-weight-light mb-0">Category: {venue.categories[0].name}</p>
            </div>
          </div>
        </li>
      ))))
    }
  };

  render() {

    const {tapas} = this.props;

    return (
      <div className="">
        <div className="list-container">
        <ul className="list-group">
          { this.isRecommended(tapas)
        }
        </ul>
        </div>
      </div>
    )
  }
}

export default TapasList;


