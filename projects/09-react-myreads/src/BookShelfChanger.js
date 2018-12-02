import React, { Component } from 'react'
import PropTypes from 'prop-types'

class BookShelfChanger extends Component {
  static propTypes = {
    currentShelf: PropTypes.string.isRequired,
    // onShelfChange: PropTypes.func.isRequired // function requires a shelf, and executes callback
    onUpdateBook: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {value: this.props.currentShelf};

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.props.onUpdateBook(event.target.value);
    this.setState({value: event.target.value});
  }

  render(){
    return <div className="book-shelf-changer">
      <select value={this.state.value} onChange={this.handleChange}>
        <option value="move" disabled>Move to...</option>
        <option value="currentlyReading">Currently Reading</option>
        <option value="wantToRead">Want to Read</option>
        <option value="read">Read</option>
        <option value="none">None</option>
      </select>
    </div>
  }
}

export default BookShelfChanger;