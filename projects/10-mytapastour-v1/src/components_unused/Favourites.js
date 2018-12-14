import React, {Component} from 'react'

class Favourites extends Component {

  constructor(props){
    super(props);
    this.state = {
      favourites: []
    }
  }

  componentDidMount(){
    fetch("/favourites")
      .then( res => res.json() )
      .then( favs => this.setState({
        favourites: favs
      }))
  }

  render() {
    const { favourites } = this.state;

    return (
      <div className="list-container">
        <ul className="list-group">
          {
            (favourites && favourites.length > 1 && (favourites.map( fav => (
              <li key={fav.referralId} className='card'>
                <div className='card-body'>
                  <img className="photo rounded float-left img-fluid" src={`https://via.placeholder.com/300`} alt="Card image cap" width="300" height="300"/>
                  <div className="card-body">
                    <h5 className="card-title">{fav.venue.name}</h5>
                    <p className="card-text">Address: {fav.venue.location.address}</p>
                  </div>
                </div>
              </li>
              )))
            )
          }
        </ul>
      </div>
    )
  }
}

export default Favourites;