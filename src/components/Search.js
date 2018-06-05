import React, { PureComponent } from "react";
import * as BooksAPI from "../BooksAPI";
import { Link } from "react-router-dom";
import { ShelfOptions } from "../Lookups";
import debounce from "lodash/debounce";

export class Search extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: "",
      booksResult: []
    };

    this.handleSearch = this.handleSearch.bind(this)    
  }
   
  searchForBooks = () => {
    const { books } = this.props
    BooksAPI.search(this.state.searchTerm, 100).then(foundBooks => {
        const booksWithShelf = foundBooks && foundBooks.map((book,index) => {
        const shelfBook = books.find(d => d.id === book.id)      	
          return {
              ...book,
              shelf: shelfBook ? shelfBook.shelf : 'none'
          }
        })      
      
      this.setState({
        booksResult: booksWithShelf && !booksWithShelf.error ? booksWithShelf : []
      });
    });
  };

  handleSearch = event => {
    const searchTermBook = debounce(this.searchForBooks, 500);
    this.setState({
      searchTerm: event.target.value
    });
    searchTermBook();
  };

  renderBookResults = () => {
    const { booksResult } = this.state;
    const { onUpdateShelf } = this.props;

    if (booksResult) {
      return (
        <ol className="books-grid">          
          { booksResult.map((book, index) => {        	
            const bgImage = `url("${book.imageLinks.thumbnail}")`;
            return (
              <li key={book.id}>
                <div className="book">
                  <div className="book-top">
                    <div
                      className="book-cover"
                      style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `${bgImage}`
                      }}
                    >
                    </div>
                    <div className="book-shelf-changer">
                      <select value={book.shelf} onChange={event => onUpdateShelf(book,event)}>
                        {ShelfOptions.map((option, index) => {
                          return (<option
							key={index}
                            value={option.value}
                            disabled={option.value === "movedTo"}
                          >{option.text}
                          </option>)
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="book-title"> {book.title} </div>
                  <div className="book-authors">                    
                    {book.authors && book.authors.join(",")}
                  </div>
                </div>
              </li>
            );
          })
         }
        </ol>
      );
    }

    return <p>Loading .....</p>;
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">Close</Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.searchTerm}
              onChange={this.handleSearch}
            />
          </div>
        </div>
        <div className="search-books-results"> {this.renderBookResults()} </div>
      </div>
    );
  }
}