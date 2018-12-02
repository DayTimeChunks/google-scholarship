import React, { Component } from 'react';
import { Route } from 'react-router-dom'
import logo from './logo.svg';
import './App.css';
import SearchBooks from './SearchBooks'
import ListBooks from './ListBooks'
import * as BooksAPI from './utils/BooksAPI'

class BooksApp extends Component {
  state = {
    mybooks: []
  };

  // Lifecycle event, fetches mybooks from the server
  componentDidMount(){
    BooksAPI.getAll().then((books)=>{
      this.setState({mybooks: books})
    })
  }

  updateBookApi = (book, shelf) => {
    BooksAPI.update(book, shelf);

    this.setState( state => {
      //  Find the same book in state that is being passed and change its shelf value.
      mybooks : state.mybooks.map( (b) => {
          if (b.id === book.id){
            b.shelf = shelf;
          }
          return b;
        }
      )
    });
  };

  render() {

    return (
      <div className="app">
        <Route path='/search' render={ () => (
          <SearchBooks
            mybooks={this.state.mybooks}
          />
        )}/>
        <Route exact path='/' render={ () => (
          <ListBooks
            mybooks={this.state.mybooks}
            onUpdateList={this.updateBookApi}
          />
        )}/>
      </div>
    )
  }
}

export default BooksApp;
