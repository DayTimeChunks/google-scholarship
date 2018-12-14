import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilterButton from '../components/FilterButton'

class FilterNumber extends Component {
  // Button's source:
  //  https://blog.logrocket.com/how-to-use-bootstrap-with-react-a354715d1121

  // Foursquare
  // API: https://developer.foursquare.com/docs/api
  // https://de.foursquare.com/explore?mode=url&near=Nordend-West%2C%20Frankfurt%20am%20Main&nearGeoId=72090&novelty=new&q=Essen

  static propTypes = {
    tapas: PropTypes.array,
    tapasShown: PropTypes.array,
    onNumberUpdate: PropTypes.func
  };

  constructor(props) {
    super(props);
    // this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // this.props.onUpdateBook(event.target.value);
    // this.setState({value: event.target.value});
  }

  loadButtons = () => {
    const {onNumberUpdate} = this.props;

    let buttons;
    let expr = this.props.tapas.length;
    console.log("loading buttons")
    switch (true) {
      case (expr < 11):
        buttons = (
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Results Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <FilterButton items={this.props.tapasShown.length} onNumberUpdate={onNumberUpdate}/>
            </div>
          </div>);
        break;
      case (expr < 21):
        console.log("less than 21");
        buttons = (
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Results Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>
          </div>);
        break;
      case (expr < 31):
        buttons = (
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Results Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>
          </div>
            );
        break;
      case (expr < 41):
        buttons = (
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Results Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={30} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>
          </div>);
        break;
      case (expr < 51):
        buttons = (
          <div className="btn-group">
            <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
            <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <span className="sr-only">Toggle Results Dropdown</span>
            </button>
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={30} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={40} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>
          </div>);
        break;
      default:
        console.log('Sorry, we are out of ' + expr + '.');
    }
    return buttons;
  };

  render(){

    // const { tapasShown } = this.props;
    // const themeClass = theme ? theme.toLowerCase() : 'secondary';

    return <div className="search-menu">
            {this.loadButtons()}
      </div>


  }
}

export default FilterNumber;

//
// <div className="dropdown-menu">
//   <button className="dropdown-item" onClick={e => this.chooseNumber('10', e)}>10 items</button>
//   <button className="dropdown-item" onClick={e => this.chooseNumber('20', e)}>20 items</button>
//   <button className="dropdown-item" onClick={e => this.chooseNumber('30', e)}>30 items</button>
//   <button className="dropdown-item" onClick={e => this.chooseNumber('40', e)}>40 items</button>
//   <button className="dropdown-item" onClick={e => this.chooseNumber('50', e)}>50 items</button>
// </div>
//
// <div className="btn btn-primary">
//   <select value={this.state.value} onChange={this.handleChange}>
//     <option className="dropdown-item" value="move" disabled>Move to...</option>
//     <option className="dropdown-item" value="currentlyReading">Currently Reading</option>
//     <option value="wantToRead">Want to Read</option>
//     <option value="read">Read</option>
//     <option value="none">None</option>
//   </select>
// </div>