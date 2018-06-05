import React, { PureComponent } from 'react'
import * as BooksAPI from "./BooksAPI"
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Search, BookListing, AddBook } from './components'

class BooksApp extends PureComponent {  
  constructor(props) {
    super(props)
    
  	this.state = {
    	books: [],
        currentlyReading: [],
        wantToRead: [],
        read: [],
      	isLoaded: false
    }    
  }
  
  componentDidMount() {        
  	BooksAPI.getAll().then(books => {      
      const currentlyReading = books && books.filter(d => d.shelf === "currentlyReading")
      const wantToRead = books && books.filter(d => d.shelf === "wantToRead")
      const read = books && books.filter(d => d.shelf === "read")
      
      this.setState({ books, currentlyReading, wantToRead, read, isLoaded: true })      
    })
  }
  
  onAddShelf = (book, event) => {
  	BooksAPI.update(book, event.target.value).then(result => {
    	console.log(result)
    })    
  }
  
  render() {
    const { isLoaded } = this.state
    
    return (
      <Router>
      	<div className="app">
      	{	
      	  isLoaded &&
        	<Switch>
              <Route path="/search" render={() => <Search books={this.state.books} onUpdateShelf={this.onAddShelf} />}  />
              <Route path="/add" component={AddBook} />
      		  <Route exact path="/" render={() => <BookListing books={this.state.books} 
					currentlyReading={this.state.currentlyReading} 
					wantToRead={this.state.wantToRead} 
					read={this.state.read} />}  />
      		</Switch>
      	}
      	{
      	  !isLoaded && (<div className="container centered"><h4>Loading ....</h4></div>)
      	}
      	</div>
      </Router>
    )
  }
}

export default BooksApp
