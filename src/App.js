import React, { PureComponent } from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { Search, BookListing, AddBook } from './components'

class BooksApp extends PureComponent {  
  render() {
    return (
      <Router>
      	<div className="app">
        	<Switch>
              <Route path="/search" component={Search}  />
              <Route path="/add" component={AddBook} />
      		  <Route exact path="/" component={BookListing} />
      		</Switch>
      	</div>
      </Router>
    )
  }
}

export default BooksApp
