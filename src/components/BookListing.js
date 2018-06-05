import React, { Component } from "react"
import { Link } from "react-router-dom"
import { ShelfOptions } from '../Lookups'

export class BookListing extends Component {
  constructor(props) {
    super(props);
    
    this.onChangeShelf = this.onChangeShelf.bind(this)
  }
  
  onChangeShelf = (event) => {
  	console.log(event)
  }

  renderShelfItems = (books, title) => {
    if(books) {
      return (
        <div className="bookshelf">
          <h2 className="bookshelf-title">{title}</h2>
          <div className="bookshelf-books">
            <ol className="books-grid">
              {books.map((book, index) => {
                const bgImage = `url("${book.imageLinks.thumbnail}")`;
                return (
                  <div className="book" key={book.id}>
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `${bgImage}`
                        }}
                      />
                      <div className="book-shelf-changer">
                        <select value={book.shelf} onChange={this.onChangeShelf}>
                          {
                              ShelfOptions.map((option, index) => {
                                  return (
                                    <option key={index} value={option.value} disabled={option.value === 'movedTo'}>
                                       { option.text }
                                    </option>
                                  )
                              })
                          }
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">
                      {book.authors && book.authors.join(",")}
                    </div>
                  </div>
                );
              })}
            </ol>
          </div>
        </div>
      )
  	}
	return <p>Loading .....</p>
  }

  render() {
    const { currentlyReading, wantToRead, read } = this.props;
    return (
      <div>
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>			
          </div>
          <div className="list-books-content">
            <div>
                {
                  this.renderShelfItems(currentlyReading, "Currently Reading")
                }
               {
                  this.renderShelfItems(wantToRead, "Want to Read")
               }
              {
                  this.renderShelfItems(read, "Read")
              }
            </div>
            <div className="open-search">
              <Link to="/search">Add a book</Link>
            </div>
		  </div>	
        </div>
      </div>
    );
  }
}