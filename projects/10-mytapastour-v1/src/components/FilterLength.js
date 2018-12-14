import React, { Component } from 'react'
import PropTypes from 'prop-types'
import FilterButton from "./FilterButton";

class FilterLength extends Component{
  static propTypes = {
    tapas: PropTypes.array,
    tapasShown: PropTypes.array,
    onNumberUpdate: PropTypes.func
  };

  loadButtons = () => {
    const {onNumberUpdate} = this.props;

    let buttons;
    let expr = this.props.tapas.length;
    console.log("loading buttons")
    switch (true) {
      case (expr < 11):
        buttons = (
            <div className="dropdown-menu">
              <FilterButton items={this.props.tapasShown.length} onNumberUpdate={onNumberUpdate}/>
            </div>
        );
        break;
      case (expr < 21):
        console.log("less than 21");
        buttons = (
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>);
        break;
      case (expr < 31):
        buttons = (
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>
        );
        break;
      case (expr < 41):
        buttons = (
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={30} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>);
        break;
      case (expr < 51):
        buttons = (
            <div className="dropdown-menu">
              <FilterButton items={10} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={20} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={30} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={40} onNumberUpdate={onNumberUpdate}/>
              <FilterButton items={this.props.tapas.length} onNumberUpdate={onNumberUpdate}/>
            </div>);
        break;
      default:
        console.log('Sorry, we are out of ' + expr + '.');
    }
    return buttons;
  };

  render(){
    return <div className="search-menu">
      <div className="btn-group">
        <button type="button" className="btn btn-secondary">Showing { this.props.tapasShown.length || '0' } results</button>
        <button type="button" className="btn btn-secondary dropdown-toggle dropdown-toggle-split" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          <span className="sr-only">Toggle Results Dropdown</span>
        </button>
        {this.loadButtons()}
      </div>
    </div>
  }

}

export default FilterLength;