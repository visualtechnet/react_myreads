# MyReads Project

PROJECT SUMMARY: This project is all about listing and keeping track of the books that the user have been reading. Each book is categorized by the user according to what the user is currently reading, suggested reads (Want To Read) or have completed reading(Read). There is a search feature in that will allow the user to search a book from a list of books that is retrieve from a database through an API. User should be able to add a book to a particular book category (shelve) from the Search screen or even the Listing page.

This is the starter template for the final assessment project for Udacity's React Fundamentals course. 

## INSTALLATION INSTRUCTIONS

Clone the project from this Github then install node modules and run the project. See below for a step by step instructions.

1. git clone https://github.com/visualtechnet/react_myreads.git
2. npm i
3. npm start

## EXPECTED OUTPUT
Listing Page
1. User should expect a list of books from each category. Each should be pulled from the existing API provided in the project. See Backend Server below for more info.
2. User should be able to assign book to a different category by selecting category (green down arrow) for each book. This event will refresh the page and reflect that the book has actually moved to a different shelf category.
3. Initial listing contains 3 books as described in the specification

Search Page
1. User should be able to search a book from the Search input textbox. List of book results will be displayed after it has completed getting the results from the API. Queries is already filtered by term and restrictions do apply. Allowed search terms are included in the project.
2. User should be able to add the book to a particular shelf category.
3. Ensure that the correct category is selected from the category option of the book. This will let the user know if the user is already part of a shelf.

## TL;DR

To get started developing right away:

* install all project dependencies with `npm install`
* start the development server with `npm start`

## What You're Getting
```bash
├── README.md - This file.
├── SEARCH_TERMS.md # The whitelisted short collection of available search terms for you to use with your app.
├── package.json # npm package manager file. It's unlikely that you'll need to modify this.
├── public
│   ├── favicon.ico # React Icon, You may change if you wish.
│   └── index.html # DO NOT MODIFY
└── src
    ├── App.css # Styles for your app. Feel free to customize this as you desire.
    ├── App.js # This is the root of your app. Contains static HTML right now.
    ├── App.test.js # Used for testing. Provided with Create React App. Testing is encouraged, but not required.
    ├── BooksAPI.js # A JavaScript API for the provided Udacity backend. Instructions for the methods are below.
    ├── icons # Helpful images for your app. Use at your discretion.
    │   ├── add.svg
    │   ├── arrow-back.svg
    │   └── arrow-drop-down.svg
    ├── index.css # Global styles. You probably won't need to change anything here.
    └── index.js # You should not need to modify this file. It is used for DOM rendering only.
```

Remember that good React design practice is to create new JS files for each component and use import/require statements to include them where they are needed.

## Backend Server

To simplify your development process, we've provided a backend server for you to develop against. The provided file [`BooksAPI.js`](src/BooksAPI.js) contains the methods you will need to perform necessary operations on the backend:

* [`getAll`](#getall)
* [`update`](#update)
* [`search`](#search)

### `getAll`

Method Signature:

```js
getAll()
```

* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* This collection represents the books currently in the bookshelves in your app.

### `update`

Method Signature:

```js
update(book, shelf)
```

* book: `<Object>` containing at minimum an `id` attribute
* shelf: `<String>` contains one of ["wantToRead", "currentlyReading", "read"]  
* Returns a Promise which resolves to a JSON object containing the response data of the POST request

### `search`

Method Signature:

```js
search(query, maxResults)
```

* query: `<String>`
* maxResults: `<Integer>` Due to the nature of the backend server, search results are capped at 20, even if this is set higher.
* Returns a Promise which resolves to a JSON object containing a collection of book objects.
* These books do not know which shelf they are on. They are raw results only. You'll need to make sure that books have the correct state while on the search page.

## Important
The backend API uses a fixed set of cached search results and is limited to a particular set of search terms, which can be found in [SEARCH_TERMS.md](SEARCH_TERMS.md). That list of terms are the _only_ terms that will work with the backend, so don't be surprised if your searches for Basket Weaving or Bubble Wrap don't come back with any results.

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can find more information on how to perform common tasks [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).
