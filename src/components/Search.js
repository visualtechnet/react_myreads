import React, { PureComponent } from 'react'
import * as BooksAPI from '../BooksAPI'
import { Link } from 'react-router-dom'
import debounce from 'lodash/debounce'

export class Search extends PureComponent {
  constructor(props){
    super(props)  
    
    this.state = {
    	searchTerm: '',
      	books: []
    }
    
    this.handleSearch = this.handleSearch.bind(this);       
  }
      
  searchForBooks = () => {    
  	BooksAPI.search(this.state.searchTerm, 100).then(result => {
    	this.setState({ books: result && !result.error ? result : [] });
    })
  }

  handleSearch = (event) => {    
    const searchTermBook = debounce(this.searchForBooks, 500)
    this.setState({ searchTerm: event.target.value })
    searchTermBook()
  }
  
  render() {
    const { books } = this.state

    return (
      <div className="search-books">
      <div className="search-books-bar">              
      	<Link className="close-search" to="/">Close</Link>
      	<div className="search-books-input-wrapper">      					
      	<input type="text" placeholder="Search by title or author" value={this.state.searchTerm} onChange={this.handleSearch}/>
      </div>
      </div>
      <div className="search-books-results">      	
       	<ol className="books-grid">
       		{
       			books && books.map((book, index) => {
      				const bgImage = `url("${book.imageLinks.thumbnail}")`
    				return (
                    	<li key={book.id}>
                      		<div className="book">
                      			<div className="book-top">
                                <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `${bgImage}` }}></div>
                                <div className="book-shelf-changer">
                                  <select>
                                    <option value="none" disabled>Move to...</option>
                                    <option value="currentlyReading">Currently Reading</option>
                                    <option value="wantToRead">Want to Read</option>
                                    <option value="read">Read</option>
                                    <option value="none">None</option>
                                  </select>
                                </div>
                              </div>
                      		  <div className="book-title">{ book.title }</div>
                          	  <div className="book-authors">{ book.authors && book.authors.join(',') }</div>
                      		</div>                      		
                      	</li>
                    )
    			})
       		}
       	</ol>
      </div>
      </div>
    )
  }
}