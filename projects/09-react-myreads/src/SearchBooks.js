import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from "./utils/BooksAPI";
import BookShelfChanger from "./BookShelfChanger";
import PropTypes from 'prop-types'


class SearchBooks extends Component {

  static propTypes = {
    mybooks: PropTypes.array.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      query: "",
      library: []
    }
  }

  // Function to be used in onChange in HTML input field.
  updateQuery = (event) => {
    // let editedQuery = query.trim();
    this.setState({
      query: event.target.value},
      () => { this.searchApi() }
    );
    // this.searchApi(this.state.query); // Moved this method inside setState
  };
  
  searchApi = () => {
    BooksAPI.search(this.state.query).then(
      library => {
        this.setState({
          library: library
        })
      }
    );
  };

  // Add a book from the fetched library
  addBook(book, shelf){
    BooksAPI.update(book, shelf);
    book.shelf = shelf;
    this.setState( () => {
      this.props.mybooks.push(book)}
    )
  }

  render(){

    const { query, library } = this.state;
    const { mybooks } = this.props;

    // Check if items in mybooks match those in fetched library, if, yes, add myshelf!
    let syncedLibrary;
    if (library && library.length){
      syncedLibrary = library.map( book => {
        for (let i = 0; i < mybooks.length; i++){
          if (mybooks[i].title === book.title ){
            book.shelf = mybooks[i].shelf;
            break;
          }
        }
        return book;
      });
    }


    return <div className="search-books">
      <div className="search-books-bar">
        {/*<button className="close-search" onClick={() => this.setState({ showSearchPage: false })}>Close</button>*/}
        <Link to="/" className="close-search"/>
        <div className="search-books-input-wrapper">
          {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
          <input
            type="text"
            value={query}
            onChange={(event) => this.updateQuery(event)}
            placeholder="Search by title or author"/>

        </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {
            (syncedLibrary && syncedLibrary.length > 0 && (syncedLibrary
              .filter(book => (book.imageLinks))  // filter-out mybooks without imageLinks
              .map(book => ( // Build the list:
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div className="book-cover"
                         style={{ width: 128, height: 193, backgroundImage: `url(${book.imageLinks.smallThumbnail})`}}>
                      <BookShelfChanger
                      currentShelf={book.shelf ? book.shelf : "none"}
                      onUpdateBook={(shelf) => { this.addBook(book, shelf); }}
                      />
                    </div>
                  </div>
                  <div className="book-title">{book.title}</div>
                  <div className="book-authors">{
                    (book.authors) && book.authors.join(", ")
                  }</div>
                </div>
              </li>
            ))))
          }
        </ol>
      </div>
    </div>
  }
}

export default SearchBooks;