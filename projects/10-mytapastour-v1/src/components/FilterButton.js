import React, { Component } from 'react'
import PropTypes from 'prop-types'


class FilterButton extends Component {
  static propTypes = {
    items: PropTypes.number,
    onNumberUpdate: PropTypes.func
  };
  chooseNumber = (nr, evt) => {
    evt.preventDefault();
    console.log(evt);
    this.props.onNumberUpdate(nr);
  };

  render(){
    return (<button className="dropdown-item" onClick={e => this.chooseNumber(`${this.props.items}`, e)}>{this.props.items} items</button>)
  }
}

export default FilterButton;